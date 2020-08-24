// pages/demo14/demo14.js
Page({
   data:{
     gender: "",
     list:[
       {
         id: 0,
         name: "🍎",
         value: "apple",
       },{
         id: 1,
         name: "🍼",
         value: "milke",
       },{
         id: 2,
         name: "🍌",
         value: "bananer"
       }
     ],
     checkedList:[]
   },
   //单选框选中事件
   handleChange(e){
     //console.log(e);
     let gender = e.detail.value;
     //把值赋值给data
     this.setData({
       gender : gender
     })
   },
   //复选框选中事件
   handleItemChange(e){
      //console.log(e);
      //1.获取被选中复选框的值
      const checkedList = e.detail.value;
      this.setData({
        checkedList: checkedList,
      })
   }
})