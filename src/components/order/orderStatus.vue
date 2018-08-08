<template>
	<div class="orderstatusbox">
		<BackBar :dTitle='dTitle'></BackBar>
		
		 <!--<mu-flex class="flex-wrapper shdz" align-items="center" @click='goAddDress'>
		    <mu-flex class="flex-demo" align-items="center" justify-content="center" fill>
				<img src="../../../static/img/car/ic_tianjia.png"/>
		    	<p class="title">
					添加收货地址
				</p>
		    </mu-flex>
		</mu-flex>-->
		
		<!--订单状态-->
		<div class="status">
			<!--等待付款-->
			<mu-paper v-if='status == 1' :z-depth="1" class="demo-list-wrap">
				  <mu-list textline="three-line">
				  	<div class="li-box">
					    <mu-list-item avatar :ripple="false" button>
					      <mu-list-item-action>
					        <mu-avatar style="width: 1.4rem;height: 1.4rem;">
					          <img src="../../../static/img/order/img_dengdaifukuan.png">
					        </mu-avatar>
					      </mu-list-item-action>
					      <mu-list-item-content>
					        <mu-list-item-title>等待付款</mu-list-item-title>
					        <mu-list-item-sub-title>
					          <span class="kc"></span>
							  <p class="ostatus">
					          	<span class="statustime">剩29分钟后关闭</span>
					          </p>
					        </mu-list-item-sub-title>
					      </mu-list-item-content>
					    </mu-list-item>
					    <!--<mu-divider></mu-divider>-->
					   <!-- <div style="position: absolute;right: 0;bottom: 0;">
					    	<div class="saoma">
					        	<span>x1</span>
					        </div>
					    </div>-->
				  	</div>
				  </mu-list>
				</mu-paper>
			
			<!--商品等待发货-->
			<mu-paper v-if='status == 2' :z-depth="1" class="demo-list-wrap">
				  <mu-list textline="three-line">
				  	<div class="li-box">
					    <mu-list-item avatar :ripple="false" button>
					      <mu-list-item-action>
					        <mu-avatar style="width: 1.4rem;height: 1.4rem;">
					          <img src="../../../static/img/order/img_daifahuo.png">
					        </mu-avatar>
					      </mu-list-item-action>
					      <mu-list-item-content class='dfh'>
					        <mu-list-item-title>商品等待发货</mu-list-item-title>
					        <mu-list-item-sub-title>
					          <span class="kc"></span>
							  <!--<p class="ostatus">
					          	<span>剩29分钟后关闭</span>
					          </p>-->
					        </mu-list-item-sub-title>
					      </mu-list-item-content>
					    </mu-list-item>
					    <!--<mu-divider></mu-divider>-->
					   <!-- <div style="position: absolute;right: 0;bottom: 0;">
					    	<div class="saoma">
					        	<span>x1</span>
					        </div>
					    </div>-->
				  	</div>
				  </mu-list>
				</mu-paper>
				
				
				<!--商品已发货-->
			<mu-paper v-if='status == 3' :z-depth="1" class="demo-list-wrap">
				  <mu-list textline="three-line">
				  	<div class="li-box">
					    <mu-list-item avatar :ripple="false" button>
					      <mu-list-item-action>
					        <mu-avatar style="width: 1.4rem;height: 1.4rem;">
					          <img src="../../../static/img/order/img_yifahuo.png">
					        </mu-avatar>
					      </mu-list-item-action>
					      <mu-list-item-content>
					        <mu-list-item-title>商品已发货</mu-list-item-title>
					        <mu-list-item-sub-title>
					          <span class="kc"></span>
							  <p class="ostatus" style="width: 80%;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">
					          	<span class="statustime">物流最新状态物流状态物流最新状态物流状态</span>
					          </p>
					        </mu-list-item-sub-title>
					      </mu-list-item-content>
					    </mu-list-item>
					    <!--<mu-divider></mu-divider>-->
					   <div class="ckxq">
					    	<div class="saoma" @click="goExpress">
					        	<span style="color:#f95151">查看详情</span>
					        </div>
					    </div>
				  	</div>
				  </mu-list>
				</mu-paper>
				
			
				
				<!--交易完成-->
			<mu-paper v-if='status == 4' :z-depth="1" class="demo-list-wrap">
				  <mu-list textline="three-line">
				  	<div class="li-box">
					    <mu-list-item avatar :ripple="false" button>
					      <mu-list-item-action>
					        <mu-avatar style="width: 1.4rem;height: 1.4rem;">
					          <img src="../../../static/img/order/img_jiaoyiwancheng.png">
					        </mu-avatar>
					      </mu-list-item-action>
					      <mu-list-item-content class='dfh'>
					        <mu-list-item-title>交易完成</mu-list-item-title>
					        <mu-list-item-sub-title>
					          <span class="kc"></span>
							  <!--<p class="ostatus">
					          	<span>剩29分钟后关闭</span>
					          </p>-->
					        </mu-list-item-sub-title>
					      </mu-list-item-content>
					    </mu-list-item>
					    <!--<mu-divider></mu-divider>-->
					   <!-- <div style="position: absolute;right: 0;bottom: 0;">
					    	<div class="saoma">
					        	<span>x1</span>
					        </div>
					    </div>-->
				  	</div>
				  </mu-list>
				</mu-paper>
				
				<!--交易关闭-->
			<mu-paper v-if='status == 5' :z-depth="1" class="demo-list-wrap">
				  <mu-list textline="three-line">
				  	<div class="li-box">
					    <mu-list-item avatar :ripple="false" button>
					      <mu-list-item-action>
					        <mu-avatar style="width: 1.4rem;height: 1.4rem;">
					          <img src="../../../static/img/order/img_jiaoyiguanbi.png">
					        </mu-avatar>
					      </mu-list-item-action>
					      <mu-list-item-content class='dfh'>
					        <mu-list-item-title>交易关闭</mu-list-item-title>
					        <mu-list-item-sub-title>
					          <span class="kc"></span>
							  <!--<p class="ostatus">
					          	<span>剩29分钟后关闭</span>
					          </p>-->
					        </mu-list-item-sub-title>
					      </mu-list-item-content>
					    </mu-list-item>
					    <!--<mu-divider></mu-divider>-->
					   <!-- <div style="position: absolute;right: 0;bottom: 0;">
					    	<div class="saoma">
					        	<span>x1</span>
					        </div>
					    </div>-->
				  	</div>
				  </mu-list>
				</mu-paper>
			
		</div>
		
		<div class="paddingbox">
		<mu-paper :z-depth="1" class="demo-list-wrap" style='margin-top:0.15rem;border-radius:15px;'>
		  <mu-list textline="two-line" style="background:#fff;">
	    <mu-list-item avatar :ripple="false" button>
	      <mu-list-item-content>
	        <mu-list-item-title>收货人：liuliu 	1388465848</mu-list-item-title>
	        <mu-list-item-sub-title>
	          收货地址：从大家老双方空档开双就开双脚开动就开开老算A好弄的
	        </mu-list-item-sub-title>
	      </mu-list-item-content>
	      <mu-list-item-action >
	        <mu-list-item-after-text class="mrdz">默认地址</mu-list-item-after-text>
	        <mu-list-item-after-text></mu-list-item-after-text>
	      </mu-list-item-action>
	    </mu-list-item>
	  </mu-list>
	</mu-paper>
		
		
		
		  
		<!--订单列表-->
		<div class="listbox">
			
			<p class="ordernum">订单编号：545454874845</p>
			<mu-paper :z-depth="1" class="demo-list-wrap">
			  <mu-list textline="three-line">
			  	
			  	<div v-for="(item,index) in list" :key="index" class="li-box">
				    <mu-list-item avatar :ripple="false" button>
				      <mu-list-item-action>
				        <mu-avatar style="width: 1.4rem;height: 1.4rem;">
				          <img :src="item.img">
				        </mu-avatar>
				      </mu-list-item-action>
				      <mu-list-item-content>
				        <mu-list-item-title>{{item.title}}</mu-list-item-title>
				        <mu-list-item-sub-title>
				          <span class="kc"><!--库存{{item.inventory}}件--></span>
			<p style="color: red;">
				          	￥<span style="font-size: 0.5rem;">{{item.price}}</span>
				          	<span style="color: #ccc;text-decoration: line-through;">￥{{item.oldPrice}}</span>
				          </p>
				        </mu-list-item-sub-title>
				      </mu-list-item-content>
				    </mu-list-item>
				    <mu-divider></mu-divider>
				    <div style="position: absolute;right: 0;bottom: 0;">
				    	<div class="saoma">
				        	<span>x1</span>
				        </div>
				    </div>
			  	</div>
			  </mu-list>
			  
			  
			  <mu-list class="infoboxbut">
			    <mu-list-item button :ripple="false">
			      <mu-list-item-title>商品总价</mu-list-item-title>
			      <mu-list-item-action>
			        <span>￥98</span>
			      </mu-list-item-action>
			    </mu-list-item>
			    <mu-list-item button :ripple="false">
			      <mu-list-item-title>会员总优惠</mu-list-item-title>
			      <mu-list-item-action>
			        <span>￥545</span>
			      </mu-list-item-action>
			    </mu-list-item>
			    <mu-list-item button :ripple="false">
			      <mu-list-item-title>运费（满300免运费）</mu-list-item-title>
			      <mu-list-item-action>
			        <span>-￥1.2</span>
			      </mu-list-item-action>
			    </mu-list-item>
			    <mu-list-item button :ripple="false" class='blodtext'>
			      <mu-list-item-title>订单总额</mu-list-item-title>
			      <mu-list-item-action>
			        <span>￥1.2</span>
			      </mu-list-item-action>
			    </mu-list-item>
			    <!--等待付款-->
			    <mu-list-item v-if='status == 1' button :ripple="false" class='blodtext'>
			      <mu-list-item-title>需付款</mu-list-item-title>
			      <mu-list-item-action>
			        <span style="color: #f95151;font-weight: bold;font-size:0.32rem;">￥89.8</span>
			      </mu-list-item-action>
			    </mu-list-item>
			    
			    <!--已付款或者交易完成-->
			    <mu-list-item v-if='status == 2 || status == 4' button :ripple="false" class='blodtext'>
			      <mu-list-item-title>实付款</mu-list-item-title>
			      <mu-list-item-action>
			        <span style="color: #f95151;font-weight: bold;font-size:0.32rem;">￥89.8</span>
			      </mu-list-item-action>
			    </mu-list-item>
			    
			  </mu-list>
			  
			  
			</mu-paper>
			
		<!--	<div class="total">
				<span class="xj" style="font-size: 0.26rem;font-weight: bold;">小计：<span style="color: red;">￥89.265</span></span>
				<span class="xj">
					共两件商品
				</span>
			</div>-->
			
		</div>
		
		<!--已发货-->
		<div class="addToCar" v-if='status == 3'>
		  	<mu-list class="carbut">
			   <mu-list-item avatar button :ripple="false">
			      <div class="pricebox">
				      <ul>
				      	<li class="payorder">查看物流</li>
				      	<li class="cancelorder">确认收货</li>
				      </ul>
			      </div>
			    </mu-list-item>
		    </mu-list>
	  </div>
	  
	  <!--待付款-->
	  <div class="addToCar" v-if='status == 1'>
		  	<mu-list class="carbut">
			   <mu-list-item avatar button :ripple="false">
			      <div class="pricebox">
				      <ul>
				      	<li class="payorder">立即支付</li>
				      	<li class="cancelorder">取消订单</li>
				      </ul>
			      </div>
			    </mu-list-item>
		    </mu-list>
	  </div>
	  
	  <!--交易取消-->
	  <div class="addToCar" v-if='status == 5'>
		  	<mu-list class="carbut">
			   <mu-list-item avatar button :ripple="false">
			      <div class="pricebox">
				      <ul>
				      	<li class="cancelorder">删除订单</li>
				      </ul>
			      </div>
			    </mu-list-item>
		    </mu-list>
	  </div>
		</div>
		 
	</div>
</template>

<script>
	import BackBar from '../common/BackBar.vue'
	
	export default{
	  data () {
	    return {
	    	dTitle:'确认订单',
	    	vactiveStep: 0,
	    	status:null,//订单状态
	    	list:[
      			{
      				id:1,
      				img:require('../../../static/img/1-0_03.png'),//图片
      				title:'算哈哈是111',//标题
      				num:0,//数量
      				price:'20',//单价
      				oldPrice:'50',//旧的价格
      				inventory:'5'//库存
      			},
      			{
      				id:2,
      				img:require('../../../static/img/1-0_03.png'),//图片
      				title:'算哈哈是',//标题
      				num:0,//数量
      				price:'20',//单价
      				oldPrice:'50',//旧的价格
      				inventory:'5'//库存
      			}
      		]
	    }
	  },
	  computed: {
	    vfinished () {
	      return this.vactiveStep > 2;
	    }
	  },
	  mounted(){
	  	let status = this.$route.query.status;
	  	this.status = status;
	  },
	   components:{
	    BackBar
	   },
	   methods:{
	   	/*查看物流详情*/
	   	goExpress(){
	   		this.$router.push('/express')
	   	},
	   	goAddDress(){
	   		this.$router.push('/address')
	   	},
	   	toPay(){
	   		//this.$router.push('/paysuccessful')
	   		this.$router.push('/payfailure')
	   	},
	   	  vhandleNext () {
	      this.vactiveStep++;
	    },
	    vhandlePrev () {
	      this.vactiveStep--;
	    },
	    vreset () {
	      this.vactiveStep = 0;
	    }
	   }
	}
</script>

<style scoped>
.paddingbox{padding: 0 14px 0 14px;padding-top: -30px;position: relative;z-index: 9;}
	.status{padding-top: 1rem;}
	.status .mu-paper{background: url(../../../static/img/order/img_zhuangtai_bj.png) no-repeat center;background-size: 100%;}
	.orderstatusbox{margin-bottom: 1rem;}
	.orderstatusbox .title{height: 1.03rem;line-height: 1.03rem;font-size: 0.28rem;font-weight: bold;color: #f95151;padding-left: 10px;}
	.shdz{background:#fff;}
	.orderstatusbox .shdz img{width: 0.33rem;height: 0.33rem;}
	
	.total{height: 0.8rem;line-height: 0.8rem;background: #fff;margin-top: 0.15rem;}
	.total span{float: right;}
	.xj{padding-right: 0.3rem;}
	
	.orderstatusbox .listbox{width:100%;margin-top: 0.15rem}
	.li-box{position: relative;}
	.saoma{float: right;
	    padding: 0.2rem 0;
	    border-radius: 0.2rem;
	    margin-right: 0.3rem;}
	    .minus{background: #c3c3c3;}
	.saoma span{margin-left: 0.15rem;}
	.mu-list-three-line .mu-item-action .mu-avatar{margin-top: 0;margin-right: 0.09rem;}
	.mu-avatar img{border-radius: 0.2rem;}
	.li-box .mu-item-title{font-size: 0.24rem;font-weight: bold;}
	.mu-list{padding: 8px 0 0 0;}
	.mu-elevation-1{box-shadow: none;}
	.clear{ clear:both}
	.mu-drawer{position: fixed;top: 4.3rem;} 
	
	
	.addToCar{position: fixed;bottom: 0;width: 100%;}
	.pricebox{width: 100%; background:#fff;left: 0; position: absolute;height: 100%;}
	.pricebox li{font-size: 0.32rem;font-weight: bold;border-radius: 0.4rem;padding: 0.06rem 0.3rem;float: right;margin-top: 0.13rem;margin-right: 20px;}
	.pricebox .cancelorder{border:1px solid #c6c6c6; color: #666;}
	.pricebox .payorder{border:1px solid #f95151;color: #f95151;}
	
	.carprice{position: absolute;left: 0.8rem;font-size: 0.26rem !important;color: #666;}
	.settlement{position: absolute;right: 0px;background: #ffe253;width: 33%;height: 45px;line-height: 45px;}
	.carlistbox{padding: 0.15rem 0.3rem !important;}
	.carlistbox>ul{overflow: hidden;}
	
	.mrdz{font-size: 12px;padding: 2px 3px;border: 1px solid #f95151;color: #f95151;border-radius: 15px;}
	.kc{color: #a9a9a9;font-size: 0.2rem;min-height: 0.14rem;display: block;}
	.ostatus{color: red;}
	.status .mu-item-title{margin-top: 0.2rem;font-size: 0.26rem;color: #f95151;}
	.status .mu-avatar{background: initial;}
	.status li{overflow: hidden;}
	.statustime{font-size: 0.22rem;color: #333;}
	.dfh{height: 100%;}
	.ckxq{position: absolute;right: 0;bottom: 0;}
	.wuliubox{background: #fff;margin-top: 0.15rem;}
	.mu-item-sub-title{text-overflow: inherit;white-space: normal;word-wrap: initial;}
	.mu-step-label,.mu-step-content-inner p{text-align: left !important; }
	.ordernum{padding: 0.2rem;background: #fff;text-align: left;border-bottom: 1px solid rgba(0,0,0,.12);font-weight: bold;}
	.infoboxbut li{padding: 0.075rem 0;}
	.blodtext{font-weight: bold;}
	.infoboxbut li:last-child{border-top: 1px solid #e0e0e0;}
</style>