<template>
	<mu-appbar style="width: 100%;position: fixed" color="primary">
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
			}
		},
		methods:{
			back(){
				this.$router.go(-1);
			},
			goEditDress(){
				this.$router.push('/editdress');
			}
		},
		props:['dTitle','isshow']
	}
</script>

<style scoped>
.mu-appbar-left{position: absolute !important;}
.mu-appbar-title{color: #333;}
.mu-primary-color{background: #fff !important;}
.mu-button-wrapper img{width: 60%;}
.mu-elevation-4{box-shadow: none;}
.home_ban{padding-top: 0 !important;}
</style>