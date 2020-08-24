import { request } from "../../request/index"

/*
   1 输入框绑定 值改变事件 input事件
     1 获取到输入框的值
     2 合法性判断
     3 检验通过 把输入框的值 发送到后台
     4 返回的数据打印到页面上
   2 防抖功能 (使用定时器实现) 节流
     0 防抖 一般用在输入框中 防止重复输入 重复发送请求 节流 一般是用在页面的上拉和下拉
     1 定义全局定时器id 
     
*/
Page({
  data: {
     goods:[],
     //取消按钮 是否显示
     isFocus:false,
     //输入框的值
     inpValue:""
  },
  TimeId:-1,

  //输入框值改变事件
  handleInput(e){
     //1 获取输入框的值
     const {value} = e.detail;
     //2 检查合法性
     if(!value.trim()){
       //值为空 不合法 (输入框没有值)
       this.setData({
         goods:[],
         isFocus:false
       });
       return;
     };

     this.setData({
       isFocus:true
     })

     //防抖功能（以免输入一个东西就发送请求）
     clearTimeout(this.TimeId);
     this.TimeId = setTimeout(()=>{
         //3 准备发送请求获取数据
         this.qsearch(value); 
     },1000);
  },

  //发送请求获取搜索数据
  async qsearch(query){
     const res = await request({url:"/goods/qsearch",data:{query}});
     this.setData({
       goods:res
     })
  },

  //点击取消按钮
  handleCancel(){
      this.setData({
        inpValue:"",
        goods:[],
        isFocus:false,
      })
  }
})