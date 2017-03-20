const App = getApp()

Page({
    data: {
        indicatorDots: !0,
        vertical: !1,
        autoplay: !1,
        interval: 3000,
        duration: 1000,
        goods: {
            item: {
                images: [
                    {path:'https://source.sunzhongmou.com/2107-source/2107_view.JPG'},
                    {path:'https://source.sunzhongmou.com/2107-source/2107_kitchen.JPG'},
                    {path:'https://source.sunzhongmou.com/2107-source/2107_sign.png'},
                    {path:'https://source.sunzhongmou.com/2107-source/2107_tv.JPG'},
                    {path:'https://source.sunzhongmou.com/2107-source/2107_fridge.JPG'},
                    {path:'https://source.sunzhongmou.com/2107-source/2107_air.JPG'},
                    {path:'https://source.sunzhongmou.com/2107-source/2107_washing.JPG'},
                    {path:'https://source.sunzhongmou.com/2107-source/2107_cupboard.JPG'},
                    {path:'https://source.sunzhongmou.com/2107-source/2107_cupboard_2.JPG'},
                    {path:'https://source.sunzhongmou.com/2107-source/2107_cupboard_3.JPG'}
                    ],
                name: '2107.当代国际花园.未来域',
                price: '2100.00元/月 【押一付三】',
                remark: '住宅 |1室1厅1厨1卫 | 41m² | 21/共34层 | 南 | 精装修'
            }
        }
    },
    estateAgent(e) {
        App.WxService.navigateTo('/pages/agent/index', {
        })
    },
    onLoad(option) {
    },
    onShow() {
    },
    previewImage(e) {
        const urls = this.data.goods && this.data.goods.item.images.map(n => n.path)
        const index = e.currentTarget.dataset.index
        const current = urls[Number(index)]
        
        App.WxService.previewImage({
            current: current, 
            urls: urls, 
        })
    }
})