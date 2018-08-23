<template>
	<!--底部Tab-->
	<div class="footerbox">
			<router-link to="/">
				<mu-button>
					<img :src="tabImg[0].showImg"/>
					<p>首页</p>
				</mu-button>
			</router-link>
			<router-link to="/classification">
				<mu-button>
					<img :src="tabImg[1].showImg"/>
					<p>分类</p>
				</mu-button>
			</router-link>
			<router-link to="/oftenbuy">
				<mu-button>
					<img :src="tabImg[2].showImg"/>
					<p>常购清单</p>
				</mu-button>
			</router-link>
			<router-link to="/car">
				<mu-button>
					<img :src="tabImg[3].showImg"/>
					<p>购物车</p>
					<span class="fanallcar" v-show="count != 0">{{count}}</span>
				</mu-button>
			</router-link>
			<router-link to="/center">
				<mu-button>
					<img :src="tabImg[4].showImg"/>
					<p>我的</p>
				</mu-button>
			</router-link>
	</div>
</template>	
	

<script>
	import {mapState} from "vuex";
	
	export default{
		data(){
			return{
				/*carnum:this.$store.state.count,*/
				tabImg:[
					{
						showImg:require('../../../static/img/home/ic_shouye_weixuan.png'),//渲染图片路径（默认灰色图片）
						img:require('../../../static/img/home/ic_shouye_dianji.png'),//选中图片路径
					},
					{
						showImg:require('../../../static/img/home/ic_fenlei_weixuan.png'),//渲染图片路径（默认灰色图片）
						img:require('../../../static/img/home/ic_fenlei_dianji.png'),//选中图片路径
					},
					{
						showImg:require('../../../static/img/home/ic_changgou_weixuan.png'),//渲染图片路径（默认灰色图片）
						img:require('../../../static/img/home/ic_changgou_dianji.png'),//选中图片路径
					},
					{
						showImg:require('../../../static/img/home/ic_gouwuche_weixuan.png'),//渲染图片路径（默认灰色图片）
						img:require('../../../static/img/home/ic_gouwuche_dianji.png'),//选中图片路径
					},
					{
						showImg:require('../../../static/img/home/ic_wode_weixuan.png'),//渲染图片路径（默认灰色图片）
						img:require('../../../static/img/home/ic_wode_dianji.png'),//选中图片路径
					}
				]
			}
		},
		props:['tagNum'],
		computed: {
/*            localComputed () {
                return this.count + 10;
            },
*/            ...mapState({
                count: "count"
            })
        },
		mounted(){
			//设置tab切换选中图片
    		this.showAcImg();
  		},
		methods:{
			showAcImg(){
				let tag = this.tagNum;
				let tabImg = this.tabImg;
				this.tabImg[tag].showImg = tabImg[tag].img;
				return;
			}
		}
	}
</script>

<style scoped>
	.footerbox{position: fixed;bottom: 0;width: 100%;z-index: 999;display: flex;justify-content: space-around;}
	.mu-raised-button{background: rgba(255, 255, 255, .95)}
	.footerbox a{height: 1rem;line-height: 1rem;width: 33%;position: relative;}
	.footerbox a img{width: 0.43rem;height: 0.43rem;position: absolute;top: 0.1rem;left:50%;margin-left: -0.215rem;}
	.footerbox a p{margin-top: 0.6rem !important;font-size: 12px;}
	.mu-raised-button{box-shadow: none;width: 100%;height: 100%;}
	.mu-button-wrapper{flex-direction: column !important;}
	.tabimgbox{width: 100%;}
	.router-link-exact-active p{color: #f24c4c;}
	.fanallcar{font-size: 12px}
	@media screen and (max-width: 325px) {
		.fanallcar{padding:0 2px;}
	}
</style>