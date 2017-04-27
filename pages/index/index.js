import Config from '../../etc/config'
var util = require('../../utils/util.js');

const App = getApp()

Page({
    data: {
        grids: [
            {imageName: 'home_around.png', text: '家政', path:'/pages/service/index'},
            {imageName: 'home_life.png', text: '维修', path:'/pages/service/index'},
            {imageName: 'home_card.png', text: '卡片', path:'/pages/service/index'},
            {imageName: 'home_safe.png', text: '安全', path:'/pages/help/list/index'}],
        hotHouse: [
            {id: 0, type: 'house', name: '2107. 当代国际花园', description: '南北朝向 - 1室1厅1卫 - 未来域 - 精装温馨现房 - 地铁，公交配套出行方便', avatar: 'https://source.sunzhongmou.com/2107-source/2107_home.png'}
        ],
        postsList: [],
        hidden: false,
        page: 1,
        tab: 'all',
        assets: {}
    },
    onLoad() {
        // this.assets = App.HttpResource('/user/get-user-asset/:id', {id: '@id'})
        // this.getAssets()
        this.posts = App.HttpResource('/bbs/event/get/:id', {id: '@id'})
        this.fetchData()
        this.getAccessToken()
    },
    onShow() {
    },
    navigateTo(e) {
        const type = e.currentTarget.dataset.type
        if(type === 'house'){
        } else {
            const id = e.currentTarget.dataset.id
            if( id == 2 && this.data.assets.contracts.length == 0){
                this.showWarning()
                return
            }

            App.WxService.navigateTo(e.currentTarget.dataset.path, {
                id: id
            })
        }
    },
    getAssets() {
        this.assets.queryAsync({})
            .then(data => {
                console.log(data)
                this.setData({
                    assets: data
                })
            })
    },
    getAccessToken: function(){
        if (App.WxService.getStorageSync('accessToken')) return
        let userName = App.WxService.getStorageSync('userName')
        this.posts.queryAsync({
        "ihakula_request":Config.ihakula_request,
        "params_string":'{"tab":"zy"}',
        "url":"https://bbs.sunzhongmou.com/api/v1/user/accesstoken/" + userName 
    })
        .then(res => {
            App.WxService.setStorageSync('accessToken', res.data)
        })
    },
    fetchData: function () {
    var self = this;
    self.setData({
      hidden: false
    });
    if (this.page === 1) {
      self.setData({
        postsList: []
      });
    }
    this.posts.queryAsync({
        "ihakula_request":Config.ihakula_request,
        "params_string":'{"tab":"zy"}',
        "url":"https://bbs.sunzhongmou.com/api/v1/topics"
    })
            .then(res => {
                console.log(res)
                self.setData({
                    postsList: self.data.postsList.concat(res.data.map(function (item) {
                        console.log(item.last_reply_at)
                        item.last_reply_at = util.getDateDiff(new Date(item.last_reply_at));
                        return item;
                        }))
        });
            })
  },
    onTapTag(e) {
    },
    redictDetail: function (e) {
    console.log('我要看详情');
    var id = e.currentTarget.id,
        url = '../detail/detail?id=' + id;
    wx.navigateTo({
      url: url
    })
  },
    showWarning() {
        App.WxService.showModal({
            title: '温馨提示',
            content: '请进入房源详情页面，由业主邀请认证后，才可以查看相关房源的保密信息！',
            confirmText: "确认",
            showCancel: false,
            success: function (res) {
                // res.confirm
            }
        })
    }
})
