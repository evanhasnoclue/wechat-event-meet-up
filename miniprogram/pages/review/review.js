// pages/review/review.js
Page({

  /**
   * Page initial data
   */
  data: {
    stars: [0,1,2,3,4,5],
    starIndex: 5,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log(options);
    const booking_id = parseInt(options.booking_id);
    const event_id = parseInt(options.event_id);
    this.setData({
      booking_id: booking_id,
      event_id: event_id
    });
    console.log('thisdata', this.data);
    let page = this;
    wx.request({
      url: 'https://event-meet-up.herokuapp.com/api/v1/events/' + page.data.event_id,
      method: 'GET',
      success: (res) => {
        console.log(res);
        page.setData({
          event: res.data
        });
      }
    })
  },


  bindSubmit: function(e) {
    console.log(e);
    let page = this;
    wx.request({
      url: `https://event-meet-up.herokuapp.com/api/v1/bookings/${page.data.booking_id}/reviews`,
      method: 'POST',
      data: {
        title: e.detail.value.title,
        rating: e.detail.value.rating,
        content: e.detail.value.Description
      },
      success: (res) => {
        console.log(res);
        wx.redirectTo({
          url: '/pages/profile/profile'
        })
      }
    })
  },

  bindStarChange: function (e) {
    console.log('picker star 发生选择改变，携带值为', e.detail.value);

    this.setData({
      starIndex: e.detail.value
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

  }
})