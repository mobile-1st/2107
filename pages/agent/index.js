const App = getApp()

Page({
    data: {
    },
    call() {
        App.WxService.makePhoneCall({
            phoneNumber: '18707158711'
        })
    }
})