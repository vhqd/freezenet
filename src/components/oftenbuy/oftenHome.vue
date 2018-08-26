<template>
	<div class="oftenbuy">
		<div>
			<mu-paper :z-depth="1" class="demo-list-wrap">
				<mu-list textline="three-line">
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
									<span class="kcstyle">{{item.goods_specification}}</span>
									<mu-list-item-sub-title>
										<div style="color: red;">
											<span v-show="!isbind" style="color: #a9a9a9;">绑定手机号才能查看价格</span>
											<div v-show="isbind">￥
												<span v-if="item.type == 1" style="font-size: .28;">{{item.goods_price}}</span>
												<span v-if="item.type == 2" style="font-size: .28rem;">{{item.specifications[0].price}}</span>
											</div>
										</div>
									</mu-list-item-sub-title>
								</mu-list-item-content>
							</mu-list-item>
						</router-link>
						<mu-divider></mu-divider>
						<div style="position: absolute;right: 0.3rem;top: 1.3rem;">
							<div class="saoma">
								<div v-if="item.type == 1">
									<span class="minus" @click="minus(item)" v-if="item.num != 0"><img src="../../../static/img/ic_jian.png" alt=""></span>
									<span v-show="item.num != 0">{{item.num}}</span>
									<span class="plus" @click="plus(item)"><img src="../../../static/img/ic_jia.png" alt=""></span>
								</div>
								<div v-if="item.type == 2">
									<span class="mpsytl" @click="typeo2show(item , 1)" v-if="!item.show" style="margin-right:3px;"><img src="../../../static/img/often/down.png" style="width:.5rem;height:.5rem;"/></span>
									<span class="mpsytl" @click="typeo2show(item), 2" v-if="item.show" style="margin-right:3px;"><img src="../../../static/img/often/up.png"  style="width:.5rem;height:.5rem;"/></span>
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
									<mu-list-item avatar button :ripple="false" v-for="(ite , ind) in item.specifications" :key="ind">
										<mu-list-item-content>
											<mu-list-item-title>{{ite.specification*2}}斤装</mu-list-item-title>
											<mu-list-item-sub-title>￥{{ite.price}}</mu-list-item-sub-title>
										</mu-list-item-content>
										<mu-list-item-action>
											<div class="saoma" style="margin-right:6px;">
												<div>
													<span class="minus" @click="minus(item,ite)" v-if="ite.num != 0" :data-index="ind"><img src="../../../static/img/ic_jian.png" alt=""></span>
													<span v-show="ite.num != 0">{{ite.num}}</span>
													<span class="plus" @click="plus(item,ite)" :data-index="ind"><img src="../../../static/img/ic_jia.png" alt=""></span>
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
	</div>
</template>

<script>
import { mapState } from "vuex";
import { getOfenBuyList, AddCarShop, deletOfenBuy } from "../../http/http.js";
import { jiancar, setOfenBuyData } from "../../common/common.js";
import QS from "qs";

export default {
  components: {
  },
  data() {
    return {
      limit: 99,
      page: 1,
      openJS: false, //取消弹窗
      openwins: false,
      host: this.$store.state.host,
      item: null,
      index: null,
      onerrorimg: this.$store.state.onerrorimg,
      alldata: [
        {
          goods_id: [],
          single_price: [],
          count: [],
          sum_price: 0,
          specification_id: []
        }
      ],
      showlist: []
    };
  },
  watch:{
      waitToken(a,b){
        if(a){
            this.showlist = [];
            this.getOfenBuyList();
        }
      }
  },
  computed: {
    ...mapState({
      // mapState相当于映射
      isbind: "isbind",
      waitToken:'waitToken'
    })
  },
  activated() {
    let waitToken = this.$store.state.waitToken
     if(!waitToken){
        this.showlist = [];
        this.getOfenBuyList();
    }
  },
  mounted() {
     
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
          data[item].goods_photo = this.host + data[item].goods_photo;
          data[item].num = 0;
          data[item].show = false;
          if (data[item].hasOwnProperty("specifications")) {
            data[item].type = 2;
            let secdata = data[item].specifications;
            for (let i in secdata) {
              secdata[i].num = 0;
            }
          } else {
            data[item].type = 1;
          }
          //type-1（没有分重量的） type-2（分了重量的）
        }
        this.showlist = data;
        this.getCG = false
        this.$store.commit("setLoad", false);
        this.$store.commit("setWaitToken", false);
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
    minus(item, ite) {
      console.log("减少购物车");
      jiancar(item, ite);
    },
    /*增加数量值*/
    plus(item, ite) {
      let isbind = sessionStorage.isbind;
      if (isbind != 1) {
        this.openwins = true;
      } else {
        setOfenBuyData(item, this.alldata, ite);
      }
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
  padding: 8px 0 0 0; /*margin-bottom: 1rem;*/
}
.mu-avatar {
  background: initial;
}
.li-box .mu-item-title {
  font-size: .28rem;
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
  padding: 8px 0;
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
  right: 0.4rem;
  top: 0.18rem;
}
.dele img {
  width: 0.35rem;
  height: 0.35rem;
}
.saoma img {
  width: 0.6rem;
  height: 0.6rem;
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