import  xzRequest from"./index"

export function getSongDetail(id) {
    return xzRequest.get('/song/detail',{
        ids:id
    })
}

export function getSongLyric(id) {
    return xzRequest.get(`/lyric`,{
        id
    })
}