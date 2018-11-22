//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: ''
  },

onLoad: function() {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      wx.getStorage({
        key: 'open_id',
        success: (res) => {
          const user_data = {
            name: e.detail.userInfo.nickName,
            wechat_id: res.data,
            avatar: e.detail.userInfo.avatarUrl,
            gender: e.detail.userInfo.gender,
            city: e.detail.userInfo.city,
            province: e.detail.userInfo.province,
            country: e.detail.userInfo.country
          };
          wx.request({
            // url: 'http://localhost:3000/api/v1/users',
             url: 'https://event-meet-up.herokuapp.com/api/v1/users',
            method: 'POST',
            data: {user_data: user_data},
            success: (res) => {
              console.log(res);
              wx.setStorage({
                key: 'current_user',
                data: res.data,
              });
              wx.switchTab({
                url: '/pages/events/events',
              })
            }
          })
        }
      })
    }

  },

        

})
