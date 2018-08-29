<template>
    <div style="overflow:hidden">
        <BackBar :dTitle='dTitle'></BackBar>
        <div class="feedback-content">
            <mu-form class="mu-demo-form" :label-position="labelPosition" label-width="100">
                <mu-form-item>
                    <mu-text-field v-model="question_title" placeholder='请输入反馈标题'></mu-text-field>
                </mu-form-item>
                 <mu-form-item>
                    <mu-text-field v-model="master_name" placeholder='请输入反馈人姓名'></mu-text-field>
                </mu-form-item>
                 <mu-form-item>
                    <mu-text-field v-model="master_phone" placeholder='请输入反馈人联系电话'></mu-text-field>
                </mu-form-item>
                <mu-form-item>
                    <mu-text-field multi-line :rows="3" :rows-max="6" v-model="question_desc" placeholder='请输入反馈内容'></mu-text-field>
                </mu-form-item>
            </mu-form>
            <mu-button color="primary" @click="sendFeedback" style="width:100%;background:#f24c4c !important;">提交</mu-button>
        </div>
    </div>
</template>

<script>
import BackBar from "../common/BackBar.vue";
import { sendFeedback } from "../../http/http.js";
import QS from "qs";

export default {
  data() {
    return {
      dTitle: "问题反馈",
      labelPosition: "top",
      question_title: "",
      question_desc: "",
      master_name: "",
      master_phone: ""
    };
  },
  activated(){
    this.question_title= "",
    this.question_desc="",
    this.master_name="",
    this.master_phone= ""
  },
  mounted() {},
  methods: {
    sendFeedback() {
      if (this.question_title == "") {
        this.$toast.error("请输入反馈标题");
        return;
      }
      if (this.master_name == "") {
        this.$toast.error("请输入反馈人");
        return;
      }
      if (this.master_phone == "") {
        this.$toast.error("请输入反馈人联系电话");
        return;
      }
      if (this.question_desc == "") {
        this.$toast.error("请输入反馈内容");
        return;
      }
      let data = {
        question_title: this.question_title,
        question_desc: this.question_desc,
        master_name: this.master_name,
        master_phone: this.master_phone
      };
      sendFeedback(QS.stringify(data)).then(res => {
          console.log('********************************************78');
          console.log(res);
          if(res.data.code == 200){
            this.$toast.message('反馈信息已提交');
            this.question_title= "",
            this.question_desc="",
            this.master_name="",
            this.master_phone= ""
            this.$router.go(-1)
          }
            // let status = res.response.status;
            // if(status && status == 422){
            //     this.$toast.error(res.errors.master_phone[0]);
            //     return;
            // }
      });
    }
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
.mu-form-item {
  margin-bottom: 0 !important;
}
.feedback-content {
  margin-top: 45px;
  padding: 0 20px;
}
.mu-list {
  overflow: initial !important;
}
</style>
