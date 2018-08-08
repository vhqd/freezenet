<template>
	<div class="detail">
		<!--头部-->
		<BackBar :dTitle='dTitle'></BackBar>
		<!-- 轮播图-->
     	<HomeBannerView :imgs='bannerImg'></HomeBannerView>
     	
     	<div class="dInfobox">
			  <mu-list textline="three-line">
			     <mu-list-item avatar :ripple="false" button>
				      <mu-list-item-content>
				        <mu-list-item-title>{{data.title}}</mu-list-item-title>
				        <mu-list-item-sub-title>
				          <span style="color: #a9a9a9;font-size: 0.2rem;">库存{{data.inventory}}件</span>
				          <p style="color: red;">
				          	￥<span style="font-size: 0.5rem;">{{data.price}}</span>
				          	<span style="color: #ccc;text-decoration: line-through;">￥{{data.oldPrice}}</span>
				          </p>
				        </mu-list-item-sub-title>
				      </mu-list-item-content>
				    </mu-list-item>
			    <mu-divider></mu-divider>
			    <div style="position: absolute;right:0.28rem;bottom: 0.36rem;color: red;">
			    	满{{data.manjian}}免运费
			    </div>
			  </mu-list>
			  <p class="instructions">{{data.instructions}}</p>
		  </div>
		  <img src="../../../static/img/1-2_02.png" style="width: 100%;margin-top: 0.2rem;"/>
		  <div class="addToCar">
		  	<mu-list class="carbut">
			   <mu-list-item avatar button :ripple="false">
			      <mu-list-item-action>
			        购物车
			      </mu-list-item-action>
			      <mu-list-item-title><img src="../../../static/img/home/cart_weixuan.png" style="width: 0.44rem;height: 0.44rem;"/></mu-list-item-title>
			      <div class="pricecarbox">
				      <div class="carprice">
				      	￥80
				      	
				      </div>
				      <div>加入购物车</div>
			      </div>
			    </mu-list-item>
		    </mu-list>
		  </div>
	</div>
	
</template>

<script>
	import HomeBannerView from '../home/HomeBanner.vue'
	import BackBar from '../common/BackBar.vue'
	
	import carouselImg1 from '../../../static/img/1-0_02.png';
	import carouselImg2 from '../../../static/img/1-0_02.png';
	
	export default {
	  components:{
	    HomeBannerView,
	    BackBar
	   },
	  data () {
	    return {
	    	dTitle:'商品详情',//详情标题
	    	data:{
  				id:1,
  				img:require('../../../static/img/1-0_03.png'),//图片
  				title:'算哈哈是111',//标题
  				num:0,//数量
  				price:'20',//单价
  				oldPrice:'50',//旧的价格
  				inventory:'5',//库存
  				manjian:310,//满减
  				instructions:'发货说明发货说明发货说明发货说明发货说明发货说明',
	      	},
	    	bannerImg:[
	    	  require('../../../static/img/1-0_02.png'),
	      	  require('../../../static/img/1-0_02.png')
	    	]
	    }
	  },
	  methods:{
	  	
	  }
	}
</script>

<style scoped>
	.mu-list{padding: 0;background: #fff;}
	.dInfobox{background: #fff;}
	.mu-item{height: 100%;}
	.instructions{color: red;padding: 0.3rem;text-align: left;}
	.addToCar{position: fixed;bottom: 0;width: 100%;}
	.pricecarbox{width: 67%; background:#fddd53;right: 0; position: absolute;height: 100%;}
	.pricecarbox div{line-height: 45px;text-align: right;padding-right: 0.3rem;font-weight: bold;font-size: 0.32rem;}
	.carprice{position: absolute;left: 0.8rem;}
	
	
	
</style>