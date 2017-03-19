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
        assets: {}
    },
    onLoad() {
        this.assets = App.HttpResource('/user/get-user-asset/:id', {id: '@id'})
    },
    onShow() {
        this.getAssets()
    },
    navigateTo(e) {
        App.WxService.navigateTo(e.currentTarget.dataset.path, {
            id: e.currentTarget.dataset.id
        })
    },
    search() {
        App.WxService.navigateTo('/pages/search/index')
    },
    getAssets() {
        this.assets.queryAsync({})
            .then(data => {
                this.setData({
                    assets: data
                })
            })
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
