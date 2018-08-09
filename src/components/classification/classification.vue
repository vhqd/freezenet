<template>
  <div class="index">
    <!-- 头部区 轮播图 商品区-->
    <Home></Home>
    <!--底部导航-->
    <Footer tagNum='1'></Footer>
  </div>
</template>

<script>
import Home from "../home/Home.vue";
import Footer from "../common/Footer.vue";

export default {
  components: {
    Home,
    Footer
  },
  data() {
    return {};
  },
  methods: {
    /*menuScrollTopStop(){
  			var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
  			console.log(scrollTop)
  			if(scrollTop > 170){
		      document.querySelector('#ulbox').style.top = '45px';
		    }else{
		     document.querySelector('#ulbox').style.top = scrollTop+'px';
		    }
  		}*/
  },
  mounted() {
    /* window.addEventListener('scroll', this.menuScrollTopStop)*/
  }
};
</script>

<style scoped>
</style>
