export  function analysis (params) {
    let lyricArr = []
    const lyricReEx = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/
    const lyric1 = params.split('\n')
    for(let item of lyric1){
        const resultReEx = lyricReEx.exec(item)
        if(!resultReEx) continue
        //获取时间
        const min = resultReEx[1] * 60 * 1000
        const second = resultReEx[2] * 1000
        const milsecond = resultReEx[3].length == 2?resultReEx[3] *10 :resultReEx[3] * 1
        const time = min + second + milsecond
        //获取歌词
        const text = item.replace(lyricReEx,"")
        lyricArr.push({time,text})
    }

   return lyricArr
}
