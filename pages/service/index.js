const App = getApp()

Page({
    data: {
        service: {},
        navData: {
            house: {
                title: '家政服务',
                name: '吴阿姨',
                phone: '13545361669',
                type: '保洁',
                price: '30-50元/小时',
                description: '吴阿姨工作认真仔细，服务至今，已经收到不少好评。热烈欢迎您的点评，和我们一起鼓励客户至上的专业服务！'
            },
            fixing: {
                title: '维修服务',
                name: '廖师傅',
                phone: '13618643166',
                type: '修锁',
                price: '视锁的情况定',
                description: '廖师傅已经由公安认证。热烈欢迎您的点评，和我们一起鼓励客户至上的专业服务！'
            },
        }
    },
    bindtap: function(e) {
        App.WxService.makePhoneCall({
            phoneNumber: this.data.service.phone
		})
    },
    onLoad(options) {
        let key = ''
        const id = options.id
        switch(id){
            case '0':
                key = 'house'
                break;
            case '1':
                key = 'fixing'
                break;
        }
        this.setData({
            'service': this.data.navData[key]
        })
    },
    onShow() {
    }
})