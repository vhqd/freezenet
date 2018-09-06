<template>
  <div class="indexbox">
    <!-- 搜索区 -->
    <HomeSearch :ishome='true'></HomeSearch>
    <!-- 轮播图-->
    <HomeBanner :imgs='bannerImg' class='homebanner' v-if="bannerImg"></HomeBanner>

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
            <img :src="item.img" @click="goClasstopDetail(item)" :onerror="onerrorimglong">
          </mu-carousel-item>
        </mu-carousel>
        <!-- <img src="../../../static/img/1.0_02.png" /> -->
      </div>
      <!--商品列表专区-->
      <div>
        <div class="inc-scroll-landscape-container">
          <div class="inc-scroll-landscape-content">
            <ul>
              <li class="toptab" v-for="(item , index) in classlist" :key='index' @click="goClasstopDetail(item)">
                <p class="fqtitle">{{item.goods_type_second_name}}</p>
                <p class="stip">{{item.goods_type_second_desc}}</p>
                <img :src="item.img" :onerror="onerrorimg"/>
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
      <oftenHome ishome='1'></oftenHome>
    </div>

    <!--底部导航-->
    <Footer tagNum='0'></Footer>
  </div>
</template>
<script>
import HomeSearch from "../common/HomeSearch.vue";
import HomeBanner from "../home/HomeBanner.vue";
import oftenHome from "../oftenbuy/oftenHome.vue";
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
  setOfenBuyData,
  jiancar
} from "../../common/common.js";
import { disableShare } from '../../common/disableShare.js'
import { share } from '../../common/share.js';

export default {
  components: {
    HomeSearch,
    HomeBanner,
    oftenHome,
    Footer
  },
  data() {
    return {
      host: this.$store.state.host,
      basehost:this.$store.state.basehost,
      limit: 10,
      page: 1,
      openJS: false, //取消弹窗
      openwins: false, //全局弹窗
      item:null,
      index:null,
      carnum: 0, //购物车数量
      topclass: [],
      onerrorimg: this.$store.state.onerrorimg,
      onerrorimglong: this.$store.state.onerrorimglong,
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
  computed: {
    ...mapState({
      // mapState相当于映射
      token: "token",
      isbind: "isbind",
      a(){
        return this.$store.state.bannerImg
      },
      b(){
        return this.$store.state.topclass
      },
      c(){
        return this.$store.state.classlist
      },
    })
  },
  //监听等待token获取到之后数据返回成功加载数据
  watch:{
    a(n,o){
       this.bannerImg = n
    },
    b(n,o){
      this.topclass = n
    },
		c(n,o){
      this.classlist = n
    }
  },
  mounted() {
    this.$store.commit("setLoad", true);

    let invate_code = localStorage.invate_code
    if (invate_code && invate_code!= '') {
       share(this.$store.state.shareurl,localStorage.invate_code,this.$store.state.shareimg)
    }
    
    let openid = this.$route.query.openid || JSON.parse(localStorage.obj).name;
    console.log(11111);
    //获取token并且初始化首页数据
    this.$store.dispatch("getTokens",openid);
    //禁用分享
    //disableShare()


    //this.$store.commit("setLoad", true);
    //this.initData();
    window.location.href = this.basehost
  },
  activated() {
    document.title = '冻品聚汇'

    let is_phone = this.$route.query.is_phone || localStorage.isbind;
    let invate_code = this.$route.query.invate_code || localStorage.invate_code;
    let userid = this.$route.query.userid || localStorage.userid;
    console.log("userid");
    console.log(userid);
    if(invate_code){
      localStorage.invate_code = invate_code;
    }
    if (userid != 'undefined') {
      this.$store.commit("setUserid", userid);
      localStorage.userid = userid;
    }
    /**通过判断用户是否绑定手机控制是否能看到商品价格以及后续操作*/
    if (is_phone != 'undefined' && is_phone == 1) {
      this.$store.commit("editIsBind");
      localStorage.isbind = is_phone;
      console.log(is_phone);
    } else if(is_phone != 'undefined') {
      this.$store.commit('editIsBindFalse')
      localStorage.isbind = is_phone;
      console.log("用户没有绑定手机，不能显示商品价格");
    }


    
    //切换菜单更新数据
    this.bannerImg = this.$store.state.bannerImg
    this.topclass = this.$store.state.topclass
    this.classlist = this.$store.state.classlist
    if(localStorage.obj){
      if(JSON.parse(localStorage.obj).name){
        this.$store.dispatch("getCg");
      } 
    }
    

    /* if(this.$store.state.token){
      this.getOfenBuyList();
    } */
  
  },
  methods: {
    /**保存openid*/
    setOpenid(openid) {
      let obj = { name: openid };
      let str = JSON.stringify(obj);
      localStorage.obj = str;
    },

   /*  initData() {
      let openid = this.$route.query.openid || JSON.parse(localStorage.obj).name;
      console.log(22222);
      //this.$store.dispatch("getTokens",openid);
      this.getIndexBanner();
      this.getCarList();
      this.getIndexTopClass();
    }, */

    /**
     * 获取首页banner
     */
   /*  getIndexBanner() {
      console.log(44444);
      
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
 */
    /**获取购物车数量显示到底部 */
   /*  getCarList() {
      getCarList(999, 1).then(res => {
        let data = res.data.shopInfo.data;
        for (let item in data) {
          this.carnum += parseInt(data[item].count);
        }
        this.$store.commit("editCarnum", parseInt(this.carnum));
      });
    },
 */
    /**获取首页专区九宫格和列表数据*/
   /*  getIndexTopClass() {
      getIndexTopClass().then(res => {
        if (res) {
          let data = res.data.info;
          let grid = [];
          let columns = [];
          //'显示格式（1：列表，0：九宫格）'
          for (let item in data) {
            data[item].img = this.host + data[item].img
            console.log('图片地址');
            alert(11111)
            console.log(data[item].img );
            
            if (data[item].show_method == 0) {
                grid.push(data[item]);
            } else {
                columns.push(data[item]);
            }
          }
          this.topclass = grid; //九宫格
          this.classlist = columns; //列表显示
          this.$store.commit("setLoad", false);
          console.log("中间class");
          console.log(data);
        }
      });
    }, */

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

    /**专区商品1*/
    goClasstopDetail(item) {
      this.$router.push({ path: "/chuanchuan", query: { typeid: item.id } });
      //this.$router.push({ path: "/hotpot", query: { typeid: item.id } });
    },

    /**专区商品2*/
    goDetail(item) {
      this.$router.push({ path: "/hotpot", query: { typeid: item.id } });
    },

    /**删除常购清单*/
    deletOfenBuy(item) {
      deletOfenBuy(item.oftenBrowseId).then(res => {});
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
  color: #a9a9a9 !important;
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
