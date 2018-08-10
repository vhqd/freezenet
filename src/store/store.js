import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
		host:'http://enet.api.gg',
		load:false,
		/* host:'http://SW2018001.trg7.cn', */
    	token:'',
        count:0,//导航栏上面的购物车数量
        isbind:true//用户是否绑定手机号，如果绑定才能看菜品价格否则不能查看
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