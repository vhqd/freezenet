import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
		 /* host:'http://enet.api.gg',  //刘强本地  */
		host:'http://enet.com/eNet/public/index.php',//李琦本地 
		/* host:'http://SW2018001.trg7.cn', *///线上
		load:false,
    	token:'',
        count:0,//导航栏上面的购物车数量
		isbind:true,//用户是否绑定手机号，如果绑定才能看菜品价格否则不能查看
		order:[],//个人中心订单
		qigou:100,//商品起购价
		manjian:300,
		jian:20,
		onerrorimg:'this.src="../../../static/img/shorimg.png"',//加载图片错误显示图片(小图)
		onerrorimglong:'this.src="../../../static/img/longimg.png"'//加载图片错误显示图片（长图）
    },
    
	mutations:{
		/**
		 * loading控制
		 * @param {state} state 
		 * @param {boolean} value 
		 */
		setLoad(state,value){
			state.load = value;
		},
		/**
		 * 已经绑定手机号
		 */
		editIsBind(state){
			state.isbind = true
		},
		
		/**
		 * 修改购物车数量
		 */
		editCarnum(state,carnum){
			state.count = carnum;
		},

		/**
		 * 设置个人订单
		*/
		setOrder(state,obj){
			state.order = obj
		},


		/**
		 * 设置token到sessionStorage
		 */
		set_token(state, token) {
			state.token = token
			sessionStorage.token = token
		},
	
		del_token(state) {
			state.token = ''
			sessionStorage.removeItem('token')
		}
	}
})

export default store