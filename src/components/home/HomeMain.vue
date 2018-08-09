<template>
  <!--home菜单和菜单列表组件  -->
  <div class="home_main">
    <div class="toptabbox">
      <div class="inc-scroll-landscape-container">
        <div class="inc-scroll-landscape-content">
          <ul v-show="show">
            <li style="font-size: 0.28rem;font-weight: bold;">全部分类</li>
          </ul>
          <!--<mu-container class="demo-chip-wrapper" v-show="!show">
					  <mu-chip @click="removeBg" :color="index == 0 ? 'red' : ''" v-for="(item , index) in classification"  :key='index' class="demo-chip toptab">
					    	{{item.name}}
					  </mu-chip>
					</mu-container>-->
          <ul v-show="!show">
            <li class="toptab" @click="removeBg(index,item)" :class=" item.isCheck ? 'active' : ''" v-for="(item , index) in classification" :key='index'>{{item.goods_type_name}}</li>
          </ul>
        </div>
      </div>
      <div class="toggledown" @click="show = !show">
        <img :src=" !show ? '../../../static/img/down.png' : '../../../static/img/up.png'" alt="" />
      </div>

      <mu-flex class="mu-transition-row">
        <mu-expand-transition>
          <div v-show="show" class="opentab">
            <!-- <mu-container class="demo-chip-wrapper">
					  <mu-chip  @click="removeBg1" :color="index == 0 ? 'red' : ''" v-for="(item , index) in classification"  :key='index' class="demo-chip toptab1">
					    	{{item.name}}
					  </mu-chip>
					</mu-container>-->
            <ul>
              <li class="toptab" @click="removeBg(index,item)" :class="item.isCheck ? 'active' : ''" v-for="(item , index) in classification" :key='index'>{{item.goods_type_name}}</li>
            </ul>
          </div>
        </mu-expand-transition>
      </mu-flex>

    </div>
    <div style="position: relative;">
      <!--左边菜单-->
      <mu-container>
        <div style="position: relative;z-index: 1;">
          <mu-drawer v-scroll="scroll" id="scrollbox" :open.sync="open" :docked="docked" :right="position === 'right'">
            <div class="listbox">
              <mu-list id="ulbox">
                <mu-list-item :class="index == activeInd ? 'li-active' : ''" button v-for="(item,index) in leftCaiClass" :key="index" @click='switchMenu(index,item)'>
                  <mu-list-item-title>{{item.goods_type_second_name}}</mu-list-item-title>
                </mu-list-item>
              </mu-list>
            </div>
            <!--分类按钮-->
            <!--  <mu-flex justify-content="center" style="position: absolute;left:1.85rem;top: 1.1rem;" align-items="center">
						    <mu-button color="primary" @click="isopen">
								分<br />
								类
							</mu-button>
						</mu-flex>-->
          </mu-drawer>
        </div>
      </mu-container>
      <!--右边菜单详情列表-->
      <div id="homelistbox">
        <mu-paper :z-depth="1" class="demo-list-wrap">
          <mu-list textline="three-line" v-if="caiDetailList.length != 0">

            <div v-for="(item,index) in caiDetailList" :key="index" class="li-box">
              <router-link to="/detail">
                <mu-list-item avatar :ripple="false" button>
                  <mu-list-item-action>
                    <mu-avatar style="width: 1.4rem;height: 1.4rem;">
                      <img :src="item.goods_photo">
                    </mu-avatar>
                  </mu-list-item-action>
                  <mu-list-item-content>
                    <mu-list-item-title>{{item.goods_title}}</mu-list-item-title>
                    <mu-list-item-sub-title>
                      <span style="color: #a9a9a9;font-size: 0.2rem;">库存{{item.goods_count}}件</span>
                      <div>
                        <span v-show="!isbind" style="color: #a9a9a9;">绑定手机号才能查看价格</span>
                        <div v-show="isbind" style="color: red;">
                          ￥
                          <span style="font-size: 0.5rem;">{{item.goods_price}}</span>
                          <span style="color: #ccc;text-decoration: line-through;">￥{{item.goods_original_price}}</span>
                        </div>
                      </div>
                    </mu-list-item-sub-title>
                  </mu-list-item-content>
                </mu-list-item>
              </router-link>
              <mu-divider></mu-divider>
              <div style="position: absolute;right: 0;bottom: 0;" v-show="isbind">
                <div class="saoma">
                  <span class="minus mpsytl" @click="minus(item)" v-if="item.num != 0">-</span>
                  <span v-show="item.num != 0">{{item.num}}</span>
                  <span class="plus mpsytl" @click="plus(item)">+</span>
                </div>
              </div>
            </div>
          </mu-list>
          <p v-else class="nodata">暂时没有商品哦</p>
        </mu-paper>

        <!--    <mu-container data-mu-loading-color="secondary" data-mu-loading-overlay-color="rgba(0, 0, 0, .7)" v-loading="loading2" class="demo-loading-wrap">
         <mu-button color="teal" @click="fullscreen()">全屏加载</mu-button>
</mu-container> -->

      </div>
    </div>

    <!--购物车bar-->

    		<div class="addToCar">
		  	<mu-list class="carbut">
			   <mu-list-item avatar button :ripple="false">
			      <div class="pricecarbox">
				      <div class="carprice">
				      	<div class="carimgbox">
				      		<img src="../../../static/img/car/car.png"/>
				      		<span class="carnum">{{carnum}}</span>
				      	</div>
				      </div>
				      <div style="position: relative;">合计：<span style="color: red;">￥{{allPrice}}</span><span class="qigou">100元起购</span></div>
			      </div>
			      <div :class="carnum == 0 ? 'huise settlement': 'settlement'" @click="settlement">
			       	加入购物车
			      </div>
			    </mu-list-item>
		    </mu-list>
		    <mu-dialog title="温馨提示" width="360" :open.sync="openJS">
		    	<span class="cancelbox" @click="closeJSDialog"><img src="../../../static/img/ic_Shut .png"/></span>
			    你还没有选中商品<br>还不能去结算
			    <mu-button slot="actions" flat color="primary" @click="closeJSDialog">确定</mu-button>
			  </mu-dialog>
	  </div>

  </div>
</template>

<script>
import { mapState } from "vuex";
import { AddCarShop } from "../../http/http.js";
import QS from "qs";

import {
  getCaiClassOne,
  getCaiClassChild,
  getCaiClassChildDetail
} from "../../http/http.js";

export default {
  data() {
    return {
      host: this.$store.state.host,
      page: 1,
      limit: 15, //当前页面分页条数
      docked: true, //是否显示遮罩
      open: true, //默认菜单栏显示
      initdata: true, //初始化菜单
      carnum: 0,//分类底部小车数量
      alldata:[{
        'goods_id':[],
        'single_price':[],
        'count':[],
        'sum_price':0
      } ],//分类底部购物车数据
      allPrice: 0,
      loading1: false,
      loading2: false,
      openJS: false, //结算弹窗
      position: "left", //菜单显示位置
      amount: 0, //数量
      activeInd: 0, //左边菜单选中背景class数组索引
      leftCaiClass: [], //左边菜单数据
      caiDetailList: [], //右边菜品数据
      nodata: false, //没有数据提示
      showList: [], //默认显示的数据
      searchBarFixed: false,
      show: false,
      scrollTop: 0,
      classification: [
        /*
      	{
      		id:1,
      		name:'海鲜',
      		isCheck:true
      	}*/
      ]
      /*    menu: [
        {
          id: 1,
          name: "热卖",
          list: [
            {
              id: 1,
              img: require("../../../static/img/1-0_03.png"), //图片
              title: "算哈哈是111", //标题
              num: 0, //数量
              price: 20, //单价
              oldPrice: "50", //旧的价格
              inventory: "5" //库存
            }
          ]
        }
      ] */
    };
  },
  methods: {
    loading() {
      this.loading2 = true;
      setTimeout(() => {
        this.loading2 = false;
      }, 2000);
    },
    fullscreen() {
      const loading = this.$loading();
      setTimeout(() => {
        loading.close();
      }, 2000);
    },
    /*点击切换顶部菜单默认第一个的状态,并且获取数据*/
    removeBg(index, item) {
      let data = this.classification;
      /*修改选择状态*/
      for (let i = 0; i < data.length; i++) {
        if (i == index) {
          data[i].isCheck = true;
        } else {
          data[i].isCheck = false;
        }
      }
      /*获取二级菜单数据以及菜品数据*/
      this.getChildList(item);
    },
    getChildList(item) {
      if (item) {
        getCaiClassChild(item.id).then(res => {
          let data = res.data.data;
          this.leftCaiClass = data;
          /*初始化加载数据*/
          this.switchMenu(0, data[0]);
          console.log(data);
        });
      }
    },
    /**菜单切换方法*/
    switchMenu(index, item) {
      if(!item)
        return;
      /*二级菜单背景色class*/
      this.activeInd = index;
      let loading = this.$loading();
      getCaiClassChildDetail(item.id, this.limit, this.page).then(res => {
        let data = res.data.data;
        if (data.length == 0) {
          this.nodata = true;
          this.caiDetailList = [];
          return;
        }
        for (let item in data) {
          data[item].goods_photo = this.host + data[item].goods_photo;
          data[item].num = 0;
        }
        this.caiDetailList = data;

        console.log(data);
      });
      setTimeout(() => {
        loading.close();
      }, 300);
      //showList.push(menu[index]);
    },
    /*结算*/
    settlement() {
      AddCarShop(QS.stringify(this.alldata[0])).then(res=>{
        //设置导航购物车数量
        this.$store.commit('editCarnum', this.$store.state.count + this.alldata[0].goods_id.length);
      })
    },
    /*关闭弹窗*/
    closeJSDialog() {
      this.openJS = false;
    },

    /**获取默认显示的数据*/
    getMenuListOne() {
      let showList = this.showList;
      let data = this.menu[0].list;
      //console.log(data)
      for (let i = 0; i < data.length; i++) {
        showList.push(data[i]);
      }
      //console.log(showList);
      //showList.push(this.menu[0]);
      //console.log(showList);
    },
    /**减少数量值*/
    minus(item) {
      let amount = item.num;
      if (amount > 0) {
        item.num = amount - 1;
        this.carnum = this.carnum - 1;
        this.allPrice = this.allPrice - item.goods_price;
      } else {
        item.num = 0;
      }

      let alldata = this.alldata;
      let goods_ids = alldata[0].goods_id;
      let id = item.id;
      let indexs = 0 ;
      for(let ite in goods_ids){
        if(id == goods_ids[ite]){
          indexs = ite
        }
      }
      this.alldata[0].count.splice(indexs,1);
      this.alldata[0].goods_id.splice(indexs,1);
      this.alldata[0].single_price.splice(indexs,1);
      console.log('-----------------------------------------');
      
      console.log(this.alldata);
      
    },
    
      
    
    /**增加数量值*/
    plus(item) {
      let amount = item.num;
      item.num = amount + 1;
      this.carnum = this.carnum + 1;
      this.allPrice = this.allPrice + item.goods_price;

       
      let alldata = this.alldata;
      let sum_price = alldata[0].sum_price;
      this.alldata[0].goods_id.push(item.id);
      this.alldata[0].single_price.push(item.goods_price);
      this.alldata[0].count.push(1);//这里只能push=>1个数量
      this.alldata[0].sum_price = item.num*item.goods_price + sum_price;
      console.log('++++++++++++++++++++++++++++++++++++++++++++');
      
      console.log(this.alldata);
      
     /*  //下面是拆开单条的数据
      let obj = {
        'goods_id':[item.id],
        'single_price':[item.goods_price],
        'count':[1],
        'sum_price':item.num*item.goods_price
      }
      this.alldata.length = 0;
      this.alldata.push(obj)  */
     // console.log('========================');
     // console.log(this.alldata);
      
      
    },
    
    /*点击分类操作*/
    isopen() {
      this.open = !this.open; //控制菜单显示隐藏
      /*右边列表动画*/
      let homebox = document.getElementById("homelistbox");
      if (!this.open) {
        var i = 75;
        let plus = setInterval(function() {
          if (i < 100) {
            i += 1;
            homebox.style.width = i + "%";
          } else {
            clearInterval(plus);
            console.log("计时器已清除");
          }
        }, 10);
      } else {
        var i = 100;
        let minus = setInterval(function() {
          if (i > 75) {
            i -= 1;
            homebox.style.width = i + "%";
          } else {
            clearInterval(minus);
            console.log("计时器已清除");
          }
        }, 10);
      }
    },
    scroll() {
      /*this.scrollTop = window.scrollY;
  			console.log(this.scrollTop)
  			if(this.scrollTop >= 170){
		      document.querySelector('#ulbox').style.top = '0px';
		    }else{
		      document.querySelector('#ulbox').style.top = this.scrollTop+ 45 +'px';
		    }*/
    },
    /*左边菜单滚动到顶部固定不动*/
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      let bandSHeight = document.querySelector(".home_ban").offsetHeight + 10; //banner加搜索框的高
      //var offsetTop = document.querySelector('#scrollbox').offsetTop;
      if (scrollTop <= 170) {
        document.querySelector("#scrollbox").style.top =
          bandSHeight - scrollTop + "px";
      } else {
        document.querySelector("#scrollbox").style.top = "45px";
      }

      if (scrollTop < 160) {
        console.log(1 - scrollTop / 160);
        document.querySelector(".home_ban").style.opacity =
          1 - scrollTop / 16 / 10;
      }
    }
  },
  destroyed() {
    //window.removeEventListener('scroll', this.handleScroll)
  },
  computed: {
    ...mapState({
      // mapState相当于映射
      isbind: "isbind"
    })
  },
  mounted() {
    /*获取顶部菜单*/
    getCaiClassOne(this.limit, this.page).then(res => {
      let data = res.data.data.data;
      for (let item in data) {
        if (item == 0) data[item].isCheck = true;
        else data[item].isCheck = false;
      }
      this.classification = this.classification.concat(data);
      /*初始化二级默认菜单和菜品*/
      this.getChildList(this.classification[0]);
    });

    //this.getMenuListOne();
    /*this.scrollTop = window.scrollY;*/
    // window.addEventListener('scroll', this.handleScroll)
  }
};
</script>

<style scoped>
.mu-item-title {
  font-size: 12px;
  font-weight: bold;
  color: #333;
}
.li-active .mu-item-title {
  color: #f24c4c;
}
.home_main {
  padding-top: 0.9rem;
}
.container {
  padding: 0;
}
.listbox {
  height: 100%;
  overflow-y: scroll;
  padding-bottom: 2rem;
}
.mu-drawer {
  visibility: visible !important;
  overflow: visible;
  position: relative;
}
/* .li-active {
  background: #ededed;
} */
.mu-raised-button {
  width: 0.65rem;
  margin: 0 auto;
  height: 1rem;
}
.mu-elevation-16,
.mu-raised-button {
  box-shadow: none;
}
.mu-raised-button {
  line-height: 0.3rem !important;
  font-weight: bold;
}
.mu-primary-color {
  background: #ffdc4a !important;
  border-top-right-radius: 0.2rem;
  border-bottom-right-radius: 0.2rem;
}
#homelistbox {
  width: 75%;
  position: absolute;
  right: 0;
  top: 1.2rem;
  padding-left: 0.15rem;
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
/*#ulbox{position:fixed;background: #fff;max-height: 8rem;overflow-y: scroll;}*/
.mu-list {
  padding: 8px 0 0 0;
}
#homelistbox .mu-list {
  padding: 8px 0 0 0;
  margin-bottom: 1rem;
}
.mu-elevation-1 {
  box-shadow: none;
}
.clear {
  clear: both;
}
.mu-drawer {
  position: fixed;
  top: 2.12rem;
}
.tabboxs {
  width: 100%;
  overflow-x: scroll;
  padding: 0.15rem;
}
.tabboxs li {
  float: left;
}
.tabboxs li span {
  padding: 0.08rem 0.15rem;
}
.active {
  background: #f24c4c;
  border-radius: 0.5rem;
  color: #fff;
}

/*顶部导航滚动设置*/
.inc-scroll-landscape-container {
  position: fixed;
  z-index: 9;
  margin-top: 0.15rem;
  width: 100%;
  height: 0.87rem;
  overflow: hidden;
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
}
.inc-scroll-landscape-container > .inc-scroll-landscape-content {
  padding-bottom: 100px; /* 当内容宽度小于容器宽度时，会出现横向滚动条。将横向滚动条溢出至容器外，保证横向滚动条不可见 */
  white-space: nowrap;
  margin-right: 0.6rem;
  overflow: hidden;
  overflow-x: scroll; /* 1 */
  -webkit-backface-visibility: hidden;
  -webkit-perspective: 1000;
  -webkit-overflow-scrolling: touch; /* 2 */
  text-align: justify; /* 3 */
  /*   &::-webkit-scrollbar {
    display: none;
  } */
}
.inc-scroll-landscape-container > .inc-scroll-landscape-content ul {
  margin: 0.08rem;
}
.inc-scroll-landscape-container > .inc-scroll-landscape-content > ul > li {
  padding: 0 0.25rem;
  height: 0.6rem;
  line-height: 0.6rem;
  position: relative;
  display: inline-block;
  text-align: center;
  font-size: 12px;
  font-weight: bold;
}
/*.inc-scroll-landscape-container > .inc-scroll-landscape-content > ul > li.active:after { position: absolute;
	    right: 16px; bottom: 8px; left: 16px; height: 5px;
	    background-color: #DD524D; content: ' '; transform: scaleY(0.5); -webkit-transform: scaleY(0.5);}*/
.toptabbox {
  height: 1.24rem;
  position: fixed;
  background: whitesmoke;
  width: 100%;
  z-index: 8;
}

.toggledown {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  top: 0.18rem;
  height: 0.81rem;
  width: 0.8rem;
  background: #fff;
  z-index: 10;
  box-shadow: -1px 0px 1px -1px rgba(0, 0, 0, 0.5),
    0 0px 5px 0 rgba(0, 0, 0, 0.12);
}
.toggledown img {
  width: 0.25rem;
  height: 0.14rem;
}

.mu-transition-row {
  position: absolute;
  width: 100%;
  z-index: 10;
  background: #fff;
  top: 1.01rem;
}
.mu-transition-row li {
  float: left;
  padding: 0.05rem 0.25rem;
  margin: 0.1rem;
}
.demo-chip-wrapper {
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
}
.mu-chip:hover {
  background-color: #f44336;
  color: #fff;
}
.mu-transition-box {
  width: 100%;
  height: auto;
  margin-right: 16px;
  border-radius: 4px;
  padding: 0 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mu-chip {
  margin: 0.1rem;
}

.nodata {
  padding: 20px 0;
  font-size: 12px;
}

.huise{background: #bbb !important;}

.addToCar{position: fixed;bottom: 1rem;width: 100%;z-index: 2;}
	.pricecarbox{width: 67%; background:#fff;left: 0; position: absolute;height: 100%;}
	.pricecarbox>div{line-height: 32px;text-align: right;padding-right: 0.3rem;font-weight: bold;font-size: 0.32rem;}
	.carprice{position: absolute;left: 0.8rem;font-size: 0.26rem !important;color: #666;}
	.settlement{position: absolute;right: 0px;background: #f24c4c;width: 33%;height: 45px;line-height: 45px;color: #fff;}
	.carlistbox{padding: 0.15rem 0.3rem !important;}
	.carlistbox>ul{overflow: hidden;}
	.carimgbox img{width: 0.47rem;height: 0.47rem;}
	.addToCar .mu-list{overflow: initial;}
	.carimgbox{width: 1rem;height: 1rem;background: #fff;border-radius: 100%;margin-top: -15px;display: flex;align-items: center;justify-content: center;box-shadow: 0px 1px 1px rgba(0, 0, 0, .2);}
	.carnum{    position: absolute;
    top: -0.1rem;
    left: 0.5rem;
    color: #fff;
    background: red;
    line-height: 0.25rem;
    border-radius: 0.2rem;
    min-width: 0.25rem;
    height: 0.25rem;
    padding: 0 5px;
    text-align: center;	}
    .qigou{position: absolute;right: 0.3rem;bottom: -0.36rem;font-size: 0.22rem;color: #999;}
    .opentab{width: 100%;background: #fff;border-bottom: 1px solid #e0e0e0;padding: 0.1rem;}

/*.opentab .toptab:not(:first-child){
    	background: #f0f0f0;
    	border-radius: 0.5rem;
    }*/
</style>