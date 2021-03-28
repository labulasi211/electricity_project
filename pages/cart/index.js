// pages/cart/index.js

import {
  getSetting,
  chooseAddress,
  openSetting
} from "../../utils/asyncWx.js"
import regeneratorRuntime from "../../lib/runtime/runtime"


Page({

  data: {
    address: {},
    carts:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0,
  },

  onShow() {
    // 获取本地中缓存的地址信息
    const address = wx.getStorageSync("address");
    const carts=wx.getStorageSync("cart")||[];
    // const allChecked=carts.length?carts.every(v=>v.checked):false;
    // 当购物车没有物品时，全选不被选中
    let allChecked=carts.length?true:false;
    let totalPrice=0;
    let totalNum=0;
    // 计算总价格和总数量以及是否全选
    carts.forEach(element => {
      if(element.checked){
        totalNum+=element.num;
        totalPrice+=element.num*element.goods_price;
      }else{
        allChecked=false;
      }
    });
    this.setData({
      address,
      carts,
      allChecked,
      totalNum,
      totalPrice,
    });
  },

  // 获取用户收货地址
  async handleChooseAddress() {
    try {
      // 获取用户权限信息
      const res1 = await getSetting();
      console.log(res1);
      const scopeAddress = res1.authSetting["scope.address"];
      // 判断用户是否有权限，有则跳转获取地址api，否则跳转权限设置页面
      if (scopeAddress === false) {
        await openSetting();
      }
      // 获取收货地址信息
      let address = await chooseAddress();
      // 对地址进行一个拼接
      address.all = address.provinceName + address.cityName + address.countyName;
      this.setData({
        address,
      });
      // 存储到当地缓存中，以方便其他页面使用
      wx.setStorageSync("address", address);
    } catch (error) {
      console.log(error);
    }
  }

})