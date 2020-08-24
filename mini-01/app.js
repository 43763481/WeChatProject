//app.js
App({
  //1 应用第一次启动时会触发的事件
  onLaunch: function () {
    //在应用第一次启动时 获取用户的个人信息
    console.log("onLaunch");

    //js方式跳转 不能触发onPageNotFound
    // wx.navigateTo({
    //   url: '/11/22/33',
    // });
  },

  //2 应用被用户看到
  onShow(){
    //对整个应用的数据或者页面效果进行重置
    console.log("onShow");
  },

  //3 应用 被隐藏了
  onHide(){
    //暂停或者清除定时器
    console.log("Hide");
  },

  //4 应用代码发生报错时
  onError(err){
    //在应用发生代码报错时收集用户的错误信息 通过用户错误信息 通过异步请求 将错误信息发送到后台去
    console.log(err);
  },

  //5 页面找不到触发 应用第一次启动的时候 如果找不到第一个入口页面 才会触发
  onPageNotFound(){
    //如果页面不存在 通过js方式来重新跳转页面 重新跳到第二个首页 不能跳到tabbr页面 与导航组件类似
    wx.navigateTo({
      url: '/pages/demo09/demo09',
    });

     console.log("onPageNotFound");
  },

  globalData: {
    userInfo: null
  }
})