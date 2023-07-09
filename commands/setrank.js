// commands/setrank.js
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setrank')
    .setDescription('Set the rank part of the nickname')
    .addUserOption(option => option.setName('target').setDescription('The member to set the rank for').setRequired(true))
    .addStringOption(option => option.setName('rank').setDescription('The new rank').setRequired(true)),
  async execute(interaction) {
    console.log(interaction); // Log the interaction object

    const user = interaction.options.getMember('target');
    const rank = interaction.options.getString('rank');

    console.log(`Rank: ${rank}`); // Log the rank

    // Check if user is null
    if (!user) {
      console.log('User not found!'); // Log a message if the user is not found
      return await interaction.reply({ content: 'User not found!', ephemeral: true });
    }

    // Fetch the member from the API
    const member = await interaction.guild.members.fetch(user.id);

    // Check if member is null
    if (!member) {
      console.log('Member not found!'); // Log a message if the member is not found
      return await interaction.reply({ content: 'Member not found!', ephemeral: true });
    }

    const role = interaction.guild.roles.cache.find(r => r.name === rank);
    if (!role) {
      console.log('Role not found!'); // Log a message if the role is not found
      return await interaction.reply({ content: 'Role not found!', ephemeral: true });
    }

    try {
      await member.roles.add(role);
      await member.setNickname(`${member.nickname.split(' | ')[0]} | ${member.nickname.split(' | ')[1]} | ${rank}`);
      await interaction.reply(`Set rank for ${member.user.username} to ${rank}`);
    } catch (error) {
      console.log(`Error setting rank: ${error.message}`); // Log any errors that occur when setting the rank
    }
  },
};
