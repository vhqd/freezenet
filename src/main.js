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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
