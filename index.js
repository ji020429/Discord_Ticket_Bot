// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

//메세지를 받으면 호출되는 함수                                                                                                                                                                                                                             
client.on('interactionCreate', async interaction => {

    // 명령어가 틍록? 입력?되어있는지 확인(?)
    if(!interaction.isCommand()) return;

    // 호출된 명령어 알아오기
    const { commandName } = interaction;

    if (commandName === 'ping') {
        await interaction.reply('Pong!');
    } else if (commandName === 'server') {
        await interaction.reply('Server INFO');
    } else if (commandName === 'user') {
        await interaction.reply('Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}');
    }
});

// Login to Discord with your client's token
client.login(token);