// pages/chating/chating.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinput:"",
    inputlength:0,
    flockInfo:null,
    messages:null,
    currentUserId:null,
    clickId:null,
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
    this.setData({
      currentUserId : app.globalData.userInfo.id,
      flockInfo : app.globalData.clickedFlockInfo,
    })
    var that = this;
    wx.request({
      url: app.globalData.ip_Location + "/getMessages/" + app.globalData.clickedFlockInfo.id,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res){
        console.log(res.data);
        that.setData({
          messages : res.data,
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
  bindWordLimit(e){
    this.setData({
      userinput: e.detail.value,
      inputlength: e.detail.value.length,
    });    
  },
  transport_to_viewinfo(){
    wx.navigateTo({
      url: '../viewFlockInfo/viewFlockInfo',
    })
  },
  transport_to_viewotherinfo(e){
    this.setData({
      clickId : e.currentTarget.id,
    });
    app.globalData.ClickedUserInfo = (this.data.messages[this.data.clickId]).person;
    console.log(app.globalData.ClickedUserInfo);
    wx.navigateTo({
      url: '../showUserInfo/showUserInfo',
    })
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
  },
  sendmessage(){
    var currentTime = this.getNowFormatDate();
    var that = this;
    if(this.data.userinput != ""){
      wx.request({
        url: app.globalData.ip_Location + "/sendMessage",
        data: {
          flockId : app.globalData.clickedFlockInfo.id,
          content : that.data.userinput,
          wordNumber : that.data.inputlength,
          personId : app.globalData.userInfo.id,
          createTime : currentTime,
        },
        method: 'POST',
        success: function(res){
          if(res.data=="success"){
            wx.request({
              url: app.globalData.ip_Location + "/getMessages/" + app.globalData.clickedFlockInfo.id,
              method: 'POST',
              success: function(res){
                that.setData({
                  messages : res.data,
                })
                // console.log(res.data);
              }
            })
          }
        }
      })
    }
    else{
      wx.showToast({
        title:"您未输入任何内容",
        icon:"none",
      })
    }
  }
})