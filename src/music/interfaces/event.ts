import { BloomManager } from "../manager"
import { BloomEvents } from "./events"

interface Exec {
    (manager: BloomManager, ...args: any[]): void
}

export interface BloomEvent {
    name: keyof BloomEvents,
    once: boolean,
    exec: Exec
}