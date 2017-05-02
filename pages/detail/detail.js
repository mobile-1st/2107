// posts.js
import Config from '../../etc/config'
var util = require('../../utils/util.js');
var WxParse = require('../../wxParse/wxParse.js');
const App = getApp()


Page({
    data: {
        title: '话题详情',
        detail: {},
        hidden: false,
        wxParseData: [],
        topicId: ""
    },
    onLoad: function (options) {
        this.detailReq = App.HttpResource('/bbs/event/get/:id', {id: '@id'})
        this.readReq = App.HttpResource('/bbs/event/post/:id', {id: '@id'})
        this.setData({
            topicId: options.id
        })
        this.fetchData();
    },
    fetchData: function () {
        var self = this;
        self.setData({
            hidden: false
        });

        this.detailReq.queryAsync({
            "ihakula_request": Config.ihakula_request,
            "params_string": '{"mdrender":false}',
            "url": "https://bbs.sunzhongmou.com/api/v1/topic/" + this.data.topicId
        }).then(res => {
            console.log(res);
            res.data.create_at = util.getDateDiff(new Date(res.data.create_at));
            res.data.replies = res.data.replies.map(function (item) {
                item.create_at = util.getDateDiff(new Date(item.create_at));
                return item;
            })
            self.setData({
                detail: res.data,
                wxParseData: WxParse('md', res.data.content.replace(/\/public\//g, "https://bbs.sunzhongmou.com/public/").replace(/http:/g, "https:"))
            })
            console.log(self.data.wxParseData)
        });

        this.readReq.saveAsync({
            "ihakula_request": Config.ihakula_request,
            "params_string": JSON.stringify({
                "accesstoken": App.WxService.getStorageSync('accessToken'),
            }),
            "url": "https://bbs.sunzhongmou.com/api/v1/topic/read/" + this.data.topicId
        }).then(res => {
            console.log(res);
        });
    },
    bindComment: function(e) {
        App.WxService.navigateTo('/pages/comment/index', {
            id: this.data.detail.id
        })
    },
    onPullDownRefresh() {
        console.info('onPullDownRefresh')
        this.fetchData()
    },
    onReachBottom() {
        this.fetchData()
    },
  onShareAppMessage: function () {
        return {
            title: '中冶创业苑 - 畅居',
            path: '/pages/detail/index?id=' + this.data.topicId,
            success: function(res) {
            },
            fail: function(res) {
            }
        }
    }
})
