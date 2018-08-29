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
      	<!-- <mu-load-more :loading="loading" @load="load"> -->
      <div id="homelistbox">
      <mu-container data-mu-loading-color="secondary" data-mu-loading-overlay-color="rgba(0, 0, 0, .7)" v-loading="loading2" class="demo-loading-wrap">
        <mu-paper :z-depth="1" class="demo-list-wrap" id="rightbox">
          <mu-list textline="three-line" v-if="caiDetailList.length != 0">
              <div v-for="(item,index) in caiDetailList" :key="index" class="li-box" v-if="caiDetailList.length > 0">
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
                                <span v-if="item.type == 1" style="font-size: .28rem;">{{item.price}}</span>
                                <span v-if="item.type == 2" style="font-size: .28rem;">{{item.specifications[0].price}}</span>
                            </div>
                            </div>
                        </mu-list-item-sub-title>
                        </mu-list-item-content>
                    </mu-list-item>
                    </router-link>
                    <mu-divider></mu-divider>
                    <div style="position: absolute;right: .2rem;top: 1rem;">
                    <div class="saoma">
                        <div v-if="item.type == 1">
                        <span class="minus" @click="minus(item)" v-if="item.num != 0"><img src="../../../static/img/ic_jian.png" alt=""></span>
                        <span v-show="item.num != 0">{{item.num}}</span>
                        <span class="plus" @click="plus(item)"><img src="../../../static/img/ic_jia.png" alt=""></span>
                        </div>
                        <div v-if="item.type == 2">
                        <span class="mpsytl" @click="typeo2show(item , 1)" v-if="!item.show"><img src="../../../static/img/often/down.png" style="width:.5rem;height:.5rem;"/></span>
                        <span class="mpsytl" @click="typeo2show(item, 2)" v-if="item.show"><img src="../../../static/img/often/up.png"  style="width:.5rem;height:.5rem;"/></span>
                        </div>
                    </div>
                    </div>

                    <mu-expand-transition>
                    <div class="type2list" v-show="item.type == 2 && item.show">
                        <!--下拉的重量列表-->
                        <mu-list textline="two-line">
                        <mu-list-item avatar button :ripple="false" v-for="(ite , ind) in item.specifications" :key="ind">
                            <mu-list-item-content>
                            <mu-list-item-title>{{ite.specification*2}}斤装</mu-list-item-title>
                            <mu-list-item-sub-title style="color:red;">￥{{ite.price}}</mu-list-item-sub-title>
                            </mu-list-item-content>
                            <mu-list-item-action>
                            <div class="saoma" style="margin-right:1px;">
                                <div>
                                <span class="minus" @click="minus(item,ite)" v-if="ite.num != 0" :data-index="ind"><img src="../../../static/img/ic_jian.png" style="width:.5rem;height:.5rem" alt=""></span>
                                <span v-show="ite.num != 0">{{ite.num}}</span>
                                <span class="plus" @click="plus(item,ite)" :data-index="ind"><img src="../../../static/img/ic_jia.png" style="width:.5rem;height:.5rem" alt=""></span>
                                </div>
                            </div>
                            </mu-list-item-action>
                        </mu-list-item>
                        </mu-list>
                    </div>
                    </mu-expand-transition>
                </div>
          </mu-list>
          <p v-else class="nodata">暂时没有商品哦</p>
          <div id="realheight"></div>
        </mu-paper>
      </mu-container>
      </div>
      	<!-- </mu-load-more> -->
    </div>

  </div>
</template>

<script>
import { mapState } from "vuex";
import QS from "qs";
import { jiancar, setOfenBuyData } from "../../common/common.js";
import {
  AddCarShop,
  getCaiClassOne,
  getCaiClassChild,
  getCaiClassChildDetail
} from "../../http/http.js";

export default {
  data() {
    return {
      host: this.$store.state.host,
      onerrorimg:this.$store.state.onerrorimg,
      page: 1,
      limit: 99, //当前页面分页条数
      docked: true, //是否显示遮罩
      open: true, //默认菜单栏显示
      initdata: true, //初始化菜单
      carnum: 0,//分类底部小车数量
      loading2: false,
      loading: false,
      page:1,
      isSwitch:true,//用于防止快速点击顶部菜单出现数据错误问题
      qigou:this.$store.state.qigou,//起购价
      alldata:[{
        goods_id:[],
        single_price:[],
        count:[],
        sum_price:0,
        specification_id: []
      } ],//分类底部购物车数据
      allPrice: 0,
      openJS: false, //结算弹窗
      position: "left", //菜单显示位置
      amount: 0, //数量
      itemid:null,//右边菜单加载更多参数
      activeInd: 0, //左边菜单选中背景class数组索引
      leftCaiClass: [], //左边菜单数据
      caiDetailList: [], //右边菜品数据
      nodata: false, //没有数据提示
      showList: [], //默认显示的数据
      searchBarFixed: false,
      show: false,
      scrollTop: 0,
      classification: []
    };
  },
  activated(){
    this.classification = []
     /*获取顶部菜单*/
     this.$store.commit("setLoad",true);
    getCaiClassOne(this.limit, this.page).then(res => {
     
      
      let data = res.data.data.data;
      for (let item in data) {
        if (item == 0) data[item].isCheck = true;
        else data[item].isCheck = false;
      }
      this.classification = this.classification.concat(data);
      /*初始化二级默认菜单和菜品*/
      this.getChildList(this.classification[0]);
      this.$store.commit("setLoad",false);
    });
  },
   mounted() {

    //初始化右边商品高度
    let rightbox = document.getElementById('rightbox');
    let h = document.documentElement.clientHeight || document.body.clientHeight;
    rightbox.style.height = h - 150+'px';
  },
  methods: {
    loadingg () {
      this.loading2 = true;
      setTimeout(() => {
        this.loading2 = false;
      }, 2000)
    },
    /**点击底部购物车图标到购物车*/
    goShopCar(){
      this.$router.push('/car')
    },
     /*滚动到底部加载更多*/
    load() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.getCaiClassChildDetail(this.itemid)
        //this.list.push(this.list[0]);
        console.log("成功添加一条数据");
        //this.num += 10;
      }, 1000);
    },
    /*点击切换顶部菜单默认第一个的状态,并且获取数据*/
    removeBg(index, item) {
      if(!this.isSwitch){
        //this.$store.commit('setShowText','网络拥堵...');
        //this.$store.commit('seterror');
        return;
      }
      if(this.isSwitch){
        this.isSwitch = false
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
      }
      
    },
    getChildList(item) {
      if (item) {
        getCaiClassChild(item.id).then(res => {
          let data = res.data.data;
          this.leftCaiClass = data;
          /*初始化加载数据*/
          this.switchMenu(0, data[0]);
          //console.log(data);
        });
      }
    },
    /**菜单切换方法*/
    switchMenu(index, item) {
      
      if(!item){
        this.isSwitch = true
        return;
      }
      /*二级菜单背景色class*/
      this.activeInd = index;
      //let loading = this.$loading();
      this.loading2 = true
      this.itemid = item.id
      //this.getCaiClassChildDetail(item.id)
       getCaiClassChildDetail(item.id, this.limit, this.page).then(res => {
        let data = res.data.data.data;
        this.isSwitch = true
        if (data.length == 0) {
          this.nodata = true;
          this.caiDetailList = [];
          this.loading2 = false
          return;
        }
        for (let ite in data) {
          if (data[ite].hasOwnProperty("specifications")) {
            data[ite].type = 2;
            let secdata = data[ite].specifications;
            for (let i in secdata) {
              secdata[i].num = 0;
            }
          } else {
            data[ite].type = 1;
          }
          data[ite].goods_photo = this.host + data[ite].goods_photo;
          data[ite].num = 0;
          data[ite].show = false;
        }
        this.caiDetailList = data;
        this.loading2 = false
        this.isSwitch = true
        //console.log(data);
      });
     /*  setTimeout(() => {
        loading.close();
      }, 300); */
      //showList.push(menu[index]);
    },
    /**获取右侧数据*/
    getCaiClassChildDetail(id){
      
       getCaiClassChildDetail(id, this.limit, this.page).then(res => {
        let data = res.data.data;
        console.log('data');
        
        console.log(data);
        
        if (data.data.length == 0) {
          this.nodata = true;
          this.caiDetailList = [];
          return;
        }
        
        let secdatas = data.data
        for (let item in secdatas) {
          if (secdatas[item].hasOwnProperty("specifications")) {
            secdatas[item].type = 2;
            let secdata = secdatas[item].specifications;
            for (let i in secdata) {
              secdata[i].num = 0;
            }
          } else {
            secdatas[item].type = 1;
          }
          data[item].goods_photo = this.host + data[item].goods_photo;
          data[item].num = 0;
          data[item].show = false;
        }
        this.caiDetailList = this.caiDetailList.concat(data)
        //this.caiDetailList = [this.caiDetailList,...data];
        this.loading2 = false
        this.page = this.page + 1
        
      });
    },
    /*结算*/
    settlement() {
      AddCarShop(QS.stringify(this.alldata[0])).then(res=>{
        this.$store.commit('setShowText',this.$store.state.addcar);
        this.$store.commit('showInfo');

        //设置导航购物车数量
        this.$store.commit('editCarnum', this.$store.state.count + this.alldata[0].goods_id.length);
        this.$router.push('/car')
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
     /*切换显示重量选择*/
    typeo2show(item, ind) {
      if (ind == 1) item.show = true;
      else item.show = false;
    },
    /*减少数量值*/
    minus(item, ite) {
      console.log("减少购物车");
      this.carnum = this.carnum - 1
      this.allPrice = this.allPrice - item.price
      jiancar(item, ite);
    },
    /*增加数量值*/
    plus(item, ite) {
      let isbind = localStorage.isbind;
      if (isbind != 1) {
        this.openwins = true;
      } else {
        this.carnum = this.carnum + 1
        this.allPrice = this.allPrice + item.price
        setOfenBuyData(item, this.alldata, ite);
      }
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
  }
 
};
</script>

<style scoped>
.demo-loading-wrap {
  height: 100%;
  width: 100%;
}

.mu-item-title {
  font-size: 12px;
  font-weight: bold;
  color: #333;
}
.li-active .mu-item-title {
  color: #f24c4c;
  text-align: center;
  margin-left: -20px;
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
  top: 1.1rem;
  padding-left: 0.15rem;
}
.li-box {
  position: relative;
}
.saoma {
  float: right;
  padding: 0;
  border-radius: 0.2rem;
  margin-right: 0;
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
/*#ulbox{position:fixed;background: #fff;max-height: 8rem;overflow-y: scroll;}*/
.mu-list {
  padding: 0px 0 0 0;
}
#homelistbox .mu-list {
  padding: 8px 0 0 0;
  background: #fff;
}
.mu-elevation-1 {
  box-shadow: none;
}
.clear {
  clear: both;
}
.mu-drawer {
  position: fixed;
  top: 1.94rem;
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
  box-shadow: 0px 1px 5px #f24c4c;
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
  height: 100%; /* 当内容宽度小于容器宽度时，会出现横向滚动条。将横向滚动条溢出至容器外，保证横向滚动条不可见 */
  white-space: nowrap;
  padding-bottom: 100px;
  margin-right: .9rem;
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
  margin: 0.12rem .08rem 0 .08rem;
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
  height: 1rem;
  position: fixed;
  background: whitesmoke;
  width: 100%;
  z-index: 2;
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


#scrollbox .mu-item{height: 38px;}
.type2list .mu-item-content {
  max-width: 85% !important;
}
.type2list li {
  padding: 0;
}
.saoma img {
  width: 0.6rem;
  height: 0.6rem;
}
.saoma > div {
  display: flex;
}
#homelistbox .mu-list{overflow-y: hidden !important}
/*.opentab .toptab:not(:first-child){
    	background: #f0f0f0;
    	border-radius: 0.5rem;
    }*/
</style>