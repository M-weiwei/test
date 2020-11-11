// pages/goods_list/index.js
import {
    request
} from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [{
                id: 0,
                value: '综合',
                isActive: true
            },
            {
                id: 1,
                value: '销量',
                isActive: false
            },
            {
                id: 2,
                value: '价格',
                isActive: false
            },
        ],
        goodsList: []
    },
    QueryPaeams: {
        query: '',
        cid: '',
        pagenum: 1,
        pagesize: 10
    },
    totalPages: 1,
    handItemsChange(e) {
        const {
            index
        } = e.detail
        let {
            tabs
        } = this.data
        tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)
        this.setData({
            tabs
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.QueryPaeams.cid = options.cid || ''
        this.QueryPaeams.query = options.query || ''

        this.getGoodsList()
    },
    async getGoodsList() {
        const res = await request({
            url: '/goods/search',
            data: this.QueryPaeams
        })
        const total = res.total
        this.totalPages = Math.ceil(total / this.QueryPaeams.pagesize)
        this.setData({
            goodsList: [...this.data.goodsList, ...res.goods]
        })
        console.log(res);
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        this.setData({
            goodsList: []
        })
        this.QueryPaeams.pagenum = 1
        this.getGoodsList()
        // 关闭下拉窗口
        wx.stopPullDownRefresh()

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (this.QueryPaeams.pagenum >= this.totalPages) {
            wx.showToast({
                title: '没有下一页了',

            });

        } else {
            this.QueryPaeams.pagenum++
            this.getGoodsList()
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})