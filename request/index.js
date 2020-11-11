let ajaxTimes = 0;
export const request = (params) => {
    // 判断是否需要请求头
    let header = {
        ...params.header
    }
    if (params.url.includes('/my/')) {
        header['Authorization'] = wx.getStorageSync('token');
    }
    // 添加加载图标
    ajaxTimes++
    wx.showLoading({
        title: "加载中",
        mask: true,
    });
    const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            header,
            url: baseUrl + params.url,
            success: (result) => {
                resolve(result.data.message)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {
                ajaxTimes--
                if (ajaxTimes === 0) {
                    wx.hideLoading();

                }

            }
        });

    })
}