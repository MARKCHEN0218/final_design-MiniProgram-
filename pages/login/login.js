// pages/login/login.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:"",
    userpassword:"",
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  setdata_username(e){
    this.setData({
      username: e.detail.detail.value,
    })
  },
  setdata_userpassword(e){
    this.setData({
      userpassword: e.detail.detail.value,
    })
  },
  getUserInfo: function (e) {
    var str = e.detail.errMsg;
    var reg = RegExp(/ok/);
    if (str.match(reg)) {
      app.globalData.userInfo = e.detail.userInfo;
      if (e.detail.userInfo.gender != 1) {
        app.globalData.userinfo_avatar = "userinfo-avatar-girl"
      }
      else{
        app.globalData.userinfo_avatar= "userinfo-avatar-boy"
      }
    }
  },
  getUserInfo_1: function (e) {
    var str = e.detail.errMsg;
    var reg = RegExp(/ok/);
    if (str.match(reg)) {
      app.globalData.userInfo = e.detail.userInfo;
      if (e.detail.userInfo.gender != 1) {
        app.globalData.userinfo_avatar = "userinfo-avatar-girl"
      }
      else {
        app.globalData.userinfo_avatar = "userinfo-avatar-boy"
      }
    }
  },
  check_UserPassword(){
    var that = this; 
    if(this.data.username==""||this.data.userpassword==""){
      wx.showToast({
        title: '对不起，您未输入您的用户名或密码',
        icon: 'none'
      })
    }
    else{
      wx.request({
        url: app.globalData.ip_Location+'/LOGIN/'+app.globalData.openId,
        header: {
          'content-type': 'application/json' // 默认值
        },
        data: {
          userName: that.data.username,
          userPassword: that.data.userpassword,
        },
        method: 'POST', 
        success: function(res){
          console.log(res.data);
          if(res.data=="您的账号还未被审核，请等待"){
            wx.showToast({
              title: '您的账号还未被审核，请等待',
              icon:"none"
            })
          }
          else if(res.data=="您的账号或密码输入错误，请重新输入"){
            wx.showToast({
              title: '您的账号或密码输入错误，请重新输入',
              icon:"none"
            })
          }
          else if(res.data=="成功"){
            wx.request({
              url: app.globalData.ip_Location+"/getUserInfo/"+app.globalData.openId,
              method: 'POST', 
              success: function(res){
                app.globalData.userInfo=res.data;
                console.log(res.data);
                if(res.data.sex=="男"){
                  app.globalData.userinfo_avatar="userinfo-avatar-boy";
                  wx.switchTab({
                    url: '../index/index',
                  })
                }
                else{
                  app.globalData.userinfo_avatar="userinfo-avatar-girl";
                  wx.switchTab({
                    url: '../index/index',
                  })
                }
              },
              fail: function() {
                wx.showToast({
                  title: '获取用户信息失败,请稍后重试',
                  icon: 'none'
                })
              }
            })
          }
        },
        fail: function() {
          wx.showToast({
            title: '网络连接失败',
            icon: 'none'
          })
        },
      })
    }
  },
  check_Whether_Register(){
    if(app.globalData.openId != null){
      wx.request({
        url: app.globalData.ip_Location+'/Register/'+app.globalData.openId,
        method: 'POST', 
        success: function(res){
          console.log(res.data);
          if(res.data=="UnRegistered"){
            wx.navigateTo({
              url: '../register/register',
            })
          }
          else if(res.data=="Registered"){
            wx.showToast({
              title: '您已注册，请直接登录或等待审核',
              icon: 'none'
            })
          }
        },
        fail: function() {
          wx.showToast({
            title: '网络连接失败',
            icon: 'none'
          })
        }
      })
    }
  }
})