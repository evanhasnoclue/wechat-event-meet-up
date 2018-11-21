var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["参加活动", "创建活动"],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,

        events: [
      {
        "id": 1,
        "name": "千山暮雪",
        "address": "Mountain in the sky",
        "description": "10 people",
            "image": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542739924254&di=4ae05d50ed7728e5418d4de76c825be4&imgtype=0&src=http%3A%2F%2Fupload.silkroad.news.cn%2F2016%2F0503%2F1462258629284.jpeg%3F2.876884648576379"
      },
      {
        "id": 2,
        "name": "田园新村",
        "address": "90 TIANYUAN ZHENG",
        "description": "7 people",
        "image": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542740184807&di=f5c01bab74135bb26af9d9389876676b&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fphotoblog%2F9%2F8%2F5%2F2%2F9852516%2F20099%2F23%2F1253692479358_mthumb.jpg"
      },
      {
        "id": 3,
        "name": "极地风光",
        "address": "EXTREME EAST",
        "description": "30 people",
        "image": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542740351323&di=ee066573469d05cf2de1c4c02076e626&imgtype=0&src=http%3A%2F%2Fwww.114chn.com%2Fn%2Fntradehtml%2F110000%2F2977%2Fpic%2Fb93c006bd32b4aa994b65d139da8f8ea0.jpg"
      },
      {
        "id": 4,
        "name": "樱花烂漫时",
        "address": "FlOWER ZONE",
        "description": "20 people",
        "image": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543335185&di=4cdc7cdbb52812ab477aa44ae9c37860&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.9salon.cn%2Fupload%2Fimg%2F8NDehdRLxoGw3hfPpivZM5jtbIAUoKxIrWBiX3AEWw1WSpfzWn56OA%2FBOO6Yr3flb7HMSlbBhoAkDAk0nhQzD4th4XrB4f0yAIoFUktt8Sqg5Y0Rm5dq2TzqFQhe.jpg"
      }
    ]
  },
  onLoad: function () {
    var that = this;
    wx.getStorage({
      key: 'current_user',
      success: (res) => {
        const profile = res.data;
        that.setData({profile:profile})
        console.log(profile)
      }
    })
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
     url: 'pages/submit/submit',
   })
 },

  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  }
});