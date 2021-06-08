// pages/attendenceOtherPerson/attendenceOtherPerson.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:"2020-02-18",
    date1:"2020-03-04",
    userId:null,
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
  bindDateChange: function (e) {
    this.setData({
        date: e.detail.value
    })
  },
  bindDateChange1: function (e) {
    this.setData({
        date1: e.detail.value
    })
  },
  getSearchNumber(e){
    this.setData({
      userId:e.detail.value,
    })
  },
  searchOtherPerson(){
    var that = this;
    if(this.data.userId != null){
      wx.request({
        url: app.globalData.ip_Location + '/searchPerson/' + that.data.userId,
        method: 'POST', 
        success: function(res){
          app.globalData.searchPersonInfo = res.data;
        }
      });
      wx.request({
        url: app.globalData.ip_Location + "/getSearchAttendance/" + that.data.userId,
        data: {
          startTime : that.data.date,
          endTime : that.data.date1,
        },
        method: 'POST', 
        success: function(res){
          app.globalData.searchAttendanceInfo = res.data;
          app.globalData.attendancePageID = 1;
          wx.navigateTo({
            url: '../showAttendanceInfo/showAttendanceInfo'
          })
        }
      })
    }
  }
})