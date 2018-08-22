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
									<img :src="item.goods_photo" :onerror='onerrorimg'>
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
							<span><span v-if="yhj!=0">-</span>￥{{yhj}}</span>
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
					<mu-tab>可用优惠券（{{couponsnum}}）</mu-tab>
					<mu-tab>不可用优惠券（{{nocouponsnum}}）</mu-tab>
				</mu-tabs>
				<div class="demo-text" v-if="active1 === 0">
					<div class="carlistbox">
						<ul>
							<li class="list-item " v-for="(item,index) in coupons" :key="index" data-type="0" v-if="!item.is_overdue && couponsnum != 0" @click='useCoupons(item)'>
								<!--<div class="list-box" @touchstart.capture="touchStart" @touchend.capture="touchEnd" @click="skip">-->
								<div class="list-box">
									<div class="list-content">
										<mu-paper :z-depth="1" class="demo-list-wrap">
											<mu-list textline="three-line">
												<div class="li-box">
													<mu-list-item avatar :ripple="false" button>
														<mu-list-item-action>
															<mu-avatar style="width: 1.4rem;height: 1.4rem;">
																<img src="../../../static/img/center/img_youhuiquan @3x.png">
															</mu-avatar>
														</mu-list-item-action>
														<mu-list-item-content>
															<mu-list-item-title>{{item.red_packet_name}}</mu-list-item-title>
															<mu-list-item-sub-title style='margin-top: 0.4rem;'>
																<!--<span style="color: #a9a9a9;font-size: 0.2rem;">库存{{item.inventory}}件</span>-->
																<p>
																	{{item.end_at}}
																</p>
															</mu-list-item-sub-title>
														</mu-list-item-content>
													</mu-list-item>
													<div class="usecar">
														<div class="saoma" style="color: #fff;">
															<p style="font-size: 0.52rem;">￥{{item.red_packet_price}}</p>
															<p>满{{item.red_packet_threshold_price}}可用</p>
														</div>
													</div>
												</div>
											</mu-list>
										</mu-paper>

									</div>
								</div>
							</li>
							<li v-if="couponsnum == 0" class="yhjtipbox">
								<img src="../../../static/img/order/img_wuyouhuiquan @2x.png" class="yhjtip" alt="">
								您暂无可以使用的优惠券
							</li>
						</ul>
					</div>
				</div>
				<div class="demo-text" v-if="active1 === 1">
					<div class="carlistbox">
						<ul>
							<li class="list-item " v-for="(item,index) in coupons" :key="index" data-type="0" v-if="item.is_overdue && nocouponsnum != 0">
								<!--<div class="list-box" @touchstart.capture="touchStart" @touchend.capture="touchEnd" @click="skip">-->
								<div class="list-box">
									<div class="list-content">
										<mu-paper :z-depth="1" class="demo-list-wrap">
											<mu-list textline="three-line">
												<div class="li-box">
													<mu-list-item avatar :ripple="false" button>
														<mu-list-item-action>
															<mu-avatar style="width: 1.4rem;height: 1.4rem;">
																<img src="../../../static/img/center/img_youhuiquan @3x.png">
															</mu-avatar>
														</mu-list-item-action>
														<mu-list-item-content>
															<mu-list-item-title>{{item.red_packet_name}}</mu-list-item-title>
															<mu-list-item-sub-title style='margin-top: 0.4rem;'>
																<!--<span style="color: #a9a9a9;font-size: 0.2rem;">库存{{item.inventory}}件</span>-->
																<p>
																	{{item.end_at}}
																</p>
															</mu-list-item-sub-title>
														</mu-list-item-content>
													</mu-list-item>
													<div class="usecar">
														<div class="saoma" style="color: #fff;">
															<p style="font-size: 0.52rem;">￥{{item.red_packet_price}}</p>
															<p>满{{item.red_packet_threshold_price}}可用</p>
														</div>
													</div>
												</div>
											</mu-list>
										</mu-paper>

									</div>
								</div>
							</li>
							<li v-if="nocouponsnum == 0" class="yhjtipbox">
								<img src="../../../static/img/order/img_wuyouhuiquan @2x.png" class="yhjtip" alt="">
								您暂无可以使用的优惠券
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
	AddOrder,
	getCenterCoupons,
	getWXPayInfo
	} from "../../http/http.js";
	import wx from 'weixin-js-sdk'

	export default {
		data() {
			return {
				dTitle: '确认订单',
				open: false,
				iszk:false,//商品展开收起
				page: 1,
      			limit: 99, //当前页面分页条数
				active1: 0,
				dress:null,//默认地址
				onerrorimg:this.$store.state.onerrorimg,
				paydata:{
					goods:'',
					sum_price:0,
					red_packet_id:0,
					real_pay_price:0,
					transport_id:0,
					pay_way:0,
					distribution_fee:0,
					distribution_id:0
				},
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
				couponsnum:0,//可用优惠券数量
				nocouponsnum:0,//不可用优惠券数量
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
				list: [],
				coupons: []
			}
		},
		components: {
			BackBar
		},
		activated(){
			this.paydata = {
				goods:'',
				sum_price:0,
				red_packet_id:0,
				real_pay_price:0,
				transport_id:0,
				pay_way:0,
				distribution_fee:0,
				distribution_id:0
			}

			console.log('22222222222222222222222');
			console.log(JSON.parse(this.$route.query.list));

			this.yhj = 0;
			this.red_packet_id = 0;
			this.calculate();
			this.getDress()
			//获取优惠券
			this.getCoupons(this.page)
		},
		mounted(){
			
		
			
			
		},
		watch:{
			yhj:function(a,b){
				this.calculate()
			}
		},
		methods: {

			/**获取收货地址*/
			getDress(){
				getDress(this.limit , this.page).then(res => {
					let data = res.data.data.data;
					for(let item in data){
						if(data[item].is_default == 1){
							this.dress = data[item]
						}
					}
				});
			},
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
				let goods = [];
				for(let ite in alldata){
					let obj = {};
					obj.goods_id = alldata[ite].goods_id;
					obj.count = alldata[ite].count;
					obj.single_price = alldata[ite].goods_price;
					//this.paydata.goods.push(obj);
					goods.push(obj);
				}
				this.paydata.goods = JSON.stringify(goods);
				//付款方式1-在线，0-货到付款
				let payway = null;
				for(let i in this.payway){
					if(this.payway[i].checks){
						payway = this.payway[i].id;
					}
				}
				this.paydata.sum_price = this.allprice;//'商品总价格'
				this.paydata.red_packet_id = this.red_packet_id;//'红包价格'
				this.paydata.real_pay_price = this.payprice;//'实际付款价格'
				this.paydata.transport_id = this.dress.id;//配送地址id
				this.paydata.pay_way = payway;//'付款方式,1=>在线支付,0=>货到付款',
				/* this.paydata.distribution_fee = 20;//'配送费'
				this.paydata.distribution_id = 20;//'配送方式id' */
				console.log('重新组合的订单数据');
				console.log(this.paydata);

				/**提交订单数据*/
				AddOrder(this.paydata).then(res =>{
					//订单id
					let id = res.data.info.id
					if(id){
						//唤起微信支付
						this.WXPay(id)
					}
				})  
			},
			onBridgeReady (params) {
				window.WeixinJSBridge.invoke(
					'getBrandWCPayRequest', {
						'appId': params.appId, // 公众号名称，由商户传入
						'timeStamp': params.timeStamp, // 时间戳，自1970年以来的秒数
						'nonceStr': params.nonceStr, // 随机串
						'package': params.package,
						'signType': params.signType, // 微信签名方式：
						'paySign': params.paySign // 微信签名
					},
					function (res) {
						//location.href = params.Url
					}
				)
			},
			/**微信支付*/
			WXPay(id){
				getWXPayInfo(id).then(res => {
					console.log('微信订单提交获取支付参数');
					console.log(res);
					let opthions = {
						appId: res.data.data.info.appId,
						timeStamp: res.data.data.info.timeStamp,
						nonceStr: res.data.data.info.nonceStr,
						package: res.data.data.info.package,
						signType: res.data.data.info.signType,
						paySign: res.data.data.info.paySign
					}
					 if (typeof window.WeixinJSBridge === 'undefined') {
						if (document.addEventListener) {
						document.addEventListener('WeixinJSBridgeReady', function () { this.onBridgeReady(opthions) }, false)
						} else if (document.attachEvent) {
						document.attachEvent('WeixinJSBridgeReady', function () { this.onBridgeReady(opthions) })
						document.attachEvent('onWeixinJSBridgeReady', function () { this.onBridgeReady(opthions) })
						}
					} else {
						this.onBridgeReady(opthions)
					}
				})
				/*  if (response && response.data.data.info && response.data.data.code === 200) {
					let data = response.data.data.info
					let appId = data.appId
					let timeStamp = data.timeStamp
					let nonceStr = data.nonceStr
					let signature = data.paySign
					let packages = data.package
					let signType = data.signType
					wx.config({
						debug: true,
						appId: response.data.data.info.appId,
						timestamp: response.data.data.info.timestamp,
						nonceStr: response.data.data.info.nonceStr,
						signature: response.data.data.info.signature,
						jsApiList: [
							'checkJsApi',
							'translateVoice',
							'chooseWXPay'
						]
					});
					wx.ready(function() {
						wx.chooseWXPay({
							timestamp: response.data.data.info.timestamp,
							nonceStr: response.data.data.info.nonceStr,
							signature: response.data.data.info.signature,
							package: response.data.data.info.package,
							signType: response.data.data.info.signType,
							paySign: response.data.data.info.paySign,
							//回调成功
							success:function(res){
								if(res.errMsg == 'chooseWXPay:ok'){
									alert('支付成功')
								}else{
									alert("失败")
								}
							},
							//回调失败
							fail:function(res){

							},
							//取消支付
							cancel:function(res){
								alert("用户取消支付")
							}
						});
					})
				}  */
			},
































			/**提交订单(废弃)*/
			toPay1() {
				let alldata = JSON.parse(this.$route.query.list);
				for(let ite in alldata){
					let item = alldata[ite];
					this.orderdata[0].goods_id.push(item.goods_id);
					this.orderdata[0].single_price.push(item.goods_price);
					this.orderdata[0].count.push(item.count);
				}
				//付款方式1-在线，0-货到付款
				let payway = null;
				for(let i in this.payway){
					if(this.payway[i].checks){
						payway = this.payway[i].id;
					}
				}
				//通过yhj价格判断是否使用了优惠券1-使用，0-未使用
				if(this.yhj != 0){
					this.orderdata[0].use_red_packet = 1;
				}else{
					this.orderdata[0].use_red_packet = 0;
				}
				this.orderdata[0].sum_price = this.allprice//'商品总价格'
				this.orderdata[0].red_packet_price = this.yhj;//'红包价格'
				this.orderdata[0].real_pay_price = this.payprice;//'实际付款价格'
				this.orderdata[0].pay_way = payway;//'付款方式,1=>在线支付,0=>货到付款',
				this.orderdata[0].pay_status = 0;//'支付状态,1=>已经支付,0=>未支付,2=>货到付款,3=>已经失效',
				this.orderdata[0].transport_id = this.dress.id;//默认地址的id
				this.orderdata[0].distribution_id = this.dress.id;
				this.orderdata[0].red_packet_id = this.red_packet_id;//红包id
      
				console.log('需要提交的商品订单数据');
				console.log(this.orderdata);
				AddOrder(QS.stringify(this.orderdata[0])).then(res =>{
				})
				//this.$router.push('/paysuccessful')
				//this.$router.push('/payfailure')
			},

			/**获取个人优惠券*/
			getCoupons(page){
				this.couponsnum = 0,//可用优惠券数量(防止缓存)
				this.nocouponsnum = 0,//不可用优惠券数量(防止缓存)
				getCenterCoupons(this.limit,page).then(res => {
					let data = res.data.info.data;
					if(data && data.length > 0 ){
						this.coupons = data;
						for(let i in this.coupons){
							if(!this.coupons[i].is_overdue){
								this.couponsnum ++ 
							}else{
								this.nocouponsnum ++
							}
						}
					}
				})
			},

			/**使用优惠券*/
			useCoupons(item){
				this.yhj = item.red_packet_price;
				this.red_packet_id = item.id;
				this.open = false;
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
				/* this.$router.push('/address') */
				this.$router.push({path:'/address',query:{order:1}})
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
		min-height: 95px;
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
	.yhjtipbox{display: flex;align-items: center;justify-content: center;margin-top: 20px;}
	.yhjtip{width: 1rem;height: .6rem;}
</style>