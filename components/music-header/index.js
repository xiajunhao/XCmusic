// components/music-header/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        titleTxt:{
            type:String,
            value:""
        },
        rightTxt:{
            type:String,
            value:"更多"
        },
        isShow:{
            type:Boolean,
            value:true
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
        clickMore(){
            this.triggerEvent("click",3)
        }
    }
})
