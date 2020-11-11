// pages/category/index.js
import {
    request
} from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 左侧菜单数据
        leftMenuList: [],
        rightContent: [],
        currentIndex: 0,
        scorrTop: 0
    },
    // 接口返回数据
    Cates: [],
    // 获取分类数据
    async getCates() {
        // request({
        //         url: '/categories'
        //     })
        //     .then(result => {
        //         this.Cates = result.data.message
        //         wx.setStorageSync('cates', {
        //             time: Date.now(),
        //             data: this.Cates
        //         });
        //         // 右边数据
        //         let leftMenuList = this.Cates.map(v => v.cat_name)
        //         // 左边数据
        //         let rightContent = this.Cates[0].children
        //         this.setData({
        //             leftMenuList,
        //             rightContent
        //         })
        //     })
        const res = await request({
            url: '/categories'
        })
        this.Cates = res
        wx.setStorageSync('cates', {
            time: Date.now(),
            data: this.Cates
        });
        // 右边数据
        let leftMenuList = this.Cates.map(v => v.cat_name)
        // 左边数据
        let rightContent = this.Cates[0].children
        this.setData({
            leftMenuList,
            rightContent
        })
    },
    handleItemtap(e) {
        const {
            index
        } = e.target.dataset
        let rightContent = this.Cates[index].children

        this.setData({
            currentIndex: index,
            rightContent,
            scorrTop: 0
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const Cates = wx.getStorageSync('cates');
        if (!Cates) {
            this.getCates()
        } else {
            if (Date.now() - Cates.time > 1000 * 10) {
                this.getCates()
            } else {
                this.Cates = Cates.data
                let leftMenuList = this.Cates.map(v => v.cat_name)
                // 左边数据
                let rightContent = this.Cates[0].children
                this.setData({
                    leftMenuList,
                    rightContent
                })
            }

        }
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

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})