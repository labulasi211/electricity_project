import {request} from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    const {goods_id}=options;
    this.getGoodsDetail(goods_id);
  },

  // 获取商品详情信息
  async getGoodsDetail(goods_id){
    // 发送请求
    const res = await request({url:"/goods/detail",data:{goods_id}});
    this.setData({
      goodsObj:res,
    })
  }
})