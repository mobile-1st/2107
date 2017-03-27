# 2107

2107微信小程序运行环境：

2107项目源码：[下载地址](https://github.com/mobile-1st/2107.git)

微信web开发者工具：[下载地址](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html)

建议用tag v1.2.0 版本进行学习，因为结构比较清晰简单，下载成功后用微信web开发者工具打开，就可以实际动手修改试验查看。

系统架构图说明：

![system](http://blog.sunzhongmou.com/wp-content/uploads/2017/03/2107-system.png)

如图所示，程序service整体以es6-promise为基础，打造了两套请求方案，分别是HttpService和HttpResource，给程序提供更多选择，两者对比，前者更便向于传统服务，后者偏向于RESTful服务，请根据自己的需求使用。

微信小程序的入口和页面结构相差不大，.json后缀文件为配置文件，.js文件为逻辑文件， .wxss文件为样式文件。

请结合以上帮助查看源码，帮助学习，有问题欢迎留言来信讨论。

## 实际介面截图
<img src="http://blog.sunzhongmou.com/wp-content/uploads/2017/03/IMG_1644.png" width="200" height="300"> | <img src="http://blog.sunzhongmou.com/wp-content/uploads/2017/03/IMG_1645.png" width="200" height="300">

## 上线示例
<img src="http://blog.sunzhongmou.com/wp-content/uploads/2017/03/gh_7d15aa86b75d_1419-2.jpg" width="200" height="200">