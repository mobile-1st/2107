const App = getApp()

Page({
    data: {
        images: [{'path': 'https://source.sunzhongmou.com/191054/images/IMG_1116.JPG'},
            {'path': 'https://source.sunzhongmou.com/191054/images/IMG_1117.JPG'},
            {'path': 'https://source.sunzhongmou.com/191054/images/IMG_1118.JPG'}],
        activeIndex: 0,
        navList: [{_id: 1, name: '常用信息'},{_id: 2, name: '生活周边'},{_id: 1, name: '我的房源'}],
        indicatorDots: !0,
        autoplay: !1,
        current: 0,
        interval: 3000,
        duration: 1000,
        circular: !0,
        goods: {
            items: [{
                _id: 1,
                thumb_url: 'https://source.sunzhongmou.com/191054/images/IMG_1117.JPG',
                name: 'name',
                price: 123.00
            },{
                _id: 1,
                thumb_url: 'https://source.sunzhongmou.com/191054/images/IMG_1117.JPG',
                name: 'namehttps://source.sunzhongmou.com/191054/images/IMG_1117.JPGhttps://source.sunzhongmou.com/191054/images/IMG_1117.JPG',
                price: 123.00
            },{
                _id: 1,
                thumb_url: 'https://source.sunzhongmou.com/191054/images/IMG_1117.JPG',
                name: 'name',
                price: 123.00
            }],
            params: {
                page: 1,
                limit: 10,
            },
            paginate: {total:10}
        },
        prompt: {
            hidden: !0,
        },
    },
    swiperchange(e) {
        console.log(e.detail.current)
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
    navigateTo(e) {
        console.log(e)
        App.WxService.navigateTo('/pages/goods/detail/index', {
            id: e.currentTarget.dataset.id
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
    getGoods() {
        const goods = this.data.goods
        const params = goods.params

        // App.HttpService.getGoods(params)
        this.goods.queryAsync(params)
            .then(data => {
                console.log(data)
                if (data.meta.code == 0) {
                    data.data.items.forEach(n => n.thumb_url = App.renderImage(n.images[0] && n.images[0].path))
                    goods.items = [...goods.items, ...data.data.items]
                    goods.paginate = data.data.paginate
                    goods.params.page = data.data.paginate.next
                    goods.params.limit = data.data.paginate.perPage
                    this.setData({
                        goods: goods,
                        'prompt.hidden': goods.items.length,
                    })
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
