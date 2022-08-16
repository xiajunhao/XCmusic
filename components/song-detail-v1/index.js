// components/song-detail-v1/index.js
import { songStore } from '../../store/index'

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        item:{
            type:Object,
            value:{}
        },
        index:{
            type:Number,
            value:0
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        goPlay(){
            const id = this.properties.item.id
            //跳转页面
            wx.navigateTo({
              url: '/pages/music-play/index?id='+id
            })
            //请求歌曲数据
            songStore.dispatch('getSongDataAction',{id})
        }
    }
})
