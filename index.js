"use strict";
require('dotenv').config()
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { SlashCommandBuilder } = require('@discordjs/builders');

const API = require('./api/leetCodeAPI');
const listeningServer = require('./server/server');

//let channelId = null;

const Channel = require('./database/controllers/channels');

const commands = [
  new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
  new SlashCommandBuilder().setName('lc_begin').setDescription('Sets this channel to the daily challenge'),
  new SlashCommandBuilder().setName('lc_stop').setDescription('Stops messages'),
  new SlashCommandBuilder().setName('lc_show').setDescription('List the active channels')
]
  .map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);

rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID2), { body: commands })
  .then(() => console.log('Successfully registered application commands 2.'))
  .catch(console.error);

//Global
// rest.put(Routes.applicationCommands(process.env.CLIENT_ID),{ body: commands })
//   .then(() => console.log('Successfully registered application commands.**'))
//   .catch(console.error);


//Listeners
const Discord = require("discord.js");
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS] });

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  const channelList = await Channel.getAllChannels();
  channelList.forEach(channel => {
    API.dailyTrigger(channel.channelId,client);
  })
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }

  if (interaction.commandName === 'lc_begin') {

    await interaction.deferReply()
    const channel = client.channels.cache.get(interaction.channelId);
    Channel.addChannel(channel);
    await interaction.editReply('The daily challenge will be posted at 0:30 UTC');
  }

  if (interaction.commandName === 'lc_stop') {
    await interaction.deferReply()
    //dailyTrigger.stop();
    await interaction.editReply('The daily challenge will not longer be posted here');
  }

  if (interaction.commandName === 'lc_show') {
    await interaction.deferReply();
    const channelList = await Channel.getAllChannels();
    const message = ['Active Channel List:\n'];
    channelList.forEach(channel => {
      message.push(`#${channel.channelName}\n`);
    });
    await interaction.editReply(message.join(' '));
  }
});
//Run server listener and bot listener

client.login(process.env.TOKEN);
listeningServer();