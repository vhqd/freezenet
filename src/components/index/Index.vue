<template>
  <div class="indexbox">
    <!-- 搜索区 -->
    <HomeSearch :ishome='true'></HomeSearch>
    <!-- 轮播图-->
    <HomeBanner :imgs='bannerImg' class='homebanner'></HomeBanner>

    <!--首页覆盖Banner的tab-->
    <div class="topboxinfo">
      <ul>
        <li v-for="(item,index) in orderlist" @click="toplistgo(index)" :key='index'>
          <!--<router-link :to="{path:'/hot', query:{id:item.id}}">-->
          <img :src="item.img" :onerror="onerrorimglong" />
          <p>{{item.title}}</p>
          <!--</router-link>-->
        </li>
      </ul>
    </div>

    <div class="iddexcontent">
      <div class="adimg">
        <mu-carousel hide-controls>
          <mu-carousel-item v-for="(item , index) in topclass" :key="index">
            <img :src="item.img" @click="goClasstopDetail(item)" :onerror="onerrorimg">
          </mu-carousel-item>
        </mu-carousel>
        <!-- <img src="../../../static/img/1.0_02.png" /> -->
      </div>
      <!--商品列表专区-->
      <div>
        <div class="inc-scroll-landscape-container">
          <div class="inc-scroll-landscape-content">
            <ul>
              <li class="toptab" v-for="(item , index) in classlist" :key='index' @click="goDetail(item)">
                <p class="fqtitle">{{item.goods_type_second_name}}</p>
                <p class="stip">{{item.goods_type_second_desc}}</p>
                <img :src="item.img" />
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="indexlist">
        <div class="oftenby">
          <img src="../../../static/img/ic_qingdan_biaoti.png" />
          <span class="oftenbytitle">
            常购清单
          </span>
          <span class="oftenme">我的专属购物清单</span>
        </div>
      </div>

      <div style="position: relative;min-height: 4rem;">
        <mu-paper :z-depth="1" class="demo-list-wrap" v-if="showlist.length > 0">
          <mu-list textline="three-line">

            <div v-for="(item,index) in showlist" :key="index" class="li-box">
              <router-link :to="{path:'/detail',query: {id: item.id}}">
                <mu-list-item avatar :ripple="false" button>
                  <mu-list-item-action>
                    <mu-avatar style="min-width: 1.4rem;height: 1.4rem;">
                      <img :src="item.goods_price" :onerror="onerrorimg">
                    </mu-avatar>
                  </mu-list-item-action>
                  <mu-list-item-content>
                    <mu-list-item-title>{{item.goods_title}}</mu-list-item-title>
                    <span class="kcstyle">库存{{item.goods_count}}件</span>
                    <mu-list-item-sub-title>
                      <div style="color: red;">
                        <span v-show="!isbind" style="color: #a9a9a9;">绑定手机号才能查看价格</span>
                        <div v-show="isbind" class="pricecolor">￥
                          <span>{{item.goods_price}}</span>
                        </div>
                        <!--<span style="color: #ccc;text-decoration: line-through;">￥{{item.oldPrice}}</span>-->
                      </div>
                    </mu-list-item-sub-title>
                  </mu-list-item-content>
                </mu-list-item>
              </router-link>
              <div style="position: absolute;right: 0.3rem;bottom: 0.12rem;">
                <div class="saoma">
                  <!-- <span class="minus mpsytl" @click="minus(item)" v-if="item.num != 0">-</span>
                  <span>{{item.num}}</span>
                  <span class="plus mpsytl" @click="plus(item)">+</span> -->
                  <span class="minus" @click="minus(item)" v-if="item.num != 0"><img src="../../../static/img/ic_jian.png" alt="" style="width:.5rem;height:.5rem;"></span>
                  <span v-show="item.num != 0">{{item.num}}</span>
                  <span class="plus" @click="plus(item)"><img src="../../../static/img/ic_jia.png" alt="" style="width:.5rem;height:.5rem;"></span>
                </div>
              </div>
              <div class="dele" @click="deleList(index,item)">
                <img src="../../../static/img/ic-del.png" />
              </div>
            </div>
          </mu-list>
        </mu-paper>
        <div v-else style="position: absolute;left: 50%;top: 50%;margin-top: -1.8rem;margin-left: -1rem;">
          <img src="../../../static/img/home/img_meiyoutuihuodan@2x.png" style="width: 2rem;height: 2rem;" />
          <p style="color: #999;">你还没有清单哦</p>
        </div>
      </div>

    </div>

    <!--底部导航-->
    <Footer tagNum='0'></Footer>
  </div>
</template>
<script>
import HomeSearch from "../common/HomeSearch.vue";
import HomeBanner from "../home/HomeBanner.vue";
import Footer from "../common/Footer.vue";
import { mapState } from "vuex";
import QS from "qs";
import {
  getToken,
  getIndexBanner,
  getCarList,
  getIndexTopClass,
  getOfenBuyList,
  deletOfenBuy,
  AddCarShop,
  test
} from "../../http/http.js";
import {
  getTokens,
  removeOfenBuyData,
  setOfenBuyData
} from "../../common/common.js";

export default {
  components: {
    HomeSearch,
    HomeBanner,
    Footer
  },
  data() {
    return {
      host: this.$store.state.host,
      limit: 10,
      page: 1,
      carnum: 0, //购物车数量
      topclass: [],
      onerrorimg: this.$store.state.onerrorimg,
      onerrorimglong: this.$store.state.onerrorimglong,
      alldata: [
        {
          goods_id: [],
          single_price: [],
          count: [],
          sum_price: 0
        }
      ],
      bannerImg: [],
      classlist: [],
      showlist: [],
      orderlist: [
        {
          id: 1,
          title: "热销榜",
          img: require("../../../static/img/home/ic_rexiaobang.png")
        },
        {
          id: 2,
          title: "常购清单",
          img: require("../../../static/img/home/ic_qingdan.png")
        },
        {
          id: 3,
          title: "领优惠券",
          img: require("../../../static/img/home/ic_youhuiquan.png")
        },
        {
          id: 4,
          title: "我的订单",
          img: require("../../../static/img/home/ic_dingdan.png")
        }
      ]
    };
  },
  mounted() {

    this.$store.commit("setLoad", true);
    this.initData();

  },
  activated() {

    let is_phone = this.$route.query.is_phone;
    let userid = this.$route.query.userid;
    console.log("userid");
    console.log(userid);
    if (userid) {
      this.$store.commit("setUserid", userid);
      sessionStorage.userid = userid;
    }
    /**通过判断用户是否绑定手机控制是否能看到商品价格以及后续操作*/
    if (is_phone == 1) {
      this.$store.commit("editIsBind");
      sessionStorage.isbind = is_phone;
      console.log(is_phone);
    } else {
      this.$store.commit('editIsBindFalse')
      console.log("用户没有绑定手机，不能显示商品价格");
    }
  },
  methods: {
    
    /**保存openid*/
    setOpenid(openid) {
      let obj = { name: openid };
      let str = JSON.stringify(obj);
      localStorage.obj = str;
    },

    initData() {
      let openid = this.$route.query.openid;
      if (openid) {
        let str = localStorage.obj;
        this.setOpenid(openid);
      }
      this.$store.commit("setOpenId", openid);
      let username = openid || JSON.parse(localStorage.obj).name
      let data = {
        username: openid,
        password: "123456"
      };
      /**获取token*/
      getToken(data).then(res => {
        let token = res.data.data.access_token;
        console.log("获取到的token");
        console.log(token);
        //设置token
        this.$store.commit("set_token", token);
        //获取token成功后初始化数据
        this.getOfenBuyList();
        this.getIndexBanner();
        this.getCarList();
        this.getIndexTopClass();
      });
    },

    /**
     * 获取首页banner
     */
    getIndexBanner() {
      getIndexBanner(4, 1).then(res => {
        if (res) {
          let data = res.data.data.data;
          for (let item in data) {
            data[item].banner_image_address =
              this.host + data[item].banner_image_address;
          }
          this.bannerImg = data;
          console.log("banner");
          console.log(data);
        }
      });
    },

    /**获取购物车数量显示到底部 */
    getCarList() {
      getCarList(999, 1).then(res => {
        let data = res.data.shopInfo.data;
        for (let item in data) {
          this.carnum += parseInt(data[item].count);
        }
        this.$store.commit("editCarnum", parseInt(this.carnum));
      });
    },

    /**获取首页专区九宫格和列表数据*/
    getIndexTopClass() {
      getIndexTopClass().then(res => {
        if (res) {
          let data = res.data.info;
          let grid = [];
          let columns = [];
          //'显示格式（1：列表，0：九宫格）'
          for (let item in data) {
            if (data[item].show_method == 1) {
              columns.push(data[item]);
            } else {
              grid.push(data[item]);
            }
          }
          this.topclass = grid; //九宫格
          this.classlist = columns; //列表显示
          console.log("中间class");
          console.log(data);
        }
      });
    },

    /**获取常购清单列表*/
    getOfenBuyList() {
      getOfenBuyList(99, 1).then(res => {
        let data = res.data.info.data;
        for (let item in data) {
          data[item].goods_photo = this.host + data[item].goods_photo;
          data[item].num = 0;
        }
        this.showlist = data;

        this.$store.commit("setLoad", false);
      });
    },

    /*首页顶部热销榜、常购清单、领券优惠、我的订单router*/
    toplistgo(index) {
      if (index == 0) {
        this.$router.push("/hot");
      }
      if (index == 1) {
        this.$router.push("/oftenbuy");
      }
      if (index == 2) {
        this.$router.push("/getcoupons");
      }
      if (index == 3) {
        this.$router.push({ path: "/orderlist", query: { id: 0 } });
      }
    },

    /*删除一条常购清单记录*/
    deleList(index, item) {
      this.showlist.splice(index, 1);
      this.deletOfenBuy(item);
    },

    /**专区商品1*/
    goClasstopDetail(item) {
      this.$router.push({ path: "/chuanchuan", query: { typeid: item.id } });
      //this.$router.push({ path: "/hotpot", query: { typeid: item.id } });
    },

    /**专区商品2*/
    goDetail(item) {
      this.$router.push({ path: "/hotpot", query: { typeid: item.id } });
      //this.$router.push({ path: "/hotpot", query: { typeid: item.id } });
    },

    /*减少数量值*/
    minus(item) {
      let amount = item.num;
      if (amount > 0) {
        item.num = amount - 1;
      } else {
        item.num = 0;
      }
      removeOfenBuyData(item, this.alldata);
    },

    /*增加数量值*/
    plus(item) {
      let amount = item.num;
      item.num = amount + 1;
      setOfenBuyData(item, this.alldata);
    },

    /**删除常购清单*/
    deletOfenBuy(item) {
      deletOfenBuy(item.oftenBrowseId).then(res => {});
    }
    
  },
  computed: {
    ...mapState({
      // mapState相当于映射
      token: "token",
      isbind: "isbind"
    })
  }

};
</script>

<style scoped>
.home_ban {
  height: 3.22rem !important;
}
.indexlist {
  padding: 0 0.3rem;
  margin-top: 0.1rem;
  background: #fff;
  border-bottom: 0.2px solid rgba(224, 224, 224, 0.5);
}

.oftenby {
  height: 0.8rem;
  display: flex;
  align-items: center;
  font-weight: bold;
}
.oftenby span {
  line-height: 0.8rem;
}
.oftenby img {
  width: 0.36rem;
  height: 0.36rem;
}
.oftenbytitle {
  font-size: 0.28rem;
  font-weight: 300;
  color: #333;
  padding-left: 0.1rem;
}
.oftenme {
  font-size: 0.2rem;
  font-weight: 300;
  color: #999;
  padding-left: 0.15rem;
  padding-top: 0.04rem;
}

.mu-carousel-indicators {
  margin: 0.2rem auto 1.2rem auto;
}
.topboxinfo {
  position: relative;
  z-index: 2;
  width: 90%;
  margin: -35px auto 0.2rem auto;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 3px 4px -1px rgba(224, 224, 224, 0.35),
    0 3px 4px -1px rgba(224, 224, 224, 0.35),
    0 3px 4px -1px rgba(224, 224, 224, 0.35);
}
.ordertopbox {
  overflow: hidden;
  padding: 0.3rem;
  border-bottom: 1px solid #e0e0e0;
}
.myordertext {
  float: left;
}
.goordertex {
  color: #333;
  float: right;
}

.topboxinfo ul {
  overflow: hidden;
  padding: 0.4rem 0.3rem;
}
.topboxinfo ul li {
  float: left;
  width: 25%;
  color: #333;
}
.topboxinfo ul li p {
  font-size: 0.26rem;
  color: #333;
  font-weight: 300;
}
.topboxinfo ul li img {
  width: 0.8rem;
  height: 0.8rem;
}
.listcenterbox {
  background: #fff;
  margin-top: 0.15rem;
}

.adimg img {
  height: 2.05rem;
  width: 100%;
}

.mu-list {
  padding: 8px 0 0 0;
  margin-bottom: 1.1rem;
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

.dele {
  position: absolute;
  right: 0.3rem;
  top: 0.12rem;
}
.dele img {
  width: 0.35rem;
  height: 0.35rem;
}

/*顶部导航滚动设置*/
.inc-scroll-landscape-container {
  z-index: 9;
  height: 3.3rem;
  width: 100%;
  overflow: hidden;
}
.inc-scroll-landscape-container > .inc-scroll-landscape-content {
  padding-bottom: 10px; /* 当内容宽度小于容器宽度时，会出现横向滚动条。将横向滚动条溢出至容器外，保证横向滚动条不可见 */
  white-space: nowrap;
  overflow: hidden;
  overflow-x: scroll; /* 1 */
  -webkit-backface-visibility: hidden;
  -webkit-perspective: 1000;
  -webkit-overflow-scrolling: touch; /* 2 */
  text-align: justify; /* 3 */
  &::-webkit-scrollbar {
    display: none;
  }
}
.stip {
  margin-top: -0.2rem;
}
.inc-scroll-landscape-container > .inc-scroll-landscape-content ul {
  margin: 0.1rem 0;
}
.inc-scroll-landscape-container > .inc-scroll-landscape-content > ul > li {
  line-height: 0.6rem;
  background: #fff;
  min-width: 35%;
  position: relative;
  display: inline-block;
  text-align: center;
  font-size: 13px;
  font-weight: bold;
}
.inc-scroll-landscape-container > .inc-scroll-landscape-content > ul > li p {
  padding: 0.1rem 0.06rem;
  color: #333;
}
.stip {
  font-size: 0.22rem;
  color: #999 !important;
  font-weight: 100;
}
.inc-scroll-landscape-container > .inc-scroll-landscape-content > ul > li img {
  width: 2rem;
  height: 1.5rem;
}
.inc-scroll-landscape-container
  > .inc-scroll-landscape-content
  > ul
  > li:not(:first-child) {
  margin-left: 0.15rem;
}
.mu-list .li-box:not(:last-child) {
  border-bottom: 1px solid #e0e0e0;
}
.adimg .mu-carousel {
  height: 103px;
}
.toptab .fqtitle {
  max-width: 130px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.iddexcontent .kcstyle {
  padding-left: 0.2rem;
}
</style>
