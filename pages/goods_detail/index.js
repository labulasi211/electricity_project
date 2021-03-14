import {request} from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{},
    // 记录该商品购物车中的数量
    cartNum:0,
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
      goodsObj:{
        goods_id:res.goods_id,
        goods_name:res.goods_name,
        goods_price:res.goods_price,
        // 关于兼容性问题需要对文本进行一些修改
        goods_introduce:res.goods_introduce.replace(/.webp/g,".jpg"),
        pics:res.pics,
      },
    });
    this.getCartNum();
  },

  // 图片预览
  handlePreviewImage(e){
    // console.log(e);
    // 当前点击图片的位置
    const {index}=e.currentTarget.dataset;
    wx.previewImage({
      current: this.data.goodsObj.pics[index].pics_big,
      urls: this.data.goodsObj.pics.map(v=>v.pics_big),
    })
  },

  // 加入购物车
  handleCartAdd(){
    // 获取本地缓存购物车数据
    let cart=wx.getStorageSync("cart")||[];
    // 判断该商品是否有在购物车里
    let index=cart.findIndex(v=>v.goods_id===this.data.goodsObj.goods_id);
    console.log(index);
    if(index===-1){
      // 没有该商品，将该商品加入购物车
      cart.push({num:1,...this.data.goodsObj});
      index=cart.length-1;
    }else{
      // 有，则商品数量+1
      cart[index].num++;
    }
    // 修改页面商品购物车数量
    this.setData({
      cartNum:cart[index].num,
    });
    // 本地缓存
    wx.setStorageSync("cart", cart);
    // 提示
    wx.showToast({
      title: '加入购物车成功',
      icon: 'success',
      duration: 1500,
      mask: true
    });
  },

  // 获取该商品购物车中的数量
  getCartNum(){
    // 获取本地缓存购物车数据
    let cart=wx.getStorageSync("cart")||[];
    // 判断该商品是否有在购物车里
    let index=cart.findIndex(v=>v.goods_id===this.data.goodsObj.goods_id);
    if(index!==-1){
      this.setData({
        cartNum:cart[index].num,
      })
    } 
  }
})