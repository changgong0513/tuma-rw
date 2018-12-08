// miniprogram/pages/sign_in/sign_in.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    demo6_days_style: [],
    year: new Date().getFullYear(),      // 年份
    month: new Date().getMonth() + 1,    // 月份
    day: new Date().getDate(),
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

  dayClick(event) {
    let {day} = event.detail;
    console.log("当前选择的日期：" + event.detail.year + "-" + event.detail.month +  "-" + day);

    const days_count = new Date(this.data.year, this.data.month, 0).getDate();
    console.log("当前选择的月总天数：" + days_count);

    let demo6_days_style = new Array;

    // 设置不同日期的背景颜色
    /*
    for (let i = 1; i <= days_count; i++) {
        const date = new Date(this.data.year, this.data.month - 1, i);
        if (i == 12) {
            demo6_days_style.push({
                month: 'current', day: i, color: 'white', background: '#b49eeb'
            });
        } else if (i == 17) {
            demo6_days_style.push({
                month: 'current', day: i, color: 'white', background: '#f5a8f0'
            });
        } else if (i == 21) {
            demo6_days_style.push({
                month: 'current', day: i, color: 'white', background: '#aad4f5'
            });
        } else if (i == 25) {
            demo6_days_style.push({
                month: 'current', day: i, color: 'white', background: '#84e7d0'
            });
        } else {
            demo6_days_style.push({
                month: 'current', day: i, color: 'black'
            });
        }
    }
    */

    demo6_days_style.push({
      month: 'current', day: day, color: 'white', background: '#84e7d0'
    });

    this.setData({
        demo6_days_style
    });
  }
})