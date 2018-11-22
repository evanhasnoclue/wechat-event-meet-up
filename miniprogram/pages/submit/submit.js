const app = getApp()
const AV = require('../../utils/ av-weapp-min.js');
Page({
  takePhoto: function () {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        that.data.imageData = tempFilePaths
        that.setData(that.data)
        
        new AV.File('file-name', {
          blob: {
            uri: tempFilePaths[0],
          },
        }).save().then(
          file => console.log(file.url())
        ).catch(console.error);
      }
    })
  },

  previewMyImage: function (files) {
    console.log(files.currentTarget)
    console.log(this.data.imageData)
    wx.previewImage({
      current: files.currentTarget.id,  // number of index or file path
      urls: this.data.imageData  // Array of temp files
    })
  },
  data: {
    showTopTips: false,
  imageData:[],
    radioItems: [
      { name: 'cell standard', value: '0' },
      { name: 'cell standard', value: '1', checked: true }
    ],
    checkboxItems: [
      { name: 'standard is dealt for u.', value: '0', checked: true },
      { name: 'standard is dealicient for u.', value: '1' }
    ],

    date1: "2018-09-01",
    date2: "2018-09-10",
    time: "12:01",
    region: ['上海', '上海市', '静安区'],
    customItem: '全部',

    countryCodes: ["+86", "+80", "+84", "+87"],
    countryCodeIndex: 0,

    countries: ["中国", "美国", "英国"],
    countryIndex: 0,

    accounts: ["微信号", "QQ", "Email"],
    accountIndex: 0,

    isAgree: false
  },
  
  bindDateChange1: function (e) {
    this.setData({
      date1: e.detail.value
    })
  },
  bindDateChange2: function (e) {
    this.setData({
      date2: e.detail.value
    })
  },
  
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    var checkboxItems = this.data.checkboxItems, values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }

    this.setData({
      checkboxItems: checkboxItems
    });
  },
  
  onLoad: function() {

    wx.getStorage({
      key: 'current_user',
      success: (res) => {
        console.log(res),
          this.setData({
            user_id: res.data.id
          })
      }
    })
  },
   
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
   
  bindSubmit: function(e) {
    let page = this;
    console.log(e);
    console.log(this.data.user_id);
    wx.request({
      // url: 'http://localhost:3000/api/v1/events',
      url:'https://event-meet-up.herokuapp.com/api/v1/events',
      method: 'POST',
      data: {
        user_id: page.data.user_id,
        title: e.detail.value.title,
        address: e.detail.value.place,
        time: e.detail.value.time,
        description: e.detail.value.Description,
        deadline: e.detail.value.deadline,
        capacity: e.detail.value.capacity
      },
      success: (res) => {
        console.log(res)
        wx.redirectTo({
          url: '/pages/profile/profile',
        })
      }
    })
  }
});