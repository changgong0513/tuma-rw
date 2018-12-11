import Toast from 'vant-weapp/toast/toast';

// 1. 获取数据库引用
const db = wx.cloud.database();

// 2. 获取数据库中对应集合引用
const spellingBeeCollection = db.collection('spelling_bee')

// 朗读单词音效上下文
const speakWordAudioCtx = wx.createInnerAudioContext('speakWordAudio');

// 答题音效上下文
const answerAudioCtx = wx.createInnerAudioContext('answerAudio');

Page({

  /**
   * 页面的初始数据
   */
  data: {
      reciteType : 'none', // 背诵类型：练习（1）, 考试（2）
      selectWordType: '选择题', // 背诵选择的题型
      currentQuestionIndex: 1, // 当前背诵单词的索引
      totalQuestionCounts: 20, // 背诵单词的总数
      answerValue: '', // 答案
      currentDisplayWord: '', // 当前显示的单词
      currentDisplayWordTranslate: '', // 当前显示单词的翻译
      wordList: [], // 背诵的单词列表
      isHideWord: true, // 是否隐藏单词标志
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 取得指定集合spelling_bee里的所有数据，不超过 20 条
    spellingBeeCollection
      .get()
      .then(res => {
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
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
        let rpxR = 750 / clientWidth;    //比例
        let calcHeight = (clientHeight - 130) * rpxR;
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
   * 事件处理函数--在输入框输入值时
   * @param {*} event 
   */
  onFieldChange: function (event) {
    // 设置用户输入的单词
    this.setData({
      answerValue: event.detail
    });
  },

  /**
   * 事件处理函数--在输入框输入值时，用户点击手机键盘完成按钮
   * @param {*} event 
   */
  onFieldConfirm: function (event) {
    // 设置用户输入的单词
    this.setData({
      answerValue: event.detail
    });
  },

  /**
   * 事件处理函数--用户点击提交按钮
   */
  onCommitWord: function (event) {
    // 设置当前用户输入的单词
    const answerValue = this.data.answerValue;

    // 设置当前需要背诵的单词
    const currentValue = this.data.currentDisplayWord;

    if (answerValue) {
      // 用户输入值不为空时
      if (answerValue == currentValue) {
        Toast('很棒哦，正确');
        this.answerSoundEffect("right");
      } else {
        Toast('不对，要加油哦');
        this.answerSoundEffect("mistake");
        return;
      }
    } else {
      // 用户输入值为空时
      Toast("记得写答案哦");
      return;
    }

    // 设置输入框值为空
    this.setData({
      value: ''
    });
  },

  /**
   * 事件处理函数--用户点击朗读icon时
   * @param {*} event 
   */
  onSpeak: function (event) {
    // 取得当前需要朗读的单词
    const { currentWord } = event.currentTarget.dataset;

    // 朗读单词
    this.speakWord(currentWord);
  },

  /**
   * 事件处理函数--用户点击显示/隐藏朗读单词的icon时
   */
  onViewWord: function () {
    let isHideWord = this.data.isHideWord;
    if (isHideWord) {
      isHideWord = false;
    } else {
      isHideWord = true;
    }

    this.setData({
      isHideWord: isHideWord
    });
  },

  /**
   * 
   */
  onNextWord: function () {
    console.log("onNextWord");
    // 设置下一个背诵的单词
    const nextDisplayWord = this.data.wordList[this.data.currentQuestionIndex].word;

    // 设置下一个背诵单词的翻译
    let nextDisplayWordTranslate = this.data.wordList[this.data.currentQuestionIndex].translate;
    nextDisplayWordTranslate = nextDisplayWordTranslate ? nextDisplayWordTranslate : '';

    // 设置当前的单词索引
    const nextQuestionIndex = this.data.currentQuestionIndex + 1;
  
    // 设置页面值
    this.setData({
      currentQuestionIndex: nextQuestionIndex,
      currentDisplayWord: nextDisplayWord, 
      currentDisplayWordTranslate: nextDisplayWordTranslate
    });

     // 朗读单词
     this.speakWord(nextDisplayWord);
  },

  /**
   * 函数--朗读单词
   * @param {*} word 朗读的单词
   */
  speakWord: function (word) {
    const audioSrc = "http://dict.youdao.com/dictvoice?audio=" + word;
    speakWordAudioCtx.src = audioSrc;
    speakWordAudioCtx.play();
  },

  /**
   * 
   * @param {*} type 
   */
  answerSoundEffect: function (type) {
    console.log("answerSoundEffect");

    let audioSrc = '';

    if (type === "right") {
      audioSrc = "https://7475-tuma-mina-9f77a9-1257638542.tcb.qcloud.la/sound/nizhenbang.mp3?sign=bd3201d18c3e846352e4323fe915f74b&t=1544571747";
    } else {
      audioSrc = "https://7475-tuma-mina-9f77a9-1257638542.tcb.qcloud.la/sound/mistake.mp3?sign=7277fdfab58b97587a8532de8bacfde2&t=1544571774";
    }

    answerAudioCtx.src = audioSrc;
    answerAudioCtx.play();
  }

})