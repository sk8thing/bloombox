import { BloomEvent } from "../interfaces"
import { BloomManager } from "../manager"
import { BloomPlayer } from "../player"
import { BloomTrack } from "../track"

export const event: BloomEvent = {
    name: "tracksAdded",
    once: false,
    exec: (manager: BloomManager, player: BloomPlayer, tracks: BloomTrack[]) => {
        const guild_id = player.guild_id
        const guild_name = manager.discord_client.guilds.cache.get(guild_id)?.name
        tracks.forEach(t => console.log(`[${guild_id}][${guild_name}] [${t.link}][${t.requester}]`))
    }
}