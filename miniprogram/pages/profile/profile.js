var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["参加活动", "创建活动"],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,

     
  },
  onLoad: function () {
    var that = this;
    wx.getStorage({
      key: 'current_user',
      success: (res) => {
        if (res.data.gender=="2")
          {res.data.gender="女"}
        if (res.data.gender=="1")
          {res.data.gender="男"}
        const profile = res.data;
        that.setData({profile:profile})
        console.log(profile)
      }
    })

    wx.request({
     // url: "http://localhost:3000/api/v1/events",
      url: 'https://event-meet-up.herokuapp.com/api/v1/events',
      method: 'GET',
      success(res) {
        const voyages = res.data.events;

        // Update local data
        that.setData({
          voyages
        });

        // wx.hideToast();
      }
    });
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
 
 onCreate: function(e) {
   wx.redirectTo({
     url: '/pages/submit/submit',
   })
 },

  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  }
});