//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    month:null,
    day:null,
    welcome_text:null,
    nickname:null, 
    flocks:null,
    clickId:null,   
  },
  onLoad: function () {
    
  },
  onShow(){
    var date=new Date();
    this.setData({
      month:date.getMonth()+1,
      day:date.getDate(),
      nickname:app.globalData.userInfo.name,
    })
    var hour= date.getHours();
    if(hour>=5 && hour<= 12){
      this.setData({
        welcome_text:"早上好",
      })
    }
    else if(hour>12 && hour<18){
      this.setData({
        welcome_text:"下午好",
      })
    }
    else{
      this.setData({
        welcome_text:"晚上好",
      })
    }
    var that = this;
    wx.request({
      url: app.globalData.ip_Location+"/getFlocks/"+app.globalData.userInfo.id,
      method:"POST",
      success:function(res){
        that.setData({
          flocks:res.data
        });
        console.log(res.data);
      },
      false:function(){
        wx.showToast({
          title: '获取群信息失败',
          icon: "none"
        })
      }
    })
  },
  transport_to_addchating(){
    wx.navigateTo({
      url: '../addchating/addchating',  
    })
  },
  transport_to_addfriend(){
    wx.navigateTo({
      url: '../addfriend/addfriend',  
    })
  },
  transport_chatting(e){
    this.setData({
      clickId : e.currentTarget.id,
    })
    app.globalData.clickedFlockInfo = this.data.flocks[this.data.clickId];
    wx.navigateTo({
      url: '../chating/chating',  
    })
  }
})
