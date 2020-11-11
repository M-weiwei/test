// pages/cart/index.js
import {
    getSetting,
    openSetting,
    chooseAddress,
    showModal,
    showToast,
    requestPayment
} from '../../utils/asyncWx.js'
import regeneratorRuntime from '../../lib/runtime/runtime';
import {
    request
} from '../../request/index.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        address: {},
        cart: [],

        totalPrice: 0,
        totalNum: 0
    },
    // 点击支付
    async handleOrderPay() {
        try {
            const token = wx.getStorageSync('token');
            if (!token) {
                wx.navigateTo({
                    url: '/pages/auth/index'
                });
                return
            }
            const order_price = this.data.totalPrice
            const consignee_addr = this.data.address.all
            const cart = this.data.cart
            let goods = []
            cart.forEach(v => goods.push({
                goods_id: v.goods_id,
                goods_number: v.num,
                goods_price: v.goods_price
            }))
            const orderParams = {
                order_price,
                consignee_addr,
                goods
            }
            const {
                order_number
            } = await request({
                url: '/my/orders/create',
                methed: 'POST',
                data: orderParams,
            })
            const {
                pay
            } = await request({
                url: '/my/orders/req_unifiedorder',
                methed: 'POST',
                data: {
                    order_number
                }
            })
            // 发起微信支付
            await requestPayment(pay)
            //    查询订单状态
            const res = await request({
                url: '/my/orders/chkOrder',
                methed: 'POST',
                data: {
                    order_number
                }
            })
            await showToast({
                title: '支付成功'
            })
            let newcart = wx.getStorageSync('cart')
            newcart = newcart.filter(v => !v.checked)
            wx.setStorageSync('cart', newcart);
            wx.navigateTo({
                url: '/pages/order/index',
            });

        } catch (error) {
            await showToast({
                title: '支付失败'
            })

            console.log(error);
        }
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        const address = wx.getStorageSync('address');
        let cart = wx.getStorageSync('cart') || [];
        cart = cart.filter(v => v.checked)
        this.setData({
            address
        })
        let totalPrice = 0;
        let totalNum = 0
        cart.forEach(v => {
            totalPrice += v.num * v.goods_price
            totalNum += v.num
        })
        this.setData({
            address,
            cart,
            totalPrice,
            totalNum
        })
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