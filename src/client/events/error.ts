import { Event } from "../interfaces"
import { DiscordClient } from "../index"

export const event: Event = {
    name: "error",
    once: false,
    exec: (_client: DiscordClient, error: Error) => {
        console.error(error)
    }
}