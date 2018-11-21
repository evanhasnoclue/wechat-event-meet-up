Page({
  data: {
    showTopTips: false,

    radioItems: [
      { name: 'cell standard', value: '0' },
      { name: 'cell standard', value: '1', checked: true }
    ],
    checkboxItems: [
      { name: 'standard is dealt for u.', value: '0', checked: true },
      { name: 'standard is dealicient for u.', value: '1' }
    ],

    date: "2016-09-01",
    time: "12:01",

    countryCodes: ["+86", "+80", "+84", "+87"],
    countryCodeIndex: 0,

    countries: ["中国", "美国", "英国"],
    countryIndex: 0,

    accounts: ["微信号", "QQ", "Email"],
    accountIndex: 0,

    isAgree: false
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
  
  
   
  bindSubmit: function(e) {
    console.log(e);
    wx.request({
      url: 'http://localhost:3000/api/v1/events',
      // url:'https://event-meet-up.herokuapp.com/api/v1/events',
      method: 'POST',
      data: e.detail.value,
      success: (res) => {
        console.log(res)
        wx.redirectTo({
          url: 'pages/profile/profile',
        })
      }
    })
  }
});