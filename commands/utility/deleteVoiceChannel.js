const { SlashCommandBuilder } = require('@discordjs/builders');
const db = require('../../database/voicedb');
const { PermissionsBitField } = require('discord.js');
const config = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('deletevoicechannel')
        .setDescription('Deletes a specified temporary voice channel')
        .addStringOption(option => option.setName('channelid').setDescription('ID of the temporary voice channel to delete').setRequired(true)),
    async execute(interaction) {
        const guildId = interaction.guild.id;
        const settings = config.voiceChannelSetup[guildId];

        if (!settings || !settings.status) {
            return interaction.reply({ content: 'Voice channel system is not enabled in this server.', ephemeral: true });
        }

        const { adminRoleId } = settings;
        const channelId = interaction.options.getString('channelid');

        // Ensure the command only targets temporary channels
        const row = await db.get('SELECT * FROM voice_channels WHERE channelId = ? AND isTemporary = 1', [channelId]);
        if (!row) {
            return interaction.reply({ content: 'Temporary channel not found in the database.', ephemeral: true });
        }

        const member = interaction.guild.members.cache.get(interaction.user.id);
        if (!member.roles.cache.has(adminRoleId) && interaction.user.id !== row.userId) {
            return interaction.reply({ content: 'You do not have permission to delete this channel.', ephemeral: true });
        }

        const channel = interaction.guild.channels.cache.get(channelId);
        if (channel) {
            channel.delete().catch(console.error);
            db.run('DELETE FROM voice_channels WHERE channelId = ?', [channelId]);
            return interaction.reply({ content: `Channel ${channel.name} deleted.`, ephemeral: true });
        } else {
            return interaction.reply({ content: 'Channel not found.', ephemeral: true });
        }
    }
};
