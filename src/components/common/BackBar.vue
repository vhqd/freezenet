<template>
	<mu-appbar style="width: 100%;position: fixed;top:0;z-index:999;" color="primary">
		<mu-button icon slot="left" @click="back">
			<img src="../../../static/img/back.png"/>
		</mu-button>
		{{dTitle}}
		<!--<span v-if="isshow" style="position: absolute;right: .2rem;top: -.1rem;" @click="goEditDress">管理</span>-->
	</mu-appbar>
</template>

<script>
	export default{
		data(){
			return{
				urls:'-1'
			}
		},
		watch:{
			ispay(a,b){
				if(a == 1){
					this.urls = '/center'
				}
			}
		},
		methods:{
			back(){
				this.$router.go(this.urls);
			},
			goEditDress(){
				this.$router.push('/editdress');
			}
		},
		props:['dTitle','isshow','ispay']
	}
</script>

<style scoped>
.mu-appbar-left{position: absolute !important;}
.mu-appbar-title{color: #333;}
.mu-primary-color{background: #fff;}
.mu-button-wrapper img{width: 60%;}
.mu-elevation-4{box-shadow: none;}
.home_ban{padding-top: 0 !important;}
</style>