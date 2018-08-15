<template>
	<div>
		 <!-- 搜索区 -->
     	<Search  :ishome='true'></Search>
		<div style="padding-top: 1rem;padding-bottom: 1rem;">
			<mu-paper :z-depth="1" class="demo-list-wrap">
			  <mu-list textline="three-line">
			  	
			  	<!--type==1没有多重量选择的列表-->
			  	<!--<div v-for="(item,index) in showlist" v-if="item.type == 1" :key="index" class="li-box">
				    <router-link to="/detail">
					    <mu-list-item avatar :ripple="false" button>
					      <mu-list-item-action>
					        <mu-avatar style="min-width: 1.4rem;height: 1.4rem;">
					          <img :src="item.img">
					        </mu-avatar>
					      </mu-list-item-action>
					      <mu-list-item-content>
					        <mu-list-item-title>{{item.title}}</mu-list-item-title>
					        <mu-list-item-sub-title>
					          <span style="color: #a9a9a9;font-size: 0.2rem;">库存{{item.inventory}}件</span>
					          <p style="color: red;">
					          	￥<span style="font-size: 0.5rem;">{{item.price}}</span>
					          </p>
					        </mu-list-item-sub-title>
					      </mu-list-item-content>
					    </mu-list-item>
					</router-link>
				    <mu-divider></mu-divider>
				    <div style="position: absolute;right: 0.3rem;bottom: 0.12rem;">
				    	<div class="saoma">
				        	<span class="minus mpsytl" @click="minus(item)" v-if="item.num != 0">-</span>
				        	<span>{{item.num}}</span>
				        	<span class="plus mpsytl" @click="plus(item)">+</span>
				        </div>
				    </div>
				    <div class="dele">
				    	<img src="../../../static/img/ic-del.png"/>
				    </div>
			  	</div>-->
			  	
			  	<!--type==2的是可选择重量的列表-->
			  	<div v-for="(item,index) in showlist" :key="index" class="li-box">
				    <router-link to="/detail">
					    <mu-list-item avatar :ripple="false" button>
					      <mu-list-item-action>
					        <mu-avatar style="min-width: 1.42rem;height: 1.4rem;">
					          <img :src="item.img">
					        </mu-avatar>
					      </mu-list-item-action>
					      <mu-list-item-content>
					        <mu-list-item-title>{{item.title}}</mu-list-item-title>
					        <span class="kcstyle">库存{{item.inventory}}件</span>
					        <mu-list-item-sub-title>
					          <div style="color: red;">
					          		<span v-show="!isbind" style="color: #a9a9a9;">绑定手机号才能查看价格</span>
					          		<div v-show="isbind">￥<span style="font-size: 0.5rem;">{{item.price}}</span></div>
					          	<!--<span style="color: #ccc;text-decoration: line-through;">￥{{item.oldPrice}}</span>-->
					          </div>
					        </mu-list-item-sub-title>
					      </mu-list-item-content>
					    </mu-list-item>
					</router-link>
				    <mu-divider></mu-divider>
				    <div style="position: absolute;right: 0.3rem;top: 1.32rem;">
				    	<div class="saoma">
				    		<div v-if="item.type == 1">
					        	<!-- <span class="minus mpsytl" @click="minus(item)" v-if="item.num != 0">-</span>
					        	<span>{{item.num}}</span>
					        	<span class="plus mpsytl" @click="plus(item)">+</span> -->
								<span class="minus" @click="minus(item)" v-if="item.num != 0"><img src="../../../static/img/ic_jian.png" alt=""></span>
								<span v-show="item.num != 0">{{item.num}}</span>
								<span class="plus" @click="plus(item)"><img src="../../../static/img/ic_jia.png" alt=""></span>
				        	</div>
				        	<div v-if="item.type == 2">
					        	<span class="mpsytl" @click="typeo2show(item , 1)" v-if="!item.show"><img src="../../../static/img/often/down.png"/></span>
					        	<span class="mpsytl" @click="typeo2show(item), 2" v-if="item.show"><img src="../../../static/img/often/up.png"/></span>
				        	</div>
				        </div>
				    </div>
				    <div class="dele">
				    	<img src="../../../static/img/ic-del.png"/>
				    </div>
				    
				    <mu-expand-transition>
				    <div class="type2list" v-show="item.type == 2 && item.show">
				    <!--下拉的重量列表-->
					    <mu-list textline="two-line">
						    <mu-list-item avatar button :ripple="false" v-for="(ite , ind) in item.weights" :key="ind">
						      <mu-list-item-content>
						        <mu-list-item-title>{{ite.weight}}斤装</mu-list-item-title>
						        <mu-list-item-sub-title>￥{{ite.price}}</mu-list-item-sub-title>
						      </mu-list-item-content>
						      <mu-list-item-action>
						        <div class="saoma">
						        	<div>
							        	<!-- <span class="minus mpsytl" @click="minus(ite)" v-if="ite.num != 0">-</span>
							        	<span>{{ite.num}}</span>
							        	<span class="plus mpsytl" @click="plus(ite)">+</span> -->
										<span class="minus" @click="minus(item,ind)" v-if="ite.num != 0" :data-index="ind"><img src="../../../static/img/ic_jian.png" alt=""></span>
										<span v-show="ite.num != 0">{{ite.num}}</span>
										<span class="plus" @click="plus(item,ind)" :data-index="ind"><img src="../../../static/img/ic_jia.png" alt=""></span>
						        	</div>
						        </div>
						      </mu-list-item-action>
						    </mu-list-item>
						  </mu-list>
					</div>
					</mu-expand-transition>
					  
					  
			  	</div>
			  	
			  	
			  </mu-list>
			</mu-paper>
			
		</div>
		<Footer tagNum='2'></Footer>
	</div>
</template>

<script>
	import Search from '../common/Search.vue'
	import Footer from '../common/Footer.vue';
	import { mapState } from 'vuex'
	
	export default {
	  components:{
	  	Search,
	    Footer
	   },
	  data () {
	    return {
	    	showlist:[
      			{
      				id:1,
      				type:1,
      				show:false,
      				img:require('../../../static/img/1-0_03.png'),//图片
      				title:'青岛大牡蛎  鲜活贝类海鲜烧烤食材带壳水产',//标题
      				num:0,//数量
      				price:'20',//单价
      				oldPrice:'50',//旧的价格
      				inventory:'5'//库存
      			},
      			{
      				id:2,
      				type:2,
      				weights:[
      					{
      						weight:5.5,
      						price:240,
      						num:0
      					},
      					{
      						weight:5.5,
      						price:240,
      						num:0
      					}
      				],
      				show:false,
      				img:require('../../../static/img/1-0_03.png'),//图片
      				title:'鲜活贝类海鲜烧烤食材带壳水产青岛大牡蛎 ',//标题
      				num:0,//数量
      				price:'20',//单价
      				oldPrice:'50',//旧的价格
      				inventory:'5'//库存
      			},
      			{
      				id:2,
      				type:2,
      				weights:[
      					{
      						weight:5.5,
      						price:240,
      						num:0
      					},
      					{
      						weight:5.5,
      						price:240,
      						num:0
      					}
      				],
      				show:false,
      				img:require('../../../static/img/1-0_03.png'),//图片
      				title:' 鲜活贝类海鲜烧烤食材带壳水产青岛大牡蛎 ',//标题
      				num:0,//数量
      				price:'20',//单价
      				oldPrice:'50',//旧的价格
      				inventory:'5'//库存
      			},
      			{
      				id:2,
      				type:2,
      				weights:[
      					{
      						weight:5.5,
      						price:240,
      						num:0
      					},
      					{
      						weight:5.5,
      						price:240,
      						num:0
      					}
      				],
      				show:false,
      				img:require('../../../static/img/1-0_03.png'),//图片
      				title:'  鲜活贝类海鲜烧烤食材带壳水产青岛大牡蛎 ',//标题
      				num:0,//数量
      				price:'20',//单价
      				oldPrice:'50',//旧的价格
      				inventory:'5'//库存
      			},
      			{
      				id:2,
      				type:2,
      				weights:[
      					{
      						weight:5.5,
      						price:240,
      						num:0
      					},
      					{
      						weight:5.5,
      						price:240,
      						num:0
      					}
      				],
      				show:false,
      				img:require('../../../static/img/1-0_03.png'),//图片
      				title:' 鲜活贝类海鲜烧烤食材带壳水产青岛大牡蛎 ',//标题
      				num:0,//数量
      				price:'20',//单价
      				oldPrice:'50',//旧的价格
      				inventory:'5'//库存
      			},
      			{
      				id:2,
      				type:2,
      				weights:[
      					{
      						weight:5.5,
      						price:240,
      						num:0
      					},
      					{
      						weight:5.5,
      						price:240,
      						num:0
      					}
      				],
      				show:false,
      				img:require('../../../static/img/1-0_03.png'),//图片
      				title:'  鲜活贝类海鲜烧烤食材带壳水产青岛大牡蛎 ',//标题
      				num:0,//数量
      				price:'20',//单价
      				oldPrice:'50',//旧的价格
      				inventory:'5'//库存
      			},
      			{
      				id:2,
      				type:2,
      				weights:[
      					{
      						weight:5.5,
      						price:240,
      						num:0
      					},
      					{
      						weight:5.5,
      						price:240,
      						num:0
      					}
      				],
      				show:false,
      				img:require('../../../static/img/1-0_03.png'),//图片
      				title:'  鲜活贝类海鲜烧烤食材带壳水产青岛大牡蛎 ',//标题
      				num:0,//数量
      				price:'20',//单价
      				oldPrice:'50',//旧的价格
      				inventory:'5'//库存
      			},
      			{
      				id:2,
      				type:2,
      				weights:[
      					{
      						weight:5.5,
      						price:240,
      						num:0
      					},
      					{
      						weight:5.5,
      						price:240,
      						num:0
      					}
      				],
      				show:false,
      				img:require('../../../static/img/1-0_03.png'),//图片
      				title:'  鲜活贝类海鲜烧烤食材带壳水产青岛大牡蛎',//标题
      				num:0,//数量
      				price:'20',//单价
      				oldPrice:'50',//旧的价格
      				inventory:'5'//库存
      			},
      			{
      				id:2,
      				type:2,
      				weights:[
      					{
      						weight:5.5,
      						price:240,
      						num:0
      					},
      					{
      						weight:5.5,
      						price:240,
      						num:0
      					}
      				],
      				show:false,
      				img:require('../../../static/img/1-0_03.png'),//图片
      				title:'  鲜活贝类海鲜烧烤食材带壳水产青岛大牡蛎',//标题
      				num:0,//数量
      				price:'20',//单价
      				oldPrice:'50',//旧的价格
      				inventory:'5'//库存
      			}
      		],
	    }
	  },
		computed:{
			...mapState({ // mapState相当于映射
		        isbind: 'isbind',
		    })
		}, 
	  methods: {
	  	/*切换显示重量选择*/
	  	typeo2show(item , ind){
	  		if(ind == 1)
	  			item.show = true
	  		else
	  			item.show = false
	  	},
	  	/*减少数量值*/
    	minus(item,ind){
			
    		let amount = item.weights[ind].num;
    		if(amount>0){
    			item.weights[ind].num = amount - 1;
    		}else{
    			item.weights[ind].num = 0;
    		}
    	},
    	/*增加数量值*/
		plus(item,ind){
			
    		let amount = item.weights[ind].num;
    		item.weights[ind].num = amount + 1
    	},
	  }
	}
	
</script>

<style scoped>
	
.mu-list{padding: 8px 0 0 0;/*margin-bottom: 1rem;*/}
.li-box .mu-item-title{font-size: 0.24rem;padding-right: .3rem;}
.mu-item-action{padding-top: .1rem;}
.mu-avatar img{border-radius: initial;}
.li-box{position: relative;}
.mu-item-sub-title,.mu-item-title{padding-left: 0.2rem;}
.mu-item-content{max-width: 75% !important;}
.mu-item-title{height: auto;overflow: initial;text-overflow:initial;white-space:initial}
.mu-list{padding: 0;}
.li-box li{padding: 6px 0;}
.mu-item-title{line-height: 0.36rem;}

.type2list .mu-item-content{max-width: 85% !important;}
.type2list li{padding: 0;}


.dele{position: absolute;right: 0.3rem;top: 0.18rem;}
.dele img{width: 0.35rem;height: 0.35rem;}
.saoma img{width: 0.5rem;height: 0.5rem;}
.saoma>div{display: flex;}
.type2list .mu-item-title{font-size: 0.24rem;color: #333;}
.mu-item-sub-title{color: red;}
</style>