// pages/music-play/index.js
import {audioContext} from '../../store/index'
import { songStore } from '../../store/index'
let modeNameArr = ['order','repeat','random']
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id:0,
        currentSong:{},
        currentPage:0,
        currentSongLyric:'',
        lyricInfo:[],
        currentTime:0,
        currentDuration:0,
        crrentLyricIndex:0,

        swiperHeight:0,
        isMusicLyric:true,
        sliderValue:0,
        isSliderChanging:false,
        lyricScrollTop:0,

        isPlaying:false,
        playingName:'pause',

        playModeIndex:0,
        modeName:'order'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

        this.setData({'id':options.id})
        //获取歌曲和歌词详细信息
        this.onDataStates()
        //动态设置swiper高度
        let info = wx.getSystemInfoSync()
        let statusBarHeight = info.statusBarHeight //状态栏高度
        let screenHeight = info.screenHeight     //屏幕高度
        let screenWith = info.screenWidth       //屏幕宽度
        let height = screenHeight - statusBarHeight - 44
        let radio = screenHeight / screenWith    //屏幕比例
        this.setData({swiperHeight:height})
        this.setData({isMusicLyric:radio>=2})
    },
    // swiper滑动事件
    handSwiperChange(e){
       this.setData({currentPage:e.detail.current})
    },
    //点击tab切换swiper
    handClickSwiperChange(e){
        let id = e.currentTarget.dataset.id
        this.setData({currentPage:id})
    },
    //slider点击事件
    handSliderChange(e){
        const currentTime = this.data.currentDuration * e.detail.value / 100
        audioContext.seek(currentTime / 1000)
        this.setData({sliderValue: e.detail.value,isSliderChanging:false})
    },
    //slider滑动事件
    handSliderChanging(e){
        this.setData({isSliderChanging:true})
        //修改对应播放时间
        const currentTime = this.data.currentDuration * e.detail.value / 100
        this.setData({currentTime})
    },
    //点击切换播放模式
    handModeClick(){
        let ModeIndex = this.data.playModeIndex + 1
        if(ModeIndex == 3) ModeIndex = 0
        songStore.setState('playModeIndex',ModeIndex)
    },
    //点击播放暂停
    handPlayingClick(){
        songStore.dispatch('changePlayingState')
    },
    //点击上一曲
    handPrevClick(){
        songStore.dispatch('changePlaySong', false )

    },
    //点击下一曲
    handNextClick(){
        songStore.dispatch('changePlaySong')
    },
    //监听store中相关数据
    onDataStates(){
        //歌曲
        songStore.onStates(['currentSong','currentDuration','lyricInfo'],({currentSong,currentDuration,lyricInfo})=>{
            if(currentSong) this.setData({currentSong})
            if(currentDuration) this.setData({currentDuration})
            if(lyricInfo) this.setData({lyricInfo})
        })
        //歌词
        songStore.onStates(['currentTime','crrentLyricIndex','currentSongLyric'],({currentTime,crrentLyricIndex,currentSongLyric})=>{
            if(currentTime && !this.data.isSliderChanging){
                //1.获取到当前播放时间
                //2.修改进度条
                const sliderValue = currentTime / this.data.currentDuration * 100
                this.setData({currentTime,sliderValue})
            }
            if(crrentLyricIndex){
                this.setData({crrentLyricIndex,lyricScrollTop:crrentLyricIndex * 35})
            }
            if(currentSongLyric != undefined){
                this.setData({currentSongLyric})
            }

        })
        //播放模式
        songStore.onState('playModeIndex',(playModeIndex)=>{
            this.setData({playModeIndex,modeName:modeNameArr[playModeIndex]})
        })
        //暂停和播放
        songStore.onState('isPlaying',(isPlaying)=>{
            let playingName = isPlaying?'pause':'resume'
            this.setData({isPlaying,playingName})
        })
    }
})