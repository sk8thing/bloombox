import { DiscordClient } from "../index"
import { Event } from "../interfaces"

export const event: Event = {
    name: "ready",
    once: true,
    exec: (client: DiscordClient) => {
        console.log(`Joined ${client.guilds.cache.size} discord servers`)
        client.emit("randomStatus")
        setInterval(() => client.emit("randomStatus"), 60000)
    }
}