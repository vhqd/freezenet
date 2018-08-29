<template>
	<div class="orderbox">
		<BackBar :dTitle='dTitle'></BackBar>
				
				<!--运输中-->
			<mu-paper :z-depth="1" class="demo-list-wrap" style="padding-top:1rem;">
				  <mu-list textline="three-line">
				  	<div class="li-box">
					    <mu-list-item avatar :ripple="false" button>
					      <mu-list-item-action>
					        <mu-avatar style="width: 1.4rem;height: 1.4rem;">
					          <img src="../../../static/img/order/img_dengdaifukuan.png">
					        </mu-avatar>
					      </mu-list-item-action>
					      <mu-list-item-content>
					        <mu-list-item-title>运输中</mu-list-item-title>
					        <mu-list-item-sub-title>
					          <span class="kc"></span>
							  <p class="ostatus">
					          	<span class="statustime">顺丰快递：12545458754</span>
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
				<div class="wuliubox">
					<mu-container>
					  <div class="demo-vsteper-container">
					    <mu-stepper :active-step="vactiveStep" orientation="vertical">
					      <mu-step>
					        <mu-step-label>
					         	 运输中...
					        </mu-step-label>
					        <mu-step-content>
					          <p>
					                                   从浙江市XX中心发出，本次目的地：四川省成都分拨中心
					          </p>
					        </mu-step-content>
					      </mu-step>
					      <mu-step>
					        <mu-step-label>
					        	已揽件<br />
					        	浙江xx公司进行揽件扫描
					        </mu-step-label>
					      </mu-step>
					      <mu-step>
					        <mu-step-label>
					        	 已发货<br />
					        	卖家发货
					        </mu-step-label>
					      </mu-step>
					    </mu-stepper>
					  </div>
					</mu-container>
				</div>
		
	</div>
</template>

<script>
	import BackBar from '../common/BackBar.vue'
	
	export default{
	  data () {
	    return {
	    	dTitle:'物流信息',
	    	vactiveStep: 0,
	    	list:[] 
	    }
	  },
	  computed: {
	    vfinished () {
	      return this.vactiveStep > 2;
	    }
	  },
	  mounted(){
	  	let a = document.getElementsByClassName('mu-step-label-circle');
	  	for (let i = 0 ; i <　a.length ; i++) {
	  		a[i].innerHTML = ''
	  	}
	  },
	   components:{
	    BackBar
	   },
	   methods:{
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

	.saoma{float: right;
	    padding: 0.2rem 0;
	    border-radius: 0.2rem;
	    margin-right: 0.3rem;}
	    .minus{background: #c3c3c3;}
	.saoma span{margin-left: 0.15rem;}
	.mu-list-three-line .mu-item-action .mu-avatar{margin-top: 0;margin-right: 0.09rem;}
	.mu-avatar img{border-radius: 0.2rem;}
	.li-box .mu-item-title{font-weight: bold;}
	.mu-list{padding: 8px 0 0 0;}
	.mu-elevation-1{box-shadow: none;}

	
	.mrdz{font-size: 12px;padding: 2px 3px;border: 1px solid #f95151;color: #f95151;border-radius: 15px;}
	.kc{color: #a9a9a9;font-size: 0.2rem;min-height: 0.14rem;display: block;}
	.ostatus{color: red;}
	.mu-item-title{margin-top: 0.2rem;font-size: 0.28rem;color: #f95151;}
	.mu-avatar{background: initial;}
	li{overflow: hidden;}
	.statustime{font-size: 0.22rem;color: #333;}
	.dfh{height: 100%;}
	.ckxq{position: absolute;right: 0;bottom: 0;}
	.wuliubox{background: #fff;margin-top: 0.15rem;}
	.mu-item-sub-title{text-overflow: inherit;white-space: normal;word-wrap: initial;}
	.mu-step-label,.mu-step-content-inner p{text-align: left !important; }
	
	
	.mu-step-content-inner p,.active{color: #f95151;}
</style>