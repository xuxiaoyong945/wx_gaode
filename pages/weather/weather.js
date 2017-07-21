// weather.js

var amapFile = require('../../utils/amap-wx.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weather: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var myAmapFun = new amapFile.AMapWX({ key: '6f9ecb7b603697f87022e4101d2d278d' })
    myAmapFun.getWeather({
      success: function (data) {
        //成功回调
        console.log('succ', data)
        that.setData({
          weather: data
        });
      },
      fail: function (info) {
        //失败回调
        console.log('fail')
        console.log('fail', info)
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
  
  }
})