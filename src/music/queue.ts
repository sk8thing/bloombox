import { BloomTrack } from "./track"

export class BloomQueue extends Array<BloomTrack> {
    public get is_empty(): boolean {
        return this.length === 0
    }

    public get current(): BloomTrack {
        return this[this.length - 1]
    }

    public enqueue = (track: BloomTrack | BloomTrack[]) => {
        if(Array.isArray(track)) track.forEach(t => this.unshift(t))
        else this.unshift(track)
    }

    public dequeue = () => {
        this.pop()
    }
}