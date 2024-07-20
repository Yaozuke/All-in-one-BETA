const { ChannelType, PermissionsBitField, EmbedBuilder } = require('discord.js');
const db = require('../database/voicedb');
const config = require('../config.json');

const deleteChannelAfterTimeout = (client, channelId, timeout) => {
    setTimeout(async () => {
        const row = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM voice_channels WHERE channelId = ?', [channelId], (err, row) => {
                if (err) {
                    return reject(err);
                }
                resolve(row);
            });
        });

        if (row) {
            const guild = client.guilds.cache.get(row.guildId);
            const channel = guild.channels.cache.get(channelId);
            if (channel) {
                channel.delete().catch(console.error);
                db.run('DELETE FROM voice_channels WHERE channelId = ?', [channelId], (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
                const settings = config.voiceChannelSetup[guild.id];
                const managerChannel = guild.channels.cache.get(settings.managerChannelId);
                if (managerChannel) {
                    managerChannel.send(`Voice channel ${channel.name} has been deleted after 12 hours.`);
                }
            }
        }
    }, timeout);
};

module.exports = (client) => {
    client.on('voiceStateUpdate', async (oldState, newState) => {
        if (oldState.channelId === newState.channelId) return; // No channel change

        const guildId = newState.guild.id;
        const settings = config.voiceChannelSetup[guildId];
        if (!settings || !settings.status) return; // Check if voice channel system is enabled

        const { mainVoiceChannelId, managerChannelId } = settings;
        const member = newState.member;

        if (newState.channelId === mainVoiceChannelId) {
            const newChannel = await newState.guild.channels.create({
                name: `${member.user.username}'s channel`,
                type: ChannelType.GuildVoice,
                parent: newState.channel.parentId,
                permissionOverwrites: [
                    {
                        id: member.user.id,
                        allow: [PermissionsBitField.Flags.ManageChannels, PermissionsBitField.Flags.Connect, PermissionsBitField.Flags.Speak]
                    },
                    {
                        id: newState.guild.roles.everyone,
                        deny: [PermissionsBitField.Flags.Connect]
                    }
                ]
            });

            await member.voice.setChannel(newChannel);
            db.run('INSERT INTO voice_channels (id, guildId, channelId, userId, createdAt, isTemporary, isPublic) VALUES (?, ?, ?, ?, datetime("now"), 1, 0)', [newChannel.id, guildId, newChannel.id, member.user.id]);

            const managerChannel = newState.guild.channels.cache.get(managerChannelId);
            if (managerChannel) {
                const embed = new EmbedBuilder()
                    .setTitle('New Voice Channel Created')
                    .setDescription(`A new voice channel has been created by ${member.user.tag}.`)
                    .addFields(
                        { name: 'Channel', value: newChannel.name, inline: true },
                        { name: 'Created By', value: `<@${member.user.id}>`, inline: true },
                        { name: 'Time Left', value: 'This channel will be deleted in 12 hours.', inline: true }
                    )
                    .setTimestamp()
                    .setColor('#00FF00');

                managerChannel.send({ embeds: [embed] });

                deleteChannelAfterTimeout(client, newChannel.id, 12 * 60 * 60 * 1000);
            }
        } else if (oldState.channelId && !newState.channelId) {
            const row = await new Promise((resolve, reject) => {
                db.get('SELECT * FROM voice_channels WHERE channelId = ?', [oldState.channelId], (err, row) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(row);
                });
            });

            if (row) {
                const channel = oldState.guild.channels.cache.get(row.channelId);
                if (channel) {
                    channel.delete().catch(console.error);
                    db.run('DELETE FROM voice_channels WHERE channelId = ?', [row.channelId], (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });

                    const managerChannel = oldState.guild.channels.cache.get(managerChannelId);
                    if (managerChannel) {
                        managerChannel.send(`Voice channel deleted: ${channel.name}`);
                    }
                }
            }
        }
    });
};
