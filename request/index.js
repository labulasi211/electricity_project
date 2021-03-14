// 通过 Promise 来实现一些可能存在的异步请求,用于避免回调地狱
// 添加异步请求代码次数用来判断加载图标的显示与隐藏
let ajaxTimes=0;
export const request = (params) => {
  // 显示加载图标
  wx.showLoading({
    title: "加载中",
    mask: true
  });
  ajaxTimes++;
  // 定义公共的url
  const baseUrl="https://api-hmugo-web.itheima.net/api/public/v1"
  return new Promise((resolve, reject) => {
    wx.request({
      // 使用公共url之后就不需要对param进行扩张
      ...params,
      url:baseUrl+params.url,
      success: (result) => {
        resolve(result.data.message);
      },
      fail: (err) => {
        reject(err);
      },
      complete:()=>{
        if(!--ajaxTimes){
          wx.hideLoading();
        }
      }
    });
  })
}