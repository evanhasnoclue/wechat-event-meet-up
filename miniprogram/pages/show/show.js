// pages/show/show.js
Page({

  /**
   * Page initial data
   */
  data: {
    joined: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log("loading");
    console.log(options);
    let page = this;
    let current_user = 0;
    wx.getStorage({
      key: 'current_user',
      success(res) {
        console.log(res)
        current_user = res.data.id
        console.log(12, current_user)
      }
    });
    // console.log(1, options);
    wx.request({
      url: 'https://event-meet-up.herokuapp.com/api/v1/events/' + options.id,
      // url: 'http://localhost:3000/api/v1/events/' + options.id,
      method: 'GET',
      success: (res) => {
        page.setData({user_id: current_user, data: res.data});
        res.data.bookings.forEach((booking) => {
          if (booking.user.id==current_user) {
            page.setData({joined: true, booking: booking});
          }
        });
      }
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

  },
  createBooking: function () {
    let page = this;
    // console.log(3, e);
    const event_id = page.data.data.id;
    const user_id = page.data.user_id;
    console.log(20, user_id);
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
  },
  comment() {
    // const data = e.currentTarget.dataset;
    // const event = data.event;
    // console.log(event);
    let booked_user = [];
    this.data.data.bookings.forEach((i) => {
      booked_user.push(i.user.id)
    });
    console.log(15, booked_user);
    console.log(13, this.data);
    console.log(14, this.data.user_id);
    if (booked_user.includes(this.data.user_id)) {
      wx.redirectTo({
        url: `/pages/review/review?booking_id=${this.data.booking.id}&event_id=${this.data.data.id}`,
      })}
    else {
      console.log("user not joined yet")
    }
  },
  cancelBooking: function() {
    const booking_id = this.data.booking.id;
    const event_id = this.data.id;
    wx.request({
      url: `https://event-meet-up.herokuapp.com/api/v1/events/${event_id}/bookings/${booking_id}`,
      method: 'DELETE',
      success() {
        wx.switchTab({
          url: '/pages/profile/profile'
        });
      }
    })
  },

  deleteEvent: function() {
    const event_id = this.data.id;
    wx.request({
      url: `https://event-meet-up.herokuapp.com/api/v1/events/${event_id}`,
      method: 'DELETE',
      success() {
        wx.switchTab({
          url: '/pages/events/events'
        });
      }
    })
  }
})