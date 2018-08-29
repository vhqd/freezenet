<template>
    <div>
        <BackBar :dTitle='dTitle'></BackBar>
        <div class="problems-content">
            <mu-paper :z-depth="1" class="demo-list-wrap">
                <mu-list textline="two-line">
                    <mu-list-item avatar :ripple="false" button v-for="(item , index) in selects" :key="index">
                        <router-link :to="{path:'/problemDetail',query:{id:item.id}}">
                            <mu-list-item-content>
                                <mu-list-item-title>{{item.question_title}}</mu-list-item-title>
                                <!-- <mu-list-item-sub-title style="color: rgba(0, 0, 0, .87)">Brunch this weekend?</mu-list-item-sub-title> -->
                                <mu-list-item-sub-title>
                                {{item.question_answer}}
                                </mu-list-item-sub-title>
                            </mu-list-item-content>
                            <mu-list-item-after-text>{{item.created_at}}</mu-list-item-after-text>
                        </router-link>
                    </mu-list-item>
                </mu-list>
            </mu-paper>
        </div>
    </div>
</template>

<script>
import BackBar from "../common/BackBar.vue";
import { problems } from '../../http/http.js'

export default {
  data() {
    return {
      dTitle: "常见问题",
      selects: [],
      limit:15,
      page:1
    };
  },
  mounted(){
      problems(this.limit , this.page).then(res=>{
          this.selects = res.data.data.data
      })
  },
  components: {
    BackBar
  }
};
</script>

<style scoped>
.problems-content {
  padding-top: 1rem;
}
.mu-list{overflow: initial !important}
</style>
