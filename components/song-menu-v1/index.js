// components/song-menu-v1/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        itemList:{
            type:Array,
            value:[]
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
        click(e){
            this.triggerEvent("click",{"id":e.currentTarget.dataset.id})
        }
    }
})
