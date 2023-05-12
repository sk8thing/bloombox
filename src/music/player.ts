import { BloomManager } from "./manager"
import { BloomQueue } from "./queue"
import { Player } from "shoukaku"
import { BloomPlayerOptions } from "./interfaces"
import { BloomTrack } from "./track"


export class BloomPlayer {
    private readonly manager: BloomManager
    private shoukaku: Player
    public readonly queue: BloomQueue
    public readonly guild_id: string
    public voice_id: string
    public paused: boolean = false

    constructor(manager: BloomManager, options: BloomPlayerOptions, shoukaku: Player) {
        this.manager = manager
        this.shoukaku = shoukaku
        this.guild_id = options.guild_id
        this.voice_id = options.voice_id
        this.queue = new BloomQueue()

        this.shoukaku.on("end", (reason) => {
            if(!["FINISHED", "STOPPED"].includes(reason.reason)) return

            this.queue.dequeue()
            if(!this.queue.is_empty) setTimeout(async () => {
                await this.shoukaku.playTrack(this.queue.current)
            }, 1000)
        })
    }

    public play = (tracks: BloomTrack[]) => {
        if(this.queue.is_empty) this.shoukaku.playTrack({track: tracks[0].track})
        this.manager.emit("tracksAdded", this, tracks)
        this.queue.enqueue(tracks)
    }

    public pause = () => {
        this.paused = !this.paused
        this.shoukaku.setPaused(this.paused)
    }

    public stop = () => {
        if(!this.queue.is_empty) this.shoukaku.stopTrack()
    }
}