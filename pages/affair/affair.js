var sliderWidth = 100; // 需要设置slider的宽度，用于计算中间位置
// pages/affair/affair.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["过去事件", "进行中事件", "未来事件"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    pastEvent:null,
    runningEvent:null,
    futureEvent:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
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
    var myDate = this.getNowFormatDate();//获取当前时间
    var that = this;
    wx.request({
      url: app.globalData.ip_Location + "/getPastEvent/" + app.globalData.userInfo.id,
      method: 'POST',
      data:{
        currentTime : myDate,
      },
      success: function(res){
        that.setData({
          pastEvent : res.data,
        })
        console.log(that.data.pastEvent);
      }
    });
    wx.request({
      url: app.globalData.ip_Location + "/getRunningEvent/" + app.globalData.userInfo.id,
      data: {
        currentTime : myDate,
      },
      method: 'POST', 
      success: function(res){
        that.setData({
          runningEvent : res.data,
        })
        console.log(that.data.runningEvent);
      }
    });
    wx.request({
      url: app.globalData.ip_Location + "/getFutureEvent/" + app.globalData.userInfo.id,
      data: {
        currentTime : myDate,
      },
      method: 'POST', 
      success: function(res){
        that.setData({
          futureEvent : res.data,
        })
        console.log(that.data.futureEvent);
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
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  getNowFormatDate() {//获取当前时间的函数，并且符合后台数据库格式
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if(month >= 1 && month <= 9) {
    month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
    return currentdate;
  }
})