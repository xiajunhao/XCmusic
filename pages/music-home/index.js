// pages/music-home/index.js
import {rankStore,songStore} from "../../store/index"

import {getBanner,getSongMenu,getRankSong} from '../../server/api_music'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        boxHeight:0,
        banners:[],
        hotRank:[],
        songMenu:[],
        rankList:[],

        currentSong:{},
        isPlaying:false
    },

    setBoxHeight(){
        const query = wx.createSelectorQuery()
        query.select('.swiper-img').boundingClientRect()
        query.exec(res=>{
            this.setData({boxHeight:res[0].height})
        })
    },
    onLoad(options) {
        this.requestDom()
        this.onPageSongData()
    },
    //请求页面中的数据操作
    requestDom() {
        //获取轮播图
        getBanner().then(res=>{
            //这里能进行优化 使用防抖或节流
            this.setData({banners:res.data.banners})
        })
         
        //获取排行榜数据
        rankStore.dispatch("getHotRankList",3)

        //获取store中存储的排行榜数据
        rankStore.onState("hotRank",(res)=>{
            if(!res[0]) return false;
            this.setData({"hotRank":res})
        })

        //获取热门歌单数据
        getSongMenu().then(res=>{
            let menuList = res.data.result.splice(0,6)
           this.setData({"songMenu":menuList})
        })

        //获取巅峰榜歌曲
        getRankSong().then(res=>{
            let list = res.data.list.splice(0,3)
            this.setData({rankList:list})
        })
    },
    //单击切换更多页面
    handMoreClick(e)
    {
        wx.navigateTo({
          url: '/pages/rank-detail/index?id='+e.detail+"&type=Rank",
        })
    },
    handRankClick(e){
        wx.navigateTo({
            url: '/pages/rank-detail/index?id='+e.currentTarget.dataset.id+"&type=Rank",
          })
    },
    //点击切换歌单详情页面
    handMoreMenuClick(e){
        wx.navigateTo({
            url: '/pages/rank-detail/index?id='+e.detail.id+"&type=Menu",
          })
    },
    goSearch(){
        wx.navigateTo({
            url: '/pages/music-search/index',
          })
    },
    handSetSongList(e){
        const index = e.currentTarget.dataset.index
        songStore.setState('playSongIndex',index)
        songStore.setState('playSongList',this.data.hotRank)
    },
    handPlayBtnClick(){
        if(!this.data.currentSong.name) return
        songStore.dispatch('changePlayingState')
    },
    handGoPlayPage(){
        //跳转页面
        wx.navigateTo({
            url: '/pages/music-play/index?id='+this.data.currentSong.id
        })
    },
    onPageSongData(){
        songStore.onState('currentSong',(currentSong)=>{
            if(currentSong) this.setData({currentSong})
        })
        songStore.onState('isPlaying',(isPlaying)=>{
            if(isPlaying != undefined ) this.setData({isPlaying})
        })
    }
})