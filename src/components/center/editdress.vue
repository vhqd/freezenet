<template>
	<div class="editdress">
		<BackBar :dTitle='dTitle'></BackBar>
		<!--收货地址管理-->
		<div class="dresslist" style="padding-bottom: 1rem;">
			<mu-load-more :loading="loading" @load="load">
			<mu-paper :z-depth="1" class="demo-list-wrap">
				<p class="qxgl" @click="qxglFunc"><span>取消管理</span></p>
				<div class="listonebox" v-for="(item,index) in list" :key="index">
				  <mu-list textline="two-line" class='listone'>
				    <mu-list-item avatar :ripple="false" button>
				      <mu-list-item-content>
				        <mu-list-item-title>
				        	{{item.name}}
				          <mu-list-item-after-text class="phone">{{item.phone}}</mu-list-item-after-text>
				        </mu-list-item-title>
				        <mu-list-item-sub-title class='dresstitle'>
				          	{{item.address}}
				        </mu-list-item-sub-title>
				      </mu-list-item-content>
				    </mu-list-item>
				  </mu-list>
				  <div class="editbox">
			  		<span class="moren" @click="toDefault(index,item)">
			  			<span :class=" item.is_default == 1 ? 'isdefault' : 'nodefault' "></span>
			  			默认地址
			  		</span>
			  		<span class="editanddelete" @click="openJSDialog(index,item)">删除</span>
			  		<span class="editanddelete edittext" @click='toEdit(item)'>编辑</span>
				  </div>
			    </div>
		</mu-paper>
		</mu-load-more>
	</div>
	<div class="newdress" @click="goAddress">新增地址</div>
	 <mu-dialog title="删除地址" width="360" :open.sync="openJS">
  	 	<span class="cancelbox" @click="closeJSDialog"><img src="../../../static/img/ic_Shut .png"/></span>
	    确认删除该收货地址<br>删除后不可恢复
	    <mu-button slot="actions" flat color="primary" @click="dele(index,item)">确定</mu-button>
		 <mu-button slot="actions" flat color="secondary" @click="closeJSDialog">取消</mu-button>
	  </mu-dialog>
	</div>
</template>

<script>
	import BackBar from '../common/BackBar.vue'
	import { getDress , DeleDress , DefaultDress } from "../../http/http.js";

	export default {
		data() {
			return {
				host:this.$store.state.host,
				page:1,
				limit:15,//当前页面分页条数
				loading: false,
				nomore:false,
				dTitle: '地址管理',
				item:[],//操作的数据
				openJS:false,//弹窗
				index:0,
				list:[]
			}
		},
		components: {
			BackBar
		},
		activated(){
			this.page = 1;
			this.list = [];
			this.getDress(this.page);
		},
		mounted(){
			document.title = '地址管理'
			
				
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
			/*取消管理*/
			qxglFunc(){
				this.$router.replace('/dressmanagement')
			},
			goAddress(){
				this.$router.push({path:'/address', query:{status:1}})
			},
			/*到编辑页面*/
			toEdit(item){
				this.$router.push({path:'/address',query:{item:item,isedit:true}})
			},
			/*修改默认地址*/
			toDefault(index,item){
				let that = this;
				let list = this.list
				for(let i = 0 ; i < list.length ; i++ ){
						this.list[i].is_default = false;
				}
				this.list[index].is_default = true
				console.log(item)
				let is_default = item.is_default ? 1 : 0 ;
				let upData = {
					name:item.name,//联系人
					phone:item.phone,//联系电话
					city:item.city,//所在地区	
					address:item.address,//详细地址
					is_default	: is_default//是否默认
				};
				DefaultDress(item ,upData).then(res =>{
					console.log(res);
				})
			},
			/*删除地址*/
	    	dele(index){
	    		this.list.splice(index,1)
	    		this.openJS = false;
	    		console.log(this.item)
					let that = this;
					DeleDress(this.item).then(res =>{
						console.log(res);
					})
	    	},
	    	/*打开弹窗*/
	    	openJSDialog(index,item){
	    		this.index = index
	    		this.item = item
	    		this.openJS = true;
	    	},
	    	/*关闭弹窗*/
		    closeJSDialog () {
		      this.openJS = false;
		    }
		}
	}
</script>

<style scoped>
	.mu-appbar{border-bottom:1px solid #e0e0e0}
	.rightJ{width: 0.2rem;height: 0.3rem;}
	.mu-list{padding: 0;}
	.dresstitle{font-size: 0.24rem;}
	.mu-paper{background: initial;}
	.dresslist .mu-item-title,.dresslist .phone{font-size: 0.26rem;font-weight: bold;color: #333;float: right;}
	.mu-item-sub-title{overflow: initial;text-overflow: initial;white-space: normal;}
	.listone{padding:0.17rem 0.15rem;}
	.dresslist ul{border-bottom: 1px solid #e0e0e0;}
	.listonebox{background: #fff;}
	.listonebox:not(:first-of-type){margin-top: 0.2rem !important;}
	.editbox{padding: 0.17rem 0.15rem;overflow: hidden;}
	.editbox span{color: #f95151;}
	.moren{float: left;}
	.edittext{margin-right: 0.55rem;}
	.editanddelete{float: right;}
	
	.moren span{height: 0.16rem;width: 0.16rem;border-radius: 100%;display: inline-block;}
	.isdefault{background: #f95151;}
	.nodefault{border:1px solid #ccc;}
	
	.newdress{position: fixed;bottom: 0;width: 100%;height: 1rem;line-height: 1rem;font-size: 0.32rem;background: #f24c4c;color: #fff;font-weight: bold;}
	
	.qxgl{overflow: hidden;background: #fff;padding: 0.1rem 0;border-bottom:1px solid #e0e0e0;padding-top: 1rem;}
	.qxgl span{float: right;margin-right: 0.3rem;width: 1.6rem;height: 0.66rem;border-radius: 0.2rem;border:1px solid #F24C4C;line-height: 0.66rem;color:#F24C4C;}
</style>