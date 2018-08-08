<template>
	<mu-appbar style="width: 100%;" color="primary">
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
			
		},
		props:['dTitle']
	}
</script>

<style scoped>
.mu-appbar-left{position: absolute !important;}
.mu-appbar-title{color: #333;}
.mu-primary-color{background:#fff !important;}
.mu-button-wrapper img{width: 60%;}
.mu-elevation-4{box-shadow: none;}
.home_ban{padding-top: 0 !important;}
</style>