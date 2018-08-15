<template>
	<div class="centerbox">
		<p class="center-title">个人中心 </p>
		<div class="center-top">
			<!--<span style="position: absolute;right: 10px;top: 0.2rem;">地址管理</span>-->
			<mu-container>
				<mu-card style="width: 100%; max-width: 375px; margin: 0 auto;">
				  <mu-card-header title="一花一世界">
				    <mu-avatar slot="avatar">
				      <img src="../../../static/img/back.png">
				    </mu-avatar>
					<span class="mu-card-sub-titles" @click.stop.prevent="goBindPhone">绑定手机号</span>
				  </mu-card-header>
				</mu-card>
			</mu-container>
			
			<div class="topboxinfo">
				<p class="ordertopbox"><span class="myordertext">我的订单</span><span class="goordertex" @click="goOrderList">查看更多订单<img class="rightarr" src="../../../static/img/ic_jump.png"/></span></p>
				<ul>
					<li v-for="(item,index) in orderlist" :key="index">
						<router-link :to="{path:'/orderlist', query:{id:item.id}}">
							<img :src="item.img"/>
							<p>{{item.title}}</p>
						</router-link>
						<span class="fanallcar">0</span>
					</li>
					<!--<li>
						<img src="../../../static/img/center/ic_daifahuo.png"/>
						<p>待发货</p>
					</li>
					<li>
						<img src="../../../static/img/center/ic_daishouhuo.png"/>
						<p>待收货</p>
					</li>
					<li>
						<img src="../../../static/img/center/ic_yiwancheng.png"/>
						<p>已完成</p>
					</li>
					<li>
						<img src="../../../static/img/center/ic_yiquxiao.png"/>
						<p>已取消</p>
					</li>-->
				</ul>
			</div>
			
			<div class="topboxinfo hlepbox">
				<p class="ordertopbox"><span class="myordertext">帮助中心</span></p>
				<ul>
					<li v-for="(item,index) in hlep" :key="index">
						 <router-link :to="{path:item.router, query:{id:item.id}}">
							<img :src="item.img"/>
							<p>{{item.title}}</p>
						</router-link>
					</li>
				</ul>
			</div>
				<div class="listcenterbox">
					<mu-list>
						<mu-list-item button :ripple="false" @click="goCoupons">
						<mu-list-item-title>我的优惠券</mu-list-item-title>
						<mu-list-item-action>
						<div class="arrbox"><span class="yhjnum">2张</span><img class="rightarr" src="../../../static/img/ic_jump.png"/></div>
						</mu-list-item-action>
						</mu-list-item>
						<mu-list-item button :ripple="false" @click="goDressManage">
						<mu-list-item-title>地址管理</mu-list-item-title>
						<mu-list-item-action>
						<div class="arrbox"><img class="rightarr" src="../../../static/img/ic_jump.png"/></div>
						</mu-list-item-action>
						</mu-list-item>
					</mu-list>
				</div>
		</div>
		
		
		
		<Footer tagNum='4'></Footer>
	</div>
</template>

<script>
	import Footer from '../common/Footer.vue';
	import { getOrders } from '../../http/http.js'

	
	
	
	export default {
	  name: 'HelloWorld',
	  components:{
	    Footer
	   },
	  data () {
	    return {
			limit:15,
			page:1,
	    	orderlist:[
	    		{
	    			id:1,
	    			title:'待支付',
	    			img:require('../../../static/img/center/ic_daizhifu.png')
	    		},
	    		{
	    			id:2,
	    			title:'待发货',
	    			img:require('../../../static/img/center/ic_daifahuo.png')
	    		},
	    		{
	    			id:3,
	    			title:'待收货',
	    			img:require('../../../static/img/center/ic_daishouhuo.png')
	    		},
	    		{
	    			id:4,
	    			title:'已完成',
	    			img:require('../../../static/img/center/ic_yiwancheng.png')
	    		},
	    		{
	    			id:5,
	    			title:'已取消',
	    			img:'../../../static/img/center/ic_yiquxiao.png'
	    		}
	    	],
	    	hlep:[
	    		{
	    			id:1,
					title:'常见问题',
					router:'/problems',
	    			img:require('../../../static/img/center/ic_changjianweiti@2x.png')
	    		},
	    		{
	    			id:2,
	    			title:'服务中心',
	    			img:require('../../../static/img/center/ic_fuwuzhongxin@2x.png')
	    		},
	    		{
	    			id:3,
	    			title:'问题反馈',
	    			img:require('../../../static/img/center/ic_wentifankui@2x.png')
	    		},
	    		{
	    			id:4,
	    			title:'在线客服',
	    			img:require('../../../static/img/center/ic_zaixian kefu @2x.png')
	    		},
	    		{
	    			id:5,
	    			title:'联系我们',
	    			img:'../../../static/img/center/ic_lainxi women @2x.png'
	    		}
	    	]
	    }
	  },
	  methods: {
		/**
		 * 获取订单保存的store
		*/
		getOrders(){
			getOrders(this.limit,this.page).then(res => {
				console.log(res);
				let data = res.data.data.data;
				this.$store.commit('setOrder',data)
			})
		},

		goBindPhone(){
			this.$router.push('/phone')
			
		},
	  	/*打开头部订单管理*/
	  	goDressManage(){
	  		this.$router.push('/dressmanagement')
	  	},
	  	/*打开订单列表*/
	  	goOrderList(){
	  		this.$router.push({path:'/orderlist', query:{id:0}})
	  	},
	  	/*打开我的优惠券*/
	    goCoupons(){
	    	this.$router.push('/coupons')
	    }
	    
	  }
	}
</script>

<style scoped>
.container{padding: 0;}
.mu-card{background: none;box-shadow: none;}
.mu-avatar{width: 1.24rem !important;height: 1.24rem !important;}  
.center-title{height: 0.88rem;font-size: 0.32rem;color: #333;line-height: 0.88rem;background: #fff;}
.mu-card-header-title{margin-top: 0.1rem;}
.mu-card-sub-titles{text-align: left;color: #f95151;background: #ff9a38;color:#fff;padding: 0.1rem;border-radius: 0.25rem;position: absolute;
    top: 44px;
    left: 140px;}
.center-top{height: 3.3rem;background: url(../../../static/img/center/centerbg.png) no-repeat center;background-size: 100%;}
.topboxinfo{width: 93%;margin: auto;background: #fff;border-radius: 10px;box-shadow:0 0px 2px -1px rgba(0,0,0,.1), 0 0px 1px 0 rgba(0,0,0,.1), 0 0px 0px 0 rgba(0,0,0,.1);}
.ordertopbox{overflow: hidden;padding: 0.3rem;border-bottom: 1px solid #e0e0e0;}
.myordertext{float: left;font-weight: bold;font-size: .26rem;color: #333;}
.goordertex{color:#999;float: right;font-size: .24rem;position: relative;padding-right: .4rem}
.rightarr{position: absolute;width: .13rem;right:0;top:4px;}
.arrbox{position: relative;}
.listcenterbox .mu-item-title{font-size: .26rem}

.topboxinfo ul{overflow: hidden;padding: 0.4rem 0;}
.topboxinfo ul li{float: left;width: 20%;color: #8e8e8e;position: relative;}
.topboxinfo ul li p{font-size: 0.24rem;color: #8e8e8e;}
.topboxinfo ul li img{width: 0.55rem;height: 0.55rem;}
.listcenterbox{background: #fff;width: 93%;border-radius: 10px;margin: .2rem auto 0 auto}
.listcenterbox li:not(:last-child){border-bottom: 1px solid #e0e0e0;}
.mu-item-action{min-width: 2.4rem;}

.mu-bottom-sheet li .mu-item-title{text-align: center;}
.cancelsheet{background: #ffda49;}
.graybox{height: 0.15rem;background: #939393;}
.phone{font-weight: bold;}
.copy .mu-item-title,.call .mu-item-title{color: #f95151;}

.mu-dialog-body .ewm{width: 1.86rem;height: 1.86rem;}

.hlepbox{margin-top: 0.2rem;}
.fanallcar{top: 0;left: .8rem;}
.yhjnum{padding-right: 20px;}
</style>