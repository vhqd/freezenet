import Vue from 'vue'
import Router from 'vue-router'
import store from "../store/store.js"
import index from '@/components/index/index'
import classification from '@/components/classification/classification'
import oftenbuy from '@/components/oftenbuy/oftenbuy'
import car from '@/components/car/car'
import center from '@/components/center/center'
import searchhome from '@/components/search/searchhome'
import detail from '@/components/detail/detail'
import order from '@/components/order/order'
import address from '@/components/address/address'
import PaySuccessful from '@/components/order/PaySuccessful'
import PayFailure from '@/components/order/PayFailure'
import DressManagement from '@/components/center/dressManagement'
import editdress from '@/components/center/editdress'
import orderlist from '@/components/order/orderlist'
import orderStatus from '@/components/order/orderStatus'
import express from '@/components/order/express'
import phone from '@/components/phone/phone'
import chuanchuan from '@/components/class/chuanchuan'
import hotpot from '@/components/class/hotpot'
import coupons from '@/components/center/coupons'
import hot from '@/components/hot/hot'
import getcoupons from '@/components/center/getcoupons'
import login from '@/components/phone/phone'
import CommonProblems from '@/components/help/CommonProblems'





import test from '@/components/test/test'


Vue.use(Router)

const router =  new Router({
  routes: [
    { path: '/', name: 'index', component: index },//首页
    { path: '/test', name: 'test', component: test },//测试
    { path: '/classification', name: 'classification', component: classification },//分类
    { path: '/oftenbuy', name: 'oftenbuy', component: oftenbuy },//常购清单
    { path: '/car', name: 'car', component: car ,meta: { keepAlive: false }},//购物车组件
    { path: '/center', name: 'center', component: center },//个人中心组件
    { path: '/search', name: 'searchhome', component: searchhome },//搜索组件
    { path: '/detail', name: 'detail', component: detail },//商品详情组件
    { path: '/address', name: 'address', component: address },//收货地址
    { path: '/order',name: 'order',component: order},//订单组件
    { path: '/paysuccessful',name: 'paysuccessful',component: PaySuccessful},//支付成功组件
    { path: '/payfailure',name: 'payfailure',component: PayFailure},//支付失败组件
    { path: '/dressmanagement',name: 'dressmanagement',component: DressManagement},//个人中心地址管理组件
    { path: '/editdress',name: 'editdress',component: editdress},//个人中心管理收货地址
    { path: '/orderlist',name: 'orderlist',component: orderlist},//个人中心订单列表
    { path: '/orderstatus',name: 'orderstatus',component: orderStatus},//订单状态
    { path: '/express',name: 'express',component: express},//物流详情
    { path: '/phone',name: 'phone',component: phone},//绑定电话手机号
    { path: '/chuanchuan',name: 'chuanchuan',component: chuanchuan},//串串专区
    { path: '/hotpot',name: 'hotpot',component: hotpot},//火锅专区
    { path: '/coupons',name: 'coupons',component: coupons},//优惠券
    { path: '/hot',name: 'hot',component: hot},//热销榜
    { path: '/getcoupons',name: 'getcoupons',component: getcoupons},//领优惠券
    { path: '/login',name: 'login',component: login},//绑定手机号
    { path: '/problems',name: 'problems',component: CommonProblems}//个人中心参加问题
  ]
})


// 页面刷新时，重新赋值token
if (sessionStorage.getItem('token')) {
	store.commit('set_token', sessionStorage.getItem('token'))
}

 
/*router.beforeEach((to, from, next) => {
	if (to.matched.some(r => r.meta.requireAuth)) {           //这里的requireAuth为路由中定义的 meta:{requireAuth:true}，意思为：该路由添加该字段，表示进入该路由需要登陆的
		if (store.state.token) {
			next();
		}else {
			next({
				path: '/login',
				query: {redirect: to.fullPath}
			})
		}
	}else {
		next();
	}
})*/


router.beforeEach((to, from, next) => {
  let token = sessionStorage.getItem('token');//获取浏览器缓存的用户信息
  let isbind = store.state.isbind;
  
	if(token){ //如果有就直接到首页咯
	    next();
	} else {
        next();
	   /*  if(to.path=='/login'||to.path=='phone'){ //如果是登录页面路径，就直接next()
	        next();
	    } else { //不然就跳转到登录；
	        next('/login');
	    } */
    }
    
   /*  if(to.path=='/car'){ 
       // 设置下一个路由的 meta
       alert(111);
       to.meta.keepAlive = false; 
       next();
    } */

})

export default router