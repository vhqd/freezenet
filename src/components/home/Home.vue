<template>
	<!--home组件 -->
  <div class="home qiandan">
  	 <!-- 搜索区 -->
     <Search  :ishome='true'></Search>
     <!-- 轮播图-->
     <!--<HomeBannerView :imgs='bannerImg'></HomeBannerView>-->
     <!-- 商品区-->
     <HomeMain></HomeMain>
  </div>
</template>

<script>
import Search from '../common/Search.vue'
import HomeBannerView from './HomeBanner.vue'
import HomeMain from './HomeMain.vue'
	

export default {
  name: 'HelloWorld',
  components:{
    Search,
    HomeBannerView,
    HomeMain
   },
  data () {
    return {
    	bannerImg:[
    	  require('../../../static/img/1-0_02.png'),
	      require('../../../static/img/1-0_02.png'),
	      require('../../../static/img/1-0_02.png'),
	      require('../../../static/img/1-0_02.png')
    	]
    }
  },
  methods:{
  	
  }
}
</script>

<style scoped>
</style>
