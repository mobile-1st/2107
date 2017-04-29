var leftSelectedIdx = 0;/*左侧选中的行号*/
const App = getApp()

Page({
  data: {
    leftTabArray: [
      {"index": 0, "selected": true, "name": "供 水"},
      {"index": 1, "selected": false, "name": "供 电"},
      {"index": 2, "selected": false, "name": "天燃气"},
      {"index": 3, "selected": false, "name": "有线电视"},
      {"index": 4, "selected": false, "name": "中国电信"},
      {"index": 5, "selected": false, "name": "百佳门诊"},
      {"index": 6, "selected": false, "name": "省中医院"},
      {"index": 7, "selected": false, "name": "军区医院"},
      {"index": 8, "selected": false, "name": "妇幼保健"},
      {"index": 9, "selected": false, "name": "中百超市"},
      {"index": 10, "selected": false, "name": "家乐福"},
      {"index": 11, "selected": false, "name": "沃尔玛"},
      {"index": 12, "selected": false, "name": "大洋百货"},
      {"index": 13, "selected": false, "name": "红旗家具"},
      {"index": 14, "selected": false, "name": "欧亚达"},
      {"index": 15, "selected": false, "name": "EMS"},
      {"index": 16, "selected": false, "name": "申通"},
      {"index": 17, "selected": false, "name": "宅急送"},
    ],
    rightTabArray: [],
    source: {
      0: [{"title": "名称", "content": "武汉水务集团"},
        {"title": "所需资料", "content": "水费缴费通知单"},
        {"title": "电话", "content": "96510"},
        {"title": "缴费地址", "content": "1.中百仓储服务台；\n2.雄楚大道洪山营业厅（民族大道口站）；\n3.支付宝（推荐）"}],
      1: [{"title": "名称", "content": "江厦区供电局五里界营业厅"},
        {"title": "所需资料", "content": "电费缴费通知单"},
        {"title": "电话", "content": "95598"},
        {"title": "电话", "content": "02787922728"},
        {"title": "缴费地址", "content": "1.中百仓储服务台；\n2.支付宝（推荐）"}],
      2: [{"title": "名称", "content": "武汉市天燃气公司"},
        {"title": "所需资料", "content": "业主在物业服务处交纳5元工本费（代收），领取燃气使用证"},
        {"title": "电话", "content": "96511"},
        {"title": "电话", "content": "02787180843"},
        {"title": "地址", "content": "光谷民族大道上钱村站，健龙尚谷杰座商铺2-1-2"}],
      3: [{"title": "名称", "content": "江厦区广播电视局"},
        {"title": "所需资料", "content": "须业主携带本人身份证"},
        {"title": "电话", "content": "02787993341"},
        {"title": "地址", "content": "创业苑商铺2#-1"}],
      4: [{"title": "名称", "content": "中国电信，武汉分公司"},
        {"title": "所需资料", "content": "须业主携带本人有效身份证复印件"},
        {"title": "电话", "content": "02781337012"},
        {"title": "地址", "content": "创业苑商铺3#-2，联合100旁"}],

      5: [{"title": "名称", "content": "百佳门诊"},
        {"title": "地址", "content": "凤凰花园二期商业街"}],
      6: [{"title": "名称", "content": "湖北省中医院光谷分院"},
        {"title": "电话", "content": "02787172153"},
        {"title": "地址", "content": "珞瑜路856号"}],
      7: [{"title": "名称", "content": "广州军区武汉总医院"},
        {"title": "电话", "content": "02768878888"},
        {"title": "地址", "content": "武珞路627号"}],
      8: [{"title": "名称", "content": "湖北省妇幼保健院"},
        {"title": "电话", "content": "02787884730"},
        {"title": "地址", "content": "武昌区街道口"}],

      9: [{"title": "名称", "content": "中百仓储上紫薇星购物广场"},
        {"title": "地址", "content": "光谷大道与高新六路交叉口"}],
      10: [{"title": "名称", "content": "家乐福光谷店"},
        {"title": "公交线路", "content": "715、758、405"},
        {"title": "地址", "content": "光谷广场"}],
      11: [{"title": "名称", "content": "沃尔玛光谷坐标城店"},
        {"title": "公交线路", "content": "乘405到关南小区转715"},
        {"title": "地址", "content": "关山大道与南湖大道汇合口"}],
      12: [{"title": "名称", "content": "大洋百货光谷店"},
        {"title": "公交线路", "content": "715、758、405"},
        {"title": "地址", "content": "光谷广场"}],
      13: [{"title": "名称", "content": "红旗国际家具博览中心"},
        {"title": "公交线路", "content": "乘718、758到五角塘转723路"},
        {"title": "地址", "content": "武昌雄楚大道233号尤李西村"}],
      14: [{"title": "名称", "content": "欧亚达建材家具光谷店"},
        {"title": "公交线路", "content": "乘758到关山中学转811、723到荣军医院下"},
        {"title": "地址", "content": "雄楚大道499号"}],

      15: [{"title": "名称", "content": "中国邮政EMS特快专递客服热线"},
        {"title": "电话", "content": "11185"}],
      16: [{"title": "名称", "content": "武汉申通快递"},
        {"title": "电话", "content": "02785711781"}],
      17: [{"title": "名称", "content": "武汉宅急送快递"},
        {"title": "电话", "content": "400678900"}],
    },
  },
  onLoad:function(options){
    this.syncRightTabData()
  },
  syncRightTabData: function () {
    this.setData({
      rightTabArray: this.data.source[leftSelectedIdx]
    })
  },
  leftCellTap:function (e){
    var selectIdx = Number(e.currentTarget.dataset.idx);
    if (leftSelectedIdx == selectIdx) {
      return;
    }
    var temArray = this.data.leftTabArray;
    temArray[leftSelectedIdx].selected = false;
    leftSelectedIdx = selectIdx;
    temArray[leftSelectedIdx].selected = true;

    this.setData({
        leftTabArray: temArray
    });

    this.syncRightTabData()
  },
  btn_clicked:function(e){
    App.WxService.makePhoneCall({
      phoneNumber: e.target.dataset.phone
    })
  },
  onShareAppMessage: function () {
    return {
      title: '中冶创业苑 - 畅居',
      path: '/pages/recommend/recommend',
      success: function(res) {
      },
      fail: function(res) {
      }
    }
  }

})