// commands/summary.js
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('summary')
        .setDescription('Get a summary of the number of people for each rank'),
    async execute(interaction) {
        const ranks = ["TC", "RCT", "PVT", "PFC", "LCP"];
        const summary = {};
        for (const rank of ranks) {
            summary[rank] = interaction.guild.members.cache.filter(member => member.roles.cache.some(role => role.name === rank)).size;
        }
        let reply = 'Rank Summary\n';
        for (const rank in summary) {
            reply += `${rank} = ${summary[rank]}\n`;
        }
        await interaction.reply(reply);
    },
};
