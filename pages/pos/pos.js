// pos.js
var amapFile = require('../../utils/amap-wx.js');
var markersData = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    textData: {},
    city: ''
  },
  makertap: function (e) {
    var id = e.markerId;
    var that = this;
    that.showMarkerInfo(markersData, id);
    that.changeMarkerColor(markersData, id);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var key = '6f9ecb7b603697f87022e4101d2d278d';
    var myAmapFun = new amapFile.AMapWX({key: key});
    myAmapFun.getPoiAround({
      iconPathSelected: '../../img/marker_checked.png',
      success: function(data) {
        console.log('succ', data)
        markersData = data.markers;
        var poisData = data.poisData;
        var markers_new = [];
        markersData.forEach(function (item, index) {
          markers_new.push({
            id: item.id,
            latitude: item.latitude,
            longitude: item.longitude,
            iconPath: item.iconPath,
            width: item.width,
            height: item.height
          })
        })

        that.setData({
          markers: markers_new
        });
        that.setData({
          city: poisData[0].cityname || ''
        });
        that.setData({
          latitude: markersData[0].latitude
        });
        that.setData({
          longitude: markersData[0].longitude
        });
        console.log('markersData', markersData)
        that.showMarkerInfo(markersData, 0);
      },
      fail: function(data) {
        console.log('fail', data)
      }
    })
    // var that = this;
    // // var key = config.Config.key;
    // var key = '6f9ecb7b603697f87022e4101d2d278d';
    // var myAmapFun = new amapFile.AMapWX({ key: key });
    // var params = {
    //   iconPathSelected: '../../img/marker_checked.png',
    //   iconPath: '../../img/marker.png',
    //   success: function (data) {
    //     markersData = data.markers;
    //     var poisData = data.poisData;
    //     var markers_new = [];
    //     markersData.forEach(function (item, index) {
    //       markers_new.push({
    //         id: item.id,
    //         latitude: item.latitude,
    //         longitude: item.longitude,
    //         iconPath: item.iconPath,
    //         width: item.width,
    //         height: item.height
    //       })

    //     })
    //     if (markersData.length > 0) {
    //       that.setData({
    //         markers: markers_new
    //       });
    //       that.setData({
    //         city: poisData[0].cityname || ''
    //       });
    //       that.setData({
    //         latitude: markersData[0].latitude
    //       });
    //       that.setData({
    //         longitude: markersData[0].longitude
    //       });
    //       that.showMarkerInfo(markersData, 0);
    //     } else {
    //       wx.getLocation({
    //         type: 'gcj02',
    //         success: function (res) {
    //           that.setData({
    //             latitude: res.latitude
    //           });
    //           that.setData({
    //             longitude: res.longitude
    //           });
    //           that.setData({
    //             city: '北京市'
    //           });
    //         },
    //         fail: function () {
    //           that.setData({
    //             latitude: 39.909729
    //           });
    //           that.setData({
    //             longitude: 116.398419
    //           });
    //           that.setData({
    //             city: '北京市'
    //           });
    //         }
    //       })

    //       that.setData({
    //         textData: {
    //           name: '抱歉，未找到结果',
    //           desc: ''
    //         }
    //       });
    //     }

    //   },
    //   fail: function (info) {
    //     // wx.showModal({title:info.errMsg})
    //   }
    // }
    // if (options && options.keywords) {
    //   params.querykeywords = options.keywords;
    // }
    // myAmapFun.getPoiAround(params)
  },

  bindInput: function (e) {
    var that = this;
    var url = '../inputtips/input';
    if (e.target.dataset.latitude && e.target.dataset.longitude && e.target.dataset.city) {
      var dataset = e.target.dataset;
      url = url + '?lonlat=' + dataset.longitude + ',' + dataset.latitude + '&city=' + dataset.city;
    }
    wx.redirectTo({
      url: url
    })
  },
  showMarkerInfo: function (data, i) {
    var that = this;
    that.setData({
      textData: {
        name: data[i].name,
        desc: data[i].address
      }
    });
  },
  changeMarkerColor: function (data, i) {
    var that = this;
    var markers = [];
    for (var j = 0; j < data.length; j++) {
      if (j == i) {
        data[j].iconPath = "../../img/marker_checked.png";
      } else {
        data[j].iconPath = "../../img/marker.png";
      }
      markers.push({
        id: data[j].id,
        latitude: data[j].latitude,
        longitude: data[j].longitude,
        iconPath: data[j].iconPath,
        width: data[j].width,
        height: data[j].height
      })
    }
    that.setData({
      markers: markers
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