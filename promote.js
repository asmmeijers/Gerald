// commands/promote.js
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('promote')
        .setDescription('Promote a user to the next rank')
        .addUserOption(option => option.setName('target').setDescription('The member to promote').setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('target');
        const member = interaction.guild.members.cache.get(user.id);
        const ranks = ["TC", "RCT", "PVT", "PFC", "LCP"];
        const currentRank = member.nickname.split(' | ')[2];
        const currentRankIndex = ranks.indexOf(currentRank);
        if (currentRankIndex === -1 || currentRankIndex === ranks.length - 1) {
            return await interaction.reply(`Cannot promote ${user.username}`);
        }
        const newRank = ranks[currentRankIndex + 1];
        const role = interaction.guild.roles.cache.find(r => r.name === newRank);
        await member.roles.add(role);
        await member.setNickname(`${member.nickname.split(' | ')[0]} | ${member.nickname.split(' | ')[1]} | ${newRank}`);
        await interaction.reply(`Promoted ${user.username} to ${newRank}`);
    },
};
