import { Client, Collection } from "discord.js"
import { BloomManager } from "../music"
import { Event, SlashCommand } from "./interfaces"
import path from "path"
import { readdirSync } from "fs"


export class DiscordClient extends Client {
    public readonly slash_commands: Collection<string, SlashCommand> = new Collection()
    public readonly events: Collection<string, Event> = new Collection()
    public music!: BloomManager

    constructor(token: string) {
        super({
            intents: [
                "Guilds",
                "GuildMessages",
                "GuildVoiceStates"
            ]
        })

        this.login(token)
        .catch((e: Error) => {
            console.error(e)
            process.exit
        })
        .then( async () => {
            await this.handle_events()
            await this.handle_slashcommands()
            this.music = new BloomManager(this)
            await this.music.handle_events()
        })
    }

    private handle_events = async () => {
        const events_path = path.join(__dirname, "..", "client/events")
        for (const file of readdirSync(events_path).filter(x => [".ts", ".js"].some(ext => x.endsWith(ext)))) {
            const { event } = await import(path.join(events_path, file))
            this.events.set(event.name, event)
            if(event.once) this.once(event.name, event.exec.bind(null, this))
            else this.on(event.name, event.exec.bind(null, this))
        }
    }

    private handle_slashcommands = async () => {
        const commands_path = path.join(__dirname, "..", "client/commands")
        let commands_array = []
        for (const file of readdirSync(commands_path).filter(x => [".ts", ".js"].some(ext => x.endsWith(ext)))) {
            const { command } = await import(path.join(commands_path, file))
            this.slash_commands.set(command.data.name, command)
            commands_array.push(command.data.toJSON())
        }
        this.application?.commands.set(commands_array)
    }
}

declare module "discord.js" {
    interface Client {
        music: BloomManager
    }
}