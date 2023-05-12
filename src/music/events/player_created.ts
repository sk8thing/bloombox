import { BloomEvent } from "../interfaces"
import { BloomManager } from "../manager"
import { BloomPlayer } from "../player"

export const event: BloomEvent = {
    name: "playerCreated",
    once: false,
    exec: (manager: BloomManager, player: BloomPlayer) => {
        const guild_id = player.guild_id
        const guild_name = manager.discord_client.guilds.cache.get(guild_id)?.name
        console.log(`[${guild_id}][${guild_name}] Player created`)
        manager.players.set(guild_id, player)
    }
}