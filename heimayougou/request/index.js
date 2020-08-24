//同时发送异步代码的次数
let ajaxTimes = 0 ;
export const request=(params)=>{
    //判断url中是否带有字符串 /my/ 请求的是私有的路径 要带上header请求头
    let header = {...params.header};
    if(params.url.includes("/my/")){
        //拼接header 带上token
        header["Authorization"]=wx.getStorageSync("token");
    } 

    ajaxTimes++;
    //显示加载中效果 
    wx.showLoading({
        title: "加载中",
        mask: true
    })

    //定义公共的url
    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
    //resolve成功回调函数 reject失败回调函数
    return new Promise((resolve,reject)=>{
        wx.request({
           ...params,
           header:header,
           url: baseUrl + params.url,
           success:(result)=>{
               resolve(result.data.message);
           },
           fail:(err)=>{
               reject(err);
           },
           complete:()=>{
               ajaxTimes--;
               if(ajaxTimes === 0){
                   //所有请求都成功后关闭正在等待图标
                   wx.hideLoading();
               }
           }
        });
    })
}