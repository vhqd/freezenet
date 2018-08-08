<template>
	<div class="orderbox">
		<BackBar :dTitle='dTitle'></BackBar>
		<mu-flex class="flex-wrapper shdz" align-items="center" @click='goAddDress'>
			<mu-flex class="flex-demo" align-items="center" justify-content="center" fill>
				<img src="../../../static/img/car/ic_tianjia.png" />
				<p class="title">
					添加收货地址
				</p>
			</mu-flex>
		</mu-flex>

		<mu-paper :z-depth="1" class="demo-list-wrap">
			<mu-list textline="two-line">
				<mu-list-item avatar :ripple="false" button>
					<mu-list-item-content>
						<mu-list-item-title>收货人：liuliu 1388465848</mu-list-item-title>
						<mu-list-item-sub-title>
							收货地址：从大家老双方空档开双就开双脚开动就开开老算A好弄的
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
				<mu-list textline="three-line">

					<div v-for="(item,index) in list" :key="index" class="li-box">
						<mu-list-item avatar :ripple="false" button>
							<mu-list-item-action>
								<mu-avatar style="width: 1.4rem;height: 1.4rem;">
									<img :src="item.img">
								</mu-avatar>
							</mu-list-item-action>
							<mu-list-item-content>
								<mu-list-item-title>{{item.title}}</mu-list-item-title>
								<mu-list-item-sub-title>
									<!--<span style="color: #a9a9a9;font-size: 0.2rem;">库存{{item.inventory}}件</span>-->
									<p style="color: red;">
										￥<span style="font-size: 0.5rem;">{{item.price}}</span>
										<span style="color: #ccc;text-decoration: line-through;">￥{{item.oldPrice}}</span>
									</p>
								</mu-list-item-sub-title>
							</mu-list-item-content>
						</mu-list-item>
						<mu-divider></mu-divider>
						<div style="position: absolute;right: 0;bottom: 0;">
							<div class="saoma">
								<span>x1</span>
							</div>
						</div>
					</div>
				</mu-list>

				<mu-list class="infoboxbut">
					<mu-list-item button :ripple="false">
						<mu-list-item-title>商品总额</mu-list-item-title>
						<mu-list-item-action>
							<span>￥845</span>
						</mu-list-item-action>
					</mu-list-item>
					<mu-list-item button :ripple="false">
						<mu-list-item-title>配送费</mu-list-item-title>
						<mu-list-item-action>
							<span>（免配送费）￥0.00</span>
						</mu-list-item-action>
					</mu-list-item>
					<mu-list-item button :ripple="false" @click="openBotttomSheet">
						<mu-list-item-title>优惠券优惠<span>满300减20</span></mu-list-item-title>
						<mu-list-item-action>
							<span>-￥20</span>
						</mu-list-item-action>
					</mu-list-item>
					<mu-list-item button :ripple="false">
						<mu-list-item-title>付款方式</mu-list-item-title>
						<mu-list-item-action>
							<span>货到付款</span>
						</mu-list-item-action>
					</mu-list-item>
					<mu-list-item button :ripple="false">
						<mu-list-item-title>应付款</mu-list-item-title>
						<mu-list-item-action>
							<span>￥784</span>
						</mu-list-item-action>
					</mu-list-item>
				</mu-list>

			</mu-paper>

			<div class="total">
				<span class="xj" style="font-size: 0.26rem;font-weight: bold;">小计：<span style="color: red;">￥89.265</span></span>
				<span class="xj">
					共两件商品
				</span>
			</div>

		</div>

		<div class="addToCar">
			<mu-list class="carbut">
				<mu-list-item avatar button :ripple="false">
					<div class="pricecarbox">
						<div>合计：<span style="color: red;">￥50</span></div>
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

	export default {
		data() {
			return {
				dTitle: '确认订单',
				open: false,
				active1: 0,
				radioF: require('../../../static/img/car/ic_xuanzhong.png'), //选中图片
				radioT: require('../../../static/img/car/ic_weixuan.png'), //未选图片
				payway: [{
						title: '在线支付', //标题
						checks: false
					},
					{
						title: '货到付款', //标题
						checks: false
					}
				],
				list: [{
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
					}
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
		methods: {
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
			toPay() {
				//this.$router.push('/paysuccessful')
				this.$router.push('/payfailure')
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
		text-align: right;
		padding-right: 0.3rem;
		font-weight: bold;
		text-align: center;
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
		background: #ffe253;
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
		color: #fff;
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
</style>