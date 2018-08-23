<template>
	<div class="paySuc">
		<BackBarWhite :dTitle='dTitle'></BackBarWhite>
		
		<div class="carMbox" style="width: 100%;height: 100%;overflow: hidden;">
			<div style="position: absolute;left: 50%;top: 50%;margin-top: -250px;margin-left: -96px;">
				<img src="../../../static/img/order/fai_chatu.png" style="width: 3.9rem;height: 3.3rem;" />
				<p class="suctext">支付失败</p>
				<p>订单已进入待付款</p>
				<p>请在<span style="color: #f95151;">30分钟内</span>完成支付</p>
				<p>逾期支付订单将自动取消</p>
				<div class="tipbox">
					<div class="goHome" @click="gohome">继续逛逛</div>
					<div class="goOrder" @click="goorder">查看订单</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import BackBarWhite from '../common/BackBarWhite.vue'
	
	export default {
	  components:{
	  	BackBarWhite
	  },
	  data () {
	    return {
	    	dTitle:'支付失败',
	    	timeDown:5,
	    	SI:null
	    }
	  },
	  methods:{
		gohome(){
			this.$router.push({path:'/'})
		},
		goorder(){
			this.$router.push({path:'/orderlist',query:{id:1}})
		},
	  }
	}
</script>

<style scoped>
	.paySuc{height: 100%;background: #FFF;overflow: hidden;}
	.carMbox p{margin: 0.1rem;font-size: 0.26rem;}
	.suctext{font-size: 0.32rem;font-weight: bold;}
	.tipbox{display: flex;justify-content: center;}
	.tipbox div{float: left;padding: 7px 0;width: 35%;margin:0.3rem auto;font-size: 0.28rem;font-weight: bold;border-radius: 0.35rem;}
	.goHome{color: #f95151;border:1px solid #f95151;}
	.goOrder{color: #333;border:1px solid #333;}
</style>