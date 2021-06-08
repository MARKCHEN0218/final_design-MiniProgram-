// pages/showAttendanceInfo/showAttendanceInfo.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo_profile:"userinfo-avatar-boy",
    year:null,
    month:null,
    day:null,
    hour:null,
    minute:null,
    user_position:null,
    user_name:null,
    user_profile:null,
    normalTimes:null,
    lateTimes:null,
    outTimes:null,
    PageId:null,
    search_name:null,
    search_position:null,
    search_profile:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.globalData.attendancePageID==0){
      this.setData({
        userinfo_profile:app.globalData.userinfo_avatar,
        user_position:app.globalData.userInfo.position,
        user_name:app.globalData.userInfo.name,
        user_profile:app.globalData.userInfo.profile
      });
    }
    else{
      if(app.globalData.searchPersonInfo.sex=="男"){
        this.setData({
          userinfo_profile : "userinfo-avatar-boy",
          search_name : app.globalData.searchPersonInfo.surname,
          search_position : app.globalData.searchPersonInfo.jobStatus,
          search_profile : app.globalData.searchPersonInfo.profile,
        })
      }
      else{
        this.setData({
          userinfo_profile : "userinfo-avatar-girl",
          search_name : app.globalData.searchPersonInfo.surname,
          search_position : app.globalData.searchPersonInfo.jobStatus,
          search_profile : app.globalData.searchPersonInfo.profile,
        })
      }
      
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
    this.setData({
      PageId : app.globalData.attendancePageID,
    });
    var date= new Date();
    var that = this;
    var temp_hour= date.getHours();
    if(temp_hour<10){
      temp_hour="0"+temp_hour;
    }
    var temp_minutes= date.getMinutes();
    if(temp_minutes<10){
      temp_minutes="0"+temp_minutes;
    }
    this.setData({
      year:date.getFullYear(),
      month:date.getMonth()+1,
      day:date.getDate(),
      hour:temp_hour,
      minute:temp_minutes,
    })
    var searchresult = app.globalData.searchAttendanceInfo;
    var normaltimes = 0;
    var latetimes = 0;
    var outtimes = 0;
    var i;
    for(i=0; i<searchresult.length;i++){
      if(searchresult[i].status=="正常")normaltimes++;
      if(searchresult[i].status=="迟到")latetimes++;
      if(searchresult[i].status=="请假")outtimes++;
    }
    this.setData({
      normalTimes:normaltimes,
      lateTimes:latetimes,
      outTimes:outtimes,
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
  swith_to_attendance(){
    if(this.data.PageId == 0){
      wx.switchTab({
        url: '../attendance/attendance',
      })
    }
    else{
      wx.switchTab({
        url: '../me/me',
      })
    }
  }
})