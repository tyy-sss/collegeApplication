<template>
  <div class="show-container">
    <div class="title">
      <div class="text">{{ schoolName }}</div>
    </div>
    <div class="context">
      <el-tabs type="border-card" class="demo-tabs" v-model="data.activeName">
        <el-tab-pane label="专业限制" name="first">
          <profession-limit />
        </el-tab-pane>
        <el-tab-pane label="志愿填报时间" name="second">
          <volunteer-time />
        </el-tab-pane>
        <el-tab-pane label="专业分流" name="third" :disabled="data.showShunt">
          <profession-shunt />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref } from "vue";
import { formatDate } from "@/assets/js/utils/format-date";
import { judgeEndOfVolunteerTime } from "@/assets/js/utils/volunteet-time-judge";
import volunteerTime from "@/components/schoo-news/volunteer-time.vue";
import professionLimit from "@/components/schoo-news/profession-limit.vue";
import professionShunt from "@/components/schoo-news/profession-shunt.vue";
import { useRoute } from "vue-router";
import { getSchoolTimeId } from "@/constants/schoolId-timeId";
import { handleSchoolTimeId } from '@/assets/js/utils/volunteet-time-judge'
import managerFun from "@/api/manager";
// 获得路由显示的学校id
const route = new useRoute();
const schoolId = Number(ref(route.query.schoolId).value);
const schoolName = ref(route.query.schoolName);

const data = reactive({
  schoolName: schoolName,
  schoolId: schoolId,
  showShunt: true,
  activeName: "third",
  timeId: "",
});
// 获得正式志愿填报时间，要在正式志愿填报之后，才能查看分流结果
const getWishTime = () => {
  data.showShunt = true;
  managerFun.wishTime
    .selectWishTime1(schoolId, Number(formatDate(new Date()).substring(0, 4)))
    .then((res) => {
      res.records.forEach((element) => {
        if (element.type == true) {
          data.showShunt = judgeEndOfVolunteerTime(element).isOpen;
          data.timeId = element.id;
          if (!data.showShunt) {
            handleSchoolTimeId(getSchoolTimeId(),{
              schoolId: data.schoolId,
              timeId: element.id
            });
          }
        }
      });
    });
};
onMounted(() => {
  getWishTime();
});
</script>
<style src="@/assets/css/show-container.css" scoped />
<style scoped>
.el-divider--horizontal {
  margin: 0;
}
::v-deep .el-tab-pane {
  padding: 1rem;
  color: black;
}
/* 设置菜单栏文字显示 */
::v-deep .el-tabs__item {
  font-size: 15px;
  font-size: medium;
}
</style>
