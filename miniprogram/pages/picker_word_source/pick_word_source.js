// miniprogram/pages/picker_word_source/pick_word_source.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    columns: ['杭州', '宁波', '温州', '嘉兴', '湖州']
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

  onChange1(event) {
    const { value, index } = event.detail;
    Toast(`Value: ${value}, Index：${index}`);
  },

  onConfirm(event) {
    const { value, index } = event.detail;
    Toast(`Value: ${value}, Index：${index}`);
  },

  onCancel() {
    Toast('取消');
  }
})