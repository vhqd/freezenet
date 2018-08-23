import { AddCarShop , getOrders , getWXPayInfo , deleteOrder , cancelOrder } from '../http/http.js'
import store from "../store/store.js"
import QS from 'qs'


/**微信支付*/
export function WXPay(id){
    getWXPayInfo(id).then(res => {
        console.log('微信订单提交获取支付参数');
        console.log(res);
        let opthions = {
            appId: res.data.data.info.appId,
            timeStamp: res.data.data.info.timeStamp,
            nonceStr: res.data.data.info.nonceStr,
            package: res.data.data.info.package,
            signType: res.data.data.info.signType,
            paySign: res.data.data.info.paySign
        }
         if (typeof window.WeixinJSBridge === 'undefined') {
            if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', function () { onBridgeReady(opthions) }, false)
            } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', function () { onBridgeReady(opthions) })
            document.attachEvent('onWeixinJSBridgeReady', function () { onBridgeReady(opthions) })
            }
        } else {
            onBridgeReady(opthions)
        }
    })
}
function onBridgeReady (params) {
    window.WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
            'appId': params.appId, // 公众号名称，由商户传入
            'timeStamp': params.timeStamp, // 时间戳，自1970年以来的秒数
            'nonceStr': params.nonceStr, // 随机串
            'package': params.package,
            'signType': params.signType, // 微信签名方式：
            'paySign': params.paySign // 微信签名
        },
        function (res) {
            console.log('支付之后的回调');
            console.log(res);
            //location.href = params.Url
        }
    )
}


/**移除一个常购数据*/
export function removeOfenBuyData(item,data){
    let goods_ids = data[0].goods_id;
    let id = item.id;
    let indexs = 0 ;
    for(let ite in goods_ids){
        if(id == goods_ids[ite]){
            indexs = ite
        }
    }
    data[0].count.splice(indexs,1);
    data[0].goods_id.splice(indexs,1);
    data[0].single_price.splice(indexs,1);
    this.addcar(data[0],1)
}

/**添加一个常购数据*/
export function setOfenBuyData(item,data){
    data[0].goods_id = [];
    data[0].single_price = [];
    data[0].count = [];
    data[0].sum_price = 0;
    let sum_price = data[0].sum_price;
    data[0].goods_id.push(item.id);
    data[0].single_price.push(item.goods_price);
    data[0].count.push(1);//这里只能push=>1个数量
    data[0].sum_price = item.num*item.goods_price + sum_price;
    addcar(data[0],2)
}

/*添加购物车*/
function addcar(data,minusORplus) {
    AddCarShop(QS.stringify(data)).then(res=>{
        //设置导航购物车数量
        if(minusORplus == 1){
            store.commit('editCarnum', store.state.count - 1);
        }else{
            store.commit('editCarnum', store.state.count + 1);
        }
        
    })
}

/**获取所有订单*/
export function getAllOrders(){
    return getOrders(999, 1, 0).then(res => {
        return res
    });
}

//获取地址栏参数，name:参数名称
export function getUrlParms(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)
    return unescape(r[2]);
    return null;
}
