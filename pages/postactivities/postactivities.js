// pages/postactivities/postactivities.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:"2020-06-25",
    time:"18:00",
    array: ['开会', '活动', '吃饭'],
    index:1,
    activityName:null,
    position:null,
    formatTime:null,
    postperson:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
  getActivityName(res){
    this.setData({
      activityName:res.detail.value,
    })
  },
  getPosition(res){
    this.setData({
      position:res.detail.value,
    })
  },
  bindDateChange: function (e) {
    this.setData({
        date: e.detail.value
    })
  },
  bindTimeChange(e){
    this.setData({
      time: e.detail.value
    })
  },
  bindPickerChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  transport_selectperson(){
    app.globalData.selectedPageID = 1;
    wx.navigateTo({
      url: '../selectperson/selectperson',
    })
  },
  postActivity(){
    var that = this;
    if(this.data.activityName == null || this.data.position == null){
      wx.showToast({
        title:"您未输入活动名或地点名",
        icon:'none',
      })
    }
    else{
      if(app.globalData.selectedPersons==null || app.globalData.selectedPageID != 1){
        wx.showToast({
          title:"您未选择参加此次活动的人",
          icon:'none',
        })
      }
      else{
        var myDate = this.data.date + " " + this.data.time +":00";
        var employeestemp = (app.globalData.selectedPersons).push(that.data.postperson);//将自己加入到List中
        console.log(app.globalData.selectedPersons.length);
        console.log(employeestemp);
        wx.request({
          url: app.globalData.ip_Location + '/postActivity',
          data: {
            activityName : that.data.activityName,
            category : that.data.array[that.data.index],
            location : that.data.position,
            whetherAttendActivities : null,
            employees : app.globalData.selectedPersons,
            pNumber : employeestemp,
            status : "未来事件",
            createTime : myDate,
          },
          method: 'POST',
          success: function(res){
            console.log(res.data);
            if(res.data=="success"){
              wx.showToast({
                title: '发布活动成功',
                icon: 'none'
              })
            }
          }
        })
      }
    }
  }
})