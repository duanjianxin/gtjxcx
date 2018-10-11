Page({
    data: {
        text: "This is page data."
    },
    onLoad: function (options) {
        // 在页面加载时进行一些初始化
    },
    onReady: function () {
        // 当页面准备
    },
    onShow: function () {
        // 页面show.
        // 保持屏幕常亮
        wx.setKeepScreenOn({
            keepScreenOn: true
        });
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭时。
    },
    onPullDownRefresh: function () {
        // 下拉时。
    },
    onReachBottom: function () {
        // 页面到达底部时执行某些操作。
    },
    onPageScroll: function () {
        // 页面滚动时执行某些操作
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return {
            // title: '直播播放器',
            // path: '/pages/play/play',
            // path: '/pages/main/main',
            // imageUrl: 'https://mc.qcloudimg.com/static/img/dacf9205fe088ec2fef6f0b781c92510/share.png'
        };
    }
});