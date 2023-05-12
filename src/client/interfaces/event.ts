import { DiscordClient } from "../index"
import { ClientEvents } from "discord.js"

interface Exec {
    (client: DiscordClient, ...args: any[]): void
}

export interface Event {
    name: keyof ClientEvents | "randomStatus",
    once: boolean,
    exec: Exec
}