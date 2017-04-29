import Config from '../../etc/config'
var util = require('../../utils/util.js');

const App = getApp()

Page({
    data: {
        grids: [
            {imageName: 'home_around.png',
                text: '物业',
                path: '/pages/service/index'},
            {imageName: 'home_life.png',
                text: '淘邻',
                path: '/pages/mall/index'},
            {imageName: 'home_card.png',
                text: '黄页',
                path: '/pages/recommend/recommend'},
            {imageName: 'home_safe.png',
                text: '安全',
                path: '/pages/safe/index'}],
        postsList: [],
        hidden: false,
        page: 1,
        tab: 'all',
        assets: {}
    },
    onLoad() {
        this.posts = App.HttpResource('/bbs/event/get/:id', {id: '@id'})
        this.fetchData()
        this.getAccessToken()
    },
    onShow() {
    },
    onPullDownRefresh() {
        console.info('onPullDownRefresh')
        this.setData({
            postsList: [],
            page: 1
        })
        this.fetchData()
    },
    onReachBottom() {
        this.fetchData()
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
    getAccessToken: function () {
        if (App.WxService.getStorageSync('accessToken')) return
        let userName = App.WxService.getStorageSync('userName')
        this.posts.queryAsync({
            "ihakula_request": Config.ihakula_request,
            "params_string": '{"tab":"zy"}',
            "url": "https://bbs.sunzhongmou.com/api/v1/user/accesstoken/" + userName
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
            "ihakula_request": Config.ihakula_request,
            "params_string": JSON.stringify({
                "tab": 'zy',
                "page": self.data.page,
                "mdrender": "false"
            }),
            "url": "https://bbs.sunzhongmou.com/api/v1/topics"
        }).then(res => {
            console.log(res)
            self.setData({
                postsList: self.data.postsList.concat(res.data.map(function (item) {
                    item.last_reply_at = util.getDateDiff(new Date(item.last_reply_at));
                    return item;
                })),
                page: (self.data.page + 1)
            })
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
    },
    onShareAppMessage: function () {
        return {
            title: '中冶创业苑 - 畅居',
            path: '/pages/index/index',
            success: function(res) {
            },
            fail: function(res) {
            }
        }
    }
})
