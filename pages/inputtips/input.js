var amapFile = require('../../utils/amap-wx.js');
// var config = require('../../libs/config.js');
var lonlat;
var city;
Page({
  data: {
    tips: {}
  },
  onLoad: function(e){
    lonlat = e.lonlat;
    city = e.city;
  },
  bindInput: function(e){
    var that = this;
    var keywords = e.detail.value; 
    // var key = config.Config.key;
    var key = '6f9ecb7b603697f87022e4101d2d278d';
    var myAmapFun = new amapFile.AMapWX({key: key});
    myAmapFun.getInputtips({
      keywords: keywords,
      location: lonlat,
      city: city,
      success: function(data){
        if(data && data.tips){
          that.setData({
            tips: data.tips
          });
        }
      }
    })
  },
  bindSearch: function(e){
    var keywords = e.target.dataset.keywords;
    var url = '../pos/pos?keywords=' + keywords;
    wx.redirectTo({
      url: url
    })
  }
})