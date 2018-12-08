import * as echarts from '../../echarts/ec-canvas/echarts';

let chart = null;

function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    color: ['#37a2da', '#32c5e9'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      },
      confine: true
    },
    legend: {
      data: ['正确', '错误']
    },
    grid: {
      left: 20,
      right: 20,
      bottom: 15,
      top: 40,
      containLabel: true
    },
    xAxis: [
      {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    yAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: ['选择题', '填空题', '乱序题', '连线题'],
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    series: [
      {
        name: '正确',
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        },
        data: [300, 270, 340, 358],
        itemStyle: {
          // emphasis: {
          //   color: '#37a2da'
          // }
        }
      },
      {
        name: '错误',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true
          }
        },
        data: [120, 102, 190, 250],
        itemStyle: {
          // emphasis: {
          //   color: '#32c5e9'
          // }
        }
      }
    ]
  };

  chart.setOption(option);
  return chart;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      onInit: initChart
    },
    wordSource: "牛津儿童英语",
    levelName : "青铜战士",
    level: 3,
    maxLevel: 6,
    wordCounts: 1000,
    studyWordCounts: 200,
    todayWordCounts: 50,
    reviewWordCounts: 10,
    remainWordCounts: 5
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
     //  高度自适应（rpx）
     var that = this;
     wx.getSystemInfo({
       success: function(res) {
         let clientHeight = res.windowHeight;
         let clientWidth = res.windowWidth;
         console.log("clientWidth=" + clientWidth);
         console.log("clientHeight=" + clientHeight);
         let rpxR = 750 / clientWidth;    //比例
         let calcHeight = (clientHeight - 92) * rpxR;
         console.log("calcHeight=" + calcHeight);
         that.setData({
           calcHeight: calcHeight
          });
        }})
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

  /**
   * 用户点击开始学习按钮
   */
  startStudy: function () {
    console.log("进入用户点击开始学习按钮事件处理方法。");

    // 跳转的开始学习页面
    wx.navigateTo({
      url: '../start/start'
    })
    
  },

  /**
   * 用户点击签到按钮
   */
  navigateToSign() {
    console.log("进入用户点击签到按钮事件处理方法。");

    // 跳转的签到页面
    wx.navigateTo({
      url: '../sign_in/sign_in'
    })
  }
})