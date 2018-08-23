<template>
	<div class="oftenbuy">
		<!-- 搜索区 -->
		<Search :ishome='true'></Search>
		<div style="padding-top: 1rem;padding-bottom: 1rem;">
			<mu-paper :z-depth="1" class="demo-list-wrap">
				<mu-list textline="three-line">

					<!--type==1没有多重量选择的列表-->
					<!--<div v-for="(item,index) in showlist" v-if="item.type == 1" :key="index" class="li-box">
				    <router-link to="/detail">
					    <mu-list-item avatar :ripple="false" button>
					      <mu-list-item-action>
					        <mu-avatar style="min-width: 1.4rem;height: 1.4rem;">
					          <img :src="item.img">
					        </mu-avatar>
					      </mu-list-item-action>
					      <mu-list-item-content>
					        <mu-list-item-title>{{item.title}}</mu-list-item-title>
					        <mu-list-item-sub-title>
					          <span style="color: #a9a9a9;font-size: 0.2rem;">库存{{item.inventory}}件</span>
					          <p style="color: red;">
					          	￥<span style="font-size: 0.5rem;">{{item.price}}</span>
					          </p>
					        </mu-list-item-sub-title>
					      </mu-list-item-content>
					    </mu-list-item>
					</router-link>
				    <mu-divider></mu-divider>
				    <div style="position: absolute;right: 0.3rem;bottom: 0.12rem;">
				    	<div class="saoma">
				        	<span class="minus mpsytl" @click="minus(item)" v-if="item.num != 0">-</span>
				        	<span>{{item.num}}</span>
				        	<span class="plus mpsytl" @click="plus(item)">+</span>
				        </div>
				    </div>
				    <div class="dele">
				    	<img src="../../../static/img/ic-del.png"/>
				    </div>
			  	</div>-->

					<!--type==2的是可选择重量的列表-->
					<div v-for="(item,index) in showlist" :key="index" class="li-box" v-if="showlist.length > 0">
						<router-link :to="{path:'/detail',query: {id: item.id}}">
							<mu-list-item avatar :ripple="false" button>
								<mu-list-item-action>
									<mu-avatar style="min-width: 1.42rem;height: 1.4rem;">
										<img :src="item.goods_photo" :onerror="onerrorimg">
									</mu-avatar>
								</mu-list-item-action>
								<mu-list-item-content>
									<mu-list-item-title>{{item.goods_title}}</mu-list-item-title>
									<span class="kcstyle">库存{{item.goods_count}}件</span>
									<mu-list-item-sub-title>
										<div style="color: red;">
											<span v-show="!isbind" style="color: #a9a9a9;">绑定手机号才能查看价格</span>
											<div v-show="isbind">￥
												<span style="font-size: .38rem;">{{item.goods_price}}</span>
											</div>
											<!--<span style="color: #ccc;text-decoration: line-through;">￥{{item.oldPrice}}</span>-->
										</div>
									</mu-list-item-sub-title>
								</mu-list-item-content>
							</mu-list-item>
						</router-link>
						<mu-divider></mu-divider>
						<div style="position: absolute;right: 0.3rem;top: 1.32rem;">
							<div class="saoma">
								<div v-if="item.type == 1">
									<!-- <span class="minus mpsytl" @click="minus(item)" v-if="item.num != 0">-</span>
					        	<span>{{item.num}}</span>
					        	<span class="plus mpsytl" @click="plus(item)">+</span> -->
									<span class="minus" @click="minus(item)" v-if="item.num != 0"><img src="../../../static/img/ic_jian.png" alt=""></span>
									<span v-show="item.num != 0">{{item.num}}</span>
									<span class="plus" @click="plus(item)"><img src="../../../static/img/ic_jia.png" alt=""></span>
								</div>
								<div v-if="item.type == 2">
									<span class="mpsytl" @click="typeo2show(item , 1)" v-if="!item.show"><img src="../../../static/img/often/down.png" /></span>
									<span class="mpsytl" @click="typeo2show(item), 2" v-if="item.show"><img src="../../../static/img/often/up.png" /></span>
								</div>
							</div>
						</div>
						<div class="dele" @click="deleList(index,item)">
							<img src="../../../static/img/ic-del.png" />
						</div>

						<mu-expand-transition>
							<div class="type2list" v-show="item.type == 2 && item.show">
								<!--下拉的重量列表-->
								<mu-list textline="two-line">
									<mu-list-item avatar button :ripple="false" v-for="(ite , ind) in item.weights" :key="ind">
										<mu-list-item-content>
											<mu-list-item-title>{{ite.weight}}斤装</mu-list-item-title>
											<mu-list-item-sub-title>￥{{ite.price}}</mu-list-item-sub-title>
										</mu-list-item-content>
										<mu-list-item-action>
											<div class="saoma">
												<div>
													<!-- <span class="minus mpsytl" @click="minus(ite)" v-if="ite.num != 0">-</span>
							        	<span>{{ite.num}}</span>
							        	<span class="plus mpsytl" @click="plus(ite)">+</span> -->
													<span class="minus" @click="minus(item,ind)" v-if="ite.num != 0" :data-index="ind"><img src="../../../static/img/ic_jian.png" alt=""></span>
													<span v-show="ite.num != 0">{{ite.num}}</span>
													<span class="plus" @click="plus(item,ind)" :data-index="ind"><img src="../../../static/img/ic_jia.png" alt=""></span>
												</div>
											</div>
										</mu-list-item-action>
									</mu-list-item>
								</mu-list>
							</div>
						</mu-expand-transition>

					</div>
					<p v-else>暂时没有记录！</p>

				</mu-list>
			</mu-paper>
			<div id="realheight"></div>
	<mu-dialog title="温馨提示" width="360" :open.sync="openJS">
        <span class="cancelbox" @click="closeJSDialog"><img src="../../../static/img/ic_Shut .png" /></span>
        您确认要删除该常购清单吗?<br />
        <mu-button slot="actions" flat color="primary" @click="sureClick(index)">确定</mu-button>
        <mu-button slot="actions" flat color="secondary" @click="closeJSDialog">取消</mu-button>
      </mu-dialog>
			<mu-dialog title="温馨提示" width="360" :open.sync="openwins">
        <span class="cancelbox" @click="cancel"><img src="../../../static/img/ic_Shut .png" /></span>
        绑定手机才可以下单呦~<br />
        <mu-button slot="actions" flat color="primary" @click="sure">确定</mu-button>
        <mu-button slot="actions" flat color="secondary" @click="cancel">取消</mu-button>
      </mu-dialog>
		</div>
		<Footer tagNum='2'></Footer>
	</div>
</template>

<script>
import Search from "../common/Search.vue";
import Footer from "../common/Footer.vue";
import { mapState } from "vuex";
import { getOfenBuyList, AddCarShop, deletOfenBuy } from "../../http/http.js";
import { jiancar, setOfenBuyData } from "../../common/common.js";
import QS from "qs";

export default {
  components: {
    Search,
    Footer
  },
  data() {
    return {
			baseimg:this.$store.state.baseimg,
      limit: 99,
			page: 1,
			openJS: false, //取消弹窗
			openwins:false,
      item:null,
      index:null,
      onerrorimg: this.$store.state.onerrorimg,
      alldata: [
        {
          goods_id: [],
          single_price: [],
          count: [],
          sum_price: 0
        }
      ],
      showlist: [
        /* {
      				id:1,
      				type:1,
      				show:false,
      				img:require('../../../static/img/1-0_03.png'),//图片
      				title:'青岛大牡蛎  鲜活贝类海鲜烧烤食材带壳水产',//标题
      				num:0,//数量
      				price:'20',//单价
      				oldPrice:'50',//旧的价格
      				inventory:'5'//库存
      			},
      			{
      				id:2,
      				type:2,
      				weights:[
      					{
      						weight:5.5,
      						price:240,
      						num:0
      					},
      					{
      						weight:5.5,
      						price:240,
      						num:0
      					}
      				],
      				show:false,
      				img:require('../../../static/img/1-0_03.png'),//图片
      				title:'鲜活贝类海鲜烧烤食材带壳水产青岛大牡蛎 ',//标题
      				num:0,//数量
      				price:'20',//单价
      				oldPrice:'50',//旧的价格
      				inventory:'5'//库存
      			} */
      ]
    };
  },
  computed: {
    ...mapState({
      // mapState相当于映射
      isbind: "isbind"
    })
  },
  activated() {
		this.showlist = []
 		this.getOfenBuyList();
	},
  mounted() {
    this.$store.commit("setLoad", true);
  },
  methods: {
		 /*删除一条常购清单记录*/
    deleList(index, item) {
      this.openJS = true;
      this.item = item;
      this.index = index;
    },
    /*取消订单*/
    sureClick(index) {
      this.openJS = false;
      this.showlist.splice(this.index, 1);
      this.deletOfenBuy(this.item);
    },
    /*关闭取消弹窗*/
    closeJSDialog() {
      this.openJS = false;
    },
    /**获取常购清单*/
    getOfenBuyList() {
      getOfenBuyList(this.limit, this.page).then(res => {
        let data = res.data.info.data;
        for (let item in data) {
          data[item].goods_photo = this.baseimg + data[item].goods_photo;
          data[item].num = 0;
          data[item].type = 1; //type-1（没有分重量的） type-2（分了重量的）
        }
        this.showlist = data;
        this.$store.commit("setLoad", false);
        console.log("+++++++++++++++++++++");
        console.log(data);
      });
    },

    /**删除常购清单*/
    deletOfenBuy(item) {
      deletOfenBuy(item.oftenBrowseId).then(res => {});
      let data = this.showlist;
      console.log(data);
      console.log(item);

      for (let ite in data) {
        if (parseInt(data[ite].oftenBrowseId) == parseInt(item.oftenBrowseId)) {
          this.showlist.splice(ite, 1);
        }
      }
    },

    /*切换显示重量选择*/
    typeo2show(item, ind) {
      if (ind == 1) item.show = true;
      else item.show = false;
    },
    /*减少数量值*/
    minus(item, ind) {
      let amount = item.num;
      if (amount > 0) {
        item.num = amount - 1;
      } else {
        item.num = 0;
      }
      let data = {
          goods_id: item.id,
          single_price: item.goods_price,
          count: item.num,
          isadd:0
        };
        console.log('减少购物车');
        console.log(data);
        jiancar(item.id, data);
    },
    /*增加数量值*/
    plus(item, ind) {
			let isbind = sessionStorage.isbind
      if(isbind != 1){
        this.openwins = true
      }else{
				let amount = item.num;
				item.num = amount + 1;
				setOfenBuyData(item, this.alldata);
      }
    },
		sure(){
			this.openwins = false
			this.$router.push('/phone')
		},
		cancel(){
			this.openwins = false
		}
  }
};
</script>

<style scoped>
.mu-list {
  padding: 8px 0 0 0; /*margin-bottom: 1rem;*/
}
.mu-avatar {
  background: initial;
}
.li-box .mu-item-title {
  font-size: 0.24rem;
  padding-right: 0.3rem;
}
.mu-item-action {
  padding-top: 0.1rem;
}
.mu-avatar img {
  border-radius: initial;
}
.li-box {
  position: relative;
}
.mu-item-sub-title,
.mu-item-title {
  padding-left: 0.2rem;
}
.mu-item-content {
  max-width: 75% !important;
}
.mu-item-title {
  height: auto;
  overflow: initial;
  text-overflow: initial;
  white-space: initial;
}
.mu-list {
  padding: 0;
}
.li-box li {
  padding: 6px 0;
}
.mu-item-title {
  line-height: 0.36rem;
}

.type2list .mu-item-content {
  max-width: 85% !important;
}
.type2list li {
  padding: 0;
}

.dele {
  position: absolute;
  right: .4rem;
  top: .18rem;
}
.dele img {
  width: 0.35rem;
  height: 0.35rem;
}
.saoma img {
  width: .6rem;
  height: .6rem;
}
.saoma > div {
  display: flex;
}
.type2list .mu-item-title {
  font-size: 0.24rem;
  color: #333;
}
.mu-item-sub-title {
  color: red;
}
</style>