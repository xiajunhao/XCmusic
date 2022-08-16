import  xzRequest from"./index"

export function getBanner(params) {
    return xzRequest.get('/banner?type=1')
}
//请求排行榜歌曲
export async function getRank(params) {
    //提示用户请求加载中
    wx.showLoading({
        title: '加载中',
    })
    const res = await xzRequest.get('/toplist')
    const id = res.data.list[params].id
    const list = await xzRequest.get('/playlist/detail?id='+id)
    //请求完成 关闭提醒
    wx.hideLoading()
    return new Promise(
        (resolve,reject)=>{
            resolve(list);
        }
    )
}
//请求推荐歌曲
export function getSongMenu() {
    return xzRequest.get('/personalized')
}

//请求巅峰榜歌曲
export function getRankSong(params) {
    return xzRequest.get('/toplist/detail')
}

//请求歌单详情内容
export function getMenuDetail(params) {
    wx.showLoading({
        title: '加载中',
    })
    return xzRequest.get('/playlist/detail?id='+params)
}
//请求歌单内所有的歌曲
export async function getMenuSongAll(params) {
    wx.showLoading({
        title: '加载中',
    })
    let res = xzRequest.get(`/playlist/track/all?id=${params.id}&limit=10&offset=${params.offset}`)
    return res
}