// pages/demo04/demo04.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     num : 0
  },
  //小程序中赋值不是用this.num = e.detail.value
  //要用setData方法
  handleInput(e){
    this.setData({
      num: e.detail.value,
    })
  },
  //加减按钮
  handletap(e){
    const operation = e.currentTarget.dataset.operation;
    this.setData({
      num: this.data.num + operation,
    })
  }
})