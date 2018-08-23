import Vue from "vue";
import Vuex from "vuex";
import { stat } from "fs";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
		 /* host:'http://enet.api.gg',  //刘强本地  */
		host1:'http://enet.com/eNet/public',//李琦本地 
		host:'http://SW2018001.trg7.cn/eNet/public/index.php', //线上
		basehost:'http://SW2018001.trg7.cn/#/', //线上
		baseimg:'http://SW2018001.trg7.cn//eNet/public/banner', //线上
		changgou:'已添加常购',
		qxchanggou:'已取消常购',
		addcar:'已添加到购物车',
		load:false,//全局loading
		showerror:false,//全局错误提示
		showinfo:false,//全局信息提示
		showtext:'',
		token:null,
		openid:null,//用户openid
		userid:null,//用户id
		userinfo:{},
        count:0,//导航栏上面的购物车数量
		isbind:false,//用户是否绑定手机号，如果绑定才能看菜品价格否则不能查看
		order:[],//个人中心订单
		qigou:100,//商品起购价
		manjian:300,//满减限制价格
		jian:20,//满减价格
		onerrorimg:'this.src="../../../static/img/shorimg.png"',//加载图片错误显示图片(小图)
		onerrorimglong:'this.src="../../../static/img/longimg.png"'//加载图片错误显示图片（长图）
    },
    
	mutations:{
		
		/**
		 * 设置提示文字
		 * @param {} state 
		 * @param {*} text 
		 */
		setShowText(state,text){
			state.showtext = text
		},

		/**设置用户id*/
		setUserid(state,userid){
			state.userid = userid
		},

		/**设置用户信息*/
		setUserInfo(state,userinfo){
			state.userinfo = userinfo
		},

		/**
		 * 设置用户openid
		*/
		setOpenId(state , openid){
			state.openid = openid
		},

		/**
		 * 设置全部错误提示
		 * @param {*} state 
		 */
		seterror(state){
			state.showerror = !state.showerror;
		},

		/**
		 * loading控制
		 * @param {state} state 
		 * @param {boolean} value 
		 */
		setLoad(state,value){
			state.load = value;
		},

		/**
		 * 显示提示信息
		 */
		showInfo(state){
			state.showinfo = !state.showinfo
		},

		/**
		 * 已经绑定手机号
		 */
		editIsBind(state){
			state.isbind = true
		},

		/**
		 * 未绑定手机号
		 */
		editIsBindFalse(state){
			state.isbind = false
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

		/**
		 * 删除token
		 * @param {*} state 
		 */
		del_token(state) {
			state.token = ''
			sessionStorage.removeItem('token')
		}
	}
})

export default store