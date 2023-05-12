import { DiscordClient } from "../index"
import { SlashCommand } from "../interfaces"
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"

export const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Application network latency."),
    exec: async (_client: DiscordClient, interaction: ChatInputCommandInteraction) => {
        await interaction.reply({
            content: `Websocket latency: ${_client.ws.ping} ms`,
            ephemeral: true
        })
    }
}