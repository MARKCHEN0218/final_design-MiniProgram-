// pages/authority/authority.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    unauthorizedPerson:null,
    clickId:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.ip_Location+"/getUnauthorizedPerson",
      header: {
        'content-type': 'application/json' // 默认值
      },
      method:"POST",
      success(res){
        that.setData({
          unauthorizedPerson:res.data,
        })
      },
      fail(){
        wx.showToast({
          title: '获取未认证人的信息失败',
          icon:"null"
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
  accept(e){
    this.setData({
      clickId:e.currentTarget.id,
    })
    var that = this;
    var id = this.data.unauthorizedPerson[this.data.clickId].id;
    wx.request({//获取到对应员工的ID作为地址传过去
      url: app.globalData.ip_Location+'/acceptSomeone/'+ id,
      header: {
        'content-type': 'application/json' // 默认值
      },
      method:"POST",
      success(res){
        console.log(res);
        if(res.data=="success"){
          wx.showToast({
            title: '授权成功',
            icon: 'none'
          })
          wx.request({
            url: app.globalData.ip_Location+"/getUnauthorizedPerson",
            header: {
              'content-type': 'application/json' // 默认值
            },
            method:"POST",
            success(res){
              that.setData({
                unauthorizedPerson:res.data,
              })
            },
            fail(){
              wx.showToast({
                title: '获取未认证人的信息失败',
                icon: 'none'
              })
            }
          })
        }
        else{
          wx.showToast({
            title: '授权失败',
            icon: 'none'
          })
        }
      }
    })
  },
  reject(e){
    this.setData({
      clickId:e.currentTarget.id,
    })
    var that = this;
    var id = this.data.unauthorizedPerson[this.data.clickId].id
    wx.request({//获取到对应员工的ID作为地址传过去
      url: app.globalData.ip_Location+'/rejectSomeone/'+ id,
      header: {
        'content-type': 'application/json' // 默认值
      },
      method:"POST",
      success(res){
        if(res.data=="success"){
          wx.showToast({
            title: '拒绝成功',
            icon: 'none'
          })
          wx.request({
            url: app.globalData.ip_Location+"/getUnauthorizedPerson",
            header: {
              'content-type': 'application/json' // 默认值
            },
            method:"POST",
            success(res){
              that.setData({
                unauthorizedPerson:res.data,
              })
            },
            fail(){
              wx.showToast({
                title: '获取未认证人的信息失败',
                icon: 'none'
              })
            }
          })
        }
        else{
          wx.showToast({
            title: '拒绝失败',
            icon: 'none'
          })
        }
      }
    })
  }
})