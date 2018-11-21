// pages/events/events.js
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
    wx.showToast({
      title: 'Updating',
      icon: 'success',
      duration: 3000
    });
    const page = this;
    // Update local data
    wx.request({
      url: 'http://localhost:3000/api/v1/events',
      success(res) {
        page.setData(res.data),
        console.log(page.data.events[0])
      }
    })
  },
  onCreate: function (e) {
    wx.redirectTo({
      url: '/pages/submit/submit',
    })
  },

  showEvent(e) {
      const data = e.currentTarget.dataset;
      const event = data.event;
      console.log(event);
  wx.navigateTo({
    url: `../show/show?id=${event.id}`
  });
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