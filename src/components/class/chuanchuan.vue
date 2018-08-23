<template>
  <div class="chuanchuan">
    <BackBar dTitle='串串专区'></BackBar>
    <div class="adimg">
      <img src="../../../static/img/1.0_02.png" />
    </div>

    <!--菜品列表-->
    <div>
      <mu-load-more :loading="loading" @load="load">
        <mu-paper :z-depth="1" class="demo-list-wrap">
          <mu-list textline="three-line">

            <div v-for="(item,index) in list" :key="index" class="li-box">
              <router-link :to="{path:'/detail',query: {id: item.id}}">
                <mu-list-item avatar :ripple="false" button>
                  <mu-list-item-action>
                    <mu-avatar style="min-width: 1.4rem;height: 1.4rem;">
                      <img :src="item.goods_photo" :onerror="onerrorimg">
                    </mu-avatar>
                  </mu-list-item-action>
                  <mu-list-item-content>
                    <mu-list-item-title>{{item.goods_title}}</mu-list-item-title>
                    <span style="color: #666;font-size: 0.2rem;padding-left:.2rem">库存{{item.goods_count}}件</span>
                    <mu-list-item-sub-title>
                      <p style="color: red;">
                        <span v-show="!isbind" style="color: #a9a9a9;">绑定手机号才能查看价格</span>
                        <span v-show="isbind">￥
                          <span style="font-size: 0.5rem;">{{item.goods_price}}</span>
                        </span>
                      </p>
                    </mu-list-item-sub-title>
                  </mu-list-item-content>
                </mu-list-item>
              </router-link>
              <mu-divider></mu-divider>
              <div style="position: absolute;right: 0.3rem;bottom: 0.12rem;">
                <div class="saoma">
                  <!-- <span class="minus mpsytl" @click="minus(item)" v-if="item.num != 0">-</span>
				        	<span>{{item.num}}</span>
				        	<span class="plus mpsytl" @click="plus(item)">+</span> -->
                  <span class="minus" @click="minus(item)" v-if="item.count != 0">
                    <img src="../../../static/img/ic_jian.png" alt="" style="width:.5rem;height:.5rem;">
                  </span>
                  <span v-show="item.count != 0">{{item.count}}</span>
                  <span class="plus" @click="plus(item)">
                    <img src="../../../static/img/ic_jia.png" alt="" style="width:.5rem;height:.5rem;">
                  </span>
                </div>
              </div>
            </div>

          </mu-list>
        </mu-paper>
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
  import {
    getCaiClassChild
  } from "../../http/http.js";

  export default {
    data() {
      return {
        typeid: null, //分类id
        onerrorimg: this.$store.state.onerrorimg,
        host: this.$store.state.host,
        qigou: this.$store.state.qigou,
        limit: 10, //分页条数
        page: 1, //当前页
        nomore: false,
        carnum: 0,
        loading: false,
        allPrice: 0,
        openJS: false, //结算弹窗
        list: [],
      }
    },
    components: {
      BackBar
    },
    activated() {
      this.page = 1;
      this.list = [];
      this.typeid = this.$route.query.typeid
      this.getListDetail(this.page);
    },
    mounted() {

    },
    methods: {
      /*获取分类商品列表*/
      getListDetail(page) {
        let that = this;
        this.$http.get(that.host + 　'/api/goods-list?typeid=' + this.typeid + '&limit=' + this.limit + '&page=' + page)
          .then(function (res) {
            that.page = that.page + 1;
            let data = res.data.data;
            for (let item in data) {
              data[item].count = 0
              data[item].goods_photo = that.host + data[item].goods_photo
              data[item].weight = 5
            }
            if (data.length > 0) {
              that.list = that.list.concat(data);
            } else {
              that.nomore = true
              console.log('没有更多数据')
            }
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
            if (data[item].count > 0) {
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
      },
      /*减少数量值*/
      minus(item) {
        let amount = item.count;
        if (amount > 0) {
          item.count = amount - 1;
          this.carnum = this.carnum - 1
          this.allPrice = this.allPrice - item.goods_price
        } else {
          item.count = 0;
        }
      },
      /*增加数量值*/
      plus(item) {
        let amount = item.count;
        item.count = amount + 1
        this.carnum = this.carnum + 1
        this.allPrice = this.allPrice + item.goods_price
      },
    },
    computed: {
      ...mapState({ // mapState相当于映射
        isbind: 'isbind',
      })
    }
  }

</script>

<style scoped>
  .adimg {
    padding-top: 1rem;
  }

  .adimg img {
    height: 2.06rem;
    width: 100%;
  }


  .mu-list {
    padding: 8px 0 0 0;
    /*margin-bottom: 1rem;*/
  }

  .li-box .mu-item-title {
    font-size: 0.24rem;
  }

  .mu-item-action {
    padding-top: 0.3rem;
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
    white-space: initial
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


  .saoma img {
    width: 0.5rem;
    height: 0.5rem;
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

  .mu-avatar {
    background: initial;
  }

</style>
