/*
    1 点击 "+" 按钮 触发tap点击事件
      1 调用小程序内置的选择图片的api
      2 获取到图片的路径 数组
      3 把图片路径都存入到data的变量中
      4 页面根据图片数组进行循环显示 自定义组件
    2 点击 自定义图片 组件
      1 获取被点击元素的索引
      2 获取data中的图片数组
      3 根据索引在数组中删除对应的元素
      4 把数组重新设置回data中 
    3 当用户点击提交按钮
      1 获取文本域内容
        1.1 data中定义变量 表示 输入框内容
        1.2 文本域 绑定输入事件 事件触发的时候 把输入框的值 存入到变量中 
      2 对这些内容 合法性验证
      3 验证通过 用户选择的图片 上传到专门的图片服务器 返回图片外网链接
        3.1 遍历图片数组
        3.2 挨个上传
        3.3 自己再维护图片数组 存放图片上传后的外网链接
      4 文本域 和 图片的外网路径 一起提交到服务器（前端模拟，并不会发送到后台）
      5 清空当前页面返回上一页   
*/
Page({
  data: {
    tabs:[
      {
        id:0,
        value:"体验问题",
        isActive:true
      },
      {
       id:1,
       value:"商品、商家投诉",
       isActive:false
     },
    ],
    //被选中的图片路径数组
    chooseImgs:[],
    //文本域内容
    textVal:""
  },

  //外网图片路径数组
  UpLoadImgs:[],

  //标题点击事件 从子组件传递过来的
  handleTabsItemChange(e){
    //1 获取被点击的标题索引
    const {index} = e.detail;
    //2 修改源数组
    let {tabs} = this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    //3 赋值到data中
    this.setData({
      tabs
    }) 
  },

  //点击 "+" 选择图片事件
  handleChooseImg(){
    //1 调用小程序内置的选择图片api
    wx.chooseImage({
      //同时选中的图片的数量
      count: 9,
      //图片格式 原图 压缩
      sizeType: ['original','compressed'],
      //图片的来源 相册 相机
      sourceType: ['album','camera'],
      success: (result)=>{
         this.setData({
           //图片数组反复拼接
           chooseImgs:[...this.data.chooseImgs,...result.tempFilePaths],
         })
      },
    });
  },

  //点击自定义图片组件(删除图片)
  handleRemoveImg(e){
    //2 获取被点击的组件的索引
    const {index} = e.currentTarget.dataset;
    //3 获取data中的图片数组
    let {chooseImgs} = this.data;
    //4 删除元素
    chooseImgs.splice(index,1);
    this.setData({
      chooseImgs
    })
  },

  //文本域输入事件
  handleTextInput(e){
     this.setData({
       textVal:e.detail.value,
     })
  },

  //提交按钮点击事件
  handleFormSubmit(){
    //1 获取文本域内容
    const {textVal,chooseImgs} = this.data;
    //2 合法性验证
    if(!textVal.trim()){
      wx.showToast({
        title: '输入不合法',
        icon: 'none',
        mask: true,
      });
      //不合法
      return;
    };

    //3 准备上传图片到专门的图片服务器
    //上传文件的api不支持多个文件同时上传 可以用遍历数组挨个上传
    //显示正在等待图标
    wx.showLoading({
      title: '正在上传中',
      mask: true,
    });

    //判断有没有需要上传堵塞图片数据
    if(chooseImgs.length != 0 ){
      chooseImgs.forEach((v,i)=>{
        wx.uploadFile({
          //图片要上传到哪里
          url: 'https://images.ac.cn/simple.html',
          //被上传的文件的路径
          filePath: v,
          //上传的文件的名称 后台来获取文件 fie
          name: "file",
          //上传文件顺带的一些文本信息
          formData: {},
          success: (result)=>{
            console.log(result);
            //解析返回的外网图片地址
            //  let url = JSON.parse(result.data);
            //  this.UpLoadImgs.push(url);
            
            //所有的图片都上传完毕的代码
            if(i===chooseImgs.length-1){
              wx.hideLoading();
              console.log("模拟把文本内容和外网图片数据提交到后台")
              //重置页面
              this.setData({
                textVal:"",
                chooseImgs:[],
              });
              //返回上一个页面
              wx.navigateBack({
                delta:1
              });
            }
          }
        });
      }) 
    }else{
      wx.hideLoading();
      console.log("只是提交了文本");
      wx.navigateBack({
        delta: 1
      });
    }
  }
})