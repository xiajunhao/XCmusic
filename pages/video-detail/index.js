// pages/video-detail/index.js
import { getMvDetail,getMvUrl,getMvRelated} from "../../server/getTopMv"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        mvDetail:{},
        mvUrl:"",
        mvRelated:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const id = options.id
        getMvDetail(id).then(res=>{
            this.setData({mvDetail:res.data.data})
        })
        getMvUrl(id).then(res=>{
          this.setData({mvUrl:res.data.data.url})
        })
        getMvRelated(id).then(res=>{
            this.setData({mvRelated:res.data.data})
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})