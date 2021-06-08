// pages/addchating/addchating.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo_profile: "userinfo-avatar-boy",
    year: null,
    month: null,
    day: null,
    hour: null,
    minute: null,
    user_position: null,
    user_name: null,
    user_profile: null,
    flockName: null,
    postperson:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userinfo_profile: app.globalData.userinfo_avatar,
      user_position: app.globalData.userInfo.position,
      user_name: app.globalData.userInfo.name,
      user_profile: app.globalData.userInfo.profile,
    })
    var that = this;
    wx.request({
      url: app.globalData.ip_Location + '/searchPerson/' + app.globalData.userInfo.id,
      method: 'POST', 
      success: function(res){
        that.setData({
          postperson : res.data,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var date = new Date();
    var temp_hour = date.getHours();
    if (temp_hour < 10) {
      temp_hour = "0" + temp_hour;
    }
    var temp_minutes = date.getMinutes();
    if (temp_minutes < 10) {
      temp_minutes = "0" + temp_minutes;
    }
    this.setData({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hour: temp_hour,
      minute: temp_minutes
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  transport_selectperson() {
    app.globalData.selectedPageID = 0;
    wx.navigateTo({
      url: '../selectperson/selectperson',
    })
  },
  getFlockName(e) {
    this.setData({
      flockName: e.detail.value,
    })
  },
  postFlockInfo() {
    var that = this;
    if (app.globalData.selectedPersons!=null && app.globalData.selectedPageID == 0) {
      var length = app.globalData.selectedPersons.length;
      if (this.data.flockName != null) {
        var categorytemp;
        if (length > 1) {
          categorytemp = "multiperson";
        }
        else {
          categorytemp = "personal";
        }
        var employeestemp = (app.globalData.selectedPersons).push(that.data.postperson);//将自己加入到List中
        wx.request({
          url: app.globalData.ip_Location + '/postFlockInfo',
          data: {
            messages: null,
            employees: app.globalData.selectedPersons,
            flockName: that.data.flockName,
            category: categorytemp,
          },
          method: 'POST',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            if (res.data == "success") {
              wx.showToast({
                title: "新建群聊成功",
                icon: "none"
              })
            }
            else {
              wx.showToast({
                title: "新建群聊失败",
                icon: "none"
              })
            }
          }
        })
      }
      else {
        wx.showToast({
          title: "您输入的群名为空，发送建群请求失败",
          icon: "none"
        })
      }
    }
    else{
      wx.showToast({
        title: "您未选择任何人员，发送建群请求失败",
        icon: "none"
      })
    }
  }
})