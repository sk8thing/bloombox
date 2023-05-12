import { DiscordClient } from "../index"
import { SlashCommand } from "../interfaces"
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"

export const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("Pause/unpause the player."),
    exec: async (client: DiscordClient, interaction: ChatInputCommandInteraction) => {
        const guild_id = interaction.guildId
        if(!guild_id) {
            await interaction.reply({
                content: "Error: No guild.",
                ephemeral: true
            })
            return
        }
        const player = client.music.get_player(guild_id)
        if(!player) {
            await interaction.reply({
                content: "Error: No player found.",
                ephemeral: true
            })
            return
        }
        player.pause()
        const status = player.paused ? "paused" : "unpaused"
        await interaction.reply({
            content: `Successfully ${status} the player.`,
            ephemeral: false,
        })
    }
}