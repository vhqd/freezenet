<template>
  <div id="app">
    <keep-alive>
    	<router-view/>
     <!--  <mu-dialog title="温馨提示" width="360" :open.sync="openwins">
        <span class="cancelbox" @click="cancel"><img src="../static/img/ic_Shut .png" /></span>
        绑定手机才可以下单呦~<br />
        <mu-button slot="actions" flat color="primary" @click="sure">确定</mu-button>
        <mu-button slot="actions" flat color="secondary" @click="cancel">取消</mu-button>
      </mu-dialog> -->
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      loads:null,
      openwins: null, //全局弹窗
    }
  },
  methods:{
    /**全局loading*/
    showLoad(){
       this.loads = this.$loading();
    },
    sure(){
      this.openwins = false
      this.$router.push('/phone')
    },
    cancel(){
      this.openwins = false
    },
    showwinds(){
      this.openwins = true
    }
  },
  mounted(){
     
  },
  computed:{
    /**全局loading*/
    load(){
      return this.$store.state.load;
    },
    /**全局错误提示*/
    showerror(){
      return this.$store.state.showerror
    },
    /**全局信息提示*/
    showinfo(){
      return this.$store.state.showinfo
    },
    /**全局弹窗*/
    openwin(){
      return this.$store.state.openwin
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
    },
    showinfo(a,b){
        this.$toast.message(this.$store.state.showtext);
    },
    openwin(a,b){
        if(a){
          this.showwinds()
        }else{
          this.cancel()
        }
    }
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
