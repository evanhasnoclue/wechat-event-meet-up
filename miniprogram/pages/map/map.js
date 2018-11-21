// pages/map/map.js
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
    let that = this
    wx.getLocation({
      type: 'GCJ-02', // **1
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        that.setData({ latitude:latitude,
           longitude:longitude, speed:speed,
           accuracy:accuracy,
          scale: 12,
          mk: [] })
        //   wx.openLocation({
        //     latitude: latitude,
        //     longitude: longitude,
        //     scale: 28
        // })
      }
    })
    console.log(22, that.data)
   
    // wx.chooseLocation({
    //   success: function (res) {
    //     console.log(res)
    //   }
    // })
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