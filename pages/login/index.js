const App = getApp()

Page({
    data: {
        logged: !1
    },
    onLoad() {
    },
    onShow() {
        const token = App.WxService.getStorageSync('token')
        this.setData({
            logged: !!token
        })
        token && setTimeout(this.goIndex, 1500)
    },
    login() {
        this.signIn(this.goIndex)
    },
    goIndex() {
        App.WxService.switchTab({
            url: '/pages/index/index'
        })
    },
    showModal() {
        App.WxService.showModal({
            title: '友情提示',
            content: '获取用户登录状态失败，请重新登录',
            showCancel: !1,
        })
    },
    signIn(cb) {
        if (App.WxService.getStorageSync('token')) return
        wx.login({
            success: function (res) {
                let code = res.code
                wx.getUserInfo({
                    withCredentials: true,
                    success: function (res) {
                        App.WxService.setStorageSync('userName', res.userInfo.nickName)
                        App.HttpService.getToken({
                            app_id: App.Config.appId,
                            code: code,
                            encrypted_data: res.encryptedData,
                            iv: res.iv
                        }).then(data => {
                                if (data.token) {
                                    App.WxService.setStorageSync('token', data.token)
                                    cb()
                                } else {
                                    this.showModal()
                                }
                            })
                    },
                    fail: function(res){
                        console.log(res)
                    }
                })
            }
        })
    },
})
