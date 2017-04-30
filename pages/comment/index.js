import Config from '../../etc/config'
const App = getApp()

Page({
  data: {
    showTopTips: false,
    content: "",
    errorMessage: "error Message",
    topicId: ""
  },
  onLoad(option) {
    console.log(option)
    this.setData({
      topicId: option.id
    })
  },
  showTopTips: function(){
    var that = this;
    this.setData({
      showTopTips: true
    });
    setTimeout(function(){
      that.setData({
        showTopTips: false
      });
    }, 3000);
  },
  bindContentChange: function (e) {
    this.setData({
      content: e.detail.value
    });
  },
  bindPublish: function (e) {
    if (this.data.content === undefined || this.data.content === "") {
      this.setData({
        errorMessage: "评论不能为空！"
      });
      this.showTopTips()
      return
    }

    this.posts = App.HttpResource('/bbs/event/post/:id', {id: '@id'})
    var self = this;

    wx.showToast({
      title: '评论发布中',
      icon: 'loading',
      duration: 5000
    });

    this.posts.saveAsync({
      "ihakula_request": Config.ihakula_request,
      "params_string": JSON.stringify({
        "accesstoken": App.WxService.getStorageSync('accessToken'),
        "content": this.data.content
      }),
      "url": "https://bbs.sunzhongmou.com/api/v1/topic/" + this.data.topicId + "/replies"
    }).then(res => {
      wx.showToast({
        title: '发布成功',
        icon: 'success',
        duration: 3000
      });

      wx.navigateBack({
        delta: 1
      })
    })

  }
});