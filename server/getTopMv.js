import xzRequest from "./index"

//获取热门mv排行
export function getTopMv(offset) {
    return xzRequest.get("/top/mv",{
        offset,
        limit:12
    })
}
//获取mv详细信息
export function getMvDetail(params) {
    return xzRequest.get("/mv/detail",{
        mvid:params
    })
}

//获取mv播放地址
export function getMvUrl(params) {
    return xzRequest.get("/mv/url",{
        id:params,
        r:1080
    })
}
//获取mv相关推荐
export function getMvRelated(params) {
    return xzRequest.get("/related/allvideo",{
        id:params
    })
}
