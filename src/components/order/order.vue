<template>
	<div class="orderbox">
		<BackBar :dTitle='dTitle'></BackBar>
		<mu-flex class="flex-wrapper shdz" align-items="center" @click='goAddDress' style="padding-top:1rem;" v-if="!dress">
			<mu-flex class="flex-demo" align-items="center" justify-content="center" fill>
				<img src="../../../static/img/car/ic_tianjia.png" />
				<p class="title">
					添加收货地址
				</p>
			</mu-flex>
		</mu-flex>

		<mu-paper :z-depth="1" class="demo-list-wrap" style="padding-top:1rem;" v-if="dress">
			<mu-list textline="two-line">
				<mu-list-item avatar :ripple="false" button>
					<mu-list-item-content>
						<mu-list-item-title>收货人：{{dress.name}}</mu-list-item-title>
						<mu-list-item-sub-title>
							收货地址：{{dress.address}}
						</mu-list-item-sub-title>
					</mu-list-item-content>
					<mu-list-item-action>
						<mu-list-item-after-text class="mrdz">默认地址</mu-list-item-after-text>
						<mu-list-item-after-text></mu-list-item-after-text>
					</mu-list-item-action>
				</mu-list-item>
			</mu-list>
		</mu-paper>

		<div class="payway">
			<mu-paper :z-depth="1" class="demo-list-wrap">
				<mu-list class="infoboxbut">
					<mu-list-item button :ripple="false" v-for='(item , index) in payway' :key="index">
						<mu-list-item-title>{{item.title}}</mu-list-item-title>
						<mu-list-item-action>
							<span><img :src="　item.checks ? radioF : radioT " class="radioimg" @click="checkRadio(index)"/></span>
						</mu-list-item-action>
					</mu-list-item>
					<!-- <mu-list-item button :ripple="false">
			      <mu-list-item-title>货到付款</mu-list-item-title>
			      <mu-list-item-action>
			        <span><img :src="　item.checks ? radioF : radioT " class="radioimg" @click="checkRadio(item)"/></span>
			      </mu-list-item-action>
			    </mu-list-item>-->
				</mu-list>
			</mu-paper>
		</div>

		<!--订单列表-->
		<div class="listbox">
			<mu-paper :z-depth="1" class="demo-list-wrap">
				<mu-list textline="three-line" v-if="list">

					<div v-for="(item,index) in list" :key="index" class="li-box">
						<mu-list-item avatar :ripple="false" button>
							<mu-list-item-action>
								<mu-avatar style="width: 1.4rem;height: 1.4rem;">
									<img :src="item.goods_photo">
								</mu-avatar>
							</mu-list-item-action>
							<mu-list-item-content>
								<mu-list-item-title>{{item.goods_title}}</mu-list-item-title>
								<mu-list-item-sub-title>
									<!--<span style="color: #a9a9a9;font-size: 0.2rem;">库存{{item.inventory}}件</span>-->
									<p style="color: red;">
										￥<span style="font-size: 0.5rem;">{{item.goods_price}}</span>
										<span style="color: #ccc;text-decoration: line-through;">￥{{item.goods_original_price}}</span>
									</p>
								</mu-list-item-sub-title>
							</mu-list-item-content>
						</mu-list-item>
						<mu-divider></mu-divider>
						<div style="position: absolute;right: 0;bottom: 0;">
							<div class="saoma">
								<span>x{{item.count}}</span>
							</div>
						</div>
					</div>
					<div @click="showAlllist">
						<p style="color:#666;font-size:13px;font-weigth:bold;" v-if="!iszk&&shenyu>0">展开其余（{{shenyu}}）件</p>
						<p v-if="shenyu>0"><img :src="!iszk ? zankai : shouqi " alt="" style="width:12px;height:7px;"></p>
					</div>
				</mu-list>

				<mu-list class="infoboxbut">
					<mu-list-item button :ripple="false">
						<mu-list-item-title>商品总额</mu-list-item-title>
						<mu-list-item-action>
							<span>￥{{allprice}}</span>
						</mu-list-item-action>
					</mu-list-item>
					<mu-list-item button :ripple="false">
						<mu-list-item-title>配送费</mu-list-item-title>
						<mu-list-item-action>
							<span>（免配送费）￥{{psf}}</span>
						</mu-list-item-action>
					</mu-list-item>
					<mu-list-item button :ripple="false" @click="openBotttomSheet">
						<mu-list-item-title>优惠券优惠<span style="font-size:12px;padding-left:15px;">(满300减20)</span></mu-list-item-title>
						<mu-list-item-action>
							<span>-￥{{yhj}}</span>
						</mu-list-item-action>
					</mu-list-item>
					<mu-list-item button :ripple="false" v-for="(item,index) in payway" :key="index" v-if="item.checks">
						<mu-list-item-title>付款方式</mu-list-item-title>
						<mu-list-item-action>
							<span>{{item.title}}</span>
						</mu-list-item-action>
					</mu-list-item>
					<mu-list-item button :ripple="false">
						<mu-list-item-title>应付款</mu-list-item-title>
						<mu-list-item-action>
							<span>￥{{allprice}}</span>
						</mu-list-item-action>
					</mu-list-item>
				</mu-list>

			</mu-paper>

			<div class="total">
				<span class="xj" style="font-size: 0.26rem;font-weight: bold;">小计：<span style="color: red;">￥{{payprice}}</span></span>
				<span class="xj">
					共{{alllistlength}}件商品
				</span>
			</div>

		</div>

		<div class="addToCar">
			<mu-list class="carbut">
				<mu-list-item avatar button :ripple="false">
					<div class="pricecarbox">
						<div>合计：<span style="color: red;">￥{{payprice}}</span></div>
					</div>
					<div class="settlement" @click="toPay">
						提交订单
					</div>
				</mu-list-item>
			</mu-list>
		</div>

		<!--优惠券-->
		<mu-bottom-sheet :open.sync="open" calss='yhjbox'>
			<mu-sub-header>优惠券</mu-sub-header>
			<mu-container>
				<mu-tabs :value.sync="active1" inverse color="secondary" text-color="rgba(0, 0, 0, .54)" center>
					<mu-tab>可用优惠券（{{coupons.length}}）</mu-tab>
					<mu-tab>不可用优惠券（{{nocoupons.length}}）</mu-tab>
				</mu-tabs>
				<div class="demo-text" v-if="active1 === 0">
					<div class="carlistbox">
						<ul>
							<li class="list-item " v-for="(item,index) in coupons" :key="index" data-type="0">
								<!--<div class="list-box" @touchstart.capture="touchStart" @touchend.capture="touchEnd" @click="skip">-->
								<div class="list-box">
									<div class="list-content">
										<mu-paper :z-depth="1" class="demo-list-wrap">
											<mu-list textline="three-line">
												<div class="li-box">
													<mu-list-item avatar :ripple="false" button>
														<mu-list-item-action>
															<mu-avatar style="width: 1.4rem;height: 1.4rem;">
																<img :src="item.img">
															</mu-avatar>
														</mu-list-item-action>
														<mu-list-item-content>
															<mu-list-item-title>{{item.title}}</mu-list-item-title>
															<mu-list-item-sub-title style='margin-top: 0.4rem;'>
																<!--<span style="color: #a9a9a9;font-size: 0.2rem;">库存{{item.inventory}}件</span>-->
																<p>
																	{{item.time}}
																</p>
															</mu-list-item-sub-title>
														</mu-list-item-content>
													</mu-list-item>
													<div class="usecar">
														<div class="saoma" style="color: #fff;">
															<p style="font-size: 0.52rem;">￥{{item.price}}</p>
															<p>满{{item.manjian}}可用</p>
														</div>
													</div>
												</div>
											</mu-list>
										</mu-paper>

									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
				<div class="demo-text" v-if="active1 === 1">
					<div class="carlistbox">
						<ul>
							<li class="list-item " v-for="(item,index) in nocoupons" :key="index" data-type="0">
								<!--<div class="list-box" @touchstart.capture="touchStart" @touchend.capture="touchEnd" @click="skip">-->
								<div class="list-box">
									<div class="list-content">
										<mu-paper :z-depth="1" class="demo-list-wrap">
											<mu-list textline="three-line">
												<div class="li-box">
													<mu-list-item avatar :ripple="false" button>
														<mu-list-item-action>
															<mu-avatar style="width: 1.4rem;height: 1.4rem;">
																<img :src="item.img">
															</mu-avatar>
														</mu-list-item-action>
														<mu-list-item-content>
															<mu-list-item-title>{{item.title}}</mu-list-item-title>
															<mu-list-item-sub-title style='margin-top: 0.4rem;'>
																<!--<span style="color: #a9a9a9;font-size: 0.2rem;">库存{{item.inventory}}件</span>-->
																<p>
																	{{item.time}}
																</p>
															</mu-list-item-sub-title>
														</mu-list-item-content>
													</mu-list-item>
													<div class="usecar">
														<div class="saoma" style="color: #fff;">
															<p style="font-size: 0.52rem;">￥{{item.price}}</p>
															<p>满{{item.manjian}}可用</p>
														</div>
													</div>
												</div>
											</mu-list>
										</mu-paper>

									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</mu-container>
		</mu-bottom-sheet>

	</div>
</template>

<script>
	import BackBar from '../common/BackBar.vue'
	import QS from "qs";
	import {
	getDress,
	AddOrder
	} from "../../http/http.js";

	export default {
		data() {
			return {
				dTitle: '确认订单',
				open: false,
				iszk:false,//商品展开收起
				page: 1,
      			limit: 10, //当前页面分页条数
				active1: 0,
				dress:null,//默认地址
				orderdata:[{
					'goods_id':[],//商品id
					'single_price':[],//商品单价
					'count':[],//商品数量
					'sum_price':0,//商品总价
					'use_red_packet':0,//是否使用红包 1=>使用,0=>未使用
					'red_packet_price':0,//红包金额
					'real_pay_price':0,//实际支付金额
					'pay_way':0,//付款方式,1=>在线支付,0=>货到付款
					'pay_status':0,//支付状态,1=>已经支付,0=>未支付,2=>货到付款,3=>已经失效
					'distribution_id':0,//配送方式id
					'red_packet_id':0,//红包id
					'transport_id':0//配送方式id
				}],//需要提交的订单数据
				allprice:0,//商品总额
				psf:0,//配送费
				yhj:0,//优惠卷
				payprice:0,//应付总额
				alllistlength:0,//商品数量
				shenyu:0,//商品展开剩余数量
				radioF: require('../../../static/img/car/ic_xuanzhong.png'), //选中图片
				radioT: require('../../../static/img/car/ic_weixuan.png'), //未选图片
				zankai: require('../../../static/img/order/ic_zhankai@3x.png'), //展开
				shouqi: require('../../../static/img/order/ic_shouqi@3x.png'), //收起
				payway: [{
						id:1,
						title: '在线支付', //标题
						checks: true
					},
					{
						id:0,
						title: '货到付款', //标题
						checks: false
					}
				],
				list: [/* {
						id: 1,
						img: require('../../../static/img/1-0_03.png'), //图片
						title: '算哈哈是111', //标题
						num: 0, //数量
						price: '20', //单价
						oldPrice: '50', //旧的价格
						inventory: '5' //库存
					},
					{
						id: 2,
						img: require('../../../static/img/1-0_03.png'), //图片
						title: '算哈哈是', //标题
						num: 0, //数量
						price: '20', //单价
						oldPrice: '50', //旧的价格
						inventory: '5' //库存
					} */
				],
				coupons: [
					{
						img: require('../../../static/img/center/img_youhuiquan @3x.png'), //图片
						title: '冻货全品类（除特殊商品）', //标题
						time: '2018-05-05',
						price: 20, //单价
						manjian: 50
					},
					{
						img: require('../../../static/img/center/img_youhuiquan @3x.png'), //图片
						title: '冻货全品类（除特殊商品）', //标题
						time: '2018-05-05',
						price: 20, //单价
						manjian: 50
					},
					{
						img: require('../../../static/img/center/img_youhuiquan @3x.png'), //图片
						title: '冻货全品类（除特殊商品）', //标题
						time: '2018-05-05',
						price: 20, //单价
						manjian: 50
					}
				],
				nocoupons: [
					{
						img: require('../../../static/img/center/img_youhuiquan @3x.png'), //图片
						title: '冻货全品类（除特殊商品）', //标题
						time: '2018-05-05',
						price: 20, //单价
						manjian: 50
					}
				]
			}
		},
		components: {
			BackBar
		},
		activated(){
			console.log('22222222222222222222222');
			console.log(JSON.parse(this.$route.query.list));
			
			this.calculate();
		},
		mounted(){
			
		
			
			/**获取收货地址*/
			getDress(this.limit , this.page).then(res => {
				let data = res.data.data.data;
				for(let item in data){
					if(data[item].is_default == 1){
						this.dress = data[item]
					}
				}
    		});
		},
		methods: {
			/**
			 * 计算商品信息
			*/
			calculate(){
				this.allprice = 0;
				this.payprice = 0;
				this.alllistlength = 0;
				this.shenyu = 0;
				let showlist = JSON.parse(this.$route.query.list);
				let list = JSON.parse(this.$route.query.list);
				if(showlist.length >= 2){
					showlist.length = 2;
				}
				this.list = showlist//显示两条商品
				this.shenyu = list.length - 2;

				this.alllistlength = list.length;
				for(let item in list){
					this.llength += list[item].count;//总商品数
					this.allprice += parseFloat(list[item].goods_price*list[item].count)
				}
				this.payprice = this.allprice - this.yhj + this.psf;
			},
			/* 
			orderdata:[{
					'goods_id':[],//商品id
					'single_price':[],//商品单价
					'count':[],//商品数量
					'sum_price':0,//商品总价
					'use_red_packet':0,//是否使用红包 1=>使用,0=>未使用
					'red_packet_price':0,//红包金额
					'real_pay_price':0,//实际支付金额
					'pay_way':0,//付款方式,1=>在线支付,0=>货到付款
					'pay_status':0,//支付状态,1=>已经支付,0=>未支付,2=>货到付款,3=>已经失效
					'distribution_id':0,//配送方式id
					'red_packet_id':0,//红包id
					'transport_id':0//配送方式id
				}],//需要提交的订单数据
			*/
			/**提交订单*/
			toPay() {
				let alldata = JSON.parse(this.$route.query.list);
				for(let ite in alldata){
					let item = alldata[ite];
					this.orderdata[0].goods_id.push(item.id);
					this.orderdata[0].single_price.push(item.goods_price);
					this.orderdata[0].count.push(item.count);
				}
				let payway = null;
				for(let i in this.payway){
					if(this.payway[i].checks){
						payway = this.payway[i].id;
					}
				}
				this.orderdata[0].sum_price = this.allprice
				this.orderdata[0].use_red_packet = 0;
				this.orderdata[0].red_packet_price = 0;
				this.orderdata[0].real_pay_price = this.payprice;
				this.orderdata[0].pay_way = payway;
				this.orderdata[0].pay_status = 0;
				this.orderdata[0].distribution_id = this.dress.id;
				this.orderdata[0].red_packet_id = 0;
				this.orderdata[0].transport_id = 0;
      
				alert(1);
				console.log('需要提交的商品订单数据');
				console.log(this.orderdata);
				
				
				AddOrder(QS.stringify(this.orderdata)).then(res =>{

				})
				//this.$router.push('/paysuccessful')
				//this.$router.push('/payfailure')
			},
			
			/**展开所有数据*/
			showAlllist(){
				let showlist = JSON.parse(this.$route.query.list);
				showlist.length = 2;
				if(this.iszk){
					this.list = showlist
					this.iszk = !this.iszk;
				}else{
					this.list = JSON.parse(this.$route.query.list)
					this.iszk = !this.iszk;
				}
				
			},
			/*单选按钮*/
			checkRadio(index) {
				let payway = this.payway
				for(let item in payway) {
					if(parseInt(item) == index) {
						payway[item].checks = true
					} else {
						payway[item].checks = false
					}
				}
				//
			},
			goAddDress() {
				this.$router.push('/address')
			},
			
			closeBottomSheet() {
				this.open = false;
			},
			openBotttomSheet() {
				this.open = true;
			}
		}
	}
</script>

<style scoped>
	.orderbox {
		padding-bottom: 1rem;
	}

	.mu-list-two-line .mu-item{height: auto !important;}
	.mu-item-sub-title{white-space: initial;text-overflow: initial;}
	.orderbox .title {
		height: 1.03rem;
		line-height: 1.03rem;
		font-size: 0.28rem;
		font-weight: bold;
		color: #f95151;
		padding-left: 10px;
	}
	
	.shdz {
		background: #fff;
	}
	
	.orderbox .shdz img {
		width: 0.33rem;
		height: 0.33rem;
	}
	
	.total {
		height: 0.8rem;
		line-height: 0.8rem;
		background: #fff;
		margin-top: 0.15rem;
	}
	
	.total span {
		float: right;
	}
	
	.payway {
		background: #fff;
		margin-top: 0.15rem;
	}
	
	.mu-item-title {
		font-size: 0.26rem;
	}
	
	.payway img {
		width: 0.3rem;
		height: 0.3rem;
	}
	
	.xj {
		padding-right: 0.3rem;
	}
	
	.orderbox .listbox {
		width: 100%;
		margin-top: 0.15rem
	}
	
	.orderbox .infoboxbut li:not(:last-child) {
		border-bottom: 1px solid #e0e0e0;
	}
	
	.li-box {
		position: relative;
	}
	
	.saoma {
		float: right;
		padding: 0.2rem 0;
		border-radius: 0.2rem;
		margin-right: 0.3rem;
	}
	
	.minus {
		background: #c3c3c3;
	}
	
	.saoma span {
		margin-left: 0.15rem;
	}
	
	.mu-list-three-line .mu-item-action .mu-avatar {
		margin-top: 0;
		margin-right: 0.09rem;
	}
	
	.mu-avatar img {
		border-radius: 0.2rem;
	}
	
	.li-box .mu-item-title {
		font-size: 0.24rem;
		font-weight: bold;
	}
	
	.mu-list {
		padding: 8px 0 0 0;
	}
	
	.mu-elevation-1 {
		box-shadow: none;
	}
	
	.clear {
		clear: both
	}
	
	.mu-drawer {
		position: fixed;
		top: 4.3rem;
	}
	
	.addToCar {
		position: fixed;
		bottom: 0;
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
		line-height: 45px;
		padding-right: 0.3rem;
		font-weight: bold;
		text-align: left;
		padding-left: 15px;
		font-size: 0.32rem;
	}
	
	.carprice {
		position: absolute;
		left: 0.8rem;
		font-size: 0.26rem !important;
		color: #666;
	}
	
	.settlement {
		position: absolute;
		right: 0px;
		background: #f24c4c;
		width: 33%;
		height: 45px;
		line-height: 45px;
	}
	
	.carlistbox {
		padding: 0.15rem 0.3rem !important;
	}
	
	.carlistbox>ul {
		overflow: hidden;
	}
	
	.mrdz {
		font-size: 12px;
		padding: 2px 3px;
		border: 1px solid #f95151;
		color: #f95151;
		border-radius: 15px;
	}
	
	.carlistbox>ul {
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
		left: 0;
		bottom: 0;
		height: 100%;
	}
	
	.usecar .saoma {
		position: absolute;
		top: 5px;
		left: .2rem;
		height: 1.3rem;
		width: 1.75rem;
		flex-direction: column;
		align-items: center;
	}
	
	.saoma span {
		width: 1.68rem;
		height: .6rem;
		border-radius: .5rem;
		color: #333;
		line-height: .6rem;
	}
	
	.usecoupons {
		background: #FFA234;
	}
	
	.nousecoupons {
		background: #f45f5f;
	}
	
	.list-item:after {
		border: none;
	}
	.mu-sub-header{font-size: 0.32rem;font-weight: bold;color: #333;} 
	.infoboxbut .mu-item-action{min-width: 50%;font-weight: bold;font-size: 13px;color:#333;}
	.infoboxbut .mu-item-title{color: #666;}
</style>