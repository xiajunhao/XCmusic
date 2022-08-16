// components/nav-bar/index.js
Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多 slot 支持
    },
    properties: {
        statusBarHeight:{
            type:String,
            value:""
        },
        title:{
            type:String,
            value:"默认标题"
        }
    },
    lifetimes:{
        ready(){
            let info = wx.getSystemInfoSync()
            this.setData({"statusBarHeight":info.statusBarHeight})
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
        goBack(){
            wx.navigateBack()
        }
    }
})
