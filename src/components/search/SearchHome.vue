<template>
  <div style="height: 100%;" class="searchhomebox">
    <!--头部-->
    <BackBarFullWhite dTitle='搜索'></BackBarFullWhite>
    <!-- 搜索区 -->
    <Search :ishome='false' :keyword='keyword' v-on:sendword="showword"></Search>
    <!--搜索历史-->
    <div id="search-content">
      <!--搜索列表-->
      <ul class="res-searchbox" v-show="resData.length != 0 && resData.length == 0">
        <li v-for="(item , index) in resData" :key="index" @click="goDetail(item)">{{item.goods_title}}</li>
      </ul>
      <!--暂无历史-->
      <mu-paper v-if="history.length == 0 && hothistory.length == 0 && searchshow">
        <mu-list>
          <mu-list-item avatar button :ripple="false">
            <mu-list-item-title>搜索历史</mu-list-item-title>
            <mu-list-item-action>
              <img src="../../../static/img/trash.png" style="width: 0.42rem;height: 0.4rem;" />
            </mu-list-item-action>
          </mu-list-item>
        </mu-list>
      </mu-paper>
      <p class="noneHis" v-if="history.length == 0 && searchshow">暂无搜索历史</p>

      <!--历史记录-->
      <mu-container class="demo-chip-wrapper" v-if="history.length>0 && searchshow">
        <div class="historybox">
          <span>历史搜索</span>
          <div class="dele" @click="openDeleWin">
            <img src="../../../static/img/ic-del.png" />
          </div>
        </div>

        <mu-chip class="demo-chip" v-for="(item , index) in history" :key="index" @click="searchAWord(item)">
          {{item.key_word}}
        </mu-chip>
      </mu-container>

    </div>
    <!--热门搜索-->
    <mu-container class="demo-chip-wrapper hotsearchbox" v-if="hothistory.length>0 && searchshow">
      <p class="historybox">热门搜索</p>
      <mu-chip class="demo-chip" v-for="(item , index) in hothistory" :key="index" @click="searchAWord(item)">
        {{item.key_word}}
      </mu-chip>
    </mu-container>
    <!--搜索结果-->
    <!--<div class="listbox">
			<mu-paper :z-depth="1" class="demo-list-wrap">
			  <mu-list textline="three-line">
			  	
			  	<div v-for="(item,index) in showList" :key="index" class="li-box">
				    <mu-list-item avatar :ripple="false" button>
				      <mu-list-item-action>
				        <mu-avatar style="width: 1.4rem;height: 1.4rem;">
				          <img :src="item.img">
				        </mu-avatar>
				      </mu-list-item-action>
				      <mu-list-item-content>
				        <mu-list-item-title>{{item.title}}</mu-list-item-title>
				        <mu-list-item-sub-title>
				          <span style="color: #a9a9a9;font-size: 0.2rem;">库存{{item.inventory}}件</span>
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
				        	<span class="minus mpsytl" @click="minus(item)" v-if="item.num != 0">-</span>
				        	<span>{{item.num}}</span>
				        	<span class="plus mpsytl" @click="plus(item)">+</span>
				        </div>
				    </div>
			  	</div>
			  </mu-list>
			</mu-paper>
			
		
		</div>-->

    <div class="searchreult" v-if="resData.length > 0">
      <mu-flex class="flex-wrapper" align-items="center" wrap="wrap">
        <mu-flex v-for="(item,index) in resData" :key="index" class="flex-demo" direction='column' align-items="center" justify-content="center" fill>
          <div @click="goDetail(item)">
            <img src="../../../static/img/1.6_03.png" alt="" class="shouimg" />
            <div class="infobox">
              <p class="rtitle">{{item.goods_title}}</p>
              <p class="liang">{{item.goods_price}}斤装</p>
              <p class="price">￥{{item.goods_price}}</p>
            </div>
          </div>
          <div style="position: absolute;right: 0;bottom: 0;">
            <div class="saoma">
              <!-- <span class="minus mpsytl" @click="minus(item)" v-if="item.num != 0">-</span>
							<span>{{item.num}}</span>
							<span class="plus mpsytl" @click="plus(item)">+</span> -->
              <span class="minus" @click="minus(item)" v-if="item.count != 0"><img src="../../../static/img/ic_jian.png" alt="" style="width:.5rem;height:.5rem;"></span>
              <span v-show="item.count != 0">{{item.count}}</span>
              <span class="plus" @click="plus(item)"><img src="../../../static/img/ic_jia.png" alt="" style="width:.5rem;height:.5rem;"></span>
            </div>
          </div>
        </mu-flex>
      </mu-flex>
    </div>
    <div v-else-if="!searchshow" style="position: absolute;left: 50%;top: 35%;margin-left: -96px;">
      <img src="../../../static/img/img_wujieguo@2x.png" style="width: 3.9rem;height: 3.3rem;" />
      <p style="color: #999;">没有找到相关商品</p>
    </div>

    <!--购物车bar-->

    <div class="addToCar" v-if="resData.length > 0">
      <mu-list class="carbut">
        <mu-list-item avatar button :ripple="false">
          <div class="pricecarbox">
            <div class="carprice">
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
          <div :class="allPrice >= qigou ? 'settlement gotobuy' : 'settlement'" @click="settlement">
            去结算
          </div>
        </mu-list-item>
      </mu-list>
      <mu-dialog title="温馨提示" width="360" :open.sync="openJS">
        <span class="cancelbox" @click="closeJSDialog"><img src="../../../static/img/ic_Shut .png" /></span>
        你还没有选中商品<br>还不能去结算
        <mu-button slot="actions" flat color="primary" @click="closeJSDialog">确定</mu-button>
      </mu-dialog>
    </div>

    <mu-dialog title="温馨提示" width="360" :open.sync="deleSearch">
      <span class="cancelbox" @click="closedeleDialog"><img src="../../../static/img/ic_Shut .png" /></span>
      删除历史搜索记录
      <mu-button slot="actions" flat color="primary" @click="deleSearchbox">确定</mu-button>
    </mu-dialog>
    <!--<div class="carBox">
			<mu-container>
			  <mu-bottom-nav>
			    <mu-bottom-nav-item title="购物车"></mu-bottom-nav-item>
			    <img src="../../../static/img/home/cart_weixuan.png"/>
			    <mu-chip class="demo-chip carNum">
			    	{{carnum}}
			  	</mu-chip>
			  </mu-bottom-nav>
			</mu-container>
		</div>-->

  </div>
</template>

<script>
import BackBarFullWhite from "../common/BackBarFullWhite.vue";
import Search from "../common/Search.vue";
import {
  getSearchWords,
  GetKeyWord,
  GetKeyHotWord,
  SearchWord,
  DeleKeyWord
} from "../../http/http.js";

export default {
  data() {
    return {
      host:this.$store.state.host,
      keyword:'',
      searchshow:true,
      showList: [], //默认显示的数据
      openJS: false, //结算弹窗
      deleSearch: false, //删除弹窗
      carnum: 0, //购物车数量
      qigou: this.$store.state.qigou,
      history: [
        /* {
			  title:'鸭肠'
		  } */
      ],
      hothistory: [
        /*  {
			  title:'鱼鱼鱼'
		  } */
      ],
      allPrice: 0, //总价
      checkNum: 0, //选中的条数
      resData: [
        //搜索下拉框
       /*  {
          title: "aaa"
        } */
      ],
      list: [
        {
          img: require("../../../static/img/1-0_03.png"),
          title: "BreakfastBreakfastBreakfast",
          num: 0,
          weight: 5,
          price: 20
        },
        {
          img: require("../../../static/img/1-0_03.png"),
          title: "CameraCameraCamera",
          num: 0,
          weight: 5,
          price: 20
        },
        {
          img: require("../../../static/img/1-0_03.png"),
          title: "CameraCameraCameraCamera",
          num: 0,
          weight: 5,
          price: 20
        },
        {
          img: require("../../../static/img/1-0_03.png"),
          title: "BreakfastBreakfastBreakfast",
          num: 0,
          weight: 5,
          price: 20
        },
        {
          img: require("../../../static/img/1-0_03.png"),
          title: "CameraCameraCamera",
          num: 0,
          weight: 5,
          price: 20
        },
        {
          img: require("../../../static/img/1-0_03.png"),
          title: "CameraCameraCameraCamera",
          num: 0,
          weight: 5,
          price: 20
        }
      ],
      menu: [
        {
          id: 1,
          name: "热卖",
          list: [
            {
              id: 1,
              img: require("../../../static/img/1-0_03.png"), //图片
              title: "算哈哈是111", //标题
              num: 0, //数量
              price: "20", //单价
              oldPrice: "50", //旧的价格
              inventory: "5" //库存
            },
            {
              id: 2,
              img: require("../../../static/img/1-0_03.png"), //图片
              title: "算哈哈是", //标题
              num: 0, //数量
              price: "20", //单价
              oldPrice: "50", //旧的价格
              inventory: "5" //库存
            }
          ]
        },
        {
          id: 2,
          name: "热卖",
          list: [
            {
              id: 1,
              img: require("../../../static/img/1-0_03.png"), //图片
              title: "算哈哈是1", //标题
              num: 1, //数量
              price: "20", //单价
              oldPrice: "50", //旧的价格
              inventory: "5" //库存
            }
          ]
        },
        {
          id: 3,
          name: "热卖",
          list: [
            {
              id: 1,
              img: require("../../../static/img/1-0_03.png"), //图片
              title: "算哈哈是2", //标题
              num: 0, //数量
              price: "20", //单价
              oldPrice: "50", //旧的价格
              inventory: "5" //库存
            }
          ]
        },
        {
          id: 4,
          name: "热卖",
          list: [
            {
              id: 1,
              img: require("../../../static/img/1-0_03.png"), //图片
              title: "算哈哈是3", //标题
              num: 0, //数量
              price: "20", //单价
              oldPrice: "50", //旧的价格
              inventory: "5" //库存
            }
          ]
        }
      ]
    };
  },
  activated(){
    this.searchshow = true;
    this.getSWords()
  },
  methods: {
    /**获取显示搜索结果*/
    showword(data) {
      SearchWord(data).then(res => {
        let data = res.data.data;
        if(data.length == 0 ){
            this.searchshow = false;
            return;
        }
        if(data.length > 0){
          this.searchshow = true;
        }
        for(let i in data){
          data[i].goods_photo = this.host + data[i].goods_photo;
			    data[i].count = 0;
        }
        this.resData = data;
      });
    },
    /**点击搜索结果查看详情*/
    goDetail(item){
      this.$router.push({path:'/detail',query:{id:item.id}})
    },
    /**点击搜索历史或者热门搜索*/
    searchAWord(item){
      this.showword(item.key_word);
    },
    /*减少数量值*/
    minus(item) {
      let amount = item.count;
      if (amount > 0) {
        item.count = amount - 1;
        this.carnum = this.carnum - 1;
        this.allPrice = this.allPrice - item.goods_price;
      } else {
        item.count = 0;
      }
    },
    /*增加数量值*/
    plus(item) {
      let amount = item.count;
      item.count = amount + 1;
      this.carnum = this.carnum + 1;
      this.allPrice = this.allPrice + item.goods_price;
    },
    /*获取购物车数量*/
    getCarNum() {
      let carnum = this.carnum;
      let menu = this.menu;
      for (let item in menu) {
        let list = menu[item].list;
        for (let it in list) {
          carnum += list[it].count;
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
        let data = this.resData;
        let datas = [];
         console.log(2222222222222222222222222);
        for(let item in data){
          if(data[item].count > 0){
            datas.push(data[item]);
          }
        }
        console.log(datas);
        
        this.$router.push({ path: "/order" ,query:{list:JSON.stringify(datas)}});
      }
    },
    /**打开删除弹窗*/
    openDeleWin(){
       this.deleSearch = true;
    },
    /**删除记录*/
    deleSearchbox() {
       DeleKeyWord().then(res => {
        if (res.data.code == 200) {
          this.history =[];
          this.deleSearch = false;
        }
      });
    },
    /**关闭删除记录弹窗*/
    closedeleDialog() {
      this.deleSearch = false;
    },
    /*关闭弹窗*/
    closeJSDialog() {
      this.openJS = false;
    },
    /**获取搜索词和热门搜索词*/
    getSWords(){
      this.GetKeyWord()
      this.GetKeyHotWord()
    },
     /*获取搜索历史*/
    GetKeyWord(){
      this.$store.commit("setLoad",true);
      GetKeyWord().then(res => {
          let data = res.data.data;
          this.history = data;
          console.log(data);
          console.log("--------");
          console.log(res);
        });
    },
     /*获取搜索历史*/
    GetKeyHotWord(){
      GetKeyHotWord().then(res => {
        let data = res.data.data;
        this.hothistory = data;
        console.log(data);
        console.log("--------");
        console.log(res);
         this.$store.commit("setLoad",false);
      });
    }
  },
  mounted() {
     
  },
  components: {
    Search,
    BackBarFullWhite
  }
};
</script>

<style scoped>
/* .home_h{top: 1rem !important;} */
.home_h{position: relative !important;padding-top: .9rem;}
.res-searchbox {
  position: absolute;
  top: 95px;
  width: 100%;
  z-index: 10;
  background: #fff;
}
.hotsearchbox {
  margin-top: 7px;
  background: #fff;
}
.res-searchbox li {
  padding: 0.2rem 10px;
  border-bottom: 1px solid #e0e0e0;
  text-align: left;
  font-size: 14px;
  color: #333;
  font-weight: bold;
}
#search-content {
  padding-top: 0rem;
  background: #fff;
}
.mu-paper {
  border-bottom: 1px solid #e0e0e0;
}
.mu-list {
  padding: 0;
}
.mu-item-title {
  font-size: 0.28rem;
  font-weight: bold;
  height: 0.43rem;
  line-height: 0.43rem;
}
.noneHis {
  text-align: left;
  padding: 0.45rem 0.3rem;
  color: #999;
}
.historybox {
  text-align: left;
  position: relative;
  padding: 0.2rem 0.3rem;
  color: #999;
  border-bottom: 1px solid #e0e0e0;
}
.container {
  overflow: hidden;
}
.mu-chip {
  background: #f5f5f5;
  color: #666;
  font-size: 0.26rem;
  font-weight: bold;
  float: left;
  margin: 0.2rem 0.2rem;
}

/*搜索结果列表*/
.listbox {
  width: 100%;
}
.li-box {
  position: relative;
}
.saoma {
  float: right;
  border-radius: 0.2rem;
  margin-right: 0.3rem;
}
/* .minus {
  background: #c3c3c3;
}
.plus {
  background: #f24c4c;
}
.mpsytl {
  border-radius: 50%;
  color: #fff;
  width: 0.44rem;
  height: 0.44rem;
  display: inline-block;
  font-size: 0.3rem;
  line-height: 0.4rem;
} */
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
  clear: both;
}
.mu-drawer {
  position: fixed;
  top: 4.3rem;
}

/*底部购物车*/
.carBox {
  position: fixed;
  bottom: 0;
  width: 100%;
}
.container {
  padding: 0;
}
.container .carBox img {
  width: 0.43rem;
  height: 0.43rem;
}
.mu-bottom-item {
  font-size: 0.32rem;
  font-weight: bold;
  color: #f95151;
  height: auto;
  max-width: 1.2rem !important;
  min-width: initial !important;
}
.carNum {
  background: red;
  color: #fff;
  /* margin-top: -0.2rem; */
  margin-left: -0.2rem;
  line-height: 20px;
  padding: 0 7px;
}

.searchreult {
  overflow: hidden;
  padding-bottom: 50px;
}
.searchreult .flex-row .shouimg {
  width: 1.45rem;
  height: 1rem;
  margin: 0.2rem;
}
.searchreult .flex-row p {
  text-align: left !important;
  width: 100%;
  height: 25px;
  overflow: hidden;
}
.liang {
  font-size: 0.22rem;
  color: #666;
}
.price {
  font-size: 0.3rem;
  color: #f24c4c;
}
.searchreult .flex-column {
  position: relative;
  max-width: 32%;
  overflow: hidden;
  background: #fff;
  margin-top: 0.14rem;
  padding-bottom: .8rem;
}
.searchreult .flex-column:first-child{
 margin-left:0 !important;
}
.searchreult .flex-column:not(:nth-child(4n)){
 margin-left: 7px;
}
.rtitle {
  text-overflow: ellipsis;
}
.saoma {
  width: 100%;
}
.justify-content-start {
  justify-content: flex-start !important;
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
.pricecarbox > div {
  line-height: 35px;
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
  background: #c3c3c3;
  width: 33%;
  height: 45px;
  line-height: 45px;
}
.gotobuy {
  background: #f24c4c !important;
}
.carlistbox {
  padding: 0.15rem 0.3rem !important;
}
.carlistbox > ul {
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
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.2);
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

.dele {
  position: absolute;
  right: 0.3rem;
  top: 0.12rem;
}
.dele img {
  width: 0.35rem;
  height: 0.35rem;
}
.infobox {
  width: 87%;
  overflow: hidden;
}
</style>
