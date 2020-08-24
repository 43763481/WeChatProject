import { request } from "../../request/index.js";

Page({
  data: {
     tabs:[
       {
         id:0,
         value:"综合",
         isActive:true
       },
       {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      },
     ],
     goodsList:[]
  },

  //接口要的参数
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize: 10
  },

  //总页数
  totalPages:1,


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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.QueryParams.cid = options.cid||"";
     this.QueryParams.query = options.query||"";
     this.getGoodsList();
  },

  //获取商品列表数据
  async getGoodsList(){
      const res = await request({url:"/goods/search",data:this.QueryParams});
      //获取总条数
      const total = res.total;
      //计算总页数
      this.totalPages = Math.ceil(total / this.QueryParams.pagesize);
      this.setData({
        //拼接数组
        goodsList:[...this.data.goodsList,...res.goods]
      })

      //关闭下拉刷新的窗口
      wx.stopPullDownRefresh();
  },

  /*
     1 用户上滑页面 滚动条触底 开始加载下一页数据
     2 判断有没有下一页数据
          1 获取总页数   total(总条数) 总页数 = Math.ceil( total / pagesize )
          2 获取当前页码 pagenum
          3 要判断当前页码是否大于等于总页数
     3 假如，当当前页码大于等于总页数 没有下一页数据 弹出一个提示
     4 假如还有下一页数据 来加载下一页数据 
          1 当前页码 ++ 
          2 重新发送请求
          3 数据请求回来 要对data中的数组 进行 数组拼接
  */
  //页面上滑事件 滚动条触底事件 onReachBottom() //微信小程序提供的方法
  onReachBottom(){
    //1 判断还有没有下一页数据
    if(this.QueryParams.pagenum >= this.totalPages){
      //没有下一页数据
      wx.showToast({title : '没有下一页商品了'});
    }else{
      //还有下一页数据
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },

  /* 下拉刷新页面
       1 触发下拉刷新页面 需要在页面的json文件中开启一个配置项目
       2 重置 数据 数组
       3 重置页码 设置为1
       4 重新发送请求  
       5 数据请求回来 需要手动关闭等待效果     
  */
  //下拉刷新事件
  onPullDownRefresh(){
    this.setData({
      goodsList:[]
    });
    this.QueryParams.pagenum = 1,
    this.getGoodsList();
  }

  //加载页面时的圈圈效果
})