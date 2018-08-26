<template>
  <div class="container">
    <template v-if="list.length != 0">
      <!--<div class="topgrid">
				<mu-grid-list class="gridlist-demo sptop" :cols="3">
					<mu-grid-tile v-for="tile, index in product" :key="index">
						<span slot="title">{{tile.title}}</span>
						<span slot="subTitle">{{tile.author}}</b></span>
					</mu-grid-tile>
				</mu-grid-list>
			</div>-->
      <div class="carlistbox">
        <mu-load-more :loading="loading" @load="load">
          <ul style="padding-bottom: 2rem;">
            <li class="list-item " v-for="(item,index) in list" :key="index" data-type="0">
              <!--<div class="list-box" @touchstart.capture="touchStart" @touchend.capture="touchEnd" @click="skip">-->
              <div class="list-box" @touchstart.capture="touchStart" @touchend.capture="touchEnd" :data-index='index'>
                <div :class="item.isslid ? 'list-content isslid' : 'list-content'">

                  <mu-paper :z-depth="1" class="demo-list-wrap">
                    <mu-list textline="three-line">
                      <div class="li-box">
                        <mu-list-item avatar :ripple="false" button>
                          <img :src="　item.checks ? radioF : radioT " class="radioimg" @click="checkRadio(item)" />
                          <mu-list-item-action>
                            <mu-avatar style="width: 1.4rem;height: 1.4rem;">
                              <img :src="item.goods_photo" :onerror="onerrorimg">
                            </mu-avatar>
                          </mu-list-item-action>
                          <mu-list-item-content>
                            <mu-list-item-title>{{item.goods_title}}</mu-list-item-title>
                            <span style="color: #a9a9a9;font-size: .2rem;padding-left:.2rem;" v-show="isbind">{{item.specification*2}}斤</span>
                            <mu-list-item-sub-title>
                              <div>
                                <span v-show="!isbind" style="color: #a9a9a9;">绑定手机号才能查看价格</span>
                                <div v-show="isbind" style="color: red;">
                                  ￥
                                  <span style="font-size: .38rem;">{{item.sum_price}}</span>
                                  <!-- <span style="color: #ccc;text-decoration: line-through;">￥{{item.goods_original_price}}</span> -->
                                </div>
                              </div>
                            </mu-list-item-sub-title>
                          </mu-list-item-content>
                        </mu-list-item>
                        <div style="position: absolute;right: .2rem;bottom: .34rem;" v-show="isbind">
                          <div class="saoma">
                            <!-- <span class="minus mpsytl" @click="minus(item)" v-if="item.num != 0">-</span>
                            <span class="mpnum">{{item.num}}</span>
                            <span class="plus mpsytl" @click="plus(item)">+</span> -->
                            <span class="minus mpsytl" @click="minus(item,index)" v-if="item.count != 0"><img src="../../../static/img/ic_jian.png" alt="" style="width:25px;height:25px;"></span>
                            <span v-if="item.count != 0" class="mpnum">{{item.count}}</span>
                            <span class="plus mpsytl" @click="plus(item,index)"><img src="../../../static/img/ic_jia.png" alt="" style="width:25px;height:25px;"></span>
                          </div>
                        </div>
                      </div>
                    </mu-list>
                  </mu-paper>

                </div>
              </div>
              <div class="delete" @click="deleteItem" :data-index='index'>删除</div>
            </li>
            <p v-show="nomore">没有数据了</p>
          </ul>
        </mu-load-more>
      </div>

      <div class="addToCar">
        <mu-list class="carbut">
          <mu-list-item avatar button :ripple="false">
            <div class="pricecarbox">
              <div class="carprice" @click="checkAllMeth" style="display:flex;align-items:center;">
                <img :src="checkAll ? radioF : radioT " class="radioimg" style="margin-right:5px;"/> 全选
              </div>
              <!--<div>合计：<span style="color: red;">￥{{allPrice}}</span></div>-->
              <div style="position: relative;">合计：
                <span style="color: red;" v-show="isbind">￥{{allPrice}}</span>
                <span class="qigou">{{qigou}}元起购</span>
              </div>
            </div>
            <div :class="allPrice < qigou ? 'huise settlement': 'settlement'" @click="settlement">
              结算（{{checkNum}}）
            </div>
          </mu-list-item>
        </mu-list>
        <mu-dialog title="温馨提示" width="360" :open.sync="openJS">
          <span class="cancelbox" @click="closeJSDialog"><img src="../../../static/img/ic_Shut .png" /></span>
          你还没有选中商品<br>还不能去结算
          <mu-button slot="actions" flat color="primary" @click="closeJSDialog">确定</mu-button>
        </mu-dialog>
      </div>
    </template>

    <div v-else style="position: absolute;left: 50%;top: 50%;margin-top: -97.5px;margin-left: -96px;">
      <img src="../../../static/img/car/img_konggouwuche.png" style="width: 3.9rem;height: 3.3rem;" />
      <p style="color: #999;">购物车还没有商品呦</p>
    </div>
<mu-dialog title="温馨提示" width="360" :open.sync="openwins">
        <span class="cancelbox" @click="cancel"><img src="../../../static/img/ic_Shut .png" /></span>
        绑定手机才可以下单呦~<br />
        <mu-button slot="actions" flat color="primary" @click="sure">确定</mu-button>
        <mu-button slot="actions" flat color="secondary" @click="cancel">取消</mu-button>
      </mu-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  getCarList,
  getProductInfos,
  DeleCarShop,
  EditCarShop
} from "../../http/http.js";
import QS from "qs";

export default {
  name: "index",
  data() {
    return {
      host: this.$store.state.host,
      page: 1,
      limit: 10, //当前页面分页条数
      qigou:this.$store.state.qigou,//起购价
      onerrorimg:this.$store.state.onerrorimg,
      loading: false,
      openwins:false,
      lastinde:0,
      radioF: require("../../../static/img/car/ic_xuanzhong.png"), //选中图片
      radioT: require("../../../static/img/car/ic_weixuan.png"), //未选图片
      openJS: false, //结算弹窗
      checkAll: false, //全选（默认不选）
      allPrice: 0, //总价
      checkNum: 0, //选中的条数
      checkslist:0,
      nomore: false, //没有更多显示
      list: [
        /*  {
          id: 1,
          img: require("../../../static/img/1-0_03.png"), //图片
          title: "算哈哈是111", //标题
          num: 1, //数量
          price: 20, //单价
          oldPrice: 50, //旧的价格
          inventory: 5, //库存
          checks: false
        }, */
      ], //默认显示的数据
      startX: 0,
      endX: 0
    };
  },
  computed: {
    ...mapState({
      // mapState相当于映射
      isbind: "isbind"
    })
  },
  activated(){
    this.checkAll =false;
    this.checkNum = 0;
    this.allPrice = 0;
    this.list = [] 

    //this.$store.commit("setLoad",true);


     //let loadings = this.$loading();
     this.getCarList(this.limit, 1);
     // this.$store.commit("setLoad",false);
  },
    watch: {
      checkslist(a,b){
        if(a == 0){
          this.checkslist = 0
        }
        if(a == this.list.length){
          this.checkAll = true
        }else{
          this.checkAll = false
        }
      }
    },
  mounted() {
   /*  this.$store.commit("setLoad",true);
     //let loadings = this.$loading();
     this.getCarList(this.limit, this.page).then(res => {
      this.list = [...this.list, ...res];
      this.getCarNum(this.list);
      this.$store.commit("setLoad",false);
    }); */
     /* setTimeout(()=>{
        if(loadings)
          loadings.close();
      },300); */
  },
  methods: {
    /**获取购物车数据*/
    getCarList(limit, page) {
      getCarList(limit, page).then(res => {
        this.page = page + 1;
        
        let data = res.data.shopInfo.data;
        for(let item in data){
          data[item].goods_photo = this.host + data[item].goods_photo;
          data[item].isslid = false;
        }
        console.log('返回的购物车list');
        console.log(data);
        this.list = [...this.list, ...data];
        this.getCarNum(this.list);

      });

     /*let listval = [];
      let ids = [];
      let carids = []; //购物车id
      let counts = []; //购物车商品个数
      //let carnum = 0; //购物车数量
      //lists购物车订单数组
      if (lists.length > 0) {
        for (let item in lists) {
          let id = lists[item].goods_id;
          let carid = lists[item].id;
          let count = lists[item].count;
          ids.push(id);
          carids.push(carid);
          counts.push(count);
          //carnum +=parseInt(count);
        }
        //设置导航购物车数量
        //this.$store.commit("editCarnum", carnum);
        await getProductInfos(JSON.stringify({ id: ids })).then(res => {
          //商品详情数组
          listval = res.data.data;
          for (const item in listval) {
            listval[item].goods_photo = this.host + listval[item].goods_photo;
            listval[item].carid = carids[item]; //将购物车id添加到商品信息里面，删除购物车需要
            listval[item].num = counts[item]; //将购物车id添加到商品信息里面，删除购物车需要
            listval[item].checks = false;
            listval[item].isslid = false;
          }
        });
      } 
      return listval;*/
    },

    /**滚动到底部加载更多*/
    load() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.getCarList(this.limit, this.page);
       /*  if (!this.nomore) {
          this.getCarList(this.limit, this.page).then(res => {
            let data = res.data.shopInfo.data
            if (data.length > 0) {
              this.list = [...this.list, ...data];
              this.getCarNum(this.list);
              //console.log('****************************');
              //console.log(this.list);
            } else {
              this.nomore = true;
            }
          });
        } */
        //this.getCarList(this.limit,this.page);
        // console.log("成功数据");
        //this.num += 10;
      }, 1000);
    },

    /**获取设置购物车数量*/
    getCarNum(obj){
      let carnum = 0;
      for (let item in obj) {
        carnum += parseInt(obj[item].count);
      }
      //设置导航购物车数量
      this.$store.commit("editCarnum", carnum);
    },

    /**拆分购物车双条数据*/
    sliceData(objJson) {
      let newArrays = [];
      for (let items in objJson) {
        let obj = objJson[items];
        let lenth = 0;
        let keyArray = [];
        for (let item in obj) {
          keyArray.push(item);
          if (obj[item] instanceof Array) {
            lenth = obj[item].length;
          }
        }
        for (let i = 0; i < lenth; i++) {
          let valueArray = [];
          for (let j in obj) {
            obj[j] instanceof Array
              ? valueArray.push(obj[j][i])
              : valueArray.push(obj[j]);
          }
          let newjson = {};
          for (let item in keyArray) {
            newjson[keyArray[item]] = valueArray[item];
          }
          newArrays.push(newjson);
        }
      }
      //console.log('00000000000000000000');
      // console.log(newArrays);

      // console.log(newArrays.length);
      // this.getProductInfo(newArrays);
      return newArrays;
    },

    /**单选按钮*/
    checkRadio(item) {
      item.checks = !item.checks;
      console.log(item.checks);
      
      if(item.checks){
        this.checkslist = this.checkslist + 1
      }else{
        this.checkslist = this.checkslist - 1
      }
      console.log(this.checkslist);
      
      this.getAllPrice(this.list);
    },

    /**全选*/
    checkAllMeth() {
      let checkAll = this.checkAll;

      this.checkAll = !this.checkAll;
      console.log(this.checkAll);

      let list = this.list;
      /*let allprice = 0;*/
      for (let i = 0; i < list.length; i++) {
        list[i].checks = !checkAll;
        /*if(list[i].checks){
						allprice += list[i].price;
					}*/
      }
      this.getAllPrice(list);
      /*this.allPrice = allprice*/
    },

    /**计算选中的总价*/
    getAllPrice(data) {
      let allprice = 0;
      let checkNum = 0;
      for (let i = 0; i < data.length; i++) {
        if (data[i].checks) {
          allprice += parseFloat(data[i].single_price) * parseInt(data[i].count);
          checkNum += parseInt(data[i].count);
        }
      }

      if (allprice == 0) {
        //如果点击单条全部记录取消选中后将全选修改未选中状态
        this.checkAll = false;
      }
      //console.log(allprice)
      this.checkNum = checkNum;
      this.allPrice = allprice;
    },

    /**减少数量值*/
    minus(item,index) {
      if(item.count == 1){
        return;
      }
      this.$store.commit("editCarnum", this.$store.state.count - 1);
      let amount = parseInt(item.count);
      let list = this.list;
      if (amount > 0) {
        item.count = amount - 1;
      } else {
        item.count = 0;
      }
      this.getAllPrice(list);
      this.eidtCar(item, 0,index);
    },

    /**增加数量值*/
    plus(item,index) {
      let isbind = sessionStorage.isbind
      if(isbind != 1){
        this.openwins = true
      }else{
        this.$store.commit("editCarnum", this.$store.state.count + 1);
        let amount = parseInt(item.count);
        let list = this.list;
        item.count = amount + 1;
        this.getAllPrice(list);
        this.eidtCar(item, 1,index);
      }
    },

    /**编辑购物车数量*/
    eidtCar(item, minusOrPlus,index) {
      //alert(item.count);
      //商品data
      let data = {
        specification_id:item.specification_id,
        goods_id: item.goods_id,
        single_price: item.single_price,
        count: item.count,
        isadd:minusOrPlus
      };
      EditCarShop(item.id, QS.stringify(data)).then(res => {
        //减少购物车商品数量到0删除订单
        if(item.count == 0){
          this.list.splice(index,1)
        } 
        this.$store.commit('setShowText',this.$store.state.addcar);
        this.$store.commit('showInfo');
        //设置导航购物车数量(成功之后在设置，但是在界面上显示有延迟)
        /* this.$store.commit(
          "editCarnum",
          minusOrPlus == 0
            ? this.$store.state.count - 1
            : this.$store.state.count + 1
        ); */
      });
    },

    /**结算*/
    settlement() {
      //用选中商品总价判断是否选择商品
      if (!this.allPrice > 0) {
        //打开弹窗
        this.openJS = true;
      } else {
        //过滤选择商品
        let data = this.list;
        let datas = [];
         console.log(2222222222222222222222222);
        for(let item in data){
          if(data[item].checks){
            datas.push(data[item]);
          }
        }
        console.log(11111111111111111111111111111);
        
        this.$router.replace({ path: "/order" ,query:{list:JSON.stringify(datas)}});
      }
    },
    
    //删除
    deleteItem(e) {
      let index = e.currentTarget.dataset.index;
      this.restSlide();
      let item = this.list[index];
      this.list.splice(index, 1);
      //console.log(item);
      DeleCarShop(item.id).then(res => {});
      this.getCarNum(this.list);
    },

    /**关闭弹窗*/
    closeJSDialog() {
      this.openJS = false;
    },

    //跳转
    skip() {
      if (this.checkSlide()) {
        this.restSlide();
      } else {
        alert("You click the slide!");
      }
    },

    //滑动开始
    touchStart(e) {
      this.startX = e.touches[0].clientX;
      let index = e.currentTarget.dataset.index;
      if(this.list[this.lastinde]){
        this.list[this.lastinde].isslid = false;
      }
      this.lastinde = index;
    },

    //滑动结束
    touchEnd(e) {
      let parentElement = e.currentTarget.parentElement;
      this.endX = e.changedTouches[0].clientX;
      

      if (parentElement.dataset.type == 0 && this.startX - this.endX > 30) {
        this.restSlide();
        this.list[this.lastinde].isslid = true;
        parentElement.dataset.type = 1;

        
      }

      if (parentElement.dataset.type == 1 && this.startX - this.endX < -30) {
        this.restSlide();
        this.list[this.lastinde].isslid = false;
        parentElement.dataset.type = 0;

       
        
        
      }
      
      this.startX = 0;
      this.endX = 0;
    },

    //判断当前是否有滑块处于滑动状态
    checkSlide() {
      let listItems = document.querySelectorAll(".list-item");

      for (let i = 0; i < listItems.length; i++) {
        if (listItems[i].dataset.type == 1) {
          return true;
        }
      }
      return false;
    },

    //一次只能滑动一个
    restSlide() {
      let listItems = document.querySelectorAll(".list-item");
      //alert(this.lastinde);
      /* this.list[this.lastinde].isslid = false; */
      for (let i = 0; i < listItems.length; i++) {
        listItems[i].dataset.type = 0;
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
.container {
  padding: 0;
  margin: 0;
  height: 100%;
  overflow-y: scroll;
}
/* .carlistbox,
.carlistbox ul {
} */
.carlistbox > ul {
  padding-bottom: 3rem;
}
.mu-grid-tile-wrapper {
  height: 50px !important;
}
.page-title {
  text-align: center;
  font-size: 17px;
  padding: 10px 15px;
  position: relative;
}

.mu-grid-tile-subtitle span {
  text-align: left;
  display: block;
  font-size: .26rem;
  color: #666;
}

.page-title:after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #ccc;
  color: #ccc;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(.5);
  transform: scaleY(.5);
  z-index: 2;
}

.list-item {
  position: relative;
  -webkit-transition: all .2s;
  transition: all .2s;
}

.list-item[data-type="0"] {
  transform: translate3d(0, 0, 0);
}

.list-item[data-type="1"] {
  transform: translate3d(-1.15rem, 0, 0);
}

.list-item:after {
  content: " ";
  position: absolute;
  left: .2rem;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #ccc;
  color: #ccc;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(.5);
  transform: scaleY(.5);
  z-index: 2;
}

.list-box {
  display: flex;
  align-items: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  justify-content: flex-end;
  font-size: 0;
}

.list-item .list-img {
  display: block;
  width: 1rem;
  height: 1rem;
}

.list-item .list-content {
  padding: 0 0 .1rem 0;
  position: relative;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
  border-radius: 6px;
}

.list-item  .isslid{
  padding: 0 0 .1rem 0;
  position: relative;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
  border-radius:initial; 
}

.list-item .title {
  display: block;
  color: #333;
  text-align: left;
  overflow: hidden;
  font-size: .26rem;
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.list-item .tips {
  display: block;
  overflow: hidden;
  font-size: 12px;
  color: #999;
  line-height: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.list-item .time {
  display: block;
  font-size: 12px;
  position: absolute;
  right: 0;
  top: .1rem;
  color: #666;
}

.list-item .delete {
  width: 1.1rem;
  height:1.7rem;
  background: #ff4949;
  font-size: 17px;
  color: #fff;
  text-align: center;
  line-height: 1.7rem;
  position: absolute;
  top: 0;
  right: -1.1rem;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}

.topgrid .mu-grid-tile-subtitle span {
  text-align: center;
  color: #f95151;
}
.mu-elevation-1 {
  box-shadow: none;
}
.container > ul {
  overflow: hidden !important;
}
.list-item {
  margin-top: .1rem;
}

.mpnum {
  font-size: .3rem;
}
.mu-item-sub-title,
.mu-item-title {
  padding-left: .2rem;
}
.carMbox .mu-avatar img {
  border-radius: .2rem;
}

.radioimg {
  width: .3rem;
  height: .3rem;
}
.mu-load-more .radioimg {
  margin-top: 0px
}
.mu-item-action {
  padding-left: 5px;
}

.addToCar {
  position: fixed;
  bottom: .84rem;
  width: 100%;
}
.pricecarbox {
  width: 67%;
  background: #fff;
  left: 0;
  position: absolute;
  height: 100%;
}
.pricecarbox div {
  text-align: right;
  padding-right: .3rem;
  font-weight: bold;
  font-size: .32rem;
}
.pricecarbox div:first-child {
  line-height: 45px;
}
.pricecarbox div:last-child {
  line-height: 32px;
}
.carprice {
  position: absolute;
  left: .5rem;
  font-size: .26rem !important;
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
  padding: .15rem .3rem !important;
}
.carlistbox > ul {
  overflow-x: hidden;
}
.qigou {
  position: absolute;
  right: .3rem;
  bottom: -.36rem;
  font-size: .22rem;
  color: #999;
}
</style>