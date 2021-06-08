// pages/register/register.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Username: null,
    Sex: null,
    Email: null,
    Position: null,
    Telephone: null,
    Password: null,
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
  getUsername(e) {
    this.setData({
      Username: e.detail.detail.value,
    })
  },
  getSex(e) {
    this.setData({
      Sex: e.detail.detail.value,
    })
  },
  getEmail(e) {
    this.setData({
      Email: e.detail.detail.value,
    })
  },
  getPosition(e) {
    this.setData({
      Position: e.detail.detail.value,
    })
  },
  getTelephone(e) {
    this.setData({
      Telephone: e.detail.detail.value,
    })
  },
  getPassword(e) {
    this.setData({
      Password: e.detail.detail.value,
    })
  },
  comfirm_info(){
    var that = this;
    var username = this.data.Username;
    var password = this.data.Password;
    var position = this.data.Position;
    var sex = this.data.Sex;
    var telephone = this.data.Telephone;
    var email = this.data.Email;
    if (username != null && password != null && position != null && sex != null && telephone != null && email != null){
      wx.request({
        url: app.globalData.ip_Location + '/register',
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: "POST",
        data: {
          activities:null,
          attendances:null,
          flocks:null,
          friends:null,
          whetherAttendActivities:null,
          wxuser:null,
          whetherChecked:0,
          sex: this.data.Sex,
          surname: this.data.Username,
          password: this.data.Password,
          jobStatus: this.data.Position,
          email: this.data.Email,
          contactNumber: this.data.Telephone,
          profile: app.globalData.userInfo.avatarUrl,
        },
        success(res) {
          if (res.data == "success") {
            //openId作为地址，这样是唯一的，然后根据OpenId获取WxUser对象然后赋值给Employee对象
            wx.request({
              url: app.globalData.ip_Location + '/' + that.data.Telephone + '/' + app.globalData.openId,
              header: {
                'content-type': 'application/json' // 默认值
              },
              method: "POST",
              success(res1){
                console.log(res1.data);
                if(res1.data =="success"){
                  wx.redirectTo({
                    url: '../login/login',
                  })
                  wx.showToast({
                    title: '注册成功,请等待审核',
                    icon: 'none'
                  })
                }
              }
            })
          }
          else {
            wx.showToast({
              title: '注册失败',
              icon: 'none'
            })
          }
        },
        fail() {
          wx.showToast({
            title: '注册失败',
            icon: 'none'
          })
        }
      })
    }
  }
})