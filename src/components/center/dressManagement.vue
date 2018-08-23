<template>
	<div class="dreesMannage">
		<BackBar :dTitle='dTitle' :isshow="isshow"></BackBar>
		<!--<mu-list class='adddress'>
			<mu-list-item button :ripple="false">
				<img src="../../../static/img/car/ic_tianjia.png" />
				<p class="title">
					添加收货地址
				</p>
				<mu-list-item-action>
					<mu-avatar>
						<img class="rightJ" src="../../../static/img/ic_jump.png" />
					</mu-avatar>
				</mu-list-item-action>

			</mu-list-item>
		</mu-list>-->
		<!--添加收货地址-->
		<!--<mu-list textline="two-line" class='adddress' @click="goAddress" v-show='list.length == 0'>
			<mu-list-item avatar button :ripple="false">
				<mu-list-item-action>
					<img src="../../../static/img/car/ic_tianjia.png" />
				</mu-list-item-action>
				<mu-list-item-content>
					<mu-list-item-title>新增地址</mu-list-item-title>
				</mu-list-item-content>
				<mu-list-item-action>
					<img class="rightJ" src="../../../static/img/ic_jump.png" />
				</mu-list-item-action>
			</mu-list-item>
		</mu-list>-->
		<p class="qxgl" @click="goEditDress"><span>管理地址</span></p>
		<!--收货地址管理-->
		<div class="dresslist">
			<mu-load-more :loading="loading" @load="load">
			<mu-paper :z-depth="1" class="demo-list-wrap">
			  <mu-list textline="two-line" class='listone' v-for="(item,index) in list" :key="index">
			    <mu-list-item avatar :ripple="false" button>
			      <mu-list-item-content>
			        <mu-list-item-title>
			        	{{item.name}}
			          <mu-list-item-after-text class="phone">{{item.phone}}</mu-list-item-after-text>
			        </mu-list-item-title>
			        <mu-list-item-sub-title>
			          <span class="mrdz" v-show='item.is_default == 1'>默认地址</span>{{item.address}}
			        </mu-list-item-sub-title>
			      </mu-list-item-content>
			    </mu-list-item>
			  </mu-list>
			  
			  <!-- <mu-list textline="two-line" class='listone'>
			    <mu-list-item avatar :ripple="false" button>
			      <mu-list-item-content>
			        <mu-list-item-title>
			        	汤丽丽
			          <mu-list-item-after-text class="phone">11231554545486</mu-list-item-after-text>
			        </mu-list-item-title>
			        <mu-list-item-sub-title>
			          	四川省成都市超级能算解开从大家老双方空档开双就开双脚开动就开开老算A好弄的四川省成都市超级能算解开从大家老双方空档开双就开双脚开动就开开老算A好弄的
			        </mu-list-item-sub-title>
			      </mu-list-item-content>
			    </mu-list-item>
			  </mu-list>-->
		</mu-paper>
		</mu-load-more>
	</div>
<div class="newdress" @click="goAddress">新增地址</div>
	</div>
</template>

<script>
	import BackBar from '../common/BackBar.vue'
	import { getDress } from "../../http/http.js";

	export default {
		data() {
			return {
				host:this.$store.state.host,
				page:1,
				limit:15,//当前页面分页条数
				loading: false,
				nomore:false,
				dTitle: '地址管理',
				isshow:true,//是否显示头部右边管理按钮
				list:[]//收货地址
			}
		},
		components: {
			BackBar
		},
		/*beforeRouteEnter (to, from, next) {
		  // 在渲染该组件的对应路由被 confirm 前调用
		  // 不！能！获取组件实例 `this`
		  // 因为当守卫执行前，组件实例还没被创建
		  console.log(self);
		},*/
		activated(){
			this.page = 1
			this.list = []
			this.getDress(this.page);
		},
		mounted(){
			//this.getDress(this.page);
			
			//this.getDress(this.page);
		},
		methods:{	
		getDress(page){
			let loading = this.$loading();
			getDress(this.limit,page).then(res => {
					this.page = page + 1;
					let data = res.data.data.data;
						loading.close();
					if(data.length > 0 ){
						this.list = this.list.concat(data);
					}else{
						this.nomore = true
					}
				})
		},
			/*滚动到底部加载更多*/
		    load () {
		      if(!this.nomore){
		      	this.loading = true;
		      	setTimeout(() => {
			        this.loading = false;
			      	this.getDress(this.page)
			        console.log('成功数据')
			        //this.num += 10;
			      }, 1000)
		      }
		      
		    },
			goAddress(){
				this.$router.push({path:'/address', query:{status:1}})
			},
			goEditDress(){
				this.$router.replace('/editdress');
			}
			
		}
	}
</script>

<style scoped>
	.mu-appbar{border-bottom:1px solid #e0e0e0}
	.dresslist{/*margin-top: 0.2rem;*/}
	.adddress {
		background: #fff;
		margin-top: 0.2rem;
	}
	.mu-paper{background: initial;}
	.mu-item-action{min-width: auto;}
	.adddress .mu-item-title{padding-left: 0.25rem;}
	.mu-item-action  img{width: .42rem;height: .42rem;}
	.rightJ{width: 0.2rem !important;height: 0.3rem !important;}
	.mu-list{padding: 0;}
	.dresslist .mu-item-title,.dresslist .phone{font-size: 0.26rem;font-weight: bold;color: #333;float: right;}
	.mrdz{font-size: 12px;padding: 2px 3px;border: 1px solid #f95151;color: #f95151;border-radius: 15px;}
	.mu-item-sub-title{overflow: initial;text-overflow: initial;white-space: normal;}
	.listone{padding: 0.17rem 0.15rem;}
	.dresslist ul:not(:first-of-type){margin-top: .2rem;}
	.dresslist ul{border-bottom: 1px solid #e0e0e0;background: #fff;}
	.newdress{position: fixed;bottom: 0;width: 100%;height: 1rem;line-height: 1rem;font-size: 0.32rem;background: #f24c4c;color: #fff;font-weight: bold;}
	
	.qxgl{overflow: hidden;background: #fff;padding: 0.1rem 0;border-bottom:1px solid #e0e0e0;padding-top: 1rem;}
	.qxgl span{float: right;margin-right: 0.3rem;width: 1.6rem;height: 0.66rem;border-radius: 0.2rem;border:1px solid #F24C4C;line-height: 0.66rem;color:#F24C4C;}
</style>