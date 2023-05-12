import { EventEmitter } from "events"
import { Connectors, NodeOption, Shoukaku, Track } from "shoukaku"
import { BloomPlayer } from "./player"
import { BloomError, BloomPlayerOptions } from "./interfaces"
import { Client } from "discord.js"
import path from "path"
import { readdirSync } from "fs"

export declare interface BloomManager {
    on(event: "playerCreated", listener: (player: BloomPlayer) => void): this
    on(event: "playerRemoved", listener: (player: BloomPlayer) => void): this
}

export class BloomManager extends EventEmitter {
    private readonly shoukaku: Shoukaku
    private readonly nodes: NodeOption[] = [{
        name: 'lavalink',
        url: `lavalink:${process.env.LAVALINK_PORT}`,
        auth: process.env.LAVALINK_PASS!
    }]
    public readonly players: Map<string, BloomPlayer>
    public readonly discord_client: Client

    constructor(discord_client: Client) {
        super()

        this.shoukaku = new Shoukaku(new Connectors.DiscordJS(discord_client), this.nodes)
        this.discord_client = discord_client
        this.players = new Map<string, BloomPlayer>
    }

    public handle_events = async () => {
        const events_path = path.join(__dirname, "..", "music/events")
        for (const file of readdirSync(events_path).filter(x => [".ts", ".js"].some(ext => x.endsWith(ext)))) {
            const { event } = await import(path.join(events_path, file))
            if(event.once) this.once(event.name, event.exec.bind(null, this))
            else this.on(event.name, event.exec.bind(null, this))
        }
    }

    public async create_player(options: BloomPlayerOptions): Promise<BloomPlayer> {
        let player: BloomPlayer | undefined = this.players.get(options.guild_id)
        if(player) return player

        const node = this.shoukaku.getNode()
        if(!node) throw new BloomError(0x10)

        if(!options.muted) options.muted = false
        if(!options.deafened) options.deafened = false

        const shoukaku_player = await node.joinChannel({
            guildId: options.guild_id,
            channelId: options.voice_id,
            mute: options.muted,
            deaf: options.deafened,
            shardId: 0
        })

        const bloom_player = new BloomPlayer(this, options, shoukaku_player)
        this.emit("playerCreated", bloom_player)
        return bloom_player
    }

    public delete_player(guild_id: string) {
        const node = this.shoukaku.getNode()
        if(!node) return

        const player = this.players.get(guild_id)
        if(!player) return

        player.stop()
        node.leaveChannel(guild_id)
        this.emit("playerRemoved", player)
    }

    public get_player(guild_id: string): BloomPlayer | undefined {
        return this.players.get(guild_id)
    }

    public search = async (query: string): Promise<Track[] | undefined> => {
        const node = this.shoukaku.getNode()
        if(!node) throw new BloomError(0x10)

        let result
        if(/^https?:\/\//.test(query)) result = await node.rest.resolve(query)
        else {
            result = await node.rest.resolve(`spsearch: ${query}`)
            if(["LOAD_FAILED", "NO_MATCHES"].includes(result!.loadType)) {
                result = await node.rest.resolve(`ytsearch: ${query}`)
            }
        }
        if(!result) return
        if(result.loadType === "PLAYLIST_LOADED") return result.tracks
        else return [result.tracks.shift()!]
    }
}