// commands/setrank.js
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setrank')
    .setDescription('Set the rank part of the nickname')
    .addUserOption(option => option.setName('target').setDescription('The member to set the rank for').setRequired(true))
    .addStringOption(option => option.setName('rank').setDescription('The new rank').setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser('target');
    const rank = interaction.options.getString('rank');

    // Check if user is null
    if (!user) {
      return await interaction.reply({ content: 'User not found!', ephemeral: true });
    }

    const member = interaction.guild.members.cache.get(user.id);
    const role = interaction.guild.roles.cache.find(r => r.name === rank);
    await member.roles.add(role);
    await member.setNickname(`${member.nickname.split(' | ')[0]} | ${member.nickname.split(' | ')[1]} | ${rank}`);
    await interaction.reply(`Set rank for ${user.username} to ${rank}`);
  },
};
