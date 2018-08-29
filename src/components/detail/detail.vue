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
						<span style="color: #a9a9a9;font-size: 0.2rem;">{{contentinfo[0].goods_specification}}</span>
						<mu-list-item-sub-title>
							<p style="color: red;">
								￥
								<span v-show="!isbind" style="color: #a9a9a9;">绑定手机号才能查看价格</span>
								<span v-show="isbind" style="font-size: .38rem;">{{showprice}}</span>
								<!-- <span style="color: #ccc;text-decoration: line-through;">￥{{data.oldPrice}}</span> -->
							</p>
						</mu-list-item-sub-title>
						<div class="mjbox">
							<span class="mj">满300减20</span>
						</div>
					</mu-list-item-content>
				</mu-list-item>
				<mu-divider v-if="showPriceData"></mu-divider>
				<mu-container class="demo-chip-wrapper" v-if="showPriceData">
					<mu-chip class="demo-chip" v-for="(item , index) in pricebox" :key="index" :color="index==cmy?'red':''" @click="switchPrice(item,index)">
						{{item.specification*2}}斤装
					</mu-chip>
				</mu-container>
				<mu-divider></mu-divider>
				<div style="position: absolute;right:0.28rem;top: 70px;color: red;">
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
			<img v-if="contentinfo[0]" :src="contentinfo[0].goods_photo" style="width: 100%;margin-top: 0.2rem;" :onerror="onerrorimglong" />
		</div>

		<div class="addToCar" v-if="contentinfo[0]">
			<mu-list class="carbut">
				<mu-list-item avatar button :ripple="false">
					<div class="pricecarbox">
						<div class="carprice">
							<div class="carimgboxs">

								<mu-list textline="two-line" class="jcg" style="margin-left:.2rem;" @click="addOfenBuy()">
									<mu-list-item avatar button :ripple="false">
										<mu-list-item-content>
											<mu-list-item-title><img v-if="!contentinfo[0].is_often_browse" :src="jcg1" /><img v-if="contentinfo[0].is_often_browse" :src="jcg2" /></mu-list-item-title>
											<mu-list-item-sub-title>加常购</mu-list-item-sub-title>
										</mu-list-item-content>
									</mu-list-item>
								</mu-list>
								<mu-list textline="two-line" class="gwc" style="margin-left:.2rem;" @click="goShopCar">
									<mu-list-item avatar button :ripple="false">
										<mu-list-item-content>
											<mu-list-item-title><img src="../../../static/img/car/car.png" /></mu-list-item-title>
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
		<mu-dialog title="温馨提示" width="360" :open.sync="openwins">
			<span class="cancelbox" @click="cancel"><img src="../../../static/img/ic_Shut .png" /></span>
			绑定手机才可以下单呦~<br />
			<mu-button slot="actions" flat color="primary" @click="sure">确定</mu-button>
			<mu-button slot="actions" flat color="secondary" @click="cancel">取消</mu-button>
		</mu-dialog>
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
import { mapState } from "vuex";
import {
  getProductInfos,
  AddCarShop,
	addOfenBuy,
	EditCarShop,
  deletOfenBuy
} from "../../http/http.js";
import { jiancar, addcar } from "../../common/common.js";
import QS from "qs";
import carouselImg1 from "../../../static/img/1-0_02.png";
import carouselImg2 from "../../../static/img/1-0_02.png";
import { share } from '../../common/share.js';

export default {
  components: {
    HomeBannerView,
    BackBar
  },
  data() {
    return {
      dTitle: "商品详情", //详情标题
      host: this.$store.state.host,
      id: 0, //商品id
      showprice: 0,
      cmy:0,
      isSelect: true,
      thisitem: 0,
      carnum: 0, //分类底部小车数量
      qigou: this.$store.state.qigou, //起购价
      manjian: this.$store.state.manjian, //满减
      jian: this.$store.state.jian, //免减价格
      onerrorimglong: this.$store.state.onerrorimglong,
      openJS: false, //结算弹窗
      openwins: false,
      allPrice: 0,
      isOfen: false,
      showPriceData:false,
      jcg1: require("../../../static/img/home/ic_jiachanggou_moren.png"),
      jcg2: require("../../../static/img/home/ic_jiachanggou_yijia.png"),
      contentinfo: [],
      pricebox: [],
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
        { banner_image_address: require("../../../static/img/1-0_02.png") },
        { banner_image_address: require("../../../static/img/1-0_02.png") }
      ]
    };
  },
  watch: {
    allPrice(a, b) {
      if (a > this.manjian) {
        this.allPrice = this.allPrice - this.jian;
      }
    }
  },
  activated() {
    

    this.$store.commit("setLoad", true);
    //this.contentinfo = [];//防止缓存
    this.id = this.$route.query.id;
    this.isOfen = false;
    this.allPrice = 0;
    let data = { id: [this.id] };

    getProductInfos(JSON.stringify(data)).then(res => {
      let data = res.data.data;
      data[0].goods_photo = this.host + data[0].goods_photo;
      data[0].num = 0;
      this.contentinfo = data;
      if (this.contentinfo[0].hasOwnProperty("specifications")) {
        this.showprice = this.contentinfo[0].specifications[0].price;
      } else {
        this.showprice = this.contentinfo[0].price;
      }
      this.pricebox = this.contentinfo[0].specifications;
      for (let item in this.pricebox) {
        if (item == 0) {
          this.pricebox[item].isselect = true;
        } else {
          this.pricebox[item].isselect = false;
        }
      }

      if(this.contentinfo[0].hasOwnProperty('specifications')){
        this. showPriceData = true
      }else{
        this. showPriceData = false
      }
      this.$store.commit("setLoad", false);
    });
  },
  mounted() {
    document.title = "商品详情";
    let invate_code = localStorage.invate_code
    if (invate_code && invate_code!= '') {
       share(this.$store.state.shareurl,localStorage.invate_code,this.$store.state.shareimg)
    }
  },
  computed: {
    ...mapState({
      // mapState相当于映射
      isbind: "isbind"
    })
  },
  methods: {
    switchPrice(item, index) {
      this.showprice = item.price;
      this.cmy = index;
    },
    /**添加常购或者取消常购*/
    addOfenBuy() {
      let is_often_browse = this.contentinfo[0].is_often_browse;
      if (!is_often_browse) {
        addOfenBuy(this.contentinfo[0].id).then(res => {
          console.log(res);
          this.$store.commit("setShowText", this.$store.state.changgou);
          this.$store.commit("showInfo");
          this.contentinfo[0].is_often_browse = true;
        });
      } else {
        let often_browse_id = this.contentinfo[0].often_browse_id;
        deletOfenBuy(often_browse_id).then(res => {
          this.$store.commit("setShowText", this.$store.state.qxchanggou);
          this.$store.commit("showInfo");
          this.contentinfo[0].is_often_browse = false;
        });
      }
    },
    /**点击底部购物车图标到购物车*/
    goShopCar() {
      this.$router.push("/car");
    },

    /**添加商品到购物车结算*/
    goBuy() {
      let alldata = {
        goods_id: [this.id],
        single_price: [this.contentinfo[0].price],
        count: [this.contentinfo[0].num],
        sum_price:
          parseInt(this.contentinfo[0].num) *
          parseFloat(this.contentinfo[0].price)
      };
      AddCarShop(QS.stringify(alldata)).then(res => {
        this.$router.push("/car");
      });
    },
    /*减少数量值*/
    minus() {
      let shopdata = this.contentinfo[0];
      let amount = this.contentinfo[0].num;
      if (amount > 0) {
        shopdata.num = amount - 1;
      } else {
        shopdata.num = 0;
      }
      let data = this.returnData(shopdata , this.pricebox)
      let id = data.id
      
      EditCarShop(id, QS.stringify(data)).then(res => {
        this.$store.commit("editCarnum", this.$store.state.count - 1);
      });
    },
    /*增加数量值*/
    plus() {
      let isbind = localStorage.isbind;
      if (isbind != 1) {
        this.openwins = true;
      } else {
        let shopdata = this.contentinfo[0];
        let amount = shopdata.num;
        shopdata.num = amount + 1;
        let data = this.returnData(shopdata , this.pricebox)
       /*  let data = {};
        let id = null
        if (shopdata.hasOwnProperty("specifications")) {
          let pribox = this.pricebox;
          let specification_id = null;
          let single_price = null;
          let num = null
          for (let ite in pribox) {
            if (pribox[ite].isselect) {
              this.allPrice = parseInt(shopdata.num) * parseFloat(pribox[ite].price);
              specification_id = pribox[ite].specification_id;
              single_price = pribox[ite].price;
              num = pribox[ite].num;
            }
          }
          
          data = {
            specification_id: [specification_id],
            goods_id: [shopdata.id],
            single_price: single_price,
            count: [1],
            sum_price: shopdata.num * shopdata.price
          };
        } else {
          this.allPrice = parseInt(shopdata.num) * parseFloat(shopdata.price);
          data = {
           specification_id: [shopdata.specification_id],
            goods_id: [shopdata.id],
            single_price: [shopdata.price],
            count: [1],
            sum_price: shopdata.num * shopdata.price,
            isadd: 0
          };
        } */
        console.log("添加的数据");
        console.log(data);
        addcar(data, 2);
      }
    },
    /**处理需要返回的data数据*/
    returnData(shopdata,pricebox){
      let data = {};
      let id = null;
      if (shopdata.hasOwnProperty("specifications")) {
        let pribox = pricebox;
        let specification_id = null;
        let single_price = null;
        let num = null
        this.allPrice = parseInt(shopdata.num) * parseFloat(pribox[ite].price);
        for (let ite in pribox) {
          if (pribox[ite].isselect) {
            specification_id = pribox[ite].specification_id;
            single_price = pribox[ite].price;
            num = pribox[ite].num;
          }
        }
		    id = this.contentinfo[0].id;
        data = {
			    id:id,
          specification_id: [specification_id],
          goods_id: [shopdata.id],
          single_price: single_price,
          count: [1],
          sum_price: shopdata.num * single_price,
          isadd: 0
        };
      } else {
		    id = this.contentinfo[0].id;
        this.allPrice = parseInt(shopdata.num) * parseFloat(shopdata.price);
        data = {
		    	id:id,
          specification_id: [shopdata.specification_id],
          goods_id: [shopdata.id],
          single_price: [shopdata.price],
          count: [1],
          sum_price: shopdata.num * shopdata.price,
          isadd: 0
        };
      }
      return data;
    },
    /*关闭弹窗*/
    closeJSDialog() {
      this.openJS = false;
    },
    sure() {
      this.openwins = false;
      this.$router.push("/phone");
    },
    cancel() {
      this.openwins = false;
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
.settlement {
  background: #f24c4c;
}
.huise {
  background: #bbb;
}
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
  z-index: 9;
}
.carimgboxs {
  width: 100%;
  height: 1rem;
}
.carimgboxs .gwc .mu-item-title img {
  width: 0.47rem;
  height: 0.47rem;
}
.carimgboxs .mu-item-sub-title {
  line-height: 20px;
}
.carimgboxs .jcg .mu-item-title img {
  width: 0.41rem;
  height: 0.5rem;
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
.mu-item-sub-title {
  line-height: 1.2;
}
.mjbox {
  margin: 0.1rem 0;
}
.mjbox .mj {
  color: red;
  background: #ffeaea;
  padding: 0.04rem 0.2rem;
}
.demo-chip-wrapper {
  padding: 10px 0;
  overflow: hidden;
}
.mu-chip {
  margin-left: 5px;
  float: left;
}
@media screen and (max-width: 325px) {
  .carprice {
    top: 2px;
  }
}
</style>