<template>
	<div class="paySuc">
		<BackBarWhite :dTitle='dTitle'></BackBarWhite>
		<div class="carMbox" style="width: 100%;height: 100%;overflow: hidden;">
			<div style="position: absolute;left: 50%;top: 50%;margin-top: -250px;margin-left: -96px;">
				<img src="../../../static/img/order/suc_chatu.png" style="width: 3.9rem;height: 3.3rem;" />
				<p class="suctext">支付成功</p>
				<p style="color: #999;">更多活动</p>
				<p style="color: #f95151;">请关注首页轮播图</p>
				<p><span style="color: #f95151;">{{timeDown}}</span>秒后条转到订单列表</p>
				<div class="goHome" @click="gohome">去首页</div>
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
	    	dTitle:'支付成功',
	    	timeDown:5,
	    	SI:null
	    }
	  },
	  methods:{
		gohome(){
			this.$router.push({path:'/'})
		},
	  	timeDownMeth(){
	  		let that = this;
	  		this.SI = setInterval(() => {
	  			console.log(that.timeDown)
	  			if(that.timeDown <=　0){
					clearInterval(that.SI);
					this.$router.replace({path:'/orderlist',query:{id:2,pay:1}})  
	  			}else{
	  				that.timeDown = that.timeDown - 1
	  			}
	  		},1000)
	  	}
	  },
	  	mounted(){
	  		this.timeDownMeth()
	  	}
	}
</script>

<style scoped>
	.paySuc{height: 100%;background: #FFF;overflow: hidden;}
	.carMbox p{margin: 0.1rem;font-size: 0.26rem;}
	.suctext{font-size: 0.32rem;font-weight: bold;}
	.goHome{padding: 7px 0;width: 35%;margin:0.3rem auto;color: #f95151;font-size: 0.28rem;font-weight: bold;border:1px solid #f95151;border-radius: 0.35rem;}
</style>