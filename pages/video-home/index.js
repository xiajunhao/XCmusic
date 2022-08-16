// pages/video-home/index.js
import {getTopMv} from "../../server/getTopMv"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        videoList:[],
        hasMore:true
    },

    //事件处理
    goVodieDetail(event)
    {
        const id = event.currentTarget.dataset.item.id
        wx.navigateTo({
          url: '/pages/video-detail/index?id='+id
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // xzRequest.get("/top/mv",{
        //     "offest":0,
        //     "limit":10
        // }).then(res=>{
        //     this.setData({videoList:res.data.data})
        // })
        getTopMv(0).then(res=>{
            this.setData({videoList:res.data.data})
        })
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        const that = this;
        if(that.data.hasMore){
            getTopMv(that.data.videoList.length).then(res=>{
                that.setData({hasMore:res.data.hasMore})
                that.setData({videoList:that.data.videoList.concat(res.data.data)})
            })
        }
    },
    //下拉刷新时间
    onPullDownRefresh(){
        const that = this;
        getTopMv(0).then(res=>{
            that.setData({videoList:res.data.data})
            that.setData({hasMore:true})
            wx.stopPullDownRefresh()
        })
    }
})