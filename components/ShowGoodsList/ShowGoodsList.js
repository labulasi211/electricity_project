// components/ShowGoodsList/ShowGoodsList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goodList:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 下一页加载标志符
    isLowerFresh:false,
    // 是否是最后一页标识符
    isLast:false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 实现上拉刷新样式
    scrollToLower(){
      this.setData({
        isLowerFresh:true,
      })
      // 发出父组件中的事件
      this.triggerEvent("scrollToLower");
    }
  }
})
