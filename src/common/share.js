import wx from 'weixin-js-sdk'
import { getShareConfig } from '../http/http.js'

/**全局分享*/
export function share(url,invate_code,img){
  getShareConfig({ url: url }).then(res => {
    //获取openid等
    let wx = {
      appId: res.data.appid,
      timestamp: res.data.timestamp,
      nonceStr: res.data.nonceStr,
      signature: res.data.signature
    };
    wxInit(wx, invate_code, img);
  });
}


export function wxInit(sd,invate_code,shareimg){
    // alert(window.location.href)
    let links = null
    if(invate_code != ''){
      links=window.location.href+"?invate_code="+invate_code;  //分享出去的链接
    }else{
      links=window.location.href  //分享出去的链接
    }
   
   let title='向您推荐：冻品聚汇';  //分享的标题
   let desc='全国首家冷冻食品B2C供应连接平台，汇集30000个冷冻制品厂家，共计25000多种冻品，一站式【自营冻品采购平台】，价格更低，更便捷，成都地区送货上门，全国物流，让您的经营省时、省力、更省钱，我们的口号是冻品一网打尽'; //分享的详情介绍
   let imgUrl=shareimg; 
     wx.config({
       debug: false,
       appId: sd.appId,
       timestamp: sd.timestamp,
       nonceStr: sd.nonceStr,
       signature: sd.signature,
       jsApiList: [
         'onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone'
       ]
     }); 
     wx.ready(function () {
      wx.onMenuShareTimeline({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link:links, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function () {
           alert("分享到朋友圈成功")
         /*  Toast({
                      message: "成功分享到朋友圈"
                    }); */
        },
        cancel: function () {
           alert("分享失败,您取消了分享!")
          /* Toast({
                      message: "分享失败,您取消了分享!"
                    }); */
        }
      });
      //微信分享菜单测试
      wx.onMenuShareAppMessage({
        title:title, // 分享标题
        desc: desc, // 分享描述
        link: links, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function () {
           alert("成功分享给朋友")
         /*  Toast({
                      message: "成功分享给朋友"
                    }); */
        },
        cancel: function () {
           alert("分享失败,您取消了分享!")
          /* Toast({
                      message: "分享失败,您取消了分享!"
                    }); */
        }
      });

      wx.onMenuShareQQ({
        title:title, // 分享标题
        desc: desc, // 分享描述
        link:links, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function () {
           alert("成功分享给QQ")
         /*  Toast({
                      message: "成功分享到QQ"
                    }); */
        },
        cancel: function () {
           alert("分享失败,您取消了分享!")
         /*  Toast({
                      message: "分享失败,您取消了分享!"
                    }); */
        }
      });
      wx.onMenuShareWeibo({
        title:title, // 分享标题
        desc: desc, // 分享描述
        link: links, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function () {
           alert("成功分享给朋友")
          /* Toast({
                      message: "成功分享到腾讯微博"
                    }); */
        },
        cancel: function () {
           alert("分享失败,您取消了分享!")
          /* Toast({
                      message: "分享失败,您取消了分享!"
                    }); */
        }
      });
      wx.onMenuShareQZone({
        title:title, // 分享标题
        desc: desc, // 分享描述
        link: links, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function () {
           alert("成功分享给朋友")
          /* Toast({
                      message: "成功分享到QQ空间"
                    }); */
        },
        cancel: function () {
           alert("分享失败,您取消了分享!")
         /*  Toast({
                      message: "分享失败,您取消了分享!"
                    }); */
        }
      });
     });
     wx.error(function(res){
       // alert("error")
       // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
     });
  }