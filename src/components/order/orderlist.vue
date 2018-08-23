<template>
	<div class="orderlistbox">
		<!--头部-->
		<BackBar dTitle='我的订单'></BackBar>
		<mu-tabs style="display: flex;justify-content: center;margin-top:1rem;">
			<mu-tab class='tabtitle' @click="getOrders(0,false)">全部</mu-tab>
			<mu-tab class='tabtitle' @click="getOrders(1,false)">待支付</mu-tab>
			<mu-tab class='tabtitle' @click="getOrders(2,false)">待发货</mu-tab>
			<mu-tab class='tabtitle' @click="getOrders(3,false)">已发货</mu-tab>
			<mu-tab class='tabtitle' @click="getOrders(4,false)">已完成</mu-tab>
			<mu-tab class='tabtitle' @click="getOrders(5,false)">已取消</mu-tab>
		</mu-tabs>

		<div class="listbox">
      <p v-show="noorder">没有更多的订单了！</p>
			<mu-load-more :loading="loading" @load="load">
        <mu-container data-mu-loading-color="secondary" v-if="list" data-mu-loading-overlay-color="rgba(0, 0, 0, .7)" v-loading="loading2" class="demo-loading-wrap">
				<div class="onelistbox" v-for="(item,index) in list" :key="index">
					<div class="leftright">
						<span class="left">订单编号：{{item.order_number}}</span>
            <!-- <span class="right">{{item.order_status}}</span> -->
						<span class="right">{{item.order_status == 1 ? '待支付' : item.order_status == 2 ? '待发货' : item.order_status == 3 ? '已发货' : item.order_status == 4 ? '已完成' : item.order_status == 5 ? '已取消' : ''}}</span>
					</div>
					<div>
            <!--订单只有一个商品显示商品信息-->
						<mu-paper :z-depth="1" class="demo-list-wrap" v-if="item.goodsInfo.length == 1">
							<mu-list textline="three-line">
								<div class="li-box">
									<mu-list-item avatar :ripple="false" button v-for="(ie , ind) in item.goodsInfo" :key="ind">
										<mu-list-item-action>
											<mu-avatar style="width: 1.4rem;height: 1.4rem;">
												<img :src="ie.goods_photo" :onerror="onerrorimg">
											</mu-avatar>
										</mu-list-item-action>
										<mu-list-item-content>
											<mu-list-item-title>{{ie.goods_title}}</mu-list-item-title>
											<mu-list-item-sub-title>
												<span v-show="!isbind" style="color: #a9a9a9;">绑定手机号才能查看价格</span>
												<p style="color: red;" v-show="isbind">
													￥
													<span style="font-size: 0.5rem;">{{ie.goods_price}}</span>
												</p>
											</mu-list-item-sub-title>
										</mu-list-item-content>
									</mu-list-item>
									<!-- <mu-divider></mu-divider>
								 	<div style="position: absolute;right: 0.24rem;bottom: 0.24rem;">
										<div class="saoma">
											<span>x1</span>
										</div>
									</div> -->
								</div>
							</mu-list>
						</mu-paper>
             <!--订单有多个商品显示商品图片-->
						<mu-paper :z-depth="1" class="demo-list-wrap" v-else>
							<mu-list textline="three-line" style="height:100px;overflow:hidden;">
								<div class="li-box" style="display:flex;overflow-x:scroll;padding-bottom:20px;">
									<mu-list-item avatar :ripple="false" button v-for="(ie , ind) in item.goodsInfo" :key="ind">
										<mu-list-item-action>
											<mu-avatar style="width: 1.4rem;height: 1.4rem;">
												<img :src="ie.goods_photo" :onerror="onerrorimg">
											</mu-avatar>
										</mu-list-item-action>
									</mu-list-item>
								</div>
							</mu-list>
						</mu-paper>
            <div class="shopinfos"><span>共{{ item.goodsInfo.length}}件商品</span><span>实付款：</span><span>￥{{item.real_pay_price}}.00</span></div>
						<div class="actionli">
							<ul v-if='item.order_status == 1'>
								<li @click="openJSDialog(index,item)">取消订单</li>
								<li @click="goDetail(item)">查看详情</li>
								<li class="qrsh" @click="WXPay(item.id)">去支付</li>
							</ul>
							<ul v-else-if='item.order_status == 2'>
								<li @click="goDetail(item)">查看详情</li>
							</ul>
							<ul v-else-if='item.order_status == 3'>
								<li>查看物流</li>
								<li @click="goDetail(item)">查看详情</li>
								<li class="qrsh">确认收货</li>
							</ul>
							<ul v-else>
								<li @click="openDelDialog(index,item)">删除订单</li>
								<li @click="goDetail(item)">查看详情</li>
							</ul>
						</div>
					</div>

				</div>
        </mu-container>
        <p v-show="nomoreorder" style="margin-top:10px;">没有更多的订单了！</p>
			</mu-load-more>
		</div>
    
		<mu-dialog title="温馨提示" width="360" :open.sync="openJS">
			<span class="cancelbox" @click="closeJSDialog"><img src="../../../static/img/ic_Shut .png" /></span>
			您确认要取消该订单吗?<br />
			<mu-button slot="actions" flat color="primary" @click="sureClick(index)">确定</mu-button>
			<mu-button slot="actions" flat color="secondary" @click="closeJSDialog">取消</mu-button>
		</mu-dialog>

    <mu-dialog title="温馨提示" width="360" :open.sync="openDel">
      <span class="cancelbox" @click="closeDelDialog"><img src="../../../static/img/ic_Shut .png" /></span>
      您确认要删除该订单吗?<br />
      <mu-button slot="actions" flat color="primary" @click="DelClick(index)">确定</mu-button>
      <mu-button slot="actions" flat color="secondary" @click="closeDelDialog">取消</mu-button>
    </mu-dialog>

	</div>

</template>

<script>
import BackBar from "../common/BackBar.vue";
import { mapState } from "vuex";
import { getOrders , cancelOrder , deleteOrder } from "../../http/http.js";
import { WXPay } from '../../common/common.js'

export default {
  data() {
    return {
      baseimg:this.$store.state.baseimg,
      host:this.$store.state.host,
      num: 10,
      refreshing: false,
      limit: 15,
      page: 1,
      item:null,
      id:null,
      Delitem:null,
      loading2: false,
      loading: false,
      noorder:false,//显示没有订单提示文字
      nomoreorder:false,//滚动加载没有更多提示
      openJS: false, //取消弹窗
      openDel:false,//删除弹窗
      index: 0,
      onerrorimg:this.$store.state.onerrorimg,
      order_status:0,
      list: [
         /* {
          id: 1,
          orderid: 545455454,
          status: 1, //0-全部 1-待支付 2-待发货 3-已发货 4-已完成 5-已取消
          img: require("../../../static/img/1-0_03.png"), //图片
          title: "算哈哈是111", //标题
          num: 0, //数量
          price: "20", //单价
          oldPrice: "50" //旧的价格
        },
        {
          id: 2,
          orderid: 545455454,
          status: 2,
          img: require("../../../static/img/1-0_03.png"), //图片
          title: "算哈哈是111", //标题
          num: 0, //数量
          price: "20", //单价
          oldPrice: "50" //旧的价格
        },
        {
          id: 1,
          orderid: 545455454,
          status: 3, //1-待支付 2-待发货 3-已发货 4-已完成 5-已取消
          img: require("../../../static/img/1-0_03.png"), //图片
          title: "算哈哈是111", //标题
          num: 0, //数量
          price: "20", //单价
          oldPrice: "50" //旧的价格
        },
        {
          id: 2,
          orderid: 545455454,
          status: 4,
          img: require("../../../static/img/1-0_03.png"), //图片
          title: "算哈哈是111", //标题
          num: 0, //数量
          price: "20", //单价
          oldPrice: "50" //旧的价格
        },
        {
          id: 2,
          orderid: 545455454,
          status: 5,
          img: require("../../../static/img/1-0_03.png"), //图片
          title: "算哈哈是111", //标题
          num: 0, //数量
          price: "20", //单价
          oldPrice: "50" //旧的价格
        }  */
      ]
    };
  },
  components: {
    BackBar
  },
  computed: {
    ...mapState({
      // mapState相当于映射
      isbind: "isbind"
    })
  },
  activated(){
    
  },
  methods: {
    /**支付*/
    WXPay(id){
      WXPay(id)
    },
    /**
     * 获取用户订单
     * @param order_status 订单状态'0-全部 1-待支付 2-待发货 3-已发货(待收货) 4-已完成 5-已取消',
     * @param islodmore 是否是加载更多  加载更多-true，切换订单状态-false
     * */
    getOrders(order_status,isloadmore) {
      //this.loading2 = true;
      //点击顶部订单初始化参数
      if(!isloadmore){
        this.limit = 15;
        this.page = 1;
        this.list = [];
        this.nomoreorder = false
      }
      //this.order_status = order_status;
      getOrders(this.limit, this.page,order_status).then(res => {
        this.page = this.page + 1;
        let data = res.data.info.data;
        if(data.length==0 && !isloadmore){
          //this.loading2 = false;
          this.list = [];
          this.noorder = true
        }
        for(let item in data){
          let img = data[item].goodsInfo;
          for(let ite in img){
            img[ite].goods_photo = this.baseimg + img[ite].goods_photo;
          }
        }
        
        console.log('++++++++++++++++++++++++++++');
        
        console.log(data);
        
        //判断是加载更多还是切换订单状态
        if(isloadmore){
          this.list = this.list.concat(data)
          if(data.length == 0){
            this.loading = false;
            this.nomoreorder = true
          }
        }else{
         
          if(data.length == 0){
            this.noorder = true
          }else{
            this.noorder = false
            this.list = data;
          }
        } 
        //this.loading2 = false;
      });
    },

    /*滚动到底部加载更多*/
    load() {
      if(!this.nomoreorder){
        this.loading = true;
        this.nomoreorder = false
        this.getOrders(this.order_status,true)
        }else{
          this.nomoreorder = true
        }
    },
    /*查看详情*/
    goDetail(item) {
      this.$router.push({
        path: "/orderstatus",
        query: { status: item.order_status,data:JSON.stringify(item) }
      });
    },
    /*取消订单*/
    sureClick(index) {
      this.openJS = false;
      this.index = index;
      console.log(index);
      this.list.splice(index, 1);

      console.log('++++++++++++');
      console.log(this.item);
      let id = this.item.id
      let redPacketId = this.item.red_packet_id
      cancelOrder( id , redPacketId ).then(res => {
        console.log(res);
      }) 

    },
    /*打开取消弹窗*/
    openJSDialog(index,item) {
      this.openJS = true;
      this.item = item;
    },
    /*关闭取消弹窗*/
    closeJSDialog() {
      this.openJS = false;
    },
    /**打开删除弹窗*/
    openDelDialog(index,item){
      this.openDel = true;
      this.Delitem = item;
    },
    /*关闭删除弹窗*/
    closeDelDialog() {
      this.openDel = false;
    },
    DelClick(index){
      this.openDel = false;
      this.index = index;
      console.log(index);
      this.list.splice(index, 1);

      console.log('++++++++++++');
      console.log(this.Delitem);
      let id = this.Delitem.id
      let redPacketId = this.Delitem.red_packet_id
      deleteOrder( id , redPacketId ).then(res => {
        console.log(res);
      }) 
    },
    /**设置订单类型*/
    setOrderType() {
      let id = this.$route.query.id;
      
      this.getOrders(id,false);
      console.log(
        "0-全部 1-待支付 2-待发货 3-已发货(待收货) 4-已完成 5-已取消===" + id
      );
      //修改tab选中状态
      let tabtitle = document.getElementsByClassName("tabtitle");
      for (let i = 0; i < tabtitle.length; i++) {
        tabtitle[i].index = i;
        let classlist = tabtitle[i].classList;
        id == tabtitle[i].index
          ? classlist.add("mu-tab-active")
          : classlist.remove("mu-tab-active");

        //在订单页面点击切换时修改其他订单状态
        tabtitle[i].onclick = function() {
          let thisid = this.index;
          for (let j = 0; j < tabtitle.length; j++) {
            if (thisid != tabtitle[j].index) {
              tabtitle[j].classList.remove("mu-tab-active");
            }
          }
        };
      }
    }
  },
  activated() {
    this.setOrderType();
  },
  mounted() {}
};
</script>

<style scoped>
.qrsh{background: #F24C4C;color: #fff !important;}
.mu-appbar {
  border-bottom: 1px solid #e0e0e0;
}
.mu-tab {
  min-width: auto;
}
.mu-tabs {
  background: #fff;
  color: #333;
}
.mu-tab-active {
  color: #f95151;
}
.left {
  font-weight: bold;
}
.right {
  color: #f95151;
}
.mu-list {
  padding: 0;
}
.mu-elevation-1 {
  box-shadow: none;
}

.listbox {
  padding: 0.15rem 0.1rem;
}
.onelistbox {
  background: #fff;
  border-radius: 0.2rem;
}
.onelistbox:not(:first-child) {
  margin-top: 0.15rem;
}
.leftright {
  border-bottom: 1px solid #e0e0e0;
  padding: 0.16rem 0.3rem;
}
.li-box {
  position: relative;
}
.mu-avatar img {
  border-radius: 0.2rem;
}
.mu-item-content {
  margin-left: 0.05rem;
}
.mu-avatar {
  margin-top: 0 !important;
}
.saoma span {
  color: #666;
}

.actionli {
  overflow: hidden;
  padding: 0.14rem 0.3rem;
}
.actionli ul {
  float: right;
}
.actionli li {
  float: left;
  padding: 0.08rem 0.23rem;
  margin-left: 0.2rem;
  border-radius: 0.5rem;
}
.actionli li:not(:last-child) {
  border: 1px solid #999;
  color: #999;
}
.actionli li:last-child {
  border: 1px solid #f95151;
  color: #f95151;
}
.shopinfos{height: .88rem;text-align: right;border-bottom: 1px solid #e0e0e0;padding-right: 15px;}
.shopinfos span:first-child{padding-right: 10px}
.shopinfos span:not(:first-child){font-weight: bold;font-size: .28rem;color: #333;}
.shopinfos span{line-height: .88rem;}
.demo-loading-wrap {
  height: 100%;
  position: relative;
}
.mu-load-more{overflow: initial !important;}
</style>