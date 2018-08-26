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

export default {
  components: {
    Search,
    oftenHome,
    Footer
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.oftenbuy .oftenbuy {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
</style>