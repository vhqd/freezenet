<template>
    <div class="shopchart-wrapper">
        <div class="content-left">
            <div class="logo-wrapper">
                <div class="logo" :class="{'hightlight':this.totalCount>0}">
                    <i class="icon-shopping_cart" :class="{'hightlight': this.totalCount > 0}"></i>
                </div>
                <div v-show="this.totalCount > 0" class="number">{{totalCount}}</div>
            </div>
            <div class="price" :class="{'highlight': this.totalPrice > 0}">&yen;{{totalPrice}}元</div>
            <div class="desc">另需配送费{{deliveryPrice}}元</div>
        </div>
        <div class="content-right">
            <div class="pay" :class="payableStyle">{{paydesc}}</div>
        </div>
        <div class="ball-wrapper">
            <transition-group name="drop" tag="div" v-on:before-enter="beforeEnter" v-on:enter="dropEnter" v-on:after-enter="afterEnter">
                <div class="ball" v-for="(ball,index) in balls" v-show="ball.show" :key="index">
                    <div class="inner inner-hook">
                    </div>
                </div>
            </transition-group>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    selectedFoods: {
      type: Array,
      default() {
        return [];
      }
    },
    "delivery-price": {
      type: Number,
      default: 0
    },
    "min-price": {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      balls: [
        {
          show: false,
          el: null
        },
        {
          show: false,
          el: null
        },
        {
          show: false,
          el: null
        },
        {
          show: false,
          el: null
        },
        {
          show: false,
          el: null
        }
      ],
      droppedBalls: []
    };
  },
  computed: {
    totalPrice() {
      let _totalPrice = 0.0;
      this.selectedFoods.forEach(f => {
        // console.log(this.selectedFoods.length);
        _totalPrice += f.price * f.count;
      });
      // console.log(_totalPrice);
      return _totalPrice;
    },
    totalCount() {
      let _totalCount = 0;
      this.selectedFoods.forEach(f => {
        _totalCount += f.count;
      });
      return _totalCount;
    },
    paydesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`;
      }
      let _leftPrice = this.minPrice - this.totalPrice;
      if (this.totalPrice < this.minPrice) {
        return `还差￥${_leftPrice}元起送`;
      } else {
        return "去结算";
      }
    },
    payableStyle() {
      return {
        payable: this.totalPrice >= this.minPrice,
        "not-enough": this.totalPrice > 0 && this.totalPrice < this.minPrice
      };
    }
  },
  methods: {
    dropMove(el) {
      for (var i = 0; i < this.balls.length; i++) {
        let b = this.balls[i];
        if (!b.show) {
          b.show = true;
          b.el = el;
          this.droppedBalls.push(b);
          return;
        }
      }
    },
    beforeEnter(el, done) {
      let count = this.balls.length;
      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect();
          let x = rect.left - 32;
          let y = -(window.innerHeight - rect.top - 22);
          el.style.display = "";
          el.style.transform = `translate3d(0,${y}px,0`;
          el.style.webkitTransform = `translate3d(0,${y}px,0`;
          let inner = el.getElementsByClassName("inner-hook")[0];
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
          inner.style.transform = `translate3d(${x}px,0,0)`;
          // console.log(el);
        }
      }
    },
    dropEnter(el, done) {
      /* eslint-disable no-unused-vars */
      /* 触发浏览器重绘; */
      let rf = el.offsetHeight;
      this.$nextTick(() => {
        el.style.webkitTransform = "translate3d(0, 0, 0)";
        el.style.transform = "translate3d(0, 0, 0)";
        let inner = el.getElementsByClassName("inner-hook")[0];
        inner.style.webkitTransform = "translate3d(0, 0, 0)";
        inner.style.transform = "translate3d(0, 0, 0)";
        el.addEventListener("transitionend", done);
        // done();
      });
      // console.log(el);
      // done();
    },
    afterEnter(el) {
      el.style.display = "none";
      let ball = this.droppedBalls.shift();
      ball.show = false;
      ball.el = null;
      console.log(el);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='stylus' rel='stylesheet/stylus' scoped>
.shopchart-wrapper {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 10;
    height: 48px;
    width: 100%;
    display: flex;
    font-size: 0;
    background-color: #141d27;
}

.content-left {
    flex: 1;
}

.logo-wrapper {
    display: inline-block;
    vertical-align: top;
    position: relative;
    top: -10px;
    margin: 0 6px;
    padding: 6px;
    width: 56px;
    height: 56px;
    box-sizing: border-box;
    border-radius: 50%;
    background: #141d27;
}

.logo {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #2b343c;
    text-align: center;
}

.icon-shopping_cart {
    line-height: 44px;
    font-size: 24px;
    color: #80858a;

    &.hightlight {
        color: #fff;
    }

    &.hightlight {
        background: rgb(0, 160, 220);
    }
}

.number {
    position: absolute;
    top: 0;
    right: 0;
    width: 24px;
    height: 16px;
    line-height: 16px;
    font-size: 9px;
    font-weight: 700;
    color: white;
    text-align: center;
    border-radius: 16px;
    background-color: rgb(240, 20, 20);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
}

.price {
    display: inline-block;
    vertical-align: top;
    padding-right: 12px;
    line-height: 24px;
    margin-top: 12px;
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 14px;
    font-weight: 700px;
    color: rgba(255, 255, 255, 0.4);

    &.highlight {
        color: #fff;
    }
}

.desc {
    display: inline-block;
    vertical-align: top;
    margin: 12px 0 0 12px;
    line-height: 24px;
    font-size: 10px;
    color: rgba(255, 255, 255, 0.4);
}

.content-right {
    flex: 0 0 105px;
    width: 105px;
}

.pay {
    height: 48px;
    width: 100%;
    line-height: 48px;
    text-align: center;
    font-size: 12px;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.4);
    background-color: #2b333b;

    &.payable {
        color: #fff;
        background-color: #00b43c;
    }

    &.not-enough {
        color: gray;
        background-color: #2b333b;
    }
}

.ball-wrapper, .ball {
    position: fixed;
    left: 32px;
    bottom: 22px;
    z-index: 200;
}

.inner {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #00A0DC;
    transition: all 1s linear;

    &.drop-enter-active {
        transition: all 1s cubic-bezier(0.49, -0.29, 0.75, 0.41);
    }
}
</style>