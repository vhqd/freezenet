<template>
	<div class="detail">
		<!--头部-->
		<BackBar :dTitle='dTitle'></BackBar>
		<!-- 轮播图-->
		<HomeBannerView :imgs='bannerImg'></HomeBannerView>

		<div class="dInfobox" v-if="contentinfo[0]">
			<mu-list textline="three-line">
				<mu-list-item avatar :ripple="false" button>
					<mu-list-item-content>
						<mu-list-item-title>{{contentinfo[0].goods_title}}</mu-list-item-title>
						<span style="color: #a9a9a9;font-size: 0.2rem;">{{contentinfo[0].goods_count}}斤装</span>
						<mu-list-item-sub-title>
							<p style="color: red;">
								￥
								<span style="font-size: 0.5rem;">{{contentinfo[0].goods_price}}</span>
								<!-- <span style="color: #ccc;text-decoration: line-through;">￥{{data.oldPrice}}</span> -->
							</p>
							<div class="mjbox">
								<span class="mj">满300减20</span>
							</div>
						</mu-list-item-sub-title>
					</mu-list-item-content>
				</mu-list-item>
				<mu-divider></mu-divider>
				<div style="position: absolute;right:0.28rem;bottom: 0;color: red;">
					<div class="saoma">
						<span class="minus" @click="minus()" v-if="contentinfo[0].num != 0"><img src="../../../static/img/ic_jian.png" alt="" style="width:.5rem;height:.5rem;"></span>
						<span v-show="contentinfo[0].num != 0">{{contentinfo[0].num}}</span>
						<span class="plus" @click="plus()"><img src="../../../static/img/ic_jia.png" alt="" style="width:.5rem;height:.5rem;"></span>
					</div>
				</div>
			</mu-list>
			<p class="instructions">{{contentinfo[0].goods_desc}}</p>
		</div>
		<div style="padding-bottom:1rem;">
			<img v-if="contentinfo[0]" :src="contentinfo[0].goods_photo" style="width: 100%;margin-top: 0.2rem;" :onerror="onerrorimglong"/>
		</div>

		<div class="addToCar">
			<mu-list class="carbut">
				<mu-list-item avatar button :ripple="false">
					<div class="pricecarbox">
						<div class="carprice">
							<div class="carimgboxs">

								<mu-list textline="two-line" class="jcg" style="margin-left:.2rem;" @click="addOfenBuy()">
									<mu-list-item avatar button :ripple="false">
										<mu-list-item-content>
											<mu-list-item-title><img v-if="!isOfen" :src="jcg1" /><img v-if="isOfen" :src="jcg2" /></mu-list-item-title>
											<mu-list-item-sub-title>加常购</mu-list-item-sub-title>
										</mu-list-item-content>
									</mu-list-item>
								</mu-list>
								<mu-list textline="two-line" class="gwc" style="margin-left:.2rem;">
									<mu-list-item avatar button :ripple="false">
										<mu-list-item-content>
											<mu-list-item-title><img src="../../../static/img/car/car.png"/></mu-list-item-title>
											<mu-list-item-sub-title>购物车</mu-list-item-sub-title>
										</mu-list-item-content>
										<span class="fanallcar" v-if="contentinfo[0]" v-show="contentinfo[0].num != 0">{{contentinfo[0].num}}</span>
									</mu-list-item>
								</mu-list>

							</div>
						</div>
						<div style="position: relative;">合计：
							<span style="color: red;">￥{{allPrice}}</span>
							<span class="qigou">满{{manjian}}减{{jian}}</span>
						</div>
					</div>
					<!-- 
              <div :class="carnum == 0 || allPrice < qigou ? 'huise settlement': 'settlement'">
			       	加入购物车
			      </div>
             -->
					<div v-if="!(allPrice > 0)" class="huise settlement">
						去结算
					</div>
					<div v-else class="settlement" @click="goBuy">
						去结算
					</div>
				</mu-list-item>
			</mu-list>
			<mu-dialog title="温馨提示" width="360" :open.sync="openJS">
				<span class="cancelbox" @click="closeJSDialog"><img src="../../../static/img/ic_Shut .png" /></span>
				你还没有选中商品<br>还不能去结算
				<mu-button slot="actions" flat color="primary" @click="closeJSDialog">确定</mu-button>
			</mu-dialog>
		</div>
		<!--  <div class="addToCar">
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
		  </div> -->
	</div>

</template>

<script>
import HomeBannerView from "../home/HomeBanner.vue";
import BackBar from "../common/BackBar.vue";
import { getProductInfos , AddCarShop , addOfenBuy } from '../../http/http.js'
import QS from "qs";
import carouselImg1 from "../../../static/img/1-0_02.png";
import carouselImg2 from "../../../static/img/1-0_02.png";

export default {
  components: {
    HomeBannerView,
    BackBar
  },
  data() {
    return {
			dTitle: "商品详情", //详情标题
			host:this.$store.state.host,
			id:0,//商品id
      carnum: 0, //分类底部小车数量
			qigou: this.$store.state.qigou, //起购价
			manjian:this.$store.state.manjian,//满减
			jian:this.$store.state.jian,//免减价格
			onerrorimglong:this.$store.state.onerrorimglong,
      openJS: false, //结算弹窗
			allPrice: 0,
			isOfen:false,
      jcg1: require("../../../static/img/home/ic_jiachanggou_moren@3x.png"),
      jcg2: require("../../../static/img/home/ic_jiachanggou_yijia@3x.png"),
      contentinfo: [],
       /*  id: 1,
        img: require("../../../static/img/1-0_03.png"), //图片
        title: "算哈哈是111", //标题
        num: 0, //数量
        price: "20", //单价
        oldPrice: "50", //旧的价格
        inventory: "5", //库存
        manjian: 310, //满减
				instructions: "发货说明发货说明发货说明发货说明发货说明发货说明" */
      
      bannerImg: [
				{banner_image_address:require("../../../static/img/1-0_02.png")},
				{banner_image_address:require("../../../static/img/1-0_02.png")}
      ]
    };
	},
	activated(){
		//this.contentinfo = [];//防止缓存
		this.id = this.$route.query.id;
		this.isOfen = false
		let data = {"id":[this.id]}

		getProductInfos(JSON.stringify(data)).then(res => {
			let data = res.data.data;
			data[0].goods_photo = this.host + data[0].goods_photo;
			data[0].num = 0;
			this.contentinfo = data;
		})
	},
	mounted(){
		
	},
  methods: {
		/**添加常购*/
		addOfenBuy(){
			
			addOfenBuy(this.contentinfo[0].id).then(res => {
				console.log(res);
				this.isOfen = true;
			})
		},
	

		/**添加商品到购物车结算*/
		goBuy(){
			let alldata = {
						'goods_id':[this.id],
						'single_price':[this.contentinfo[0].goods_price],
						'count':[this.contentinfo[0].num],
						'sum_price':parseInt(this.contentinfo[0].num)*parseFloat(this.contentinfo[0].goods_price)
					}
			 AddCarShop(QS.stringify(alldata)).then(res=>{
        this.$router.push('/car')
      })
		},
    /*减少数量值*/
    minus() {
      let amount = this.contentinfo[0].num;
      if (amount > 0) {
        this.contentinfo[0].num = amount - 1;
      } else {
        this.contentinfo[0].num = 0;
			}
			this.allPrice = parseInt(this.contentinfo[0].num)*parseFloat(this.contentinfo[0].goods_price)
    },
    /*增加数量值*/
    plus() {
      let amount = this.contentinfo[0].num;
			this.contentinfo[0].num = amount + 1;
			this.allPrice =parseInt(this.contentinfo[0].num)*parseFloat(this.contentinfo[0].goods_price)
    },
    /*关闭弹窗*/
    closeJSDialog() {
      this.openJS = false;
    }
  }
};
</script>

<style scoped>
.mu-list {
  padding: 0;
  background: #fff;
}

.dInfobox {
  background: #fff;
}
.mu-item {
  height: 100%;
}
.settlement{background: #f24c4c;}
.huise{background: #bbb}
.instructions {
  color: red;
  padding: 0.3rem;
  text-align: left;
}
.addToCar {
  position: fixed;
  bottom: 0;
  width: 100%;
}
.pricecarbox {
  width: 67%;
  background: #fff;
  right: 0;
  position: absolute;
  height: 100%;
}
.pricecarbox div {
  line-height: 35px;
  text-align: right;
  padding-right: 0.3rem;
  font-weight: bold;
  font-size: 0.32rem;
}
.carprice {
  position: absolute;
  left: 0;
  top: 4px;
}
.carimgboxs {
  width: 100%;
  height: 1rem;
}
.carimgboxs .gwc .mu-item-title img{
  width: 0.47rem;
  height: 0.47rem;
}
.carimgboxs .mu-item-sub-title {
  line-height: 20px;
}
.carimgboxs .jcg .mu-item-title img{
	 width: 0.41rem;
  height: 0.50rem;
}
.carimgboxs .mu-item-sub-title,
.carimgboxs .mu-item-title {
  font-size: 0.12rem;
  text-align: center;
  padding-right: 0;
}
.carimgboxs ul {
  width: auto;
}
.carimgboxs .mu-list {
  background: initial;
}
.carimgboxs .mu-item-content {
  flex: initial;
}
.carimgboxs ul:first-child {
  position: absolute;
	left: 0;
	z-index: 9;
}
.carimgboxs ul:last-child {
  position: absolute;
  left: 1rem;
}
.mu-item-sub-title{line-height: 1.2}
.mjbox{margin:.1rem 0}
.mjbox .mj{color: red;background: #ffeaea;padding: .04rem .2rem;}
</style>