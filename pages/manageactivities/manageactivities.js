// pages/manageactivities/manageactivities.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    remainUnaccepteddata:null,
    clickedIndex:null,
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
    var that = this;
    wx.request({
      url: app.globalData.ip_Location + '/getUserUnacceptedActivities/' + app.globalData.userInfo.id,
      method: 'POST', 
      success: function(res){
       that.setData({
        remainUnaccepteddata:res.data,
       })
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
  acceptThisActivity(e){
    this.setData({
      clickedIndex : e.currentTarget.id,
    })
    var that = this;
    var id = (this.data.remainUnaccepteddata[that.data.clickedIndex]).id;
    wx.request({
      url:  app.globalData.ip_Location + "/acceptThisActivity/" + id,
      method: 'POST', 
      success: function(res){
        if(res.data=="success"){
          wx.request({
            url: app.globalData.ip_Location + '/getUserUnacceptedActivities/' + app.globalData.userInfo.id,
            method: 'POST', 
            success: function(res){
             that.setData({
              remainUnaccepteddata:res.data,
             })
            }
          })
          wx.showToast({
            title:"接受事件成功，您可以在事件页面查看",
            icon:"none",
          })
        }
        else{
          wx.showToast({
            title:"接受事件失败",
            icon:"none",
          })
        }
      }
    })
  },
  rejectThisActivity(e){
    this.setData({
      clickedIndex : e.currentTarget.id,
    })
    var that = this;
    var id = (this.data.remainUnaccepteddata[that.data.clickedIndex]).id;
    wx.request({
      url:  app.globalData.ip_Location + "/rejectThisActivity/" + id,
      method: 'POST', 
      success: function(res){
        if(res.data=="success"){
          wx.request({
            url: app.globalData.ip_Location + '/getUserUnacceptedActivities/' + app.globalData.userInfo.id,
            method: 'POST', 
            success: function(res){
             that.setData({
              remainUnaccepteddata:res.data,
             })
            }
          })
          wx.showToast({
            title:"拒绝事件成功",
            icon:"none",
          })
        }
        else{
          wx.showToast({
            title:"拒绝事件失败",
            icon:"none",
          })
        }
      }
    })
  }
})