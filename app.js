const Discord = require('discord.js');
// const client = new Discord.Client();
const { Client, Intents, Collection } = require("discord.js")
// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

client.login('OTUzNjc4Mzk5NTMxMDI0NDI0.YjIEOA.3MX-GTYG2S2UHPtBN4O9mh-7SVU');