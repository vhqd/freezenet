<template>
	<div>
		<div class="oftenbuy">
			<!-- 搜索区 -->
			<Search :ishome='true'></Search>
			<oftenHome></oftenHome>
			<Footer tagNum='2'></Footer>
		</div>
	</div>

</template>

<script>
import Search from "../common/Search.vue";
import Footer from "../common/Footer.vue";
import oftenHome from "../oftenbuy/oftenHome.vue";
  import { share } from '../../common/share.js';

export default {
  components: {
    Search,
    oftenHome,
    Footer
  },
  data() {
    return {};
  },
  activated(){
    document.title = '常购清单'
  },
  mounted(){
    let invate_code = localStorage.invate_code
    if (invate_code && invate_code!= '') {
       share(this.$store.state.shareurl,localStorage.invate_code,this.$store.state.shareimg)
    }
  }
};
</script>

<style scoped>
.oftenbuy .oftenbuy {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
</style>