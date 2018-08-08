<template>
	<div class="address">
		
		<BackBar :dTitle='dTitle'></BackBar>
<mu-form :model="form" style='padding-top: 1rem;'>
		<mu-list class="infoboxbut">
			<mu-list-item button :ripple="false">
				<mu-list-item-title>收货人</mu-list-item-title>
				<mu-list-item-action>
					<mu-text-field v-model="form.name" placeholder="请输入收货人姓名"></mu-text-field>
				</mu-list-item-action>
			</mu-list-item>
			<mu-list-item button :ripple="false">
				<mu-list-item-title>联系电话</mu-list-item-title>
				<mu-list-item-action>
					<mu-text-field v-model="form.phone" placeholder="请输入联系电话"></mu-text-field>
				</mu-list-item-action>
			</mu-list-item>
			<mu-list-item button :ripple="false" @click="openBotttomSheet">
				<mu-list-item-title class='area'>所在地区</mu-list-item-title>
				<mu-list-item-action>
					<span>{{city}}</span>
				</mu-list-item-action>
			
			</mu-list-item>
			<mu-list-item button :ripple="false">
				<mu-text-field v-model="form.address" placeholder="详细地址：如街道、门牌号、小区、楼栋号、单元室等" style="width: 100%;"></mu-text-field>
			</mu-list-item>
		</mu-list>

		<mu-list class="infoboxbut" style="margin-top: 0.15rem;">
			<mu-list-item button :ripple="false">
				<mu-list-item-title>设置默认</mu-list-item-title>
				<mu-list-item-action>
					
					<mu-form-item prop="switch">
						<mu-switch v-model="form.switch"></mu-switch>
					</mu-form-item>
				
				</mu-list-item-action>
			</mu-list-item>
		</mu-list>
		</mu-form>
		<div class="savebox">
			<mu-flex class="flex-wrapper" align-items="center" @click='saveDress'>
				<mu-flex class="flex-demo" justify-content="center" fill>保存</mu-flex>
			</mu-flex>
		</div>
	<!--	<mu-expand-transition>
			<div class="citybox" v-show="show">
				<p>省市区</p>
			   	<v-distpicker type="mobile" @selected="onSelected"></v-distpicker>
			</div>
		</mu-expand-transition>-->
		<mu-bottom-sheet :open.sync="open">
			<v-distpicker v-show="open" type="mobile" @selected="onSelected"></v-distpicker>
		</mu-bottom-sheet>
	</div>
	
</template>

<script>
import BackBar from "../common/BackBar.vue";
import VDistpicker from "v-distpicker";
import { AddDress , EditDress } from "../../http/http.js";

export default {
  data() {
    return {
      host: this.$store.state.host,
      dTitle: "添加收货地址",
      open: false, //这个值判断是否是编辑地址默认false编辑过来传true
      city: "", //所在地区
      item: {}, //传递过来编辑的数据
      isedit: false,
      form: {
        name: "", //联系人
        phone: "", //联系电话
        city: "", //所在地区
        address: "", //详细地址
        switch: false //是否默认
      }
    };
  },
  mounted() {
    if (this.$route.query.isedit) {
      this.isedit = this.$route.query.isedit; //这个值判断是否是编辑地址
    }
    /*获取显示用户地址*/
    if (this.$route.query.item) {
      this.item = this.$route.query.item;
      this.form = this.$route.query.item;
      this.city = this.$route.query.item.city;
      if (this.$route.query.item.is_default == 1) {
        this.$set(this.form, "switch", true);
      }
    }
    /*获取显示用户地址*/
  },
  methods: {
    /*新增保存地址*/
    saveDress() {
      let that = this;
      if (this.form.name.length < 2) {
        this.$toast.error("收货人姓名不要少于2个字");
        return;
      }
      let tel = this.form.phone;
      let telReg = !!tel.match(
        /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      );
      if (telReg == false) {
        this.$toast.error("手机号码格式不正确");
        return;
      }
      if (this.form.city == "") {
        this.$toast.error("请选择所在地区");
        return;
      }
      if (this.form.address == "") {
        this.$toast.error("请填写详细收货地址");
        return;
      }
      let is_default = this.form.switch ? 1 : 0;
      let upData = {
        name: this.form.name, //联系人
        phone: this.form.phone, //联系电话
        city: this.form.city, //所在地区
        address: this.form.address, //详细地址
        is_default: is_default //是否默认
      };
      console.log(upData);
      if (this.isedit) {
        /*编辑地址*/
        console.log(this.item.id);
         EditDress(this.item,upData).then(res => {
            this.$router.push("/editdress");
            console.log(res);
        })
      } else {
        /*新增地址*/
        AddDress(upData).then(res => {
            this.$router.push("/dressmanagement");
            console.log(res);
            console.log(res.data.message);
        })
      }
    },
    onSelected(data) {
      this.city = data.province.value + data.city.value + data.area.value;
      this.form.city = this.city;
      this.show = false;
      this.open = false;
      console.log(data);
    },
    openBotttomSheet() {
      this.open = true;
      this.show = !this.show;
    }
  },
  components: {
    BackBar,
    VDistpicker
  }
};
</script>

<style scoped>
@import "http://cdn.bootcss.com/material-design-icons/3.0.1/iconfont/material-icons.css";
.infoboxbut {
  background: #fff;
}

.listbox {
  width: 100%;
  margin-top: 0.15rem;
}

.infoboxbut li:not(:last-child) {
  border-bottom: 1px solid #e0e0e0;
}

.mu-form-item {
  margin-bottom: 0;
  padding-bottom: 0;
  margin-top: 0.2rem;
}
.savebox {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 1rem;
  background: #f24c4c;
  color: #fff !important;
  line-height: 1rem;
  color: #333;
  font-size: 0.32rem;
  font-weight: bold;
}
.citybox {
  position: fixed;
  bottom: 0;
  width: 100%;
}
.citybox > p {
  background: #fff;
  padding: 0.1rem 0;
}
.area {
  width: auto;
}
</style>