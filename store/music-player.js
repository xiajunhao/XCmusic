import {HYEventStore } from "hy-event-store"
import { getSongDetail,getSongLyric } from '../server/api_player'
import { analysis } from '../wxs/analysisLyric'  //解析歌词

// const audioContext = wx.createInnerAudioContext()
const audioContext = wx.getBackgroundAudioManager()

const songStore = new HYEventStore({
    state:{
        isFrist:true,

        id:0,
        currentSong:{},
        currentDuration:0,
        lyricInfo:[],

        currentTime:0,
        crrentLyricIndex:0,
        currentSongLyric:'',

        isPlaying:false,

        playModeIndex:0,   //0： 顺序播放  1：单曲循环   2：随机播放
        playSongList:[],
        playSongIndex:0
    },
    actions:{
        getSongDataAction(ctx,{ id,isRefresh=false}){
            if(ctx.id == id && !isRefresh) return
            ctx.id = id
            ctx.isPlaying = true
            //重置数据
            ctx.currentSong = {}
            ctx.currentDuration = 0
            ctx.lyricInfo = []
            ctx.currentTime = 0
            ctx.crrentLyricIndex = 0
            ctx.currentSongLyric = ''

            //请求歌曲消息
            getSongDetail(id).then(res=>{
                ctx.currentSong = res.data.songs[0]
                ctx.currentDuration = res.data.songs[0].dt
                audioContext.title = ctx.currentSong.name
            })
            //请求歌曲歌词
            getSongLyric(id).then(res=>{
               const lyric =  analysis(res.data.lrc.lyric)
               ctx.lyricInfo = lyric
            })
            //创造audio对象
            audioContext.stop()
            audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
            audioContext.title = id
            audioContext.autoplay = true
            if(ctx.isFrist){
                this.dispatch('setSongWithLyricAction')
            }
        },
        //歌词和歌曲相关
        setSongWithLyricAction(ctx){
            audioContext.onCanplay(()=>{
                //当暂停状态时候不自动播放
                if(!ctx.isPlaying) return
                audioContext.play()
           })
            audioContext.onTimeUpdate(()=>{
                //1.获取到当前播放时间
                let currentTime = audioContext.currentTime * 1000 
                ctx.currentTime = currentTime
                //3.修改匹配歌曲
                if(ctx.lyricInfo.length < 20){
                    return
                }
                for(var i=0;i<ctx.lyricInfo.length;i++){
                    if(currentTime < ctx.lyricInfo[i].time){
                        if(ctx.crrentLyricIndex != i-1){
                            ctx.currentSongLyric = ctx.lyricInfo[i-1].text
                            ctx.crrentLyricIndex = i-1
                        }
                        break
                    }
                }
            })
            //自动播放下一曲
            audioContext.onEnded(()=>{
                this.dispatch('changePlaySong')
            })
            //后台播放和暂停
            audioContext.onPlay(()=>{
                this.setState('isPlaying',true)
            })
            audioContext.onPause(()=>{
                this.setState('isPlaying',false)
            })
            //用户关闭背景播放
            audioContext.onStop(()=>{
                this.setState('isPlaying',false)
                //后续如果需要播放，需要重新设置audioContext的src等属性。
            })
        },
        //播放暂停
        changePlayingState(ctx){
            ctx.isPlaying = !ctx.isPlaying
            ctx.isPlaying?audioContext.play():audioContext.pause()
        },
        //按模式切换歌曲
        changePlaySong(ctx,isNext=true){
            //1.获取索引
            let index = ctx.playSongIndex
            //2.判断播放模式
            switch(ctx.playModeIndex){
                case 0://顺序播放
                    isNext?index++:index--
                    if(index<0)index = ctx.playSongList.length - 1
                    if(index==ctx.playSongList.length)index = 0
                break;
                case 1://单曲循环
                break;
                case 2://随机播放
                    index = Math.floor(Math.random() * ctx.playSongList.length)
            }
            //3.获取到播放歌曲
            let curentSong = ctx.playSongList[index]
            if(index == ctx.playSongIndex){
                //单曲循环
                //4.播放歌曲
                this.dispatch('getSongDataAction',{id:curentSong.id,isRefresh:true})
            }else{
                ctx.playSongIndex = index
                //4.播放歌曲
                this.dispatch('getSongDataAction',{id:curentSong.id})
            }
            
        }
    }
})

export {
    audioContext,
    songStore
}