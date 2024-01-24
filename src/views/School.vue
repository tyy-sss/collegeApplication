<template>
  <div class="school">
    <div class="top">
      <div class="card" v-for="(item, index) in topChoose" :key="index">
        <div
          class="card-item"
          :style="{ 'background-color': item.color, 'box-shadow': item.shadow }"
          @click="hanleCheckItem(index)"
        >
          <img :src="item.img" />
          <div class="text">{{ item.text }}</div>
        </div>
      </div>
    </div>
    <div class="middle">
      <!-- 学校管理 -->
      <school-manage v-if="showItem === 1" />
      <!-- 学校信息 -->
      <school-table v-if="showItem === 2" />
      <!-- 志愿地区管理 -->
      <volunteer-address v-if="showItem === 3" />
      <!-- 志愿规则说明 -->
      <volunteer-rule-explain v-if="showItem === 4" />
      <!-- 高考科目管理 -->
      <subject-manage v-if="showItem === 5" />
    </div>
  </div>
</template>
<script setup>
import schoolManage from "@/components/school/school-manage.vue";
import schoolTable from "@/components/school/school-table.vue";
import volunteerRuleExplain from "@/components/school/volunteer-rule-explain.vue";
import volunteerAddress from "@/components/school/volunteer-address.vue";
import subjectManage from "@/components/school/subject-manage.vue";
import { reactive, ref } from "vue";
// 头部信息展示框
const topChoose = reactive([
  {
    img: require("@/assets/image/school-manage.png"),
    text: "学校信息管理",
    color: "RGBA(117,123,242,0.7)",
    shadow: " 8px 8px 5px RGBA(117,123,242,0.3)",
  },
  {
    img: require("@/assets/image/school-information.png"),
    text: "学校信息录入",
    color: "RGBA(255,124,51,0.7)",
    shadow: " 8px 8px 5px RGBA(255,124,51,0.3)",
  },
  {
    img: require("@/assets/image/volunteer-address.png"),
    text: "志愿地区管理",
    color: "RGBA(202,110,224,0.7)",
    shadow: " 8px 8px 5px RGBA(202,110,224,0.3)",
  },
  {
    img: require("@/assets/image/volunteer-explain.png"),
    text: "志愿规则说明",
    color: "RGBA(252,73,86,0.7)",
    shadow: " 8px 8px 5px RGBA(252,73,86,0.3)",
  },
  {
    img: require("@/assets/image/subject-manage.png"),
    text: "科目统一管理",
    color: "RGBA(6,196,109,0.7)",
    shadow: " 8px 8px 5px RGBA(6,196,109,0.3)",
  },
]);

const showItem = ref(1);

const hanleCheckItem = (val) => {
  showItem.value = val + 1;
};
</script>
<style scoped>
.school > div:not(:last-child) {
  margin-bottom: 2rem;
}
.middle > div:not(:last-child) {
  margin-bottom: 2rem;
}
.top {
  display: flex;
  /* 自动换行 */
  flex-wrap: wrap;
  justify-content: space-around;
  background-color: #fff;
  border-radius: 1rem;
  padding: 1rem;
}
.card-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem;
  border-radius: 1rem;
}
.card-item img {
  border-radius: 50%;
  padding: 5px;
  background-color: #fff;
  width: 35px;
  height: 35px;
}
.card-item .text {
  color: #fff;
  font-size: 17px;
  font-weight: bolder;
}
</style>
  
    