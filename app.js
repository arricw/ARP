// app.js
App({
  onLaunch() {
    // 展示本地存储能力
      const logs = wx.getStorageSync('logs') || []
      logs.unshift(Date.now())
      wx.setStorageSync('logs', logs)

      // 登录
      wx.login({
          success: res => {
              if (res.code) {
                  // 发送 res.code 到后台换取 openId, sessionKey, unionId
                  wx.request({
                      url: 'http://localhost:3000/login', // 后端登录接口地址
                      method: 'POST',
                      data: {
                          code: res.code
                      },
                      success: (result) => {
                          if (result.data.success) {
                              console.log('登录成功，获取到的用户信息：', result.data.userInfo);
                              this.globalData.userInfo = result.data.userInfo;
                          } else {
                              console.error('登录失败：', result.data.message);
                          }
                      },
                      fail: (err) => {
                          console.error('请求后端登录接口失败：', err);
                      }
                  });
              } else {
                  console.error('登录失败！' + res.errMsg);
              }
          }
      })
  },
  globalData: {
      userInfo: null
  }
})