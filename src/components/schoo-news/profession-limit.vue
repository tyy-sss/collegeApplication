<template>
  <div class="profession-limit">
    <div class="top">
      <el-steps :active="stepActive" align-center>
        <el-step
          v-for="(item, index) in stepData"
          :key="index"
          :title="item.title"
          :description="item.description"
        />
      </el-steps>
    </div>
    <div class="middle">
      <profession-information v-if="stepActive === 1" @change-step-active="changeStepActive"/>
      <profession-address v-if="stepActive === 2"  @change-step-active="changeStepActive"/>
      <subject-limit v-if="stepActive === 3" />
    </div>
  </div>
</template>
<script setup>
import { reactive,ref } from "vue";
import professionInformation from "@/components/schoo-news/limit/profession-information.vue";
import professionAddress from "@/components/schoo-news/limit/profession-address.vue";
import subjectLimit from "@/components/schoo-news/limit/subject-limit.vue";

// 步骤条数据
const stepActive = ref(1);
const stepData = reactive([
  {
    title: "步骤一：专业信息录入",
    description: "请按照excel模板填写后录入本院的专业信息",
  },
  {
    title: "步骤二：学校地区限制选择",
    description: "如果有地区录入选择，选择地区组合",
  },
  {
    title: "步骤三：限制科目类别，专业人数填写",
    description: "分别为每个专业录入对应的类别信息规则",
  },
]);
// 修改进度条的值
const changeStepActive = (val) => {
  stepActive.value = val;
};
</script>
<style scoped>
.middle {
  margin-top: 1.5rem;
}
</style>