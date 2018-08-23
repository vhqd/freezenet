<template>
  <div class="hotpot">
    <!--头部-->
    <BackBar dTitle='火锅专区'></BackBar>
    <div class="adimg">
      <img src="../../../static/img/1.0_02.png" />
    </div>

    <div>
      <mu-load-more :loading="loading" @load="load">
        <div class="searchreult">
          <mu-flex class="flex-wrapper" align-items="center" wrap="wrap">
            <mu-flex v-for="(item,index) in list" :key="index" class="flex-demo" direction='column' align-items="center" justify-content="center"
              fill>
              <router-link :to="{path:'/detail',query: {id: item.id}}">
                <img v-bind:src="item.goods_photo" alt="" :onerror="onerrorimg" />
                <p class="rtitle">{{item.goods_title}}</p>
                <p class="liang">{{item.weight}}斤装</p>
                <p v-show="!isbind" class="price">绑定手机号才能查看价格</p>
                <p v-show="isbind" class="price">￥{{item.goods_price}}</p>
              </router-link>
              <div style="position: absolute;right:0;bottom: -.2rem;">
                <div class="saoma">
                  <!-- <span class="minus mpsytl" @click="minus(item)" v-if="item.num != 0">-</span>
						        	<span>{{item.num}}</span>
						        	<span class="plus mpsytl" @click="plus(item)">+</span> -->
                  <span class="minus" @click="minus(item)" v-if="item.num != 0">
                    <img src="../../../static/img/ic_jian.png" alt="" style="width:.5rem;height:.5rem;">
                  </span>
                  <span v-show="item.num != 0" style="margin-top:-.15rem;">{{item.num}}</span>
                  <span class="plus" @click="plus(item)">
                    <img src="../../../static/img/ic_jia.png" alt="" style="width:.5rem;height:.5rem;">
                  </span>
                </div>
              </div>
            </mu-flex>
          </mu-flex>
        </div>
      </mu-load-more>
    </div>

    <div class="addToCar">
      <mu-list class="carbut">
        <mu-list-item avatar button :ripple="false">
          <div class="pricecarbox">
            <div class="carprice" @click="goShopCar">
              <div class="carimgbox">
                <img src="../../../static/img/car/car.png" />
                <span class="carnum">{{carnum}}</span>
              </div>
            </div>
            <div style="position: relative;">合计：
              <span style="color: red;">￥{{allPrice}}</span>
              <span class="qigou">{{qigou}}元起购</span>
            </div>
          </div>
          <div v-if="allPrice < qigou" class="huise settlement">
            去结算
          </div>
          <div v-else class="settlement" @click="settlement">
            去结算
          </div>
          <!--  <div class="settlement" @click="settlement">
			       	去结算
			      </div> -->
        </mu-list-item>
      </mu-list>
      <mu-dialog title="温馨提示" width="360" :open.sync="openJS">
        <span class="cancelbox" @click="closeJSDialog">
          <img src="../../../static/img/ic_Shut .png" />
        </span>
        你还没有选中商品
        <br>还不能去结算
        <mu-button slot="actions" flat color="primary" @click="closeJSDialog">确定</mu-button>
      </mu-dialog>
    </div>

  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  import BackBar from '../common/BackBar.vue'
  import { jiancar, setOfenBuyData } from "../../common/common.js";

  export default {
    data() {
      return {
        baseimg:this.$store.state.baseimg,
        typeid: null, //分类id
        onerrorimg: this.$store.state.onerrorimg,
        host: this.$store.state.host,
        qigou: this.$store.state.qigou,
        limit: 10, //分页条数
        page: 1, //当前页
        nomore: false,
        openJS: false, //结算弹窗
        carnum: 0, //购物车数量
        loading: false,
        allPrice: 0, //总价
        checkNum: 0, //选中的条数
        list: [],
      }
    },
    components: {
      BackBar
    },
    activated() {
      this.page = 1
      this.list = []
      let typeid = this.$route.query.typeid
      if(this.typeid != typeid){
        this.getListDetail(this.page);
      }
    },
    mounted() {
      /* this.list = [];
      this.typeid = this.$route.query.typeid
      this.getListDetail(this.page); */
    },
    computed: {
      ...mapState({ // mapState相当于映射
        isbind: 'isbind',
      })
    },
    methods: {
      /*获取分类商品列表*/
      getListDetail(page) {
        let that = this;
        this.$http.get(that.host + 　'/api/goods-list?typeid=' + this.$route.query.typeid + '&limit=' + this.limit + '&page=' + page)
          .then(function (res) {
            that.page = that.page + 1;
            let data = res.data.data;
            for (let item in data) {
              data[item].num = 0
              data[item].goods_photo = that.baseimg + data[item].goods_photo
              data[item].weight = 5
            }
            if (data.length > 0) {
              that.list = that.list.concat(data);
            } else {
              that.nomore = true
              console.log('没有更多数据')
            }
            this.typeid = that.$route.query.typeid
            console.log('商品类别详情数据')
            console.log(res);
            console.log(res.data.data)
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      /*滚动到底部加载更多*/
      load() {
        if (!this.nomore) {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.getListDetail(this.page)
            console.log('成功数据')
            //this.num += 10;
          }, 1000)
        }

      },
      /*减少数量值*/
      minus(item) {
        let amount = item.num;
        if (amount > 0) {
          item.num = amount - 1;
          this.carnum = this.carnum - 1
          this.allPrice = this.allPrice - item.goods_price
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
      plus(item) {
        let amount = item.num;
        item.num = amount + 1
        this.carnum = this.carnum + 1
        this.allPrice = parseFloat(this.allPrice) + parseFloat(item.goods_price)
        setOfenBuyData(item, this.list);
      },
      /*获取购物车数量*/
      getCarNum() {
        let carnum = this.carnum;
        let menu = this.menu;
        for (let item in menu) {
          let list = menu[item].list;
          for (let it in list) {
            carnum += list[it].num;
          }
        }
      },
      /*结算*/
      settlement() {
        //用选中商品总价判断是否选择商品
        if (!this.allPrice > 0) {
          //打开弹窗
          this.openJS = true;
        } else {
          let data = this.list;
          let datas = [];
          console.log(2222222222222222222222222);
          for (let item in data) {
            if (data[item].num > 0) {
              datas.push(data[item]);
            }
          }
          console.log(datas);

          this.$router.push({
            path: "/order",
            query: {
              list: JSON.stringify(datas)
            }
          });
        }

      },
      /**点击底部购物车图标到购物车*/
      goShopCar(){
        this.$router.push('/car')
      },
      /*关闭弹窗*/
      closeJSDialog() {
        this.openJS = false;
      }
    }
  }

</script>

<style scoped>
  .mu-infinite-scroll {
    margin-bottom: 0.1rem
  }

  .adimg {
    padding-top: 1rem;
  }

  .adimg img {
    height: 2.06rem;
    width: 100%;
  }

  .searchreult {
    overflow: hidden;
  }

  .searchreult .flex-row img {
    width: 1.45rem;
    height: 1rem;
    margin: 0.2rem;
  }

  .searchreult .flex-row p {
    text-align: left !important;
    width: 2.4rem;
    padding-left: 0.17rem;
    overflow: hidden;
    word-break: keep-all;
  }

  .liang {
    font-size: 0.22rem;
    color: #666;
  }

  .price {
    font-size: 0.3rem;
    color: #f24c4c;
    padding-bottom: 0.8rem;
  }

  .searchreult .flex-column {
    position: relative;
    max-width: 32%;
    overflow: hidden;
    background: #fff;
    margin-top: 0.14rem;
  }

  .rtitle {
    text-overflow: ellipsis;
  }

  .saoma {
    width: 100%;
    display: flex;
    align-items: center;
  }

  .justify-content-start {
    justify-content: flex-start !important;
  }

  .mu-list {
    padding: 0;
  }


  .addToCar {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 2;
  }

  .pricecarbox {
    width: 67%;
    background: #fff;
    left: 0;
    position: absolute;
    height: 100%;
  }

  .pricecarbox>div {
    line-height: 32px;
    text-align: right;
    padding-right: 0.3rem;
    font-weight: bold;
    font-size: 0.32rem;
  }

  .carprice {
    position: absolute;
    left: .3rem;
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

  .carlistbox {
    padding: 0.15rem 0.3rem !important;
  }

  .carlistbox>ul {
    overflow: hidden;
  }

  .carimgbox img {
    width: 0.47rem;
    height: 0.47rem;
  }

  .addToCar .mu-list {
    overflow: initial;
  }

  .carimgbox {
    width: 1rem;
    height: 1rem;
    background: #fff;
    border-radius: 100%;
    margin-top: -15px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, .2);
  }

  .carnum {
    position: absolute;
    top: -0.1rem;
    left: 0.5rem;
    color: #fff;
    background: red;
    line-height: 0.25rem;
    border-radius: 0.2rem;
    min-width: 0.25rem;
    height: 0.25rem;
    padding: 0 5px;
    text-align: center;
  }

  .qigou {
    position: absolute;
    right: 0.3rem;
    bottom: -0.36rem;
    font-size: 0.22rem;
    color: #999;
  }

  .opentab {
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #e0e0e0;
    padding: 0.1rem;
  }

  .searchreult .flex-column:not(:nth-child(3n+1)) {
    margin-left: 6px;
  }

</style>
