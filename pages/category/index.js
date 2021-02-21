import {
  request
}
from "../../request/index.js";

Page({

  data: {
    // 左侧菜单数据
    leftMenuList:[],
    // 右侧商品分类数据
    rightContentList:[],
    // 当前选中的菜单
    currentIndex:0,
  },

  Cates:[],

  onLoad: function (options) {
    this.getCates();
  },

  // 获取分类数据
  getCates() {
    request({
        url: "https://api-hmugo-web.itheima.net/api/public/v1/categories"
      })
      .then(res => {
        console.log(res);
        this.Cates=res.data.message;
        // 构造左侧的菜单数据
        let leftMenuList=this.Cates.map(v=>v.cat_name);
        // 构造右侧的商品分类数据
        let rightContentList=this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContentList,
        })
      })
  }
})