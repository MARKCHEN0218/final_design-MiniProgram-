//app.js
App({
  onLaunch: function () {
    var that= this;
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({//发送code到服务器
            url: that.globalData.ip_Location+'/toLogin',//调用第三方服务器换取openid
            header: {
              'content-type': 'application/json' // 默认值
            },
            method: "POST",
            data: {
              code: res.code
            },
            success: function (res) {
              console.log("success");
              that.globalData.statusCode=res.data.state;
              that.globalData.openId=res.data.openid;
            },
            fail: function () {
              wx.showToast({
                title: '网络连接失败',
                icon: 'none'
              })
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    statusCode:null,
    openId:null,
    userinfo_avatar:null,
    clickedFlockInfo:null,
    selectedPersons:null,
    ClickedUserInfo:null,//群聊中所点击人员的信息
    selectedPageID:null,//有两个选择多人的页，要区分是哪个页，0为addchating，1为活动发布页
    attendancePageID:null,//员工搜索自己的考勤考勤信息为0，搜索他人的考勤信息为1
    searchAttendanceInfo:null,
    searchPersonInfo:null,//所要查询员工信息
    ip_Location:"http://192.168.0.198:18080",
    businessWifiBssidCode:"cc:2d:21:55:9a:f5",
    businessWifiSsidCode:"CYJ-2805-5G",
  }
})