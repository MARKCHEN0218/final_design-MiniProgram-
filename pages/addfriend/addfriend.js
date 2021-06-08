// pages/addfriend/addfriend.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    whetherExist:false,
    inputNumber:null,
    whetherShow:false,
    searchPerson:null,
    whetherExistButton:false,
    userinfo_profile:"userinfo-avatar-boy",
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
  getSearchNumber(e){
    this.setData({
      inputNumber:e.detail.value,
    })
  },
  postSearchNumber(){
    var that = this;
    wx.request({
      url: app.globalData.ip_Location+"/searchPerson/"+that.data.inputNumber,
      header:{
        'content-type': 'application/json' // 默认值
      },
      method:"POST",
      success(res){
        if(res.data==""){
          that.setData({
            whetherShow:true,
            whetherExist:false,
          })
        }
        else{
          if(that.data.inputNumber != app.globalData.userInfo.id){
            if(res.data.sex=="男"){
              that.setData({
                searchPerson:res.data,
                whetherShow:true,
                whetherExist:true,
                whetherExistButton:true
              })
            }
            else{
              that.setData({
                searchPerson:res.data,
                whetherShow:true,
                whetherExist:true,
                whetherExistButton:true,
                userinfo_profile:"userinfo-avatar-girl"
              })
            }
          }
          else{
            if(res.data.sex=="男"){
              that.setData({
                searchPerson:res.data,
                whetherShow:true,
                whetherExist:true,
                whetherExistButton:false
              })
            }
            else{
              that.setData({
                searchPerson:res.data,
                whetherShow:true,
                whetherExist:true,
                whetherExistButton:true,
                userinfo_profile:"userinfo-avatar-girl"
              })
            }
          }
        }
      },
      fail(){
        wx.showToast({
          title: '获取信息失败',
          icon: 'none'
        })
      }
    })
  },
  addFriend(){
    var that = this;
    wx.request({
      url: app.globalData.ip_Location + "/addThisFriend/"+ app.globalData.userInfo.id + "/" +that.data.searchPerson.id,
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
        else if(res.data=="fail"){
          wx.showToast({
            title: '您已添加此人为自己好友或对方还未接受好友请求',
            icon:"none"
          })
        }
        else{
          wx.showToast({
            title: '发送好友请求失败，请稍后重试',
            icon:"none"
          })
        }
      }
    })
  }
})