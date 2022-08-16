import  xzRequest from"./index"

//获取热门搜索关键词
export function gethotSearch() {
    return xzRequest.get("/search/hot")
}
//获取搜索建议
export function getSuggestSearch(keywords) {
    return xzRequest.get('/search/suggest',{
        type:"mobile",
        keywords
    })
}
//进行搜索
export function getSearchSong(keywords,offset=0) {
    return xzRequest.get('/search',{
        keywords,
        offset 
    })
}