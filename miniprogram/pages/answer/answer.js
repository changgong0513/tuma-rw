import Toast from 'vant-weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
      reciteType : 'none',
      selectWordType: '选择题',
      currentQuestionIndex: 1,
      totalQuestionCounts: 15,
      wordTranslate1: "adj.完美的; 正确的; 优秀的; 极好的;",
      wordTranslate2: "v.使完善; 使完备; 使完美;",
      answerList:["perfect"],
      answerValue: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      reciteType: options.reciteType
    });
    
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
        let calcHeight = (clientHeight - 140) * rpxR;
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
   * 在输入框值改变时触发
   * @param {*} event 
   */
  onFieldChange: function (event) {
    console.log(event.detail);
    this.setData({
      answerValue: event.detail
    });
  },

  /**
   * 在输入框输入值时，用户点击手机键盘完成按钮
   * @param {*} event 
   */
  onFieldConfirm: function (event) {
    console.log(event.detail);
    this.setData({
      answerValue: event.detail
    });
  },

  /**
   * 用户点击提交按钮
   */
  commitWord: function (event) {
    console.log(event);
    const answerValue = this.data.answerValue;
    if (answerValue) {
      if (answerValue == this.data.answerList[0]) {
        Toast.success('很棒哦，正确');
      } else {
        Toast.fail('很遗憾，要努力哦');
      }
    } else {
      Toast({
        message: "记得写答案哦"
      });
    }
  },
})