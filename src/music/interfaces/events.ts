import { BloomPlayer } from "../player"
import { BloomTrack } from "../track"

export interface BloomEvents {
    playerCreated: [player: BloomPlayer]
    playerRemoved: [player: BloomPlayer]
    playerMoved: [player: BloomPlayer, vc_id: string]
    tracksAdded: [player: BloomPlayer, tracks: BloomTrack[]]
}