import {
  request
}
from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime"

Page({

  data: {
    // 左侧菜单数据
    leftMenuList: [],
    // 右侧商品分类数据
    rightContentList: [],
    // 当前选中的菜单
    currentIndex: 0,
    // 设置右侧滚筒条初始位置
    scrollTop: 0,
  },

  Cates: [],

  onLoad: function (options) {
    // this.getCates();
    // 1 先判断本地存储中有没有旧的数据
    // 2 如果没有旧的数据则发送请求获取数据
    // 3 如果有旧的数据并且没有过期，则直接使用本地数据

    // 获取本地存储的数据 （小程序中自带本地存储的技术）
    const Cates = wx.getStorageSync("cates");
    // 判断
    if (!Cates) {
      // 不存在本地数据，则发送请求
      this.getCates();
    } else {
      // 本地中储存着之前发过来的数据
      if (Date.now() - Cates.time > 1000 * 10) {
        // 数据已过期  定义有效时间为10s
        this.getCates();
      } else {
        this.Cates = Cates.data;
      }
      // 构造左侧的菜单数据
      let leftMenuList = this.Cates.map(v => v.cat_name);
      // 构造右侧的商品分类数据
      let rightContentList = this.Cates[0].children;
      this.setData({
        leftMenuList,
        rightContentList,
      })
    }
  },

  // 获取分类数据
  async getCates() {
    // request({
    //     url: "/categories"
    //   })
    //   .then(res => {
    //     console.log(res);
    //     this.Cates = res.data.message;

    //     // 将数据存储到本地
    //     wx.setStorageSync("cates", {
    //       time: Date.now(),
    //       data: this.Cates
    //     });

    //     // 构造左侧的菜单数据
    //     let leftMenuList = this.Cates.map(v => v.cat_name);
    //     // 构造右侧的商品分类数据
    //     let rightContentList = this.Cates[0].children;
    //     this.setData({
    //       leftMenuList,
    //       rightContentList,
    //     })
    //   })

    // 使用es7的async await来发送异步请求
    const res = await request({
      url: "/categories"
    });
    console.log(res);
    this.Cates = res;
    // 将数据存储到本地
    wx.setStorageSync("cates", {
      time: Date.now(),
      data: this.Cates
    })
    // 构造左侧的菜单数据
    let leftMenuList = this.Cates.map(v => v.cat_name);
    // 构造右侧的商品分类数据
    let rightContentList = this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightContentList,
    })
  },

  // 左侧菜单点击事件
  handleItemTap(e) {
    console.log(e);
    const {
      index
    } = e.currentTarget.dataset;
    // console.log(index);
    // 构造右侧的商品分类数据
    let rightContentList = this.Cates[index].children;
    // 修改索引值
    let currentIndex = index;
    this.setData({
      currentIndex,
      rightContentList,
      // 在右侧菜单刷新时，滚动条位置也需要跟着刷新，所以需要对scrollTop重新幅值
      scrollTop: 0,
    })
  },
})