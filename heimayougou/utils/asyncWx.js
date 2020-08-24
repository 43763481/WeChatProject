/* promise形式的getSetting */
export const getSetting=()=>{
    return new Promise((resolve,reject)=>{
        wx.getSetting({
            success: (result)=>{
                resolve(result);
            },
            fail: (err)=>{
                reject(err);
            },
        });
    })
}

/* promise形式的chooseAddress */
export const chooseAddress=()=>{
    return new Promise((resolve,reject)=>{
        wx.chooseAddress({
            success: (result)=>{
                resolve(result);
            },
            fail: (err)=>{
                reject(err);
            },
        });
    })
}

/* promise形式的 openSetting */
export const openSetting=()=>{
    return new Promise((resolve,reject)=>{
        wx.openSetting({
            success: (result)=>{
                resolve(result);
            },
            fail: (err)=>{
                reject(err);
            },
        });
    })
}

/* promise形式的弹窗 */
//4.1 弹窗提示
export const showModal=({content})=>{
    return new Promise((resolve,reject)=>{
        wx.showModal({
            title: '提示',
            content: content,
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '确定',
            confirmColor: '#3CC51F',
            success: (result) => {
              resolve(result);
            },
            fail:(err)=>{
              reject(err);
            }
          });
    })
}

// 没有收货地址弹窗
export const showToast=({content})=>{
    return new Promise((resolve,reject)=>{
        wx.showToast({
            title: content,
            icon:'none',
            success: (result)=>{
              resolve(result);
            },
            fail: (err)=>{
              reject(err);  
            },
          });
    })
}


// login
export const login=()=>{
    return new Promise((resolve,reject)=>{
        wx.login({
            timeout:10000,
            success: (result)=>{
              resolve(result);
            },
            fail: (err)=>{
              reject(err);  
            },
          });
    })
}

// 支付
export const requestPayment=(pay)=>{
    return new Promise((resolve,reject)=>{
        wx.requestPayment({
            ...pay,
            success: (result)=>{
                resolve(result);
            },
            fail: (err)=>{
                reject(err);  
            },
        });
    })
}