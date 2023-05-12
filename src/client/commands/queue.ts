import { DiscordClient } from "../index"
import { SlashCommand } from "../interfaces"
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"
import { QueueEmbed } from "../../music/interfaces/queue_embed"

export const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("Check the queue."),
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
        const embed = new QueueEmbed(player.queue)
        const thumbnail = await player.queue.current.fetch_thumbnail()
        if(thumbnail) embed.setThumbnail(thumbnail)

        await interaction.reply({
            embeds: [embed],
            ephemeral: false
        })
    }
}