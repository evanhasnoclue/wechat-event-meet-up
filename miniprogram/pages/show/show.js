// pages/show/show.js
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let page = this;
    // console.log(1, options);
    wx.request({
      url: 'http://localhost:3000/api/v1/events/' + options.id,
      method: 'GET',
      success: (res) => {
        page.setData({user_id: 0, data: res.data})
      }
    });
    wx.getStorage({
      key: 'current_user',
      success(res) {
        page.user_id = res.data.id
        console.log(12, page.user_id)
      }
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },
  createBooking: function () {
    let page = this;
    // console.log(3, e);
    const event_id = page.data.data.id;
    const user_id = page.user_id;
    // const url = `http://localhost:3000/api/v1/events/${event_id}/bookings`;
    const url = `https://event-meet-up.herokuapp.com/api/v1/events/${event_id}/bookings`;
    wx.request({
      url: url,
      method: 'POST',
      data: {
        user_id: user_id,
      },
      success: (res) => {
        wx.switchTab({
          url: '/pages/profile/profile',
        })
      }
    })
  }
})