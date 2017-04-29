var leftSelectedIdx = 0;/*左侧选中的行号*/
var currentPage = 1;

Page({
  data:{
    leftTabArray:[],
    rightTabArray:[]
  },
  onLoad:function(options){

    var that = this;

    var temArray = [{"count": 65, "id": 35, "name": "\u7f51\u7ea2"}, {"count": 40, "id": 33, "name": "\u5de5\u4f5c\u5ba4"}, {"count": 47, "id": 34, "name": "\u7cfb\u5217"}, {"count": 15, "id": 38, "name": "\u521b\u610f"}, {"count": 13, "id": 39, "name": "\u8da3\u56fe"}, {"count": 3, "id": 41, "name": "\u81ea\u5236"}, {"count": 37, "id": 40, "name": "\u89c6\u9891"}, {"count": 30, "id": 44, "name": "\u56fe\u7247"}, {"count": 16, "id": 37, "name": "\u641e\u7b11"}, {"count": 7, "id": 36, "name": "\u7cbe\u54c1"}];
    //默认选中第一个
    temArray[0].selected = true;
    temArray[0].index = 0;
    for (var i = 1; i < temArray.length; i++) {
      temArray[i].selected = false;
      temArray[i].index = i;
    }
    that.setData({
      leftTabArray: temArray
    })

    this.loadRightTabData(1, 1)
  },

  //加载右侧列表数据
  loadRightTabData:function(target, category_id){

    const res = {"list": [{"fans_count": 4733, "header": "http://tp2.sinaimg.cn/3905378173/50/5695573864/0", "uid": 8574967, "is_vip": false, "is_follow": 0, "introduction": "", "gender": 1, "tiezi_count": 28, "screen_name": "\u604b\u73ca\u59ae"}, {"fans_count": 48812, "header": "http://wimg.spriteapp.cn/profile/large/2016/03/09/56dfd3ba6c1c8_mini.jpg", "uid": 10615774, "is_vip": false, "is_follow": 0, "introduction": "\u7206\u7b11\u65b9\u8a00\uff0c\u91cd\u65b0\u5e26\u4f60\u56de\u5230\u6821\u56ed", "gender": 2, "tiezi_count": 215, "screen_name": "\u8bf4\u65b9\u8a00\u7684\u738b\u5b50\u6d9b\u6d9b"}, {"fans_count": 11390, "header": "http://wimg.spriteapp.cn/profile/large/2017/01/20/588232f0d30ca_mini.jpg", "uid": 17729530, "is_vip": false, "is_follow": 0, "introduction": "\u4e00\u4e2a\u6b63\u76f4\u7684\u641e\u7b11\u5e05\u54e5\uff0c\u91cf\u5927\u8d28\u4f18", "gender": 2, "tiezi_count": 158, "screen_name": "\u6881\u731b\u641e\u7b11\u89c6\u9891"}, {"fans_count": 4481, "header": "http://wimg.spriteapp.cn/profile/large/2017/01/18/587f5b0766f3a_mini.jpg", "uid": 17511295, "is_vip": false, "is_follow": 0, "introduction": "\u66f4\u591a\u7cbe\u5f69\u89c6\u9891\u3001\u641e\u7b11\u6bb5\u5b50\u3001\u641e\u7b11\u56fe\u7247\u8bf7\u641c\u7d22\u5fae\u4fe1\u516c\u4f17\u53f7\uff1a\u6b22\u4e50\u963f\u559c\u54e5", "gender": 2, "tiezi_count": 92, "screen_name": "\u6b22\u4e50\u963f\u559c\u54e5"}, {"fans_count": 5904, "header": "http://wimg.spriteapp.cn/profile/large/2016/03/29/56fa1652044b1_mini.jpg", "uid": 17915890, "is_vip": false, "is_follow": 0, "introduction": "\u6ca1\u6709\u6bd4\u8fd9\u66f4\u9017\u6bd4\u7684\u4e86\uff01", "gender": 2, "tiezi_count": 147, "screen_name": "A\u53f7\u9017\u6bd4"}, {"fans_count": 27057, "header": "http://wimg.spriteapp.cn/profile/large/2017/02/10/589dd2af723e1_mini.jpg", "uid": 17535182, "is_vip": false, "is_follow": 0, "introduction": "\u9017\u5427\u4e09\u4eba\u7ec4\uff0c\u5168\u7f51\u6700\u5f3a\u8f66\u9707\u7ec4\u5408\uff0c\u628a\u8f66\u9707\u73a9\u51fa\u65b0\u59ff\u52bf", "gender": 2, "tiezi_count": 91, "screen_name": "\u9648\u8302\u6e90"}, {"fans_count": 3269, "header": "http://tp4.sinaimg.cn/5654955491/50/5742701174/1", "uid": 16836232, "is_vip": false, "is_follow": 0, "introduction": "\u54c8\u54c8\u54c8\uff0c\u8ba9\u6211\u4eec\u8ddf\u7740\u6f6e\u6d41\u533a\u5410\u69fd~", "gender": 2, "tiezi_count": 68, "screen_name": "bibi\u5a31\u4e50\u793e"}, {"fans_count": 6959, "header": "http://wimg.spriteapp.cn/profile/large/2014/11/17/54698bc498c41_mini.jpg", "uid": 12332732, "is_vip": false, "is_follow": 0, "introduction": "\u5929\u771f\u70c2\u6f2b\u5c0f\u5973\u5b69\uff0c\u4e00\u5bb6\u4e09\u53e3\u4f1a\u6f14\u620f", "gender": 2, "tiezi_count": 162, "screen_name": "\u7eaf\u601d\u8bed"}, {"fans_count": 19754, "header": "http://wimg.spriteapp.cn/profile/large/2016/11/21/5831dddac5809_mini.jpg", "uid": 6462951, "is_vip": false, "is_follow": 0, "introduction": "\u5185\u6db5\u6bb5\u5b50\u54ea\u91cc\u627e\uff0c\u767e\u601d\u9b4f\u6676\u5e94\u6709\u5c3d\u6709\uff0c\u5c0f\u59e8\u5b50\u6570\u4e0d\u8fc7\u6765", "gender": 2, "tiezi_count": 768, "screen_name": "\u6f14\u5458-\u9b4f\u6676"}, {"fans_count": 3151, "header": "http://wimg.spriteapp.cn/profile/large/2016/06/25/576e4d4e4b5ed_mini.jpg", "uid": 16872666, "is_vip": false, "is_follow": 0, "introduction": "\u6bcf\u5929\u90fd\u641e\u7b11\uff0c\u5173\u6ce8\u5c31\u5bf9\u5566", "gender": 2, "tiezi_count": 43, "screen_name": "\u7ea2\u4eba\u5c0f\u5fd7"}, {"fans_count": 3803, "header": "http://wimg.spriteapp.cn/profile/large/2016/06/28/5771f4c71263b_mini.jpg", "uid": 18515668, "is_vip": false, "is_follow": 0, "introduction": "", "gender": 1, "tiezi_count": 23, "screen_name": "\u4e95\u54e5\u54e5ice"}, {"fans_count": 32990, "header": "http://wimg.spriteapp.cn/profile/large/2017/04/01/58dfb6bedee23_mini.jpg", "uid": 18042900, "is_vip": false, "is_follow": 0, "introduction": "\u8fd9\u4e2a\u7279\u6548\uff0c\u6211\u7ed9\u4e00\u4e2a\u4ebf\u3002", "gender": 2, "tiezi_count": 126, "screen_name": "5\u6bdb\u56e2\u961f"}, {"fans_count": 2885, "header": "http://wimg.spriteapp.cn/profile/large/2016/04/15/571083d656bdb_mini.jpg", "uid": 17549505, "is_vip": false, "is_follow": 0, "introduction": "\u91ce\u751f\u641e\u7b11\u4e13\u5bb6\uff0c\u6211\u559c\u6b22", "gender": 2, "tiezi_count": 129, "screen_name": "\u827e\u7279\u6210\u6d0b"}, {"fans_count": 39309, "header": "http://wimg.spriteapp.cn/profile/large/2017/02/15/58a441860f767_mini.jpg", "uid": 17509521, "is_vip": false, "is_follow": 0, "introduction": "\u8089\u8138\u516c\u4e3e", "gender": 1, "tiezi_count": 88, "screen_name": "\u4e0d\u5b8c\u6574\u7684\u5b58\u5728"}, {"fans_count": 4452, "header": "http://wimg.spriteapp.cn/profile/large/2016/03/29/56f9dfaa5b577_mini.jpg", "uid": 17914521, "is_vip": false, "is_follow": 0, "introduction": "\u5927\u54e5\u51fa\u54c1\uff0c\u5fc5\u987b\u7cbe\u54c1", "gender": 2, "tiezi_count": 67, "screen_name": "\u5927\u54e5vip"}, {"fans_count": 47143, "header": "http://wimg.spriteapp.cn/profile/large/2017/01/17/587d222421a7d_mini.jpg", "uid": 14979830, "is_vip": false, "is_follow": 0, "introduction": "", "gender": 1, "tiezi_count": 147, "screen_name": "\u5c0f\u8d8a\u5973simida"}, {"fans_count": 8098, "header": "http://wimg.spriteapp.cn/profile/large/2016/05/14/5736e19b1b8e3_mini.jpg", "uid": 9213597, "is_vip": false, "is_follow": 0, "introduction": "\u6c61\uff01\u5927\u5199\u7684\u6c61\uff01\u6700\u6c61\u7684\u97f3\u4e50\u603b\u76d1\uff01", "gender": 2, "tiezi_count": 26, "screen_name": "\u963f\u8469\u7f69\u7237"}, {"fans_count": 8435, "header": "http://tp2.sinaimg.cn/1297569021/50/5739770658/0", "uid": 16879473, "is_vip": false, "is_follow": 0, "introduction": "", "gender": 1, "tiezi_count": 108, "screen_name": "\u6d2a\u51b0\u7476"}, {"fans_count": 1888, "header": "http://wimg.spriteapp.cn/profile/large/2016/03/19/56ecf4dd9bd05_mini.jpg", "uid": 17818101, "is_vip": false, "is_follow": 0, "introduction": "\u81f4\u656c\u661f\u7237\uff0c\u4f46\u613f\u4f60\u80fd\u61c2\u5f97", "gender": 2, "tiezi_count": 66, "screen_name": "\u963f\u4e5d\u7b52l"}, {"fans_count": 5296, "header": "http://wimg.spriteapp.cn/profile/large/2016/03/01/56d5060ed0b97_mini.jpg", "uid": 17645322, "is_vip": false, "is_follow": 0, "introduction": "\u5531\u6b4c\u91cc\u6700\u4f1a\u641e\u7b11\u7684\uff0c\u641e\u7b11\u91cc\u6700\u4f1a\u5531\u6b4c\u7684\uff0c\u5708\u91cc\u77e5\u540d\u5927\u53d4", "gender": 2, "tiezi_count": 15, "screen_name": "\u97e941"}], "total_page": 3}

    this.setData({
      rightTabArray : this.data.rightTabArray.concat(res.list)
    });
  },

  //左侧cell的点击事件
  leftCellTap:function (e){
    console.log(e);
    // 当前选中的行
    var selectIdx = Number(e.currentTarget.dataset.idx);
    // 如果点击的是已经选中的就不再发送请求
    if (leftSelectedIdx == selectIdx) {
      return;
    }
    var temArray = this.data.leftTabArray;
    // 取消选中
    temArray[leftSelectedIdx].selected = false;
    // 记录当前选中的行
    leftSelectedIdx = selectIdx;
    // 改变当前选中的行的样式
    temArray[leftSelectedIdx].selected = true;

    this.setData({
        leftTabArray: temArray
    });

    //清除右侧数组中的数据
    this.setData({
      rightTabArray : []
    });
    currentPage = 1;
    //重新加载右侧数组中的数据
    // this.loadRightTabData(this,this.data.leftTabArray[leftSelectedIdx].id);
  },
  onPullDownRefresh:function(){
  },
  onReachBottom:function(){
  }

})