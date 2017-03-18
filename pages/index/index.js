const App = getApp()

Page({
    data: {
        grids: [
            {imageName: 'home_around.png', text: '家政', path:'/pages/service/index'},
            {imageName: 'home_life.png', text: '维修', path:'/pages/service/index'},
            {imageName: 'home_card.png', text: '卡片', path:'/pages/service/index'},
            {imageName: 'home_safe.png', text: '安全', path:'/pages/service/index'}],
        hotHouse: [
            {name: '2107. 当代国际花园', description: '南北朝向 - 1室1厅1卫 - 未来域 - 精装温馨现房 - 地铁，公交配套出行方便', avatar: 'https://source.sunzhongmou.com/2107-source/2107_home.png'}
        ],
        navData: {
            house: {
                name: '吴阿姨',
                phone: '13545361669',
                type: '保洁',
                price: '30-50元/小时',
                description: '吴阿姨工作认真仔细，价格公道，由经济人推荐，从开始提供服务至今，已经收到不少好评。也欢迎来自您的点评，和我们一起鼓励客户至上的专业服务！'
            },
        },
    },
    onLoad() {
        this.banner = App.HttpResource('/banner/:id', {id: '@id'})
        this.goods = App.HttpResource('/goods/:id', {id: '@id'})
        this.classify = App.HttpResource('/classify/:id', {id: '@id'})
    },
    onShow() {
        this.getBanners()
        this.getClassify()
    },
    getNavData(text) {
        let result;
        switch(text){
            case '家政':
            result = this.data.navData.house;
            break;
        }
        return result;
    },
    navigateTo(e) {
        App.WxService.navigateTo(e.currentTarget.dataset.path, {
            data: this.getNavData(e.currentTarget.dataset.id)
        })
    },
    search() {
        App.WxService.navigateTo('/pages/search/index')
    },
    getBanners() {
        // App.HttpService.getBanners({is_show: !0})
        this.banner.queryAsync({is_show: !0})
            .then(data => {
                console.log(data)
                if (data.meta.code == 0) {
                    data.data.items.forEach(n => n.path = App.renderImage(n.images[0].path))
                    this.setData({
                        images: data.data.items
                    })
                }
            })
    },
    getClassify() {
        this.classify.queryAsync({
            id: 321,
            page: 1,
            limit: 4,
        })
            .then(data => {
                console.log(data)
                if (data.meta.code == 0) {
                    this.setData({
                        navList: data.data.items,
                        'goods.params.type': data.data.items[0]._id
                    })
                    this.getGoods()
                }
            })
    },
    onPullDownRefresh() {
        const type = this.data.goods.params.type
        const goods = {
            items: [],
            params: {
                page: 1,
                limit: 10,
                type: type,
            },
            paginate: {}
        }

        this.setData({
            goods: goods
        })

        this.getGoods()
    },
    onReachBottom() {
        this.lower()
    },
    lower() {
        if (!this.data.goods.paginate.hasNext) return
        this.getGoods()
    },
    onTapTag(e) {
        const type = e.currentTarget.dataset.type
        const index = e.currentTarget.dataset.index
        const goods = {
            items: [],
            params: {
                page: 1,
                limit: 10,
                type: type,
            },
            paginate: {}
        }
        this.setData({
            activeIndex: index,
            goods: goods,
        })
        this.getGoods()
    },
})
