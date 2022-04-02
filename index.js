const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { SlashCommandBuilder } = require('@discordjs/builders');

const getDailyChallenge = require('./leetCodeAPI');
const listeningServer = require('./server');

let chanelId = null;

const commands = [
  new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
  new SlashCommandBuilder().setName('lc_begin').setDescription('Sets this channel to the daily challenge'),
  new SlashCommandBuilder().setName('lc_stop').setDescription('Stops messages')
]
  .map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);


//Listeners
const Discord = require("discord.js");
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }

  if (interaction.commandName === 'lc_begin') {

    await interaction.deferReply()
    channelId = interaction.channelId;
    dailyTrigger.start();
    await interaction.editReply('Done');
  }
  if (interaction.commandName === 'lc_stop') {

    await interaction.deferReply()
    dailyTrigger.stop();
    await interaction.editReply('Done');
  }
});

//Cron temp
const CronJob = require('cron').CronJob;

const dailyTrigger = new CronJob('* 30 18 * * *', async function() {
  const channel = client.channels.cache.get(channelId);
	const response = await getDailyChallenge();
  channel.send('https://leetcode.com' + response.link);
});



//Run server listener and bot listener
listeningServer();
client.login(process.env.TOKEN);