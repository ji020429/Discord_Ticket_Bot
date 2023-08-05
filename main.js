// Require the necessary discord.js classes
const { Client, Intents, DiscordAPIError, Message} = require('discord.js');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { Permissions } = require('discord.js');
const { token, guildId, guild} = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const createSupportEmbed = () => {
    // embed object
    const supportEmbed = new MessageEmbed()
        .setTitle('티켓을 생성하시려면 아래 버튼을 눌러주세요!')
        .setColor('AQUA')

    // buttons
    const openButton = new MessageButton()
        .setCustomId('test1')
        .setLabel('Open Button')
        .setStyle('PRIMARY')
    const closeButton = new MessageButton()
        .setCustomId('test2')
        .setLabel('Close Button')
        .setStyle('DANGER')
    const saveButton = new MessageButton()
        .setCustomId('test3')
        .setLabel('Save Button')
        .setStyle('SECONDARY')

    // message component(button)
    const row = new MessageActionRow().addComponents(openButton, closeButton, saveButton)

    // send message to channel
    return client.channels.cache
        .get(guildId)
        .send({ embeds: [supportEmbed], components: [row], content: 'ticket 버튼이 생성되었습니다.' })
}

// When the client is ready, run this code (only once)
client.once('ready', async() => {
	console.log('Ready!');

    // send msg embed every 3 mins
    let msg = await createSupportEmbed()
    setInterval(async() => {
        // delete previous msg embed
        msg.delete()
        // send new msg embed
        msg = await createSupportEmbed() // sned()가 Promise를 반환하니까 await로 msg 오브젝트로 받아내기
    }, 3 * 60 * 1000)
});

//메세지를 받으면 호출되는 함수                                                                                                                                                                                                                             
client.on('interactionCreate', async interaction => {

    // 명령어가 틍록? 입력?되어있는지 확인(?)
    // slash command handler
    if (interaction.isCommand()) {
        // get command name
        const { commandName } = interaction

        if (commandName === 'ping') {
            await interaction.reply('Pong!')
        } else if (commandName === 'server') {
            await interaction.reply('Server INFO')
        } else if (commandName === 'user') {
            await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`)
        }
    }

    interaction.guild.roles.create({ name: 'Mod', permissions: [Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.VIEW_CHANNEL] }); // 채널에 있는 사람들 모두에게 이 권한을 줌?

    // button click handler
    if (interaction.isButton()) {
        // button's customId
        const { customId } = interaction
        switch (customId) {
            case 'test1':
                //console.log('Open button clicked!')
                interaction.guild.channels.create('ticket_channel', {
                    type: 'GUILD_TEXT',
                    permissionOverwrites: [{
                        id: interaction.user.id, 
                        allow: ['VIEW_CHANNEL']
                    }]
                });
                interaction.reply({ content: '티켓 채널이 생성되었습니다!', fetchReply: true })
                break
            case 'test2':
                //console.log('Close button clicked!')
                //if (interaction.guild.channels.name == "ticketchannel")
                const tcId = interaction.guild.channels.cache.findKey(channels => channels.name === 'ticket_channel')
                const cha = interaction.guild.channels.cache.get(tcId)
                cha.delete();
                interaction.reply({ content: '티켓 채널이 삭제되었습니다!', fetchReply: true })
                break
            case 'test3':
                console.log('Save button clicked!')
                break
            default:
                console.log('Unknown button.')
        }
    }
});

// Login to Discord with your client's token
client.login(token);