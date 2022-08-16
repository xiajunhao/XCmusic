import {HYEventStore } from "hy-event-store"

import {getRank} from "../server/api_music"
const rankStore = new HYEventStore({
    state:{
        hotRank:[]
    },
    actions:{
        getHotRankList(ctx,ids){
            getRank(ids).then(res=>{
                ctx.hotRank = res.data.playlist.tracks.splice(0,6)
            })
        }
    }
})

export {
    rankStore
}