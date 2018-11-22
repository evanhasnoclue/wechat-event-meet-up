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

  },


  bindSubmit: function(e) {
    console.log(e);
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