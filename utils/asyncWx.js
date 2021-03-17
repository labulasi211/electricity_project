// 用来处理异步请求操作

export const getSetting=()=>{
  return new Promise((resolve,reject)=>{
    wx.getSetting({
      success: (result)=>{
        resolve(result);
      },
      fail: (err)=>{},
    });
  })
}


export const chooseAddress=()=>{
  return new Promise((resolve,reject)=>{
    wx.chooseAddress({
      success: (result)=>{
        resolve(result);
      },
      fail: (err)=>{},
    });
  })
}



export const openSetting=()=>{
  return new Promise((resolve,reject)=>{
    wx.openSetting({
      success: (result)=>{
        resolve(result);
      },
      fail: (err)=>{},
    });
  })
}