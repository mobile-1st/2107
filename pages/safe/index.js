const App = getApp()

Page({
    data: {
        items: [
            { text: '张 萌', path: '13971660818' },
            { text: '戚 杰', path: '13667254022' },
            { text: '值班电话', path: '13871101013' },
            { text: '分管领导 - 朱兰杰', path: '18507170170' },
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
            path: '/pages/safe/index',
            success: function(res) {
            },
            fail: function(res) {
            }
        }
    }
})