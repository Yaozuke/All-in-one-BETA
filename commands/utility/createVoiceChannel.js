const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField, ChannelType, EmbedBuilder } = require('discord.js');
const db = require('../../database/voicedb');
const config = require('../../config.json');

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

module.exports = {
    data: new SlashCommandBuilder()
        .setName('createvoicechannel')
        .setDescription('Creates a temporary voice channel')
        .addStringOption(option => 
            option.setName('type')
                .setDescription('Type of the voice channel (public or private)')
                .setRequired(true)),
    async execute(interaction) {
        const guildId = interaction.guild.id;
        const settings = config.voiceChannelSetup[guildId];
        const voiceChannel = interaction.member.voice.channel;

    if (!voiceChannel) {
        return interaction.reply('You need to be in a voice channel first!');
    }


        if (!settings || !settings.status) {
            return interaction.reply({ content: 'Voice channel system is not enabled in this server.', ephemeral: true });
        }

        const { mainVoiceChannelId, managerChannelId } = settings;
        const member = interaction.member;

        const channelType = interaction.options.getString('type').toLowerCase() === 'public';

        const newChannel = await interaction.guild.channels.create({
            name: `${member.user.username}'s channel`,
            type: ChannelType.GuildVoice,
            parent: interaction.channel.parentId,
            permissionOverwrites: channelType ? [
                {
                    id: member.user.id,
                    allow: [PermissionsBitField.Flags.ManageChannels, PermissionsBitField.Flags.Connect, PermissionsBitField.Flags.Speak]
                },
                {
                    id: interaction.guild.roles.everyone,
                    allow: [PermissionsBitField.Flags.Connect]
                }
            ] : [
                {
                    id: member.user.id,
                    allow: [PermissionsBitField.Flags.ManageChannels, PermissionsBitField.Flags.Connect, PermissionsBitField.Flags.Speak]
                },
                {
                    id: interaction.guild.roles.everyone,
                    deny: [PermissionsBitField.Flags.Connect]
                }
            ]
        });

        await member.voice.setChannel(newChannel);
        db.run('INSERT INTO voice_channels (id, guildId, channelId, userId, createdAt, isTemporary, isPublic) VALUES (?, ?, ?, ?, datetime("now"), 1, ?)', [newChannel.id, guildId, newChannel.id, member.user.id, channelType ? 1 : 0]);

        const managerChannel = interaction.guild.channels.cache.get(managerChannelId);
        if (managerChannel) {
            const embed = new EmbedBuilder()
                .setTitle('New Voice Channel Created')
                .setDescription(`A new ${channelType ? 'public' : 'private'} voice channel has been created by ${member.user.tag}.`)
                .addFields(
                    { name: 'Channel', value: newChannel.name, inline: true },
                    { name: 'Created By', value: `<@${member.user.id}>`, inline: true },
                    { name: 'Time Left', value: 'This channel will be deleted in 12 hours.', inline: true }
                )
                .setTimestamp()
                .setColor('#00FF00');

            managerChannel.send({ embeds: [embed] });

            deleteChannelAfterTimeout(interaction.client, newChannel.id, 12 * 60 * 60 * 1000);
        }

        interaction.reply({ content: `Voice channel ${newChannel.name} created successfully.`, ephemeral: true });
    }
};
