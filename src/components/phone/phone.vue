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
					<mu-text-field v-model="phone" placeholder="请输入手机号"></mu-text-field>
				</mu-list-item-action>
				<div v-show="!issend" class="sendyzm" @click="snedyzm">发送验证码</div>
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

		<div class="savebox">
			<mu-flex class="flex-wrapper" align-items="center" @click='bindPone'>
				<mu-flex class="flex-demo" justify-content="center" fill>绑定</mu-flex>
			</mu-flex>
		</div>
	</div>
	
</template>

<script>
	import { getToken , getTokentest , getUserWXInfo , sendPhoneYzm } from '../../http/http.js'
	import QS from "qs";

	export default {
		components: {
		},
		data() {
			return {
				host: this.$store.state.host,
				dTitle: '绑定手机号',
				sec:60,//倒计时时间
				issend:false,//是否已经发送验证码
				sendtext:'发送验证码',
				phone: '13881306507',//手机号
				yzm: '123',//验证码
				yqm: '321'//邀请码
			}
		},
		mounted(){
			/**测试获取登录token（存在跨域问题）*/
			 getTokentest().then(res=>{
				 let token = res.data.access_token;
				console.log('tokentest');
				console.log(token);
			})


			/**测试获取用户信息（存在跨域问题）*/
			 getUserWXInfo().then(res=>{
				console.log('WXuserInfo');
				console.log(res);
			})
		},
		methods:{
			getToken(){
				let data = {
						username: 'test_01',
						password: 'admin@'
					};
					getToken(data).then(res => {
						let token = res.data.data.access_token;
						console.log(token);
						
						//设置token
						this.$store.commit('set_token', token);
						this.$store.commit('editIsBind');
						
						this.$router.push('/') 




						//window.localStorage.setItem('token',tokens);
						//$store.state.token = tokens;
						//console.log(this.$store.state.token)
						//this.$store.state.isbind = true;
						//console.log(res);
						//console.log(res.data.data.access_token);
					})
	  		},
	  		/*绑定手机操作*/
	  		bindPone(){
	  			if(this.phone == ''){
	  				this.$toast.error('请输入绑定手机号');
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
	  			this.getToken();
	  		},
			/*发送验证码*/
			snedyzm(){
				let that = this;
				let tel = this.phone;
				let telReg = !!tel.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
				if(telReg == false){
					alert('手机号码格式不正确')
					return
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
				this.$router.go('-1');
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
	.sendyzm{position: absolute;right: 0.3rem;width: 1.53rem;height: 0.7rem;color: #fff;background: #f45f5f;font-size: 0.22rem;line-height: 0.7rem;border-radius: 0.4rem;}
	.nosendyzm{position: absolute;right: 0.3rem;width: 1.53rem;height: 0.7rem;background:#c3c3c3;font-size: 0.22rem;line-height: 0.7rem;border-radius: 0.4rem;}
</style>