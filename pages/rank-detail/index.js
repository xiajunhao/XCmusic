// pages/rank-detail/index.js
import {getRank,getMenuDetail,getMenuSongAll} from ".././../server/api_music"
import {songStore} from '../../store/index'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        songs:{},
        type:'',
        offset:10
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({"type":options.type})
        if(options.type == "Rank"){
            getRank(options.id).then(res=>{
                this.setData({"songs":res.data.playlist})
            })
        }else if(options.type == "Menu"){
            getMenuDetail(options.id).then(res=>{
                this.setData({"songs":res.data.playlist})
                wx.hideLoading()
            })
        }
    },
    handSetSongList(e){
        const index = e.currentTarget.dataset.index
        songStore.setState('playSongIndex',index)
        songStore.setState('playSongList',this.data.songs.tracks)
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        if(this.data.type == "Menu"){
            let oVale = {
                id:this.data.songs.id,
                offset:this.data.offset
            }
            getMenuSongAll(oVale).then(res=>{
                let songArr = this.data.songs.tracks.concat(res.data.songs)
                this.setData({"songs.tracks":songArr})
                wx.hideLoading()
            })
            this.setData({"offset":this.data.offset+10})
        }
    }
})