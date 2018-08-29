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
import { share } from '../../common/share.js';

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
  activated(){
    document.title = '分类'
  },
  mounted() {
    let invate_code = localStorage.invate_code
    if (invate_code && invate_code!= '') {
       share(this.$store.state.shareurl,localStorage.invate_code,this.$store.state.shareimg)
    }
    /* window.addEventListener('scroll', this.menuScrollTopStop)*/
  }
};
</script>

<style scoped>
</style>
