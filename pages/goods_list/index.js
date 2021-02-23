// pages/goods_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        name:"综合",
        isActive:true
      },
      {
        id:1,
        name:"销量",
        isActive:false
      },
      {
        id:2,
        name:"价格",
        isActive:false
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
  },
  // 自定义组件tabs中的点击事件
  handleTabsItemChange(e){
    // console.log(e);
    const {index}=e.detail;
    // 对原数据进行修改
    let {tabs}=this.data;
    tabs.forEach((v,i)=>v.id===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })
  }
})