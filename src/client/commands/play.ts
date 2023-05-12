import { DiscordClient } from "../index"
import { SlashCommand } from "../interfaces"
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"
import { BloomTrack } from "../../music/track"
import { Track } from "shoukaku"

export const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Start playing a song/playlist/album.")
        .addStringOption(option =>
            option.setName("query")
                .setDescription("Search query.")
                .setRequired(true)
        ),
    exec: async (client: DiscordClient, interaction: ChatInputCommandInteraction) => {
        const query = interaction.options.getString("query")
        const vc = interaction.guild?.voiceStates?.cache?.get(interaction.user.id)?.channel
        const guild_id = interaction.guildId
        if(!vc || !guild_id) {
            await interaction.reply({content: "Please join a voice channel.", ephemeral: true})
            return
        }
        const results: Track[] | undefined = await client.music.search(query!)
        if(!results) {
            await interaction.reply({content: "No results found! Try using other search query.", ephemeral: true})
            return
        }
        const player = await client.music.create_player({
            guild_id: guild_id,
            voice_id: vc.id
        })

        const tracks: Array<BloomTrack> = new Array<BloomTrack>()
        for (const r of results) {
            const track = new BloomTrack(r, interaction.user.id)
            tracks.push(track)
        }
        player.play(tracks)

        const response: string = tracks.length === 1 ? tracks[0].title : `${tracks.length} tracks`
        await interaction.reply({
            content: `${response} added to the queue.`,
            ephemeral: true
        })
    }
}