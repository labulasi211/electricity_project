import {
  request
} from "../../request/index.js";

//Page Object
Page({
  data: {
    //轮播图数组
    swiperList: [
      "https://img.imgdb.cn/item/602284a73ffa7d37b33b1417.png",
      "https://img.imgdb.cn/item/602285703ffa7d37b33b719c.png",
      "https://img.imgdb.cn/item/6022858d3ffa7d37b33b8034.png"
    ],
    catesList: [],
    floorList: []
  },
  //options(Object)
  onLoad: function (options) {

    this.getSwiperList();
    this.getCateList();
    this.getFloorList();

  },

  //通过异步请求获取轮播图数据,由于这些数据在手机上无法使用所以这里也就只是用于学习
  getSwiperList() {
    request({
        url: '/home/swiperdata'
      })
      .then(result => {
        this.setData({
          swiperList: result
        })
      })
  },

  // 获取分类导航标签数据
  getCateList() {
    request({
        url: '/home/catitems'
      })
      .then(result => {
        this.setData({
          catesList: result
        })
      })
  },

  getFloorList() {
    request({
        url: '/home/floordata'
      })
      .then(result => {
        this.setData({
          floorList: result
        })
      })
  },
});