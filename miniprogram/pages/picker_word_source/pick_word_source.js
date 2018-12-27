// 1. 获取数据库引用
const db = wx.cloud.database();

// 2. 获取数据库中对应集合引用
const word_source_collection = db.collection('words_source')

Page({

  /**
   * 页面的初始数据
   */
  data: {

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
    // 取得指定集合里的所有数据，不超过 20 条
    word_source_collection.get().then(res => {
      // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
      console.log(res.data);
      this.setData({
        wordSourceList: res.data
      });
    })
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
   * 用户点击选择
   * @param {*} event 
   */
  selectWordSource: function (event) {
    // 调试输出信息
    console.log("进入用户点击选择单词来源按钮事件。");

    const { sourceId, sourceName } = event.currentTarget.dataset;

    console.log("选择的单词来源id=" + sourceId + ",单词来源名称=" + sourceName);

    wx.setStorage({
      key: 'word_source',
      data: {'sourceId':sourceId, 'sourceName':sourceName}
    })

    wx.switchTab({
      url: '../index/index',
      success: function (msg) {
        console.log(msg);
      },
      fail: function (err) {
        console.log(err);
      }
    });
  }
})