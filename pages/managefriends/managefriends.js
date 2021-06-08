// pages/managefriends/managefriends.js
var sliderWidth = 100;
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["待审核好友", "已添加好友"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    remainingUnacceptedFriend:null,
    acceptedFriend:null,
    clickId:null,
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
      var that = this;
      wx.request({
        url: app.globalData.ip_Location+'/getUnacceptedFriends/'+app.globalData.userInfo.id,
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: "POST",
        success(res){
          that.setData({
            remainingUnacceptedFriend:res.data,
          })
        }
      });
      wx.request({
        url: app.globalData.ip_Location+'/getAcceptedFriend/'+app.globalData.userInfo.id,
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: "POST",
        success(res){
          that.setData({
            acceptedFriend:res.data,
          })
        }
      });
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
  addthisperson(e){
    this.setData({
      clickId:e.currentTarget.id,
    })
    var that = this;
    var id = this.data.remainingUnacceptedFriend[this.data.clickId].id;
    wx.request({
      url: app.globalData.ip_Location + "/addThisPersonAsFriend/" + id,
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST', 
      success: function(res){
        if(res.data == "success"){
          wx.showToast({
            title:"添加好友成功",
            icon:"none"
          }),
          wx.request({
            url: app.globalData.ip_Location+'/getUnacceptedFriends/'+app.globalData.userInfo.id,
            header: {
              'content-type': 'application/json' // 默认值
            },
            method: "POST",
            success(res){
              that.setData({
                remainingUnacceptedFriend:res.data,
              })
            }
          });
          wx.request({
            url: app.globalData.ip_Location+'/getAcceptedFriend/'+app.globalData.userInfo.id,
            header: {
              'content-type': 'application/json' // 默认值
            },
            method: "POST",
            success(res){
              that.setData({
                acceptedFriend:res.data,
              })
            }
          });
        }
      }      
    })
  },
  rejectthisperson(e){
    this.setData({
      clickId:e.currentTarget.id,
    })
    var that = this;
    var id = this.data.remainingUnacceptedFriend[this.data.clickId].id;
    wx.request({
      url: app.globalData.ip_Location + "/rejectThisPersonAsFriend/" + id,
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST', 
      success: function(res){
        if(res.data == "success"){
          wx.showToast({
            title:"拒绝成功",
            icon:"none"
          }),
          wx.request({
            url: app.globalData.ip_Location+'/getUnacceptedFriends/'+app.globalData.userInfo.id,
            header: {
              'content-type': 'application/json' // 默认值
            },
            method: "POST",
            success(res){
              that.setData({
                remainingUnacceptedFriend:res.data,
              })
            }
          });
          wx.request({
            url: app.globalData.ip_Location+'/getAcceptedFriend/'+app.globalData.userInfo.id,
            header: {
              'content-type': 'application/json' // 默认值
            },
            method: "POST",
            success(res){
              that.setData({
                acceptedFriend:res.data,
              })
            }
          });
        }
      }      
    })
  }


})