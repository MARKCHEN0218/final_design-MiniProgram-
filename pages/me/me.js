// pages/me/me.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo_avatar: "userinfo-avatar-boy",
    user_avatar_url:null,
    usersex:null,
    username:null,
    userId:null,
    userposition:null,
    whethershow:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userposition:app.globalData.userInfo.position,
    })
    if(this.data.userposition!="普通员工"){
      this.setData({
        whethershow:true,
        userinfo_avatar:app.globalData.userinfo_avatar,
        usersex:app.globalData.userInfo.sex,
        username:app.globalData.userInfo.name,
        userId:app.globalData.userInfo.id,
        user_avatar_url:app.globalData.userInfo.profile
      })
    }
    else{
      this.setData({
        whethershow:false,
        userinfo_avatar:app.globalData.userinfo_avatar,
        usersex:app.globalData.userInfo.sex,
        username:app.globalData.userInfo.name,
        userId:app.globalData.userInfo.id,
        user_avatar_url:app.globalData.userInfo.profile
      })
    }
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
  tranport_managefriends(){
    wx.navigateTo({
      url: '../managefriends/managefriends',
    })
  },
  tranport_manageactivity(){
    wx.navigateTo({
      url: '../manageactivities/manageactivities',
    })
  },
  tranport_manageregister(){
    wx.navigateTo({
      url: '../authority/authority',
    })
  },
  tranport_postactivity(){
    wx.navigateTo({
      url: '../postactivities/postactivities',
    })
  },
  tranport_attendenceOtherPerson(){
    wx.navigateTo({
      url: '../attendenceOtherPerson/attendenceOtherPerson',
    })
  }
})