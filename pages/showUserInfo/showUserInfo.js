// pages/showUserInfo/showUserInfo.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo_avatar: "userinfo-avatar-boy",
    usersex:null,
    userposition:null,
    username:null,
    emailAddress:null,
    workId:null,
    teleNumber:null,
    whetherMyfriend:null,
    userAvatarUrl:null,
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
    if(app.globalData.ClickedUserInfo.sex=="男"){
      this.setData({
        userinfo_avatar: "userinfo-avatar-boy",
        usersex:app.globalData.ClickedUserInfo.sex,
        userposition:app.globalData.ClickedUserInfo.jobStatus,
        username:app.globalData.ClickedUserInfo.surname,
        emailAddress:app.globalData.ClickedUserInfo.email,
        workId:app.globalData.ClickedUserInfo.id,
        teleNumber:app.globalData.ClickedUserInfo.contactNumber,
        userAvatarUrl : app.globalData.ClickedUserInfo.profile
      })
    }
    else{
      this.setData({
        userinfo_avatar: "userinfo-avatar-girl",
        usersex:app.globalData.ClickedUserInfo.sex,
        userposition:app.globalData.ClickedUserInfo.jobStatus,
        username:app.globalData.ClickedUserInfo.surname,
        emailAddress:app.globalData.ClickedUserInfo.email,
        workId:app.globalData.ClickedUserInfo.id,
        teleNumber:app.globalData.ClickedUserInfo.contactNumber,
        userAvatarUrl : app.globalData.ClickedUserInfo.profile
      })
    }
    var that = this;
    wx.request({
      url: app.globalData.ip_Location + "/whetherYourFriend/" + app.globalData.userInfo.id + "/" +  app.globalData.ClickedUserInfo.id,
      method: 'POST', 
      success: function(res){
        // success
        console.log(res.data);
        if(res.data=="isYourFriend"){
          that.setData({
            whetherMyfriend : true,
          })
        }
        else{
          that.setData({
            whetherMyfriend : false,
          })
        }
      }
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
  addfriend(){
    wx.request({
      url: app.globalData.ip_Location + "/addThisFriend/"+ app.globalData.userInfo.id + "/" +app.globalData.ClickedUserInfo.id,
      header:{
        'content-type': 'application/json' // 默认值
      },
      method:"POST",
      success(res){
        if(res.data=="success"){
          wx.showToast({
            title: '发送好友请求成功',
            icon:"none"
          })
        }
      }
    })
  }
})