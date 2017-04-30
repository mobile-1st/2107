const App = getApp()

Page({
    data: {
        items: [
            { text: '小区物业报修电话', path: '02786698926' },
            { text: '物业客服值班电话', path: '02788186415' },
            { text: '区房管投诉受理电话', path: '02781818240' },
            { text: '市房管投诉监督电话', path: '02785482119' },
        ]
    },
    onLoad() {
    },
    onShow() {
    },
    onPullDownRefresh() {
    },
    onReachBottom() {
    },
    navigateTo(e) {
        const path = e.currentTarget.dataset.path

        App.WxService.makePhoneCall({
            phoneNumber: path
        })
    },
    onShareAppMessage: function () {
        return {
            title: '中冶创业苑 - 畅居',
            path: '/pages/service/index',
            success: function(res) {
            },
            fail: function(res) {
            }
        }
    }
})