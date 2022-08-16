// pages/music-search/index.js
import {gethotSearch,getSuggestSearch,getSearchSong} from "../../server/api_search"
import {songStore } from '../../store/index'
import debounce from "../../wxs/debounce"

//进行防抖处理
const debounceGetSuggestSearch = debounce(getSuggestSearch,500)
Page({

    /**
     * 页面的初始数据
     */
    data: {
        hotKeyList:[],
        searchValue:"",
        oldSugggestList:[],
        sugggestList:[],
        resultSongs:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        //获取热门搜索数据
        gethotSearch().then(res=>{
            this.setData({"hotKeyList":res.data.result.hots})
        })
    },
    //用户输入搜索内容时候
    handSearch(e){
        this.setData({"searchValue":e.detail})
        //当输入为空不执行
        if(!e.detail){
            this.setData({"sugggestList":[]})
            this.setData({"resultSongs":[]})
            debounceGetSuggestSearch.cancel()
            wx.hideLoading()
            return false
        }
        wx.showLoading({
            title: '加载中',
        })
        debounceGetSuggestSearch(e.detail).then(res=>{
            this.setData({oldSugggestList:res.data.result.allMatch})
            const suggestRichList = res.data.result.allMatch 
            let sugList = []
            if(!suggestRichList) return
            suggestRichList.map((item)=>{
                let nodes = []
                if(item.keyword.startsWith(this.data.searchValue)){
                    let key1 = item.keyword.slice(0,this.data.searchValue.length)
                    let key2 = item.keyword.slice(this.data.searchValue.length)
                    let obj1 = {
                        name:"span",
                        attrs:{
                            style: 'color: #268a26;'
                        },
                        children:[
                            {type: 'text',
                            text: key1}
                        ]
                    }
                    let obj2 = {
                        name:"span",
                        attrs:{
                            style: 'color: #000;'
                        },
                        children:[
                            {type: 'text',
                            text: key2}
                        ]
                    }
                    nodes.push(obj1,obj2)
                }else{
                    let obj = {
                        name:"span",
                        attrs:{
                            style: 'color: #000;'
                        },
                        children:[
                            {type: 'text',
                            text: item.keyword}
                        ]
                    }
                    nodes.push(obj)
                }
                sugList.push(nodes)
            })
            this.setData({"sugggestList":sugList})
            wx.hideLoading()
        })
    },
    //点击取消按钮
    clearSearch(){
        this.setData({"sugggestList":[]})
    },
    //点击热门搜索关键词时
    handHotClike(e){
        this.setData({"searchValue":e.currentTarget.dataset.info})
        this.handSearchEnd()
    },
    handSuggestClick(e){
        let id = e.currentTarget.dataset.id;
        let name = this.data.oldSugggestList[id].keyword
        this.setData({searchValue:name})
        this.handSearchEnd()
    },
    //点击搜索时
    handSearchEnd(){
        getSearchSong(this.data.searchValue).then(res=>{
            this.setData({resultSongs:res.data.result.songs})
        })
    },
    handSetSongList(e){
        const index = e.currentTarget.dataset.index
        songStore.setState('playSongIndex',index)
        songStore.setState('playSongList',this.data.resultSongs)
    }
})