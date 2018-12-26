// 1. 获取数据库引用
const db = wx.cloud.database();

// 2. 获取数据库中对应集合引用
const spellingBeeCollection = db.collection('xgnyyqsb_01')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isEditModel: false,
    checked: false,
    result: [],
    page: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.audioCtx = wx.createInnerAudioContext('myAudio');

    // 取得指定集合里的所有数据，不超过 20 条
    spellingBeeCollection.get().then(res => {
      // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
      console.log(res.data);
      this.setData({
        wordList: res.data
      });
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
    console.log("页面上拉触底事件的处理函数。");
    
    let page = this.data.page + 20;
    console.log("页面上拉触底事件的处理函数 page:" + page);

    // 取得指定集合里的所有数据，不超过 20 条
    spellingBeeCollection.skip(page).get().then(res => {
      let new_data = res.data;
      let old_data = this.data.wordList;
      this.setData({
        wordList: old_data.concat(new_data),
        page: page
      });
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  speakTest: function (event) {
    const { currentWord } = event.currentTarget.dataset;
    console.log("currentWord=" + currentWord);
    const audioSrc = "http://dict.youdao.com/dictvoice?audio=" + currentWord;
    this.audioCtx.src = audioSrc
    this.audioCtx.play();
  },

  createWords: function () {
    console.log("进入用户点击新建按钮事件处理方法。");

    this.setData({
      isEditModel: true
    });
  },

  deleteWords: function () {
    console.log("进入用户点击删除按钮事件处理方法。");

    this.setData({
      isEditModel: true
    });
  },

  eidtWords: function () {
    console.log("进入用户点击编辑按钮事件处理方法。");

    this.setData({
      isEditModel: true
    });
  },

  completeWords: function () {
    console.log("进入用户点击完成按钮事件处理方法。");

    this.setData({
      isEditModel: false
    });
  },

  toggle: function (event) {
    console.log(event);
    const { name } = event.currentTarget.dataset;
    const checkbox = this.selectComponent('.checkboxes-1');
    checkbox.toggle();
  },

  noop: function () {

  },

  onChange(event) {
    // console.log(event);
    // this.setData({
    //   checked: event.detail
    // });
    console.log(event.detail);
    this.setData({
      result: event.detail
    });
  }

})