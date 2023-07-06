// commands/setname.js
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setname')
    .setDescription('Set the name part of the nickname')
    .addUserOption(option => option.setName('target').setDescription('The member to set the name for').setRequired(true))
    .addStringOption(option => option.setName('name').setDescription('The new name').setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser('target');
    if (!user) {
      return await interaction.reply({ content: 'No user selected', ephemeral: true });
    }
    const name = interaction.options.getString('name');
    const member = await interaction.guild.members.fetch(user.id); // Fetch the member from the API
    if (!member) {
      return await interaction.reply({ content: `Could not find member with ID ${user.id}`, ephemeral: true });
    }
    await member.setNickname(name);
    await interaction.reply(`Set name for ${user.username} to ${name}`);
  },
};
