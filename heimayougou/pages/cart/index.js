import { getSetting,chooseAddress,openSetting,showModal,showToast } from "../../utils/asyncWx.js";

Page({
  data:{
    address:{},
    cart:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0,
  },
  
  //获取收货地址按钮
  /* 1 绑定点击事件
     2 调用小程序内置的 api 获取用户的收货地址 wx.chooseAddress   
     3 获取用户对小程序所授予获取地址的权限状态 scope（取消还是确定）
         1 假设用户点击确定 scope值为true 
         2 假设用户点击取消 scope值为false    
              诱导用户打开授权          
         3 假设用户从来没有调用过收货地址的api scope值为undefined
     4 把获取到的收货地址存到缓存中去    
  */

  async handleChooseAddress(){
    //原生方式
    // wx.getSetting({
    //   success: (result)=>{
    //     // 2 获取权限状态 (只要发现一些属性名很怪异的时候 都要使用[]形式来获取属性值)
    //     const scopeAddress = result.authSetting["scope.address"];
    //     if(scopeAddress === true || scopeAddress===undefined){
    //       wx.chooseAddress({
    //         success: (result1)=>{
    //            console.log(result1);
    //         },
    //       });
    //     }else{
    //       //3 用户以前拒绝过授予权限 先诱导用户打开授权页面
    //       wx.openSetting({
    //         success: (result2) => {
    //           //调用获取收货地址代码
    //           wx.chooseAddress({
    //             success: (result3)=>{
    //                console.log(result3);
    //             },});
    //         },
    //       });
    //     }
    //   },
    // });
    
    //增强方式 在utils文件夹下的asyncWx.js
    try{
    //1 获取权限状态
    const res1 = await getSetting();
    const scopeAddress = res1.authSetting["scope.address"];
    //2 判断权限状态
    if(scopeAddress === false){
      //3 诱导用户打开授权页面
      await openSetting();
    }
    //3 调用获取收货地址的代码api
    let address = await chooseAddress();
    address.all = address.provinceName+address.cityName+address.countyName+address.detailInfo;
    //4 加入缓存
    wx.setStorageSync("address", address);
    }catch(error){
      console.log(error)
    }
  },


  /*
     商品的选中
     1 绑定change事件
     2 获取到被修改的商品对象
     3 把商品对象的选中状态取反
     4 重新填充会data中和缓存中
     5 重新计算全选，总价格，总数量。。。
  */
  handleItemChange(e){
    //获取被修改的商品的id
    const goods_id = e.currentTarget.dataset.id;
    //获取购物车数组
    let {cart} = this.data;
    //找到被修改的商品对象
    let index = cart.findIndex(v=>v.goods_id===goods_id);
    //选中状态取反
    cart[index].checked=!cart[index].checked;

    this.setCart(cart);
  },

  //设置购物车状态 同时 重新计算底部工具栏数据(全选，总价格，总数量)
  setCart(cart){
    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v=>{
      if(v.checked){
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      }else{
        allChecked = false;
      }
    });

    //判断cart是否为空
    allChecked = cart.length!=0?allChecked:false; 

    //把购物车数据重新设置回data中和缓存中
    this.setData({
      cart,
      totalPrice,
      totalNum,
      allChecked,
    });
    wx.setStorageSync("cart", cart);
  },


  onShow(){
    /* 页面加载完毕
     1 获取本地存储中的地址数据
     2 把数据 设置给data中的变量
    */ 
    const address = wx.getStorageSync("address");

    /*
       获取购物车数据
       1 获取缓存中的购物车数组
       2 把购物车数据填充到data中
    */
    const cart = wx.getStorageSync("cart")||[];

     /*
        全选的实现 数据的展示
        1 onShow 获取缓存中的购物车数组
        2 根据购物车中的商品数据 所有商品都被选中 checked=true 全选被选中
           every()数组方法 会遍历 会接收一个回调函数 那么每一个回调函数都返回true 那么every方法的返回值就是true
           如果是空数组 返回的也是true
    */
    //const allChecked = cart.length?cart.every(v=>v.checked):false;  //因为后面计算总价格和总数量也要遍历 放到后面一起


    /* 总价格和总数量
     1 都需要商品被选中 
     2 获取到购物车数组 进行遍历 遍历过程中判断商品是否被选中
         总价格 商品单价 * 商品数量
         总数量 += 商品数量
    */  
    this.setData({address});
    this.setCart(cart);
  },

  /* 
     全选和反选功能
     1 给全选复选框绑定事件 change
     2 获取 data中的全选变量
     3 直接取反 allChecked=!allChecked
     4 遍历购物车数组 让里面的商品选中状态跟随allChecked改变
     5 把购物车数组和选中状态重新设置回data中和缓存中 
  */
  handleItemAllCheck(){
    //1 获取data中的数据
    let {cart,allChecked} = this.data;
    //2 修改值
    allChecked = !allChecked;
    //3循环修改cart数组中的商品选中状态
    cart.forEach(v=>v.checked=allChecked);
    //把修改后的值填充回Data和缓存里
    this.setCart(cart);
  },

  /*
     商品数量的编辑功能
     1 "+" "-" 绑定同一个点击事件 区分的关键 自定义属性
        "+" "+1"
        "-" "-1"
     2 传递被点击的商品id goods_id
     3 获取到data中的购物车数组 来获取需要被修改的商品对象
     4 直接修改商品对象的数量
     5 当购物车的数量等于1同时用户点击的是"-"按钮 弹窗提示用户是否要删除 
         确定 直接执行删除
         取消 什么都不干 
     6 把购物车数组重新设置回data和缓存中 this.setCart()   
  */
  async handleItemNumEdit(e){
     //1 获取传递来的参数
     const {operation,id} = e.currentTarget.dataset;
     //2 获取购物车数组
     let {cart} = this.data;
     //3 找到需要修改的商品的索引
     const index = cart.findIndex(v=>v.goods_id===id);
     //4 删除商品
     if(cart[index].num === 1 && operation===-1){
      const result = await showModal({content:'你确定要删除该商品吗'});
      if(result.confirm){
        cart.splice(index,1);
        this.setCart(cart);
      }
     }else{
       //5 开始进行修改数量
       cart[index].num+=operation;
     
       this.setCart(cart); 
     }
  },

  /*
     商品点击结算功能
     1 判断有没有收货地址信息
     2 判断用户有没有选购商品
     3 经过以上验证 跳转到支付页面
  */
  async handlePay(){
     //1 判断收货地址
     const {address,totalNum} = this.data;
     if(!address.userName){
       await showToast({content:'你还没有选择收货地址'});
       return;
     }
     //2 判断用户有没有选购商品
     await showToast({content:'你还没有选购商品'})
     if(totalNum === 0){
       return;
     }
     //3 跳转到支付页面
     wx.navigateTo({
       url: '/pages/pay/index',
     });
  }
})