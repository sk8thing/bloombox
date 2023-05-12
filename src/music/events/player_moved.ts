import { BloomEvent } from "../interfaces"
import { BloomManager } from "../manager"
import { BloomPlayer } from "../player"

export const event: BloomEvent = {
    name: "playerMoved",
    once: false,
    exec: (manager: BloomManager, player: BloomPlayer, vc_id: string) => {
        const guild_id = player.guild_id
        const guild_name = manager.discord_client.guilds.cache.get(guild_id)?.name
        const old_vc = player.voice_id
        console.log(`[${guild_id}][${guild_name}] Player moved [${old_vc}][${vc_id}]`)
        player.voice_id = vc_id
    }
}