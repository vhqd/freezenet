<template>
	<div class="container">
		<!--头部-->
		<BackBar dTitle='我的优惠券'></BackBar>
		<template v-if="list.length != 0">
			<!--<div class="topgrid">
				<mu-grid-list class="gridlist-demo sptop" :cols="3">
					<mu-grid-tile v-for="tile, index in product" :key="index">
						<span slot="title">{{tile.title}}</span>
						<span slot="subTitle">{{tile.author}}</b></span>
					</mu-grid-tile>
				</mu-grid-list>
			</div>-->
			<div class="carlistbox coupons">
				<mu-load-more :loading="loading" @load="load" style="padding-top:1rem;">
					<ul>
						<li class="list-item " v-for="(item,index) in list" :key="index" data-type="0">
							<!--<div class="list-box" @touchstart.capture="touchStart" @touchend.capture="touchEnd" @click="skip">-->
							<div class="list-box" @touchstart.capture="touchStart($event,item)" @touchend.capture="touchEnd($event)">

								<!-- <div class="list-box" v-if="item.is_overdue"> -->
								<div class="list-content">

									<mu-paper :z-depth="1" class="demo-list-wrap">
										<mu-list textline="three-line">
											<div class="li-box">
												<mu-list-item avatar :ripple="false" button>
													<mu-list-item-action>
														<mu-avatar style="width: 1.4rem;height: 1.4rem;">
															<img src="../../../static/img/center/5.6_03.png">
														</mu-avatar>
													</mu-list-item-action>
													<mu-list-item-content>
														<mu-list-item-title>{{item.red_packet_name}}</mu-list-item-title>
														<mu-list-item-sub-title>
															<!--<span style="color: #a9a9a9;font-size: 0.2rem;">库存{{item.inventory}}件</span>-->
															<p style="color: red;">
																￥
																<span style="font-size: 0.5rem;">{{item.red_packet_price}}</span>
																<span style="color: red;background: #ffeaea;padding: .04rem .2rem;" v-if="item.red_packet_threshold_price!=0">满{{item.red_packet_threshold_price}}可用</span>
															</p>
														</mu-list-item-sub-title>
													</mu-list-item-content>
												</mu-list-item>
												<div class="usecar">
													<div class="saoma">
														<span v-if="!item.is_overdue" class="mpnum usecoupons" @click="gobuy">去使用</span>
														<span v-if="item.is_overdue" class="mpnum nousecoupons">已过期</span>
														<!-- <span :class="!item.is_overdue ? 'mpnum usecoupons' : 'mpnum nousecoupons' " >{{!item.is_overdue ? '去使用'  : '已过期'}}</span> -->
													</div>
													<div class="yuan garden1"></div>
													<div class="yuan garden2"></div>
												</div>
											</div>
										</mu-list>
									</mu-paper>

								</div>
							</div>
							<div class="delete" @click="deleteItem(index,item)">删除</div>
						</li>
						<li class="list-item " v-show='nomore'>
							<p>没有更多数据</p>
						</li>
					</ul>
				</mu-load-more>
			</div>

		</template>

		<div v-else style="position: absolute;left: 50%;top: 50%;margin-top: -97.5px;margin-left: -96px;">
			<img src="../../../static/img/car/img_konggouwuche.png" style="width: 3.9rem;height: 3.3rem;" />
			<p style="color: #999;">还没有获得优惠券呦</p>
		</div>

	</div>
</template>

<script>
import BackBar from "../common/BackBar.vue";
import { getCenterCoupons, deletCoupons } from "../../http/http.js";

export default {
  name: "index",
  data() {
    return {
      host: this.$store.state.host,
      page: 1,
      limit: 99, //当前页面分页条数
      loading: false,
      nomore: false, //没有更多数据
      radioF: require("../../../static/img/car/ic_xuanzhong.png"), //选中图片
      radioT: require("../../../static/img/car/ic_weixuan.png"), //未选图片
      openJS: false, //结算弹窗
      checkAll: false, //全选（默认不选）
      allPrice: 0, //总价
      checkNum: 0, //选中的条数
      list: [
        /*{
      				id:1,
      				img:require('../../../static/img/center/5.6_03.png'),//图片
      				title:'算哈哈是111',//标题
      				num:1,//数量
      				price:20,//单价
      				isguoqi:false,//是否过期
      				oldPrice:50,//旧的价格
      				inventory:5,//库存
      				checks:false
      			},
      			{
      				id:2,
      				img:require('../../../static/img/center/5.6_03.png'),//图片
      				title:'算哈哈是',//标题
      				num:1,//数量
      				price:20,//单价
      				isguoqi:false,//是否过期
      				oldPrice:50,//旧的价格
      				inventory:5,//库存
      				checks:false
      			},
      			{
      				id:2,
      				img:require('../../../static/img/center/5.6_03.png'),//图片
      				title:'算哈哈是',//标题
      				num:1,//数量
      				price:20,//单价
      				isguoqi:false,//是否过期
      				oldPrice:50,//旧的价格
      				inventory:5,//库存
      				checks:false
      			},
      			{
      				id:2,
      				img:require('../../../static/img/center/5.6_03.png'),//图片
      				title:'算哈哈是',//标题
      				num:1,//数量
      				price:20,//单价
      				isguoqi:false,//是否过期
      				oldPrice:50,//旧的价格
      				inventory:5,//库存
      				checks:false
      			},
      			{
      				id:2,
      				img:require('../../../static/img/center/5.6_03.png'),//图片
      				title:'算哈哈是',//标题
      				num:1,//数量
      				price:20,//单价
      				isguoqi:false,//是否过期
      				oldPrice:50,//旧的价格
      				inventory:5,//库存
      				checks:false
      			},
      			{
      				id:2,
      				img:require('../../../static/img/center/5.6_03.png'),//图片
      				title:'算哈哈是',//标题
      				num:1,//数量
      				price:20,//单价
      				isguoqi:false,//是否过期
      				oldPrice:50,//旧的价格
      				inventory:5,//库存
      				checks:false
      			},
      			{
      				id:2,
      				img:require('../../../static/img/center/5.6_03.png'),//图片
      				title:'算哈哈是',//标题
      				num:1,//数量
      				price:20,//单价
      				isguoqi:false,//是否过期
      				oldPrice:50,//旧的价格
      				inventory:5,//库存
      				checks:false
      			},
      			{
      				id:2,
      				img:require('../../../static/img/center/5.6_03.png'),//图片
      				title:'算哈哈是',//标题
      				num:1,//数量
      				price:20,//单价
      				isguoqi:true,//是否过期
      				oldPrice:50,//旧的价格
      				inventory:5,//库存
      				checks:false
      			}*/
      ], //默认显示的数据
      product: [
        {
          title: "商品品种",
          author: "20"
        },
        {
          title: "商品数量",
          author: "20"
        },
        {
          title: "商品总额",
          author: "￥500.00"
        }
      ],
      list1: [
        {
          title:
            "1.  FX口水娃豆腐干20g[香辣味]/[20g*20G]*5[包]1.  FX口水娃豆腐干20g[香辣味]/[20g*20G]*5[包]",
          config: [
            {
              value: "20"
            },
            {
              value: "20"
            },
            {
              value: "￥500.00"
            }
          ]
        },
        {
          title: "2.  老干妈豆腐干20g[酸辣味]/[20g*20G]*5[包]",
          config: [
            {
              value: "20"
            },
            {
              value: "20"
            },
            {
              value: "￥500.00"
            }
          ]
        },
        {
          title: "3.  老干妈豆腐干20g[酸辣味]/[20g*20G]*5[包]",
          config: [
            {
              value: "20"
            },
            {
              value: "20"
            },
            {
              value: "￥500.00"
            }
          ]
        },
        {
          title: "微信团队",
          config: [
            {
              value: "20"
            },
            {
              value: "20"
            },
            {
              value: "￥500.00"
            }
          ]
        }
      ],
      startX: 0,
      endX: 0
    };
  },
  computed: {},
  components: {
    BackBar
  },
  activated(){
    this.list = []
	/*获取个人优惠券*/
    this.getCoupons(1);
  },
  mounted() {
    //this.getMenuListOne();
    //this.getCoupons(this.page)
    
  },
  methods: {
    /**去商品分类使用优惠券*/
    gobuy() {
      this.$router.push("/classification");
    },

    /**获取个人优惠券*/
    getCoupons(page) {
      getCenterCoupons(this.limit, page).then(res => {
        this.page = page + 1;
        let data = res.data.info.data;
        if (data && data.length > 0) {
          this.list = this.list.concat(data);
        } else {
          this.nomore = true;
        }
      });
    },

    /*滚动到底部加载更多*/
    load() {
      if (!this.nomore) {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.getCoupons(this.page);
          console.log("成功数据");
          //this.num += 10;
        }, 1000);
      }
    },

    //跳转
    skip() {
      if (this.checkSlide()) {
        this.restSlide();
      } else {
        alert("You click the slide!");
      }
    },
    //滑动开始
    touchStart(e, item) {
      //如果不是过期优惠券则不能滑动
      if (!item.is_overdue) {
        return;
      }
      this.startX = e.touches[0].clientX;
    },
    //滑动结束
    touchEnd(e) {
      let parentElement = e.currentTarget.parentElement;
      this.endX = e.changedTouches[0].clientX;

      if (parentElement.dataset.type == 0 && this.startX - this.endX > 30) {
        this.restSlide();
        parentElement.dataset.type = 1;
      }

      if (parentElement.dataset.type == 1 && this.startX - this.endX < -30) {
        this.restSlide();
        parentElement.dataset.type = 0;
      }

      this.startX = 0;
      this.endX = 0;
    },
    //判断当前是否有滑块处于滑动状态
    checkSlide() {
      let listItems = document.querySelectorAll(".list-item");

      for (let i = 0; i < listItems.length; i++) {
        if (listItems[i].dataset.type == 1) {
          return true;
        }
      }
      return false;
    },
    //一次只能滑动一个
    restSlide() {
      let listItems = document.querySelectorAll(".list-item");

      for (let i = 0; i < listItems.length; i++) {
        listItems[i].dataset.type = 0;
      }
    },
    //删除
    deleteItem(index, item) {
      //let index = e.currentTarget.dataset.index;
      console.log(item);
      deletCoupons(item.id).then(res => {
        if (res.data.code == 200) {
          this.restSlide();
          this.list.splice(index, 1);
        }
      });
    }
  }
};
</script>

<style scoped>
.container {
  padding: 0;
  margin: 0;
  height: 100%;
}
.carlistbox {
  padding-top: 1rem;
}
.carlistbox,
.carlistbox ul {
  height: 100%;
}
.mu-grid-tile-wrapper {
  height: 50px !important;
}
.page-title {
  text-align: center;
  font-size: 17px;
  padding: 10px 15px;
  position: relative;
}

.mu-grid-tile-subtitle span {
  text-align: left;
  display: block;
  font-size: 0.26rem;
  color: #666;
}

.page-title:after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #ccc;
  color: #ccc;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  z-index: 2;
}

.list-item {
  position: relative;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
}

.list-item[data-type="0"] {
  transform: translate3d(0, 0, 0);
}

.list-item[data-type="1"] {
  transform: translate3d(-1.15rem, 0, 0);
}

.list-item:after {
  content: " ";
  position: absolute;
  left: 0.2rem;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #ccc;
  color: #ccc;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  z-index: 2;
}

.list-box {
  display: flex;
  align-items: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  justify-content: flex-end;
  font-size: 0;
}

.list-item .list-img {
  display: block;
  width: 1rem;
  height: 1rem;
}

.list-item .list-content {
  padding: 0 0 0.1rem 0;
  position: relative;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
}

.list-item .title {
  display: block;
  color: #333;
  text-align: left;
  overflow: hidden;
  font-size: 0.26rem;
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.list-item .tips {
  display: block;
  overflow: hidden;
  font-size: 12px;
  color: #999;
  line-height: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.list-item .time {
  display: block;
  font-size: 12px;
  position: absolute;
  right: 0;
  top: 0.1rem;
  color: #666;
}

.list-item .delete {
  width: 1.25rem;
  height: 2.1rem;
  background: #ff4949;
  font-size: 17px;
  color: #fff;
  text-align: center;
  line-height: 2.1rem;
  position: absolute;
  top: 0;
  right: -1.3rem;
}

.topgrid .mu-grid-tile-subtitle span {
  text-align: center;
  color: #f95151;
}
.mu-elevation-1 {
  box-shadow: none;
}
.container > ul {
  overflow: hidden !important;
}
.list-item {
  margin-top: 0.1rem;
}

.mpnum {
  font-size: 0.3rem;
}
.mu-item-sub-title,
.mu-item-title {
  padding-left: 0.2rem;
}
.carMbox .mu-avatar img {
  border-radius: 0.2rem;
}

.radioimg {
  width: 0.3rem;
  height: 0.3rem;
}

.mu-item-action {
  padding-left: 5px;
}

.addToCar {
  position: fixed;
  bottom: 0.84rem;
  width: 100%;
}
.pricecarbox {
  width: 67%;
  background: #fff;
  left: 0;
  position: absolute;
  height: 100%;
}
.pricecarbox div {
  text-align: right;
  padding-right: 0.3rem;
  font-weight: bold;
  font-size: 0.32rem;
}
.pricecarbox div:first-child {
  line-height: 45px;
}
.pricecarbox div:last-child {
  line-height: 32px;
}
.carprice {
  position: absolute;
  left: 0.8rem;
  font-size: 0.26rem !important;
  color: #666;
  z-index: 9;
}
.settlement {
  position: absolute;
  right: 0px;
  background: #f24c4c;
  width: 33%;
  height: 45px;
  line-height: 45px;
  color: #fff;
}
.carlistbox > ul {
  overflow-x: hidden;
}
.qigou {
  position: absolute;
  right: 0.3rem;
  bottom: -0.36rem;
  font-size: 0.22rem;
  color: #999;
}

.mu-avatar img {
  border-radius: initial !important;
}

.usecar {
  position: absolute;
  right: 2.27rem;
  bottom: 0;
  height: 100%;
  border-left: 1px dashed #d4d4d4;
}
.garden1 {
  position: absolute;
  top: 0;
  border-radius: 0 0 40px 40px;
  left: -10px;
  height: 10px;
  width: 20px;
  background: #f5f5f5;
}
.garden2 {
  position: absolute;
  bottom: 0;
  border-radius: 40px 40px 0 0;
  left: -10px;
  height: 10px;
  width: 20px;
  background: #f5f5f5;
}
.usecar .saoma {
  position: absolute;
  top: 0.8rem;
  left: 0.2rem;
}
.saoma span {
  width: 1.68rem;
  height: 0.6rem;
  border-radius: 0.5rem;
  color: #fff;
  line-height: 0.6rem;
}
.usecoupons {
  background: #ffa234;
}
.nousecoupons {
  background: #c3c3c3;
}
.list-item:after {
  border: none;
}
</style>