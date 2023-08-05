// discord.js packages
const { SlashCommandBuilder } = require("@discordjs/builders")

// get configuration
require("dotenv").config()
const { NODE_ENV, APPLICATION_ID, PRIVATE_KEY } = process.env

// utilities
const { pingPongEmbed } = require("../utilities/embedsUtility")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("핑")
		.setDescription("핑퐁 명령어")
		.addStringOption((option) =>
			option.setName("이름").setDescription("이름을 적어주세요.").setRequired(true)
		),
	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true })

		// discord client instance
		const { client } = interaction

		// client info
		const {
			user: { id, username, discriminator },
			member,
			member: {
				_roles,
				guild: { ownerId },
			},
		} = interaction
		const userTag = `${username}#${discriminator}`

		// get options
		const { options } = interaction
		const name = options.getString("이름")

		await interaction.editReply({
			embeds: [pingPongEmbed(name, userTag)],
		})
	},
}
