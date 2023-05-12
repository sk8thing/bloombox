import { EmbedBuilder } from "discord.js"
import { BloomQueue } from "../queue"

export class QueueEmbed extends EmbedBuilder {
    constructor(queue: BloomQueue) {
        super()
        this.setColor(0xF69D99)
        this.setTitle(`Now playing ${queue.current.title}`)
        this.setURL(queue.current.link)
        this.setFooter({ text: `There's a total of ${queue.length} tracks in the queue`})

        const description: Array<string> = new Array<string>();
        description.push("__**Next up in the playlist:**__\n")
        queue.slice(0, -1).reverse().slice(0, 10).forEach(track => {
            description.push(`[\u{1F517}](${track.link})\`${track.title}\`<@${track.requester}>\n`)
        })
        this.setDescription(description.join(" "))
    }
}