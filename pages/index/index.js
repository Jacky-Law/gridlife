//index.js
//获取应用实例
const app = getApp()
let info = app.globalData.info;
var that = this;
Page({
  data: {
    date:"",
    months: 0,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this;
    var byear = Number(app.globalData.info.date.split('-')[0])
    var bmonth = Number(app.globalData.info.date.split('-')[1])
    var date = new Date()
    var cyear = Number(date.getFullYear())
    var cmonth = Number(date.getMonth()+1)
    var year = cyear - byear
    var month = cmonth - bmonth
    this.setData({
      months: year*12+month
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },




  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e)
    info.date = e.detail.value,
    this.setData({
      date: e.detail.value
    })
    
    this.onLoad();
    /*wx.switchTab({
      url: '../index/index',
    })*/
  }
})
