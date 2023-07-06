const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const clientId = 'ClientID';
const guildId = 'GuildID';
const token = 'Token';

const commands = [
  {
    name: 'promote',
    description: 'Promote a user to the next rank.',
    options: [
      {
        name: 'user',
        description: 'The user to promote.',
        type: 6, // Type 6 represents user mention
        required: true,
      },
    ],
  },
  {
    name: 'setbranch',
    description: 'Set the branch and rank of a user.',
    options: [
      {
        name: 'user',
        description: 'The user to set the branch for.',
        type: 6, // Type 6 represents user mention
        required: true,
      },
      {
        name: 'branch',
        description: 'The branch to set.',
        type: 3, // Type 3 represents string
        required: true,
        choices: [
          {
            name: 'SG',
            value: 'SG',
          },
          {
            name: 'SL',
            value: 'SL',
          },
          {
            name: 'MP',
            value: 'MP',
          },
          {
            name: 'TC',
            value: 'TC',
          },
        ],
      },
    ],
  },
  {
    name: 'setrank',
    description: 'Set the rank of a user.',
    options: [
      {
        name: 'user',
        description: 'The user to set the rank for.',
        type: 6, // Type 6 represents user mention
        required: true,
      },
      {
        name: 'rank',
        description: 'The rank to set.',
        type: 3, // Type 3 represents string
        required: true,
        choices: [
          {
            name: 'TC',
            value: 'TC',
          },
          {
            name: 'RCT',
            value: 'RCT',
          },
          {
            name: 'PVT',
            value: 'PVT',
          },
          {
            name: 'PFC',
            value: 'PFC',
          },
          {
            name: 'LCP',
            value: 'LCP',
          },
        ],
      },
    ],
  },
  {
    name: 'setname',
    description: 'Set the nickname of a user.',
    options: [
      {
        name: 'user',
        description: 'The user to set the nickname for.',
        type: 6, // Type 6 represents user mention
        required: true,
      },
      {
        name: 'name',
        description: 'The nickname to set.',
        type: 3, // Type 3 represents string
        required: true,
      },
    ],
  },
  {
    name: 'wipe',
    description: 'Reset a user to the default branch and rank.',
    options: [
      {
        name: 'user',
        description: 'The user to wipe.',
        type: 6, // Type 6 represents user mention
        required: true,
      },
    ],
  },
  {
    name: 'summary',
    description: 'Get a summary of the number of people for each rank.',
  },
];

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands },
    );

    console.log('Successfully registered application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
