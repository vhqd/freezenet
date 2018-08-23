<template>
  <div id="app">
    <keep-alive>
    	<router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      loads:null,
    }
  },
  methods:{
    /**全局loading*/
    showLoad(){
       this.loads = this.$loading();
    }
  },
  computed:{
    load(){
      return this.$store.state.load;
    },
    showerror(){
      return this.$store.state.showerror
    }
  },
  watch:{
    load(a,b){
      if(a){
        this.showLoad();
      }else{
        this.loads.close();
      }
    },
    showerror(a,b){
        this.$toast.error(this.$store.state.showtext);
    }
  },
  mounted(){
    //this.showLoad();
    /* setTimeout(()=>{
      this.a.close();
    },1000) */
  }
}
</script>

<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  font-family: "PingFang SC", "Helvetica Neue", Helvetica, "Nimbus Sans L", Arial, "Liberation Sans", "Hiragino Sans GB", "Source Han Sans CN Normal", "Microsoft YaHei", "Wenquanyi Micro Hei", "WenQuanYi Zen Hei", "ST Heiti", SimHei, "WenQuanYi Zen Hei Sharp", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #f5f5f5;
}

.mu-loading-wrap__fixed{width: 100%;height: 100%;position: fixed;top: 0;}
.mu-circular-progress{position: absolute;left: 50%;top:50%;margin-left: -24px;margin-top: -24px;}
</style>
