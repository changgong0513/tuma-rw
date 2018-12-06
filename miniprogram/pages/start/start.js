// miniprogram/pages/start/start.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wordSource: '牛津儿童英语',
    list: ['拼写题', '选择题', '填空题', '乱序题', '连线题', "随机题"],
    result: [],
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
        let calcHeight = (clientHeight -116) * rpxR;
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

  onChange(event) {
    console.log(event.detail);
    this.setData({
      result: event.detail
    });
  },

  toggle(event) {
    const { name } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(`.checkboxes-${name}`);
    checkbox.toggle();
  },

  noop() {}
})