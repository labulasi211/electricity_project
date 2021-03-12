import {
  request
}
from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime"

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
    ],
    goodsList:[],
    // 刷新标识符
    isFresh:false,
    // 是否是最后一页标识符
    isLast:false,
  },

  // 商品列表需要的参数
  QueryParam:{
    query:'',
    cid:'',
    pagenum:1,
    pagesize:10
  },

  // 商品总页数
  TotalPages:1,

  onLoad: function (options) {
    this.QueryParam.cid=options.cid;
    this.getGoodsList();
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
  },

  // 获取商品列表数据
  async getGoodsList(){
    // 设置标识符表示发送中
    this.setData({isFresh:true});
    const res=await request({url:'/goods/search',data:this.QueryParam})
    // console.log(res);
    // 动态的获取总商品数
    this.setData({isFresh:false});
    const total=res.total;
    // 确定总页数
    this.TotalPages=Math.ceil(total/this.QueryParam.pagesize);
    this.setData({
      goodsList:[...this.data.goodsList,...res.goods],
    })
  },

  // 下拉触底 加载下一页
  scrollToLower(){
    // console.log("触底");
    if(this.TotalPages<=this.QueryParam.pagenum){
      // 当前已是最后一页
      this.setData({isLast:true});
    }
    else{
      this.QueryParam.pagenum++;
      // console.log("加载下一页");
      this.getGoodsList();
    }
  }
})