//Page Object
import {
    request
} from '../../request/index.js'
Page({
    data: {
        // 轮播图数组
        swiperList: [],
        // 导航数组
        cateList: [],
        // 楼层数据
        floorList: []
    },
    //options(Object)
    onLoad: function (options) {
        this.getSwiperList()
        this.getCateList()
        this.getFloorList()
    },
    // 获取轮播图方法
    getSwiperList() {
        request({
                url: '/home/swiperdata'
            })
            .then(result => {
                this.setData({
                    swiperList: result
                })
            })
    },
    // 获取分类数据
    getCateList() {
        request({
                url: '/home/catitems'
            })
            .then(result => {
                this.setData({
                    cateList: result
                })
            })
    },
    // 获取楼层数据
    getFloorList() {
        request({
                url: '/home/floordata'
            })
            .then(result => {
                result.forEach(v => {
                    v.product_list.map(item => {
                        return item.navigator_url = '/pages/goods_list/index?' + item.navigator_url.substring(18, item.navigator_url.length)
                    })
                })

                this.setData({
                    floorList: result
                })
            })
    },
    onReady: function () {

    },
    onShow: function () {

    },
    onHide: function () {

    },
    onUnload: function () {

    },
    onPullDownRefresh: function () {

    },
    onReachBottom: function () {

    },
    onShareAppMessage: function () {

    },
    onPageScroll: function () {

    },
    //item(index,pagePath,text)
    onTabItemTap: function (item) {

    }
});