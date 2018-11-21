//app.js
App({
  onLaunch: function () {
    console.log('processing to login')
    wx.login({
      success: (res) => {
        console.log(res)
        wx.request({
          url: 'http://localhost:3000/api/v1/login',
          // url: 'https://event-meet-up.herokuapp.com/api/v1/login',
          method: "POST",
          data: {code: res.code},
          success: (res) => {
            console.log(res)
            wx.setStorage({
              key: 'open_id',
              data: res.data.userId
            })
          }
        })
        // insert next code here
      }
    })
    

    this.globalData = {}
  }
})
