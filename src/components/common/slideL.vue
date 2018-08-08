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
              <div class="list-box" @touchstart.capture="touchStart" @touchend.capture="touchEnd">
                <div class="list-content">

                  <mu-paper :z-depth="1" class="demo-list-wrap">
                    <mu-list textline="three-line">
                      <div class="li-box">
                        <mu-list-item avatar :ripple="false" button>
                          <img :src="　item.checks ? radioF : radioT " class="radioimg" @click="checkRadio(item)" />
                          <mu-list-item-action>
                            <mu-avatar style="width: 1.4rem;height: 1.4rem;">
                              <img :src="item.img">
                            </mu-avatar>
                          </mu-list-item-action>
                          <mu-list-item-content>
                            <mu-list-item-title>{{item.single_price}}</mu-list-item-title>
                            <mu-list-item-sub-title>
                              <span style="color: #a9a9a9;font-size: 0.2rem;">库存{{item.single_price}}件</span>
                              <div>
                                <span v-show="!isbind" style="color: #a9a9a9;">绑定手机号才能查看价格</span>
                                <div v-show="isbind" style="color: red;">
                                  ￥
                                  <span style="font-size: 0.5rem;">{{item.single_price}}</span>
                                  <!-- <span style="color: #ccc;text-decoration: line-through;">￥{{item.single_price}}</span> -->
                                </div>
                              </div>
                            </mu-list-item-sub-title>
                          </mu-list-item-content>
                        </mu-list-item>
                        <div style="position: absolute;right: 0.2rem;bottom: 0.34rem;" v-show="isbind">
                          <div class="saoma">
                            <span class="minus mpsytl" @click="minus(item)" v-if="item.count != 0">-</span>
                            <span class="mpnum">{{item.count}}</span>
                            <span class="plus mpsytl" @click="plus(item)">+</span>
                          </div>
                        </div>
                      </div>
                    </mu-list>
                  </mu-paper>

                </div>
              </div>
              <div class="delete" @click="deleteItem">删除</div>
            </li>
          </ul>
        </mu-load-more>
      </div>

      <div class="addToCar">
        <mu-list class="carbut">
          <mu-list-item avatar button :ripple="false">
            <div class="pricecarbox">
              <div class="carprice">
                <img :src="checkAll ? radioF : radioT " class="radioimg" @click="checkAllMeth" /> 全选
              </div>
              <!--<div>合计：<span style="color: red;">￥{{allPrice}}</span></div>-->
              <div style="position: relative;">合计：
                <span style="color: red;">￥{{allPrice}}</span>
                <span class="qigou">满300减20</span>
              </div>
            </div>
            <div class="settlement" @click="settlement">
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

  </div>
</template>

<script>
import { mapState } from "vuex";
import { getCarList , getProductInfo } from "../../http/http.js";


export default {
  name: "index",
  data() {
    return {
      host: this.$store.state.host,
      page: 1,
      limit: 15, //当前页面分页条数
      loading: false,
      radioF: require("../../../static/img/car/ic_xuanzhong.png"), //选中图片
      radioT: require("../../../static/img/car/ic_weixuan.png"), //未选图片
      openJS: false, //结算弹窗
      checkAll: false, //全选（默认不选）
      allPrice: 0, //总价
      checkNum: 0, //选中的条数
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
  mounted() {
    //this.getCarList();
    //this.getMenuListOne();
    this.getCarList(1);
  },
  methods: {
    /*获取购物车列表*/
    getCarList(page) {
       getCarList(this.limit,page).then(res => {
          this.page = page + 1;
          let data = res.data.data.data;
          let list = [];
          if (data.length > 0) {
            //this.sliceData(data);
            let newData = this.sliceData(data);
            this.list = this.list.concat(newData);
          }
      })
    },

    /*滚动到底部加载更多*/
    load() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.getCarList(this.page);
        console.log("成功数据");
        //this.num += 10;
      }, 1000);
    },

    /*单选按钮*/
    checkRadio(item) {
      item.checks = !item.checks;
      this.getAllPrice(this.list);
    },

    /*全选*/
    checkAllMeth() {
      let checkAll = this.checkAll;
      this.checkAll = !checkAll;
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

    /*计算选中的总价*/
    getAllPrice(data) {
      let allprice = 0;
      let checkNum = 0;
      for (let i = 0; i < data.length; i++) {
        if (data[i].checks) {
          allprice += data[i].price * data[i].num;
          checkNum += data[i].num;
        }
      }

      if (allprice == 0) {
        //如果点击单条全部记录取消选中后将全选修改未选中状态
        this.checkAll = false;
      }
      this.checkNum = checkNum;
      this.allPrice = allprice;
    },

    /*减少数量值*/
    minus(item) {
      let amount =parseInt(item.count);
      let list = this.list;
      if (amount > 0) {
        item.count = amount - 1;
      } else {
        item.count = 0;
      }
      this.getAllPrice(list);
    },

    /*增加数量值*/
    plus(item) {
      let amount =parseInt(item.count);
      let list = this.list;
      item.count = amount + 1;
      this.getAllPrice(list);
    },

    /*结算*/
    settlement() {
      //用选中商品总价判断是否选择商品
      if (!this.allPrice > 0) {
        //打开弹窗
        this.openJS = true;
      } else {
        this.$router.push({ path: "/order" });
      }
    },

    /*关闭弹窗*/
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
    },

    //滑动结束
    touchEnd(e) {
      let parentElement = e.currentTarget.parentElement;
      this.endX = e.changedTouches[0].clientX;

      if (parentElement.dataset.type == 0 && this.startX - this.endX > 30) {
        this.restSlide();
        parentElement.dataset.type = 1;
      }

      if (parentElement.dataset.type == 1 && this.startX - this.endX < -30) {
        this.restSlide();
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

      for (let i = 0; i < listItems.length; i++) {
        listItems[i].dataset.type = 0;
      }
    },

    //删除
    deleteItem(e) {
      let index = e.currentTarget.dataset.index;
      this.restSlide();
      this.list.splice(index, 1);
    },

     /*拆分购物车双条数据*/
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
      this.getProductInfo(newArrays);
      //return newArrays;
    },

    /*通过商品id获取商品详细信息*/
    getProductInfo(newArrays){
      console.log("处理前的数据");
      console.log(newArrays)
      for(let item in newArrays){
        let id = newArrays[item].goods_id;
        getProductInfo(id).then(res => {
          let product = res.data.data;
          newArrays[item].goods_count = product[0].goods_count;
          newArrays[item].goods_desc = product[0].goods_desc;
          newArrays[item].goods_is_publish = product[0].goods_is_publish;
          newArrays[item].goods_original_price = product[0].goods_original_price;
          newArrays[item].goods_photo = this.host + product[0].goods_photo;
          newArrays[item].goods_price = product[0].goods_price;
          newArrays[item].goods_supplier_id = product[0].goods_supplier_id;
          newArrays[item].goods_title = product[0].goods_title;
          newArrays[item].goods_type_id = product[0].goods_type_id;
        })
      }
      console.log("处理后的数据");
      console.log(newArrays)
      return newArrays;
      console.log(newArrays);
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
  font-size: 0.26rem;
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
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  z-index: 2;
}

.list-item {
  position: relative;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
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
  left: 0.2rem;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #ccc;
  color: #ccc;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
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
  padding: 0 0 0.1rem 0;
  position: relative;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
}

.list-item .title {
  display: block;
  color: #333;
  text-align: left;
  overflow: hidden;
  font-size: 0.26rem;
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
  top: 0.1rem;
  color: #666;
}

.list-item .delete {
  width: 1.25rem;
  height: 2.1rem;
  background: #ff4949;
  font-size: 17px;
  color: #fff;
  text-align: center;
  line-height: 2.1rem;
  position: absolute;
  top: 0;
  right: -1.3rem;
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
  margin-top: 0.1rem;
}

.mpnum {
  font-size: 0.3rem;
}
.mu-item-sub-title,
.mu-item-title {
  padding-left: 0.2rem;
}
.carMbox .mu-avatar img {
  border-radius: 0.2rem;
}

.radioimg {
  width: 0.3rem;
  height: 0.3rem;
}

.mu-item-action {
  padding-left: 5px;
}

.addToCar {
  position: fixed;
  bottom: 0.84rem;
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
  padding-right: 0.3rem;
  font-weight: bold;
  font-size: 0.32rem;
}
.pricecarbox div:first-child {
  line-height: 45px;
}
.pricecarbox div:last-child {
  line-height: 32px;
}
.carprice {
  position: absolute;
  left: 0.8rem;
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
.carlistbox > ul {
  overflow-x: hidden;
}
.qigou {
  position: absolute;
  right: 0.3rem;
  bottom: -0.36rem;
  font-size: 0.22rem;
  color: #999;
}
</style>