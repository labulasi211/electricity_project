//Page Object
Page({
  data: {
    //轮播图数组
    swiperList:[
      "https://img.imgdb.cn/item/602284a73ffa7d37b33b1417.png",
      "https://img.imgdb.cn/item/602285703ffa7d37b33b719c.png",
      "https://img.imgdb.cn/item/6022858d3ffa7d37b33b8034.png"
    ],
  },
  //options(Object)
  onLoad: function(options){
    //通过异步请求获取轮播图数据,由于这些数据在手机上无法使用所以这里也就只是用于学习
    var reqTask = wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      success: (result)=>{
        console.log(result);
        this.setData({
          // 防止修改
          // swiperList:result.data.message,
        })
      }
    });
  },
});