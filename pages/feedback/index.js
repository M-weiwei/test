// pages/feedback/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [{
                id: 0,
                value: '体验问题',
                isActive: true
            },
            {
                id: 1,
                value: '商品，商家投诉',
                isActive: false
            },
        ],
        chooseImgs: [],
        textVal: ""
    },
    UpLoadImg: [],
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
    handleChooseImg() {
        wx.chooseImage({
            count: 9,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: (result) => {
                console.log(result);
                this.setData({
                    chooseImgs: [...this.data.chooseImgs, ...result.tempFilePaths]
                })
            },
            fail: () => {},
            complete: () => {}
        });

    },
    handleRemoveImg(e) {
        const {
            index
        } = e.currentTarget.dataset
        let {
            chooseImgs
        } = this.data
        chooseImgs.splice(index, 1)
        this.setData({
            chooseImgs
        })
    },
    handleText(e) {
        this.setData({
            textVal: e.detail.value
        })
    },
    handleFromSumbit() {
        const {
            textVal,
            chooseImgs
        } = this.data
        if (!textVal.trim()) {
            wx.showToast({
                title: '输入不合法',
                icon: 'none',
                mask: true,
            });

            return
        }
        wx.showLoading({
            title: '正在加载中',
            mask: true,

        });
        if (chooseImgs.length != 0) {
            chooseImgs.forEach((v, i) => {
                wx.uploadFile({
                    url: 'http://tu.wlxiu.cn/',
                    filePath: v,
                    name: 'file',
                    formData: {},
                    success: (result) => {
                        let url = JSON.parse(result.data).url
                        this.UpLoadImg.push(url)
                        if (i === chooseImgs.length - 1) {
                            wx.hideLoading();
                            this.setData({
                                textVal: '',
                                chooseImgs: []
                            })
                            wx.navigateBack({
                                delta: 1
                            });
                        }


                    },
                });
            })
        } else {
            wx.hideLoading();
            wx.navigateBack({
                delta: 1
            });

            console.log('提交了文本');
        }


    }
})