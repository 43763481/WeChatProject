// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表（里面存放的是 要从父组件中接收的数据）
   */
  properties: {
      // //要接收的数据的名称
      // aaa: {
      //   //type属性 表示的是要接收的数据的类型
      //   type:String,
      //   //value 表示数据的默认值
      //   value:""
      // } 
      tabs:{
        type:Array,
        value:[]
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
     
  },

  /**
   1 页面.js文件中 存放页面回调函数时 存放在data同层级下 组件必须写在methods块中
   */
  methods: {
    hanldeItemTap(e){
        //console.log("点我试试")
        /**
         * 1 绑定点击事件
         * 2 获取被点击的索引
         * 3 获取原数组
         * 4 对数组循环(除了被点击其他的isActive属性变为false)
         * 5 点击事件触发的时候 触发父组件中的自定义事件 同时传递数据 给父组件
         *   this.triggerEvent("父组件自定义事件的名称"，要传递的参数)
         */
         const {index} = e.currentTarget.dataset;
         //5. 触发父组件中的自定义事件 同时传递数据 给父组件
         this.triggerEvent("itemChange",{index});


         //3.获取data中的原数组
         //解构 对 复杂类型进行结构的时候 复制了一份 变量的引用而已
         //let {tabs} = this.data;  //和 let tabs=this.data.tabs

         //4.循环数组
         //tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
         
         
         //  this.setData({   
         //    tabs
         //  })
    },
  }
})
