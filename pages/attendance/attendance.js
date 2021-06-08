// pages/attendance/attendance.js
var app=getApp();
var sliderWidth = 100;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["上班打卡","请假申请", "查询历史信息"],
    userinput:"",
    userinfo_profile:"userinfo-avatar-boy",
    year:null,
    month:null,
    day:null,
    hour:null,
    minute:null,
    user_position:null,
    user_name:null,
    user_profile:null,
    whetherChecked:false,
    wifiName:null,
    workStatus:null,
    employeeInfo:null,
    whetherPosted:null,
    input_length:0,
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    date:"2019-02-18",
    date1:"2020-02-18",
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
    this.setData({
      userinfo_profile:app.globalData.userinfo_avatar,
      user_position:app.globalData.userInfo.position,
      user_name:app.globalData.userInfo.name,
      user_profile:app.globalData.userInfo.profile
    });
    wx.request({
      url: app.globalData.ip_Location+"/searchPerson/"+app.globalData.userInfo.id,
      method: 'POST', 
      success: function(res){
        that.setData({
          employeeInfo : res.data,
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
    wx.request({
      url: app.globalData.ip_Location + '/checkWhetherAttend',
      data: {
        todayTime: that.getNowFormatDateTwo(),
        userId : app.globalData.userInfo.id,
      },
      method: 'POST', 
      success: function(res){
        console.log(res.data);
        if(res.data=="Unchecked"){
          that.setData({
            whetherPosted : false,
          })
        }
        else{
          that.setData({
            whetherPosted : true,
          })
        }
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
  transport_viewAttendenceInfo(){
    var that = this;
    wx.request({
      url: app.globalData.ip_Location + '/getSearchAttendance/' + app.globalData.userInfo.id,
      data: {
        startTime:that.data.date,
        endTime:that.data.date1,
      },
      method: 'POST', 
      success: function(res){
        console.log(res.data);
        app.globalData.searchAttendanceInfo = res.data;
        app.globalData.attendancePageID = 0;
        wx.navigateTo({
          url: '../showAttendanceInfo/showAttendanceInfo'
        })
      }
    });
  },
  bindWordLimit(e){
    this.setData({
      userinput: e.detail.value,
      input_length: e.detail.value.length,
    });    
  },
  getposition(){
    var that = this;
    wx.getConnectedWifi({
      success(res){
        //console.log(res.wifi);
        if(res.wifi.BSSID == app.globalData.businessWifiBssidCode && res.wifi.SSID == app.globalData.businessWifiSsidCode){
          that.setData({
            whetherChecked : true,
            wifiName : app.globalData.businessWifiSsidCode,
          })
        }
        else{
          wx.showToast({
            title:"您未登录公司公网，请登录公网",
            icon:"none",
          })
        }
      }
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
  getNowFormatDateTwo(){
    var date = new Date();
    var seperator1 = "-";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if(month >= 1 && month <= 9) {
    month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " 00:00:00";
    return currentdate;
  },
  getWhetherPassNineOCLOCK(){
    var date = new Date();
    return (date.getHours() < 9 && date.getHours() > 6);
  },

  postattendance(){
    var that = this;
    if(this.data.whetherChecked && !this.data.whetherPosted){
      var myDate = this.getNowFormatDate();//获取当前时间 
      if(this.getWhetherPassNineOCLOCK()){
        this.setData({
          workStatus:"正常",
        })
      }
      else{
        this.setData({
          workStatus:"迟到",
        })
      }
      wx.request({
        url: app.globalData.ip_Location + "/postMyAttendance",
        data: {
          location : "公司",
          employee : that.data.employeeInfo,
          status : that.data.workStatus,
          createTime : myDate,
        },
        method: 'POST',
        success: function(res){
          if(res.data=="success"){
            that.setData({
              whetherPosted : true,
            })
            wx.showToast({
              title:"打卡成功",
              icon:"none",
            })
          }
          else{
            wx.showToast({
              title:"打卡失败",
              icon:"none",
            })
          }
        }
      })
    }
    else{
      wx.showToast({
        title:"请先检查位置或您今日已打过卡，请勿重复打卡",
        icon:"none",
      })
    }
  },
  postLeaveRequest(){
    var that = this;
    var myDate = this.getNowFormatDate();//获取当前时间
    if(!this.data.whetherPosted){
      if(this.data.userinput != ""){
        wx.request({
          url: app.globalData.ip_Location + "/postMyAttendance",
          data: {
            location : "",
            employee : that.data.employeeInfo,
            status : "请假",
            createTime : myDate,
          },
          method: 'POST', 
          success: function(res){
            if(res.data=="success"){
              that.setData({
                whetherPosted : true,
              });
              wx.showToast({
                title:"打卡成功",
                icon:"none",
              })
            }
            else{
              wx.showToast({
                title:"打卡失败",
                icon:"none",
              })
            }
          }
        })
      }
      else{
        wx.showToast({
          title:"您未输入请假原因",
          icon:"none",
        })
      }
    }
    else{
      wx.showToast({
        title:"您已打过卡，请勿重复打卡",
        icon:"none",
      })
    }
  }
})