// pages/map/map.js
let app = getApp()
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
    let that = this;
    let markers = [];
    let eventmk = [];
    wx.getLocation({
      type: 'GCJ-02', // **1
      success: function (res) {
        app.globalData.events.forEach((event, index) => {
          eventmk.push(event.id)
          markers.push({
            iconPath: "/images/marker.png", // **1
            id: index,
            latitude: event.latitude,
            longitude: event.longitude,
            width: 20,
            height: 20
          })
        });
        console.log(111, markers)
        console.log(112,eventmk)
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        that.setData({ latitude:latitude,
           longitude:longitude, speed:speed,
           accuracy:accuracy,
          scale: 12,
          mk: markers,
          eventmk: eventmk,
          events: app.globalData.events
          //   {
          //   iconPath: "/images/marker.png", // **1
          //   id: 0,
          //   latitude: 22,
          //   longitude: 114,
          //   width: 40,
          //   height: 40
          // }
          })
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

    markertap(e) {
      // console.log(this.data.eventmk)
      // console.log(e.markerId)
      let eventid = this.data.eventmk[e.markerId]
      // console.log(eventid)
      // console.log(116, app.globalData.events)
      let event = app.globalData.events.find ( e => e.id === eventid )
      console.log(117, event)
      console.log(118, event.title)
      wx.showModal({
        title: `${event.title}`,
        content: `${event.description}`,
        confirmText: "Details",
        cancelText: "Later",
        success(res) {
          if (res.confirm) {
            console.log('user confirmed')
            wx.navigateTo({
              url: `../show/show?id=${event.id}`
            });
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
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
  showEvent(e) {
    const data = e.currentTarget.dataset;
    const event = data.event;
    console.log(event);
    wx.navigateTo({
      url: `../show/show?id=${event.id}`
    });
  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})