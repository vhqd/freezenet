<template>
	<div class="carMbox" style="width: 100%;height: 100%;overflow: hidden;">
		<!--头部-->
		<Bar dTitle='购物车'></Bar>
		
 		<!--可左滑动删除列表-->
		<SlidList></SlidList>
		
		<!--底部bar-->
		<Footer tagNum='3'></Footer>
	</div>
</template>

<script>
	import Footer from '../common/Footer.vue'
	import SlidList from '../common/slideL.vue'
	import Bar from '../common/Bar.vue'
		import { share } from '../../common/share.js';
	
	export default {
	  name: 'HelloWorld',
	  components:{
	  	Bar,
	    Footer,
	    SlidList
	   },
	  data () {
	    return {
	      msg: 'Welcome to Your Vue.js App'
	    }
		},
		activated(){
			document.title = '购物车'
		},
		mounted(){
			let invate_code = localStorage.invate_code
			if (invate_code && invate_code!= '') {
				share(this.$store.state.shareurl,localStorage.invate_code,this.$store.state.shareimg)
			}
		}
	}
</script>

<style>
</style>