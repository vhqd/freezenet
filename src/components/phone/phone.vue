<template>
	<div class="address">
		<mu-appbar style="width: 100%;" color="primary">
			<mu-button icon slot="left" @click="back">
				<img src="../../../static/img/back.png"/>
			</mu-button>
			绑定手机号
			<!--<span v-if="isshow" style="position: absolute;right: .2rem;top: -.1rem;" @click="goEditDress">管理</span>-->
		</mu-appbar>

		<mu-list class="infoboxbut">
			<mu-list-item button :ripple="false">
				<mu-list-item-title>手机号</mu-list-item-title>
				<mu-list-item-action>
					<mu-text-field v-model="phone" type='number' placeholder="请输入手机号"></mu-text-field>
				</mu-list-item-action>
				<div v-if="!issend&&phone != ''" class="sendyzm" @click="snedyzm">发送验证码</div>
				<div v-else class="sendyzm saveboxhui">发送验证码</div>
				<div v-show="issend" class="nosendyzm">{{sec}}秒后重发</div>
			</mu-list-item>
			<mu-list-item button :ripple="false">
				<mu-list-item-title>验证码</mu-list-item-title>
				<mu-list-item-action>
					<mu-text-field v-model="yzm" placeholder="验证码"></mu-text-field>
				</mu-list-item-action>
			</mu-list-item>
			<mu-list-item button :ripple="false">
				<mu-list-item-title>邀请码</mu-list-item-title>
				<mu-list-item-action>
					<mu-text-field v-model="yqm" placeholder="请输入邀请码"></mu-text-field>
				</mu-list-item-action>
			</mu-list-item>
		</mu-list>

		<div v-if="yqm == '' || yzm == '' || phone == ''" class="savebox saveboxhui">
			<mu-flex class="flex-wrapper" align-items="center">
				<mu-flex class="flex-demo" justify-content="center" fill>绑定</mu-flex>
			</mu-flex>
		</div>
		<div v-else class="savebox">
			<mu-flex class="flex-wrapper" align-items="center" @click='bindPone'>
				<mu-flex class="flex-demo" justify-content="center" fill>绑定</mu-flex>
			</mu-flex>
		</div>
	</div>
	
</template>

<script>
	import { oauth , register , getToken , getTokentest , getUserWXInfo , sendPhoneYzm , test1 } from '../../http/http.js'
	import { getTokens , getUrlParms } from '../../common/common.js'
	import QS from "qs";

	export default {
		components: {
		},
		data() {
			return {
				host: this.$store.state.host,
				basehost:this.$store.state.basehost,
				openid:null,
				userid:null,
				is_phone:null,
				dTitle: '绑定手机号',
				sec:60,//倒计时时间
				issend:false,//是否已经发送验证码
				sendtext:'发送验证码',
				phone: '',//手机号
				yzm: '',//验证码
				yqm: ''//邀请码
			}
		},
		activated(){
				let openid = this.$route.query.openid
				this.openid = openid
				this.is_phone = this.$route.query.is_phone
				this.userid = this.$route.query.userid
				if(openid){
					//this.openid = openid
					//let str = localStorage.obj
					//console.log('str');
					//console.log(str);
					this.setOpenid(openid);
					this.$store.commit("setOpenId",openid)
					console.log('store里面的openid');
					console.log(openid);
					this.gettoken(openid);
				}
				/* if(str){
					let obj = JSON.parse(str);
					if(!obj.name || ((openid != obj.name) && openid)){
						this.setOpenid(openid);
					}
				}else{
					this.setOpenid(openid);
				} */
				
				
			//window.location.href = this.host + "/oauth"

			/* console.log('jsonp');
			this.$jsonp(this.host+'/oauth' ).then(json => {
				console.log(json);
			　　// 返回数据 json， 返回的数据就是json格式
			}).catch(err => {
			　　console.log(err)
			})  */


			/**
			 * 获取用户openid
			*/
			 //oauth().then(res=>{
				//let data = res.data.info;
				//console.log('调用oauth接口返回用户信息');
				//console.log(res);
				/* if(data){
					let openid = data.openid;
					this.$store.cmomit("setOpenId",openid)
				}else{
					console.log('获取用户信息失败');
					console.log(res)
				} */
			//}) 


		},
		mounted(){
			window.location.href = this.basehost + 'phone'



			/**测试获取登录token（存在跨域问题）*/
			/*  getTokentest().then(res=>{
				 let token = res.data.access_token;
				console.log('tokentest');
				console.log(token);
			}) */


			/**测试获取用户信息（存在跨域问题）*/
			/*  getUserWXInfo().then(res=>{
				console.log('WXuserInfo');
				console.log(res);
			}) */
		},
		watch:{
			yzm(a,b){
				let reg =/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
				if (reg.test(a)) {
					this.yzm = ''
        		} 
			}
		},
		methods:{
			gettoken(openid){
				getTokens(openid);
			},
			/**保存openid*/
			setOpenid(openid){
				let obj = { name:openid };
				let str = JSON.stringify(obj);
				localStorage.obj = str; 
				//sessionStorage.obj = str;
			},
	  		/*绑定手机操作*/
	  		bindPone(){
				let phone = this.phone
	  			if(phone == ''){
	  				this.$toast.error('请输入绑定手机号');
	  				return;
				}
				let telReg = !!phone.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/);
				if(telReg == false){
					this.$toast.error('请输正确的手机号');
	  				return;
				}
	  			if(this.yam == ''){
	  				this.$toast.error('请输入验证码');
	  				return;
	  			}
	  			if(this.yqm == ''){
	  				this.$toast.error('请输入邀请码');
	  				return;
				}
	  			
				this.putRegister();
			},
			
			/**提交用户信息*/  
			putRegister(){
				let str = localStorage.obj
				let obj = JSON.parse(str);
				let data = {
					openid:obj.name,
					code:this.yzm,
					invate_code:this.yqm,
					phone:this.phone
				}
				console.log('用户信息');
				console.log(data);
				register(QS.stringify(data)).then(res => {
					this.$store.commit('editIsBind');
					sessionStorage.isbind = 1;//首次注册绑定手机成功设置已经绑定手机
					let token = res.data.info.access_token
					console.log('token');
					console.log(token);
					if(token){
						this.$store.commit('set_token', token);
					}
					this.$router.push('/')
					console.log('提交用户注册信息后返回的数据');
					console.log(res);
				})
				
			},
			/*发送验证码*/
			snedyzm(){
				let that = this;
				let tel = this.phone;
				let telReg = !!tel.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/);
				if(telReg == false){
					this.$toast.error('手机号码格式不正确');
	  				return;
				}else{
					let timedown = setInterval(function(){
						let sec = that.sec;
						if(sec > 0){
							that.issend = true;
							//console.log(that.sec)
							that.sec = sec - 1
						}else{
							clearInterval(timedown)
							console.log('计时器已清')
							that.sec = 5
							that.issend = false;
						}
					},1000);
					let data = QS.stringify({phone:tel});
					sendPhoneYzm(data).then(res =>{
						console.log(res);
					})
				}
			},
			
			back(){
				this.$router.replace('/?openid='+this.openid+'&is_phone='+this.is_phone+'&userid='+this.userid);
			}
		}
	}
</script>

<style scoped>
	@import 'http://cdn.bootcss.com/material-design-icons/3.0.1/iconfont/material-icons.css';
	.infoboxbut {
		background: #fff;
	}
	.mu-primary-color{background: #fff !important;}
	.mu-item-title{
		width: auto;
	}
	
	.listbox {
		width: 100%;
		margin-top: 0.15rem
	}
	
	.infoboxbut li:not(:last-child) {
		border-bottom: 1px solid #e0e0e0;
	}
	
	.savebox{width:5.05rem;height: 1rem;background: #f45f5f;line-height: 1rem;color: #fff;font-size: 0.32rem;font-weight: bold;margin:1.4rem auto;border-radius: .6rem;}
	.saveboxhui{background: #bbb !important;}
	.sendyzm{position: absolute;right: 0.3rem;width: 1.53rem;height: 0.7rem;color: #fff;background: #f45f5f;font-size: 0.22rem;line-height: 0.7rem;border-radius: 0.4rem;}
	.nosendyzm{position: absolute;right: 0.3rem;width: 1.53rem;height: 0.7rem;background:#c3c3c3;font-size: 0.22rem;line-height: 0.7rem;border-radius: 0.4rem;}
</style>