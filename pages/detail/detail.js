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
        wxParseData: []
    },
    onLoad: function (options) {
        this.detailReq = App.HttpResource('/bbs/event/get/:id', {id: '@id'})
        this.fetchData(options.id);
    },
    fetchData: function (id) {
        var self = this;
        self.setData({
            hidden: false
        });

        this.detailReq.queryAsync({
            "ihakula_request": Config.ihakula_request,
            "params_string": '{"mdrender":false}',
            "url": "https://bbs.sunzhongmou.com/api/v1/topic/" + id
        })
            .then(res => {
                console.log(res);
                res.data.create_at = util.getDateDiff(new Date(res.data.create_at));
                res.data.replies = res.data.replies.map(function (item) {
                    item.create_at = util.getDateDiff(new Date(item.create_at));
                    return item;
                })
                self.setData({
                    detail: res.data,
                    wxParseData: WxParse('md', res.data.content.replace(/\/public\//g, "https://bbs.sunzhongmou.com/public/"))
                });
            });
    },
    bindComment: function(e) {
        App.WxService.navigateTo('/pages/comment/index', {
            id: "the-id"
        })
    }
})
