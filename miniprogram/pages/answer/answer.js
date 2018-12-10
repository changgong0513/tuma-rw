import Toast from 'vant-weapp/toast/toast';

// 1. 获取数据库引用
const db = wx.cloud.database();

// 2. 获取数据库中对应集合引用
const spellingBeeCollection = db.collection('spelling_bee')

Page({

  /**
   * 页面的初始数据
   */
  data: {
      reciteType : 'none',
      selectWordType: '选择题',
      currentQuestionIndex: 1,
      totalQuestionCounts: 15,
      answerList:["perfect"],
      answerValue: '',
      page: 0,
      currentDisplayWord: '',
      currentDisplayWordTranslate: '',
      wordList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.audioCtx = wx.createInnerAudioContext('myAudio');
    
    // 取得指定集合里的所有数据，不超过 20 条
    spellingBeeCollection
      .get()
      .then(res => {
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        console.log(res.data);
        this.setData({
          wordList: res.data, 
          currentDisplayWord: res.data[0].word,
          currentDisplayWordTranslate: res.data[0].translate
        });
      })
      .catch(err => {
        console.error(err)
      });

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
        let calcHeight = (clientHeight - 130) * rpxR;
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

  speakTest: function (event) {
    const { currentWord } = event.currentTarget.dataset;
    const audioSrc = "http://dict.youdao.com/dictvoice?audio=" + currentWord;
    this.audioCtx.src = audioSrc
    this.audioCtx.play();
  },

})