
Page({
  data: {
    filePath:null,
  },
  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success:  (res) => {
        wx.showLoading({
          title: '上传中',
        })
        //值是类似"//http://tmp/wxxxxx.jpg", 这是临时的，该值可以当使用image组件的src的值显示图片来
        const filePath = res.tempFilePaths[0]
        this.setData({
          filePath:filePath,
        })
        console.log(filePath);//http://tmp/wxxxxx.jpg
        //得到图片后缀，如"jpg"
        const suffix = filePath.match(/\.[^.]+?$/)[0]; 
        const cloudPath = new Date().getTime() + suffix;
        //1597823022500.jpg
        console.log(cloudPath);
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            /* res的值是 
            {
              errMsg: "cloud.uploadFile:ok", 
              fileID: "cloud://wgr-42c92d.7767-wgr-42c92d-1258633686/1597823244928.jpg", 
              statusCode: 204
            }
            基中fileID的值可以当作组件image和cover-image中src的值
            */
            console.log('[上传文件] 成功：', res)
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })
      },
      fail: e => {
        console.error(e)
      }
    })
  },
})
