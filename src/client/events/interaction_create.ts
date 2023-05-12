import { DiscordClient } from "../index"
import { Event } from "../interfaces"
import { ChatInputCommandInteraction } from "discord.js"

export const event: Event = {
    name: "interactionCreate",
    once: false,
    exec: async (client: DiscordClient, interaction: ChatInputCommandInteraction) => {
        if(!interaction.isCommand()) return
        const cmd = client.slash_commands.get(interaction.commandName)
        await cmd?.exec(client, interaction)
    }
}