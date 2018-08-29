import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'
import router from '../router/index'
import { stat } from "fs";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
		 /* host:'http://enet.api.gg',  //刘强本地  */
		host1:'http://enet.com/eNet/public',//李琦本地 
		host:'http://SW2018001.trg7.cn/eNet/public', //线上
		basehost:'http://SW2018001.trg7.cn/#/', //线上
		shareurl:'http://sw2018001.trg7.cn/#/phone',//分享路径
		shareimg: require("../common/logo.png"),
		changgou:'已添加常购',
		qxchanggou:'已取消常购',
		addcar:'已添加到购物车',
		load:false,//全局loading
		showerror:false,//全局错误提示
		showinfo:false,//全局信息提示
		openwin:false,//全局弹窗
		getoften:false,
		waitToken:false,
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
		onerrorimglong:'this.src="../../../static/img/longimg.png"',//加载图片错误显示图片（长图）,
		topclass: [],
		bannerImg: [],
		classlist: [],
		showlist:[],
		getCG:true
    },
	mutations:{
		 getToken(state,openid){
			let obj = localStorage.obj
			state.openid = openid
			let data = {
				username: openid,
				password: "123456"
			};
			axios.post(state.host+"/api/login",data).then(res => {
				let token = res.data.data.access_token;
				console.log("获取到的token");
				console.log(token);
				console.log(33333);
				
				let obj = { name: openid };
				let str = JSON.stringify(obj);
				localStorage.obj = str;
				//设置token
				state.token = token
				localStorage.token = token
				//state.load = true
				axios.get(state.host + "/api/banner?limit=4&page=1").then(res => {
					if (res) {
						let data = res.data.data.data;
						for (let item in data) {
						data[item].banner_image_address = state.host + data[item].banner_image_address;
						}
						state.bannerImg = data;
					}
				});

				axios.get(state.host + "/api/shoppingcart?limit=99&page=1").then(res => {
					let data = res.data.shopInfo.data;
					let carnum = null
					for (let item in data) {
						carnum += parseInt(data[item].count);
					}
					state.count = carnum;
				});

				axios.get(state.host + "/api/get-second-type-lists").then(res => {
					let data = res.data.info;
					let grid = [];
					let columns = [];
					//'显示格式（1：列表，0：九宫格）'
					for (let item in data) {
						if (data[item].show_method == 1) {
							columns.push(data[item]);
						} else {
							grid.push(data[item]);
						}
					}
					state.topclass = grid; //九宫格
					state.classlist = columns; //列表显示
					state.load = false;
				});

				axios.get(state.host + "/api/get-goods-often?limit=99&page=1").then(res => {
					let data = res.data.info.data;
					for (let item in data) {
						data[item].goods_photo = state.host + data[item].goods_photo;
						data[item].num = 0;
						data[item].show = false;
						if (data[item].hasOwnProperty("specifications")) {
							data[item].type = 2;
							let secdata = data[item].specifications;
							for (let i in secdata) {
								secdata[i].num = 0;
							}
						} else {
							data[item].type = 1;
						}
					//type-1（没有分重量的） type-2（分了重量的）
					}
					state.showlist = data;
					state.getCG = false
					state.getoften = true
				}); 
			
				
			})
		},

		getCgList(state){
			axios.get(state.host + "/api/get-goods-often?limit=99&page=1").then(res => {
				let data = res.data.info.data;
				for (let item in data) {
					data[item].goods_photo = state.host + data[item].goods_photo;
					data[item].num = 0;
					data[item].show = false;
					if (data[item].hasOwnProperty("specifications")) {
						data[item].type = 2;
						let secdata = data[item].specifications;
						for (let i in secdata) {
							secdata[i].num = 0;
						}
					} else {
						data[item].type = 1;
					}
				//type-1（没有分重量的） type-2（分了重量的）
				}
				state.showlist = data;
				state.getCG = false
			});
		},

		/* setBannerImg(state,value){
			state.bannerImg = value
		},
		setShowList(state,value){
			state.showlist = value
		},
		setGetCG(state,value){
			state.getCG = value
		},
		setClassList(state,value){
			state.showlist = value
		},
		setTopClass(state,value){
			state.showlist = value
		},  */
		/**
		 * 设置提示文字
		 * @param {} state 
		 * @param {*} text 
		 */
		setShowText(state,text){
			state.showtext = text
		},
		/**设置waitToken*/
		setWaitToken(state,value){
			state.waitToken = value
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
		 * 全局弹窗
		 */
		setOpenWin(state,value){
			state.openwin = value
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
			if(state.count < 0){
				state.coutn  = 0
			}else{
				state.count = carnum;
			}
		},

		/**
		 * 设置个人订单
		*/
		setOrder(state,obj){
			state.order = obj
		},

		/**
		 * 设置token到localStorage
		 */
		set_token(state, token) {
			state.token = token
			localStorage.token = token
		},

		/**
		 * 删除token
		 * @param {*} state 
		 */
		del_token(state) {
			state.token = ''
			localStorage.removeItem('token')
		}
	},
    actions: {
        getTokens(context,openid) {
            context.commit("getToken",openid);
		},
		getCg(context){
			context.commit('getCgList')
		}
		/* setBannerImg(context,value){
			context.commit("setBannerImg",value);
		},
		setShowList(context,value){
			context.commit("setShowList",value);
			state.showlist = value
		},
		setGetCG(context,value){
			context.commit("setGetCG",value);
			state.getCG = value
		},
		setClassList(context,value){
			context.commit("setClassList",value);
			state.showlist = value
		},
		setTopClass(context,value){
			context.commit("setTopClass",value);
		}, */
    } 
})

export default store