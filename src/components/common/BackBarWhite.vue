<template>
	<mu-appbar style="width: 100%;" color="primary">
		<mu-button icon slot="left" @click="back">
			<img src="../../../static/img/back.png"/>
		</mu-button>
		{{dTitle}}
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
			}
		},
		props:['dTitle']
	}
</script>

<style scoped>
.mu-appbar{border-bottom: 1px solid #e0e0e0;}
.mu-appbar-left{position: absolute !important;}
.mu-appbar-title{color: #333;}
.mu-primary-color{background: #fff;}
.mu-button-wrapper img{width: 60%;}
.mu-elevation-4{box-shadow: none;}
.home_ban{padding-top: 0 !important;}
</style>