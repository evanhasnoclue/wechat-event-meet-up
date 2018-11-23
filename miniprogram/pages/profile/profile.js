var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
const {
  $Message
} = require('../../dist/base/index');



Page({
      data: {
        visible2: false,
        toggle: false,
        toggle2: false,
        actions2: [{
          name: '删除',
          color: '#ed3f14'
        }],
        actions: [{
            name: '删除',
            color: '#fff',
            fontsize: '20',
            width: 100,
            icon: 'like',
            background: '#ed3f14'
          }
          // ,
          // {
          //   name: '编辑',
          //   width: 100,
          //   color: '#80848f',
          //   fontsize: '20',
          //   icon: 'undo'
          // }
        ],
        actions2: [{
          name: '取消',
          color: '#fff',
          fontsize: '20',
          width: 100,
          icon: 'like',
          background: '#0099ff'
        }
        ],


        tabs: ["参加活动", "创建活动"],
        activeIndex: 1,
        sliderOffset: 0,
        sliderLeft: 0,


      },

      handleCancel2() {
        this.setData({
          visible2: false,
          toggle: this.data.toggle ? false : true
        });
        console.log(this.data.toggle, 111111111)
      },
      handleClickItem2() {
        const action = [...this.data.actions2];
        action[0].loading = true;

        this.setData({
          actions2: action
        });

        setTimeout(() => {
          action[0].loading = false;
          this.setData({
            visible2: false,
            actions2: action,
            toggle: this.data.toggle ? false : true
          });

        }, 2000);
      },
      handlerCloseButton() {
        this.setData({
          toggle2: this.data.toggle2 ? false : true
        });
      },
      actionsTap() {
        this.setData({
          visible2: true
        });
      },

      onLoad: function() {
        var that = this;
        wx.getStorage({
          key: 'current_user',
          success: (res) => {
            if (res.data.gender == "2") {
              res.data.gender = "女"
            }
            if (res.data.gender == "1") {
              res.data.gender = "男"
            }
            const profile = res.data;
            that.setData({
              profile: profile
            })
          }
        })

        wx.request({
          // url: "http://localhost:3000/api/v1/events",
          url: 'https://event-meet-up.herokuapp.com/api/v1/events',
          method: 'GET',
          success(res) {
            console.log(res);
            const voyages = res.data.events;

            // Update local data
            that.setData({
              voyages
            });
            console.log(voyages);

            // wx.hideToast();
          }
        });
        wx.getSystemInfo({
          success: function(res) {
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

      tabClick: function(e) {
        this.setData({
          sliderOffset: e.currentTarget.offsetLeft,
          activeIndex: e.currentTarget.id
        });
      },

      saveTel: function(data) {
        console.log('data', data)
        let tel = data.detail.value
        console.log('saveTel', tel)
      },
      
      buttonDelete: function(e) {
        console.log(e)
        wx.request({
            url: `https://event-meet-up.herokuapp.com/api/v1/events/${e.target.id}`,
            method: 'DELETE',
            success() {
              wx.switchTab({
                url: '/pages/events/events'
              });
            },
            fail: function (res) {
              wx.switchTab({
                url: '/pages/events/events'
              })
             },
          })
          },
  onShow: function() {
    this.onLoad();
  },
  cancelBooking: function (e) {
    console.log(e)
    wx.request({
      url: `https://event-meet-up.herokuapp.com/api/v1/events/${e.target.id}/bookings/${e.target.dataset.bookingid}`,
      method: 'DELETE',
      success() {
        wx.redirectTo({
          url: '/pages/events/events'
        });
      },
      fail: function (res) {
        wx.redirectTo({
          url: '/pages/events/events'
        })
      },
    })
  },

  showVoyage: function (e) {
    console.log(e.target)
    wx.navigateTo({
      url: `../show/show?id=${e.target.dataset.voyage.id}`,
    })}

      });

