// commands/setbranch.js
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setbranch')
    .setDescription('Set the branch part of the nickname')
    .addUserOption(option => option.setName('target').setDescription('The member to set the branch for').setRequired(true))
    .addStringOption(option => option.setName('branch').setDescription('The new branch').setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser('target');
    const branch = interaction.options.getString('branch');
    const member = interaction.guild.members.cache.get(user.id);
    const role = interaction.guild.roles.cache.find(r => r.name === branch);
    const rankRole = interaction.guild.roles.cache.find(r => r.name === 'RCT');
    await member.roles.add(role);
    await member.roles.add(rankRole);
    await member.setNickname(`${name} | ${branch} | RCT`);
    await interaction.reply(`Set branch for ${user.username} to ${branch}`);
  },
};
