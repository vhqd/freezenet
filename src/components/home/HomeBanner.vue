<template>
	<!--home轮播图 -->
	<div class="home_ban">
		<mu-carousel hide-controls hide-indicators interval='3000' transition="fade">
		  <mu-carousel-item v-for='(item , index) in imgs' :key='index'>
		    <img :src="item.banner_image_address" :onerror="onerrorimglong">
		  </mu-carousel-item>
		</mu-carousel>
	</div>
</template>

<script>
export default {
  data () {
    return {
    	onerrorimglong:this.$store.state.onerrorimglong,
    }
  },
  props:['imgs'],
  mounted(){
  	
  }
};
</script>
<style type="text/css" scoped>
	.home_ban{height: 4.1rem;padding-top:.9rem;}
	.mu-carousel{height: 100%;}
	.home_ban img{height: 100%;width: 100%;border:none !important;}

</style>