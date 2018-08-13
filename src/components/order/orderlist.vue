<template>
	<div class="orderlistbox">
		<!--头部-->
		<BackBar dTitle='我的订单'></BackBar>
		<mu-tabs style="display: flex;justify-content: center;margin-top:1rem;">
		    <mu-tab class='tabtitle'>全部</mu-tab>
		    <mu-tab class='tabtitle'>待支付</mu-tab>
		    <mu-tab class='tabtitle'>待发货</mu-tab>
		    <mu-tab class='tabtitle'>已发货</mu-tab>
		    <mu-tab class='tabtitle'>已完成</mu-tab>
		    <mu-tab class='tabtitle'>已取消</mu-tab>
		</mu-tabs>
		
		<div class="listbox">
			<mu-load-more :loading="loading" @load="load">
				<div class="onelistbox" v-for="(item,index) in list" :key="index">
					<div class="leftright">
						<span class="left">订单编号：{{item.orderid}}</span>
						<span class="right">{{item.status == 1 ? '待支付' : item.status == 2 ? '待发货' : item.status == 3 ? '已发货' : item.status == 4 ? '已完成' : item.status == 5 ? '已取消' : ''}}</span>
					</div>
					<div>
						<mu-paper :z-depth="1" class="demo-list-wrap">
						  <mu-list textline="three-line">
						  	<div  class="li-box">
							    <mu-list-item avatar :ripple="false" button>
							      <mu-list-item-action>
							        <mu-avatar style="width: 1.4rem;height: 1.4rem;">
							          <img :src="item.img">
							        </mu-avatar>
							      </mu-list-item-action>
							      <mu-list-item-content>
							        <mu-list-item-title>{{item.title}}</mu-list-item-title>
							        <mu-list-item-sub-title>
							        	<span v-show="!isbind" style="color: #a9a9a9;">绑定手机号才能查看价格</span>
										<p style="color: red;" v-show="isbind">
							          		￥<span style="font-size: 0.5rem;">{{item.price}}</span>
							            </p>
							        </mu-list-item-sub-title>
							      </mu-list-item-content>
							    </mu-list-item>
							    <mu-divider></mu-divider>
							    <div style="position: absolute;right: 0.24rem;bottom: 0.24rem;">
							    	<div class="saoma">
							        	<span>x1</span>
							        </div>
							    </div>
						  	</div>
						  </mu-list>
						</mu-paper>
						<div class="actionli">
							<ul v-if='item.status == 1'>
								<li @click="openJSDialog(index)">取消订单</li>
								<li @click="goDetail(item)">查看详情</li>
								<li>去支付</li>
							</ul>
							<ul v-else-if='item.status == 2'>
								<li @click="goDetail(item)">查看详情</li>
							</ul>
							<ul v-else-if='item.status == 3'>
								<li>查看物流</li>
								<li @click="goDetail(item)">查看详情</li>
								<li>确认收货</li>
							</ul>
							<ul v-else>
								<li>删除订单</li>
								<li @click="goDetail(item)">查看详情</li>
							</ul>
						</div>
					</div>
					
				</div>
			</mu-load-more>
		</div>
		 <mu-dialog title="温馨提示" width="360" :open.sync="openJS">
	  	 	<span class="cancelbox" @click="closeJSDialog"><img src="../../../static/img/ic_Shut .png"/></span>
		    您确认要取消该订单吗?<br />
		    <mu-button slot="actions" flat color="primary" @click="sureClick(index)">确定</mu-button>
			 <mu-button slot="actions" flat color="secondary" @click="closeJSDialog">取消</mu-button>
		  </mu-dialog>
	</div>
		
</template>

<script>
	import BackBar from '../common/BackBar.vue'
	import { mapState } from 'vuex'
	import { getOrders } from '../../http/http.js'
	
	export default{
		data(){
			return{
				num: 10,
				refreshing: false,
				limit:15,
				page:1,
		        loading: false,
		        openJS:false,//弹窗
		        index:0,
				list:[
	      			{
	      				id:1,
	      				orderid:545455454,
	      				status:1,//0-全部 1-待支付 2-待发货 3-已发货 4-已完成 5-已取消
	      				img:require('../../../static/img/1-0_03.png'),//图片
	      				title:'算哈哈是111',//标题
	      				num:0,//数量
	      				price:'20',//单价
	      				oldPrice:'50'//旧的价格
	      			},
	      			{
	      				id:2,
	      				orderid:545455454,
	      				status:2,
	      				img:require('../../../static/img/1-0_03.png'),//图片
	      				title:'算哈哈是111',//标题
	      				num:0,//数量
	      				price:'20',//单价
	      				oldPrice:'50'//旧的价格
	      			},
	      			{
	      				id:1,
	      				orderid:545455454,
	      				status:3,//1-待支付 2-待发货 3-已发货 4-已完成 5-已取消
	      				img:require('../../../static/img/1-0_03.png'),//图片
	      				title:'算哈哈是111',//标题
	      				num:0,//数量
	      				price:'20',//单价
	      				oldPrice:'50'//旧的价格
	      			},
	      			{
	      				id:2,
	      				orderid:545455454,
	      				status:4,
	      				img:require('../../../static/img/1-0_03.png'),//图片
	      				title:'算哈哈是111',//标题
	      				num:0,//数量
	      				price:'20',//单价
	      				oldPrice:'50'//旧的价格
	      			},
	      			{
	      				id:2,
	      				orderid:545455454,
	      				status:5,
	      				img:require('../../../static/img/1-0_03.png'),//图片
	      				title:'算哈哈是111',//标题
	      				num:0,//数量
	      				price:'20',//单价
	      				oldPrice:'50'//旧的价格
	      			}
	      		]
			}
		},
		components:{
			BackBar
		},
		computed:{
			...mapState({ // mapState相当于映射
		        isbind: 'isbind',
		    })
		}, 
		methods:{
			/**获取用户订单*/
			getOrders(){
				getOrders(this.limit,this.page).then(res => {
					
				})
			},
			/*滚动到底部加载更多*/
		    load () {
		      this.loading = true;
		      setTimeout(() => {
		        this.loading = false;
		        this.list.push(this.list[0])
		        console.log('成功添加一条数据')
		        //this.num += 10;
		      }, 1000)
		    },
			/*查看详情*/
			goDetail(item){
				this.$router.push({path:'/orderstatus', query:{status:item.status}})
			},
		    /*删除订单*/
		   sureClick(index){
		   	this.openJS = false;
		   	this.index = index
		   	console.log(index)
		   	this.list.splice(index,1)
		   },
		    /*打开弹窗*/
	    	openJSDialog(){
	    		this.openJS = true;
	    	},
	    	/*关闭弹窗*/
		    closeJSDialog () {
		      this.openJS = false;
		    }
		},
		mounted(){
			let id = this.$route.query.id;
			console.log("0-全部 1-待支付 2-待发货 3-已发货(待收货) 4-已完成 5-已取消==="+ id )
			if(id != 0){
				//修改tab选中状态
				let tabtitle=document.getElementsByClassName('tabtitle');
				for(let i=0;i<tabtitle.length;i++){
					tabtitle[i].index = i;
					let classlist = tabtitle[i].classList;
					id == tabtitle[i].index ? classlist.add("mu-tab-active") : classlist.remove("mu-tab-active")
					
					//在订单页面点击切换时修改其他订单状态
					tabtitle[i].onclick = function(){
						let thisid = this.index
						for(let j=0;j<tabtitle.length;j++){
							if(thisid != tabtitle[j].index){
								tabtitle[j].classList.remove("mu-tab-active")
							}
						}
					}
					
		        }
			}else{
				//全部订单选中状态
				document.getElementsByClassName('tabtitle')[0].classList.add("mu-tab-active");
			}
			
			
		}
		
	}
	
</script>

<style scoped>
	.mu-appbar{border-bottom:1px solid #e0e0e0}
	.mu-tab{min-width: auto;}
	.mu-tabs{background: #fff;color: #333;}
	.mu-tab-active{color: #f95151;}
	.left{font-weight: bold;}
	.right{color: #f95151 ;}
	.mu-list{padding: 0;}
	.mu-elevation-1{box-shadow: none;}
	
	.listbox{padding: 0.15rem 0.3rem;}
	.onelistbox{background: #fff;border-radius: 0.2rem;}
	.onelistbox:not(:first-child){margin-top: 0.15rem;}
	.leftright{border-bottom: 1px solid #e0e0e0;padding: 0.16rem 0.3rem;}
	.li-box{position: relative;}
	.mu-avatar img{border-radius: 0.2rem;}
	.mu-item-content{margin-left: 0.05rem;}
	.mu-avatar{margin-top: 0 !important;}
	.saoma span{color: #666;}
	
	.actionli{overflow: hidden;padding: 0.14rem 0.3rem;}
	.actionli ul{float: right;}
	.actionli li{float: left;padding: 0.08rem 0.36rem;margin-left:0.2rem;border-radius: 0.5rem;}
	.actionli li:not(:last-child){border:1px solid #999;color: #999;}
	.actionli li:last-child{border:1px solid #f95151;color: #f95151;}
</style>