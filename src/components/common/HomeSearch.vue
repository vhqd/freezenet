<template>
	<!--头部搜索  -->
	<div class="home_h">
		<header class="m_header">
            <div class="inputitem pm">
		    	<mu-text-field class="widthstyle midm" id="searchIn" @focus="goSearch" placeholder="您想要..." icon="search"></mu-text-field>
		    	<div class="guanbi"><img src="../../../static/img/ic_remove.png"/></div>
		    	<!--<div class="cancel" @click="cancelClick">取消</div>-->
	    	</div>
        </header>
	</div>
</template>
<script>
    export default{
        methods:{
        	/*打开搜索组件*/
            goSearch(event){
                this.$router.push('/search');
                
                window.event? window.event.returnValue = false : event.preventDefault();
            },
            /*处理取消事件搜索页返回，首页清空input*/
            cancelClick(){
           		let parm = this.ishome;
           		if(parm === 'true'){
           			
           		}else{
           			this.$router.go('-1')
           		}
           }
        },
        props:['ishome'],
        mounted(){
        	/*处理到搜索页面自动获取焦点*/
        	let parm = this.ishome;
       		if(parm === 'false'){
       			document.getElementById('searchIn').focus();
       		}
        	
        }
    }
</script>
<style scoped>
	@import 'http://cdn.bootcss.com/material-design-icons/3.0.1/iconfont/material-icons.css';
	.home_h{position: absolute;top: 0;left:50%;margin-left: -172px;width: 90%;z-index: 9999;}
	.m_header{height: 0.9rem;}
	.mu-input.has-icon{border-radius: 0.3rem;}
	.pm{padding: 0.2rem;}
	.cancel{line-height: 0.7rem;}
	.mu-input{width: 100%;}
	.guanbi{position: absolute;right: 6%;top: 0.4rem;}
	.guanbi img{width: 0.3rem;height: 0.3rem;}

</style>