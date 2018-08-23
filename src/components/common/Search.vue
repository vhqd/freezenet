<template>
	<!--头部搜索  -->
	<div class="home_h">
		<header class="m_header">
            <div class="inputitem pm">
				<img src="../../../static/img/ic-search@2x.png" alt="" class="imgsearch">
		    	<mu-text-field v-model="keyword" @focus="goSearch" class="widthstyle midm" id="searchIn" placeholder="请输入商品名称..."></mu-text-field>
		    	<div class="guanbi" @click="clearinput"><img src="../../../static/img/ic_remove.png"/></div>
		    	<div class="cancel" @click="cancelClick">取消</div>
	    	</div>
        </header>
	</div>
</template>
<script>


    export default{
    	data(){
    		return{
				timer:null
    		}
    	},
        methods:{
        	/*打开搜索组件*/
            goSearch(event){
                this.$router.push('/search');
                
                window.event? window.event.returnValue = false : event.preventDefault();
            },
            /*清楚输入框的值*/
           clearinput(){
           	this.keyword = ''
           },
            /*处理取消事件搜索页返回，首页清空input*/
            cancelClick(){
           		let parm = this.ishome;
           		if(parm === 'true'){
           			
           		}else{
           			this.$router.go('-1')
           		}
		   },
		   sendKeyWord(){
			   //匹配中文
			   let reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
				//匹配特殊字符
			   let regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
    				regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
					if(regEn.test(this.keyword) || regCn.test(this.keyword)) {
						this.keyword = ''
						return false;
					}

			   if(this.keyword != '' && reg.test(this.keyword)){
					this.timer = setTimeout(()=>{
						 this.$emit("sendword",this.keyword);
						clearTimeout(this.timer)
					},1000)
			   }
			  
		   }
		},
		watch:{
			keyword(){
				this.sendKeyWord();
			}
		},
        props:['ishome','keyword'],
        mounted(){
			
        	/*处理到搜索页面自动获取焦点*/
        	/*let parm = this.ishome;
       		if(parm === 'false'){
       			document.getElementById('searchIn').focus();
       		}*/
        	
        }
    }
</script>
<style scoped>
	/* @import 'http://cdn.bootcss.com/material-design-icons/3.0.1/iconfont/material-icons.css'; */
	.home_h{position: fixed;top: 0;width: 100%;z-index: 99;}
	.m_header{height: 0.9rem;background: #fff !important}
	.mu-input.has-icon{border-radius: 0.3rem;}
	.pm{padding: 0.1rem;position: relative;}
	.cancel{line-height: 0.7rem;float: right;padding-right: 0.3rem;}
	.mu-input{width: 85%;}
	.guanbi{position: absolute;right: 18%;top: 0.28rem;}
	.guanbi img{width: 0.3rem;height: 0.3rem;}
	.imgsearch{top: 8px;left: .3rem;}

</style>