import { DiscordClient } from "../index"
import { Event } from "../interfaces"
import { VoiceState } from "discord.js"
import { BloomPlayer } from "../../music/player"

export const event: Event = {
    name: "voiceStateUpdate",
    once: false,
    exec: (client: DiscordClient, oldState: VoiceState, newState: VoiceState) => {
        const guild_id: string = oldState.guild.id || newState.guild.id
        const player: BloomPlayer | undefined = client.music.get_player(guild_id)
        if(!player || newState.id != client.user?.id) return

        if(oldState.channelId && !newState.channelId) client.music.emit("playerRemoved", player)
        if(oldState.channelId != newState.channelId) client.music.emit("playerMoved", player, newState.channelId)
    }
}