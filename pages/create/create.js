import Config from '../../etc/config'
const App = getApp()

Page({
  data: {
    showTopTips: false,

    accounts: ["中冶创业苑"],
    accountIndex: 0,

    title: "",
    content: "",

    errorMessage: "error Message",

    isAgree: false
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
  bindTitleChange: function (e) {
    this.setData({
      title: e.detail.value
    });
  },
  bindContentChange: function (e) {
    this.setData({
      content: e.detail.value
    });
  },
  bindAccountChange: function(e) {
    console.log('picker account 发生选择改变，携带值为', e.detail.value);

    this.setData({
      accountIndex: e.detail.value
    })
  },
  bindPublish: function (e) {
    if (this.data.title === undefined || this.data.title === "") {
      this.setData({
        errorMessage: "标题不能为空！"
      });
      this.showTopTips()
      return
    }
    if (this.data.content === undefined || this.data.content === "") {
      this.setData({
        errorMessage: "正文不能为空！"
      });
      this.showTopTips()
      return
    }

    this.posts = App.HttpResource('/bbs/event/post/:id', {id: '@id'})
    var self = this;

    wx.showToast({
      title: '文章发布中',
      icon: 'loading',
      duration: 5000
    });

    this.posts.saveAsync({
      "ihakula_request": Config.ihakula_request,
      "params_string": JSON.stringify({
        "tab": "zy",
        "accesstoken": App.WxService.getStorageSync('accessToken'),
        "title": this.data.title,
        "content": this.data.content
      }),
      "url": "https://bbs.sunzhongmou.com/api/v1/topics"
    }).then(res => {
      if(res.error){
        wx.showToast({
          title: '发布失败!',
          icon: 'warn',
          duration: 3000
        })

      } else {
        wx.showToast({
          title: '发布成功',
          icon: 'success',
          duration: 3000
        })
      }
    })
  }

});