import { Track } from "shoukaku"

export class BloomTrack {
    public track: string
    public title: string
    public requester: string
    public source: string
    public link: string

    constructor(track: Track, requester: string) {
        this.source = track.info.sourceName
        this.track = track.track
        this.requester = requester
        this.link = track.info.uri
        switch(this.source) {
            case "youtube":
                this.title = track.info.title
                break
            case "spotify":
                this.title = `${track.info.author} - ${track.info.title}`
                break
            default:
                this.title = "Unknown source"
                break
        }
    }

    public fetch_thumbnail = async (): Promise<string | undefined> => {
        switch(this.source) {
            case "spotify":
                const url = `https://open.spotify.com/oembed?url=${this.link}`
                try {
                    const response = await fetch(url)
                    const data = await response.json()
                    return data.thumbnail_url
                } catch (e) {
                    console.error(e)
                }
                break
            case "youtube":
                const r = new RegExp(/(?<=watch\?v=)[A-Za-z0-9_-]{11}|(?<=youtu.be\/)[A-Za-z0-9_-]{11}/)
                const vid = this.link.match(r)
                if(vid) return `https://img.youtube.com/vi/${vid.shift()}/hqdefault.jpg`
                break
        }
    }
}