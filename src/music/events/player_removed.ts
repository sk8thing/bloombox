import { BloomEvent } from "../interfaces"
import { BloomManager } from "../manager"
import { BloomPlayer } from "../player"

export const event: BloomEvent = {
    name: "playerRemoved",
    once: false,
    exec: (manager: BloomManager, player: BloomPlayer) => {
        const guild_id = player.guild_id
        const guild_name = manager.discord_client.guilds.cache.get(guild_id)?.name
        console.log(`[${guild_id}][${guild_name}] Player disconnected`)
        manager.players.delete(guild_id)
    }
}