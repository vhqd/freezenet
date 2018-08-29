import {
  getToken,
  AddCarShop,
  getOrders,
  getWXPayInfo,
  EditCarShop,
  deleteOrder,
  cancelOrder
} from "../http/http.js";
import router from '../router/index.js'
import store from "../store/store.js";
import QS from "qs";

/**获取token*/
export function getTokens(openid) {
 /*  let str = localStorage.obj;
  let obj = JSON.parse(str); */
  let data = {
    username: openid,
    password: "123456"
  };
  console.log("获取token需要的默认用户信息");
  console.log(data);

  getToken(data).then(res => {
    let token = res.data.data.access_token;
    console.log("获取到的token");
    console.log(token);
    //设置token
    store.commit("set_token", token);
  });
}

/**微信支付*/
export function WXPay(id,count) {
  getWXPayInfo(id).then(res => {
    console.log("微信订单提交获取支付参数");
    console.log(res);
    let opthions = {
      appId: res.data.data.info.appId,
      timeStamp: res.data.data.info.timeStamp,
      nonceStr: res.data.data.info.nonceStr,
      package: res.data.data.info.package,
      signType: res.data.data.info.signType,
      paySign: res.data.data.info.paySign
    };
    if (typeof window.WeixinJSBridge === "undefined") {
      if (document.addEventListener) {
        document.addEventListener(
          "WeixinJSBridgeReady",
          function() {
            onBridgeReady(opthions,count);
          },
          false
        );
      } else if (document.attachEvent) {
        document.attachEvent("WeixinJSBridgeReady", function() {
          onBridgeReady(opthions,count);
        });
        document.attachEvent("onWeixinJSBridgeReady", function() {
          onBridgeReady(opthions,count);
        });
      }
    } else {
      onBridgeReady(opthions,count);
    }
  });
}
function onBridgeReady(params,count) {
  window.WeixinJSBridge.invoke(
    "getBrandWCPayRequest",
    {
      appId: params.appId, // 公众号名称，由商户传入
      timeStamp: params.timeStamp, // 时间戳，自1970年以来的秒数
      nonceStr: params.nonceStr, // 随机串
      package: params.package,
      signType: params.signType, // 微信签名方式：
      paySign: params.paySign // 微信签名
    },
    function(res){     
      if(res.err_msg == "get_brand_wcpay_request:ok" ) {
        router.replace({path:'/paysuccessful'})
      }else{
        router.replace({path:'/payfailure'})
        store.commit("editCarnum", store.state.count - count);
      }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
    }
  );
}

/**移除一个常购数据*/
export function removeOfenBuyData(item, data) {
  let goods_ids = data[0].goods_id;
  let id = item.id;
  let indexs = 0;
  for (let ite in goods_ids) {
    if (id == goods_ids[ite]) {
      indexs = ite;
    }
  }
  data[0].count.splice(indexs, 1);
  data[0].goods_id.splice(indexs, 1);
  data[0].single_price.splice(indexs, 1);
  this.addcar(data[0], 1);
}

/**添加一个购物车数据*/
export function setOfenBuyData(item, data,ite) {
  data[0].goods_id = [];
  data[0].single_price = [];
  data[0].count = [];
  data[0].sum_price = 0;
  data[0].specification_id = [];
  let sum_price = data[0].sum_price;
  data[0].goods_id.push(item.id);
  

  if(item.hasOwnProperty("specifications")){
    data[0].single_price.push(ite.price);
    data[0].specification_id.push(ite.specification_id);
    let amount = ite.num;
    ite.num = amount + 1;
  }else{
    data[0].single_price.push(item.price);
    let amount = item.num;
    item.num = amount + 1;
    //data[0].single_price.push(item.goods_price);
    data[0].specification_id.push(item.specification_id);
  }
  

  data[0].count.push(1); //这里只能push=>1个数量
  data[0].sum_price = item.num * item.goods_price + sum_price;
  console.log('添加到购物车的数据');
  console.log(data[0]);
  
  addcar(data[0], 2);
}

export function jianHotcar(id,data){
  EditCarShop(id , data).then(res => {
    store.commit("editCarnum", store.state.count - 1);
  })
}

/**减少一个购物车数据*/
export function jiancar(item,ite){
  let specification_id ;
  let single_price ;
  if(item.hasOwnProperty("specifications")){
    let amount = ite.num;
    if (amount > 0) {
      ite.num = amount - 1;
    } else {
      ite.num = 0;
    }
    single_price = ite.price;
    specification_id = ite.specification_id;
  }else{
    let amount = item.num;
    if (amount > 0) {
      item.num = amount - 1;
    } else {
      item.num = 0;
    }
    single_price = item.price;
    specification_id = item.specification_id;
  }
  let data = {
    specification_id:specification_id,
    goods_id: item.id,
    single_price: single_price,
    count: 1,
    isadd:0
  };
  EditCarShop(item.id , QS.stringify(data)).then(res => {
    store.commit("editCarnum", store.state.count - 1);
  })
}


/*添加购物车*/
export function addcar(data, minusORplus) {
  AddCarShop(QS.stringify(data)).then(res => {
    //设置导航购物车数量
    if (minusORplus == 1) {
      store.commit("editCarnum", store.state.count - 1);
    } else {
      
      store.commit('setShowText',store.state.addcar);
      store.commit('showInfo');

      store.commit("editCarnum", store.state.count + 1);
    }
  });
}


/**获取所有订单*/
export function getAllOrders() {
  return getOrders(999, 1, 0).then(res => {
    return res;
  });
}

//获取地址栏参数，name:参数名称
export function getUrlParms(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
