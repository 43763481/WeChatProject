// pages/demo15/demo15.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        name:"首页",
        isActive:true
      },
      {
        id:1,
        name:"原创",
        isActive:false
      },
      {
       id:2,
       name:"分类",
       isActive:false
     },
     {
       id:3,
       name:"关于",
       isActive:false
     }
    ]
  },

  //自定义事件 用来接收子组件传递的数据的
  handleItemChange(e){
    //接收传递过来的参数
    const {index} = e.detail;
    
    //3.获取data中的原数组
    let {tabs} = this.data;  

    //4.循环数组
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
         
         
    this.setData({   
      tabs
    })
  }
})