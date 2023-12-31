import {
	SlashCommandBuilder,
	ButtonBuilder,
	ButtonStyle,
	ActionRowBuilder,
	ChatInputCommandInteraction,
	PermissionFlagsBits,
	PermissionsBitField,
} from "discord.js";
import { getServicesOfDiscorsGuild } from "../../../services/service.service";

export default {
	data: new SlashCommandBuilder()
		.setName("create-otp-mobile-button")
		.setDescription("creates a otp button"),

	async execute(interaction: ChatInputCommandInteraction) {
		const permissions = interaction.member
			?.permissions as PermissionsBitField;
		if (!permissions.has(PermissionFlagsBits.Administrator)) {
			interaction.reply({
				content: "You need to be an admin to use this command",
				ephemeral: true,
			});
			return;
		}

		const services = await getServicesOfDiscorsGuild(
			interaction.guildId as string,
		);
		const service = services[0];
		if (!service) {
			interaction.reply({
				content: "No services found for this guild",
				ephemeral: true,
			});
			return;
		}

		const button = new ButtonBuilder()
			.setCustomId(`authifyButton-phone-${service?._id}`)
			.setLabel("Authenticate with OTP")
			.setStyle(ButtonStyle.Secondary);

		const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button);

		interaction.reply({
			content: "Success",
			ephemeral: true,
		});

		interaction?.channel?.send({
			content: `** **`,
			components: [row],
		});
	},
};
