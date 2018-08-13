// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MuseUI from 'muse-ui';
import Toast from 'muse-ui-toast';
import store from "./store/store.js"
import axios from 'axios'
import Loading from 'muse-ui-loading';
import '../static/js/auto-size.js'
import '../static/css/base.css'
import 'muse-ui/dist/muse-ui.css';
import '../static/css/appbase.css'
import { stringify } from 'querystring';


Vue.use(MuseUI)

Vue.use(Loading)

const toastConfig = {
  position: 'top',               // 弹出的位置
  time: 1000,                       // 显示的时长
  closeIcon: 'close',               // 关闭的图标
  close: false,                      // 是否显示关闭按钮
  successIcon: 'check_circle',      // 成功信息图标
  infoIcon: 'info',                 // 信息信息图标
  warningIcon: 'priority_high',     // 提醒信息图标
  errorIcon: 'warning'              // 错误信息图标
};
Vue.use(Toast,toastConfig)

Vue.prototype.$http = axios

Vue.config.productionTip = false

//定义全局默认配置
axios.defaults.headers.common['Authorization'] = store.state.token;

axios.interceptors.request.use(
    config => {
        if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = `Bearer ${store.state.token}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
});



axios.interceptors.response.use(function (response) {
    console.log('');
    console.log('');
    console.log('/* ****************************************** */');
    console.log('请求接口地址=>'+response.config.url);
    console.log('请求响应');
    console.log(response);
     
// token 已过期，重定向到登录页面
/* if (response.data.code == 4){
    //localStorage.clear()
    console.log(1111)
    router.replace({
                    path: '/login'
                })
}  */
return response
}, function (error) {
         let status = error.response.status;
        if(status && status == 401){
            router.replace({
                path: '/login'
            })
            return;
        }
        if(status && status == 500){
            let msg = error.response.data.message;
            console.log(status+'=>:'+msg);
            return;
        }
        let msg = error.response.data.errors;
        let allmsg = ''
        for(let item in msg){
            let itemmsg = status +":" + item +"=>"+msg[item];
            allmsg += itemmsg;
        }
        console.log('-------------------------------------------------');
        console.log(allmsg);
        console.log('-------------------------------------------------');
     
    
// Do something with response error
return Promise.reject(error)
})








/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
