// components/ShowGoodsList/ShowGoodsList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goodList:{
      type:Array,
      value:[]
    },
    isFresh:{
      type:Boolean,
      value:false
    },
    isLast:{
      type:Boolean,
      value:false
    },
  },

  options:{
    multipleSlots:true,
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
    // 实现上拉刷新样式
    scrollToLower(){
      // 发出父组件中的事件
      this.triggerEvent("scrollToLower");
    }
  }
})
