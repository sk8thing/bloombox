import { DiscordClient } from "../index"
import { Event } from "../interfaces"
import { ActivityType } from "discord.js"

const list: string[] = [
    "the hardest jams \u{1F3B5}",
    "real trap shit \u{1F4AF}",
    "trap-a-holics \u{1F525}"
]

export const event: Event = {
    name: "randomStatus",
    once: false,
    exec: (client: DiscordClient) => {
        client.user?.setPresence({
          activities: [{
              name: list[Math.floor(Math.random() * list.length)],
              type: ActivityType.Playing
          }],
          status: 'online'
        });
    }
}