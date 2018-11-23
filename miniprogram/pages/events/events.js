// pages/events/events.js
let app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    region: [],
    customItem: 'All',
    date: '',
    time: '',
    filter: "Select Region"
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    wx.showToast({
      title: 'Updating',
      icon: 'success',
      duration: 3000
    });
    const page = this;
    // Update local data
    wx.request({
      // url: 'http://localhost:3000/api/v1/events',
      url: 'https://event-meet-up.herokuapp.com/api/v1/events',
      success(res) {
        console.log(111, res.data)
        page.setData({events:res.data.events.reverse()})
        // console.log(page.events)
        //   console.log(12, page.data),
        // console.log(13, page.data.events),
        app.globalData.events = page.data.events,
          console.log(11, res.data),
          console.log(14, app.globalData)
        console.log(page.data.events[0])
      }
    })
  },

  onCreate: function(e) {
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
  onMap() {
    wx.navigateTo({
      url: '/pages/map/map'
    });
  },

  bindSearch: function(e) {

  },
  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function(options) {
    this.onLoad(options);
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function() {

  },

  bindRegionChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      region: e.detail.value,
      filter: e.detail.value.join("-")
    });
    wx.showToast({
      title: 'Updating',
      icon: 'success',
      duration: 3000
    });
    const page = this;
    let region = page.data.region;
    for (var i = region.length - 1; i > -1; i--) {
      if (region[i] === "All") {
        region.splice(i, 1);
      }
    };
    let region_s = region.join();
    console.log(101, region_s);
    // Update local data
    wx.request({
      // url: 'http://localhost:3000/api/v1/tagged?tag='+region_s,
      url: 'https://event-meet-up.herokuapp.com/api/v1/tagged?tag='+region_s,
      success(res) {
        console.log(111, res.data)
        page.setData(res.data)
        // console.log(page.events)
        //   console.log(12, page.data),
        // console.log(13, page.data.events),
        app.globalData.events = page.data.events,
          console.log(11, res.data),
          console.log(14, app.globalData)
        console.log(page.data.events[0])
      }
    })
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  }
})
