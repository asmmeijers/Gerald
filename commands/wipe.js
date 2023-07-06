// commands/wipe.js
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('wipe')
        .setDescription('Reset the branch and rank of a user to TC')
        .addUserOption(option => option.setName('target').setDescription('The member to wipe').setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('target');
        const member = interaction.guild.members.cache.get(user.id);
        const role = interaction.guild.roles.cache.find(r => r.name === 'TC');
        await member.roles.set([role]);
        await member.setNickname(`${member.nickname.split(' | ')[0]} | TC | TC`);
        await interaction.reply(`Wiped ${user.username}`);
    },
};
