// pages/selectperson/selectperson.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yourFriends:null,
    numberYourFriends:0,
    clickedArray:null,
    clickedId:null,
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
      url: app.globalData.ip_Location + '/getUserFriends/' + app.globalData.userInfo.id,
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: "POST",
      success: function(res){
        that.setData({
          yourFriends : res.data,
          numberYourFriends : res.data.length,
        })
        console.log(that.data.yourFriends);
        console.log(that.data.numberYourFriends);
        var temp = new Array(that.data.numberYourFriends);
        for(var i=0; i<that.data.numberYourFriends; i++){
          temp[i]=0;
        }
        that.setData({
          clickedArray:temp,
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
  changeSelect(e){
    this.setData({
      clickedId:e.currentTarget.id,
    })
    var that = this;
    if(this.data.clickedArray[this.data.clickedId]==0){
      var temp = this.data.clickedArray;
      temp[this.data.clickedId]=1;
      this.setData({
        clickedArray:temp,
      })
    }
    else{
      var temp = this.data.clickedArray;
      temp[this.data.clickedId]=0;
      this.setData({
        clickedArray:temp,
      })
    }
  },
  confirmPost(){
    var sum = 0;
    for(var i=0; i< this.data.numberYourFriends; i++){
      if(this.data.clickedArray[i]==1)sum++;
    }
    if(sum==0){
      wx.showToast({
        title: '请选择用户',
        icon: 'none'
      })
    }
    else{
      var temp = new Array(sum);
      var tempcount = 0;
      for(var j=0; j< this.data.numberYourFriends; j++){
        if(this.data.clickedArray[j]==1){
          temp[tempcount++] = this.data.yourFriends[j].employees;
        }
      }
      app.globalData.selectedPersons = temp;
      wx.showToast({
        title: '选择成功',
        icon:"none"
      });
      wx.navigateBack({
        delta: 1, // 回退前 delta(默认为1) 页面
      })
      // if(app.globalData.selectedPageID == 0){
      //   wx.redirectTo({
      //     url: '../addchating/addchating',
      //   })
      // }
      // else{
      //   wx.redirectTo({
      //     url: '../postactivities/postactivities',
      //   })
      // }
    }    
  }
})