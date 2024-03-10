<template>
  <div class="history">
    <div class="show-container">
      <div class="title">
        <div class="text">历史信息</div>
      </div>
      <div class="context">
        <div class="top">
          <div class="search-item">
            <div class="text">选择类别：</div>
            <el-select
              v-model="searchData.class"
              class="m-2"
              @change="onSearch"
            >
              <el-option
                v-for="item in searchData.list"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="search-item">
            <div class="text">选择年份：</div>
            <el-date-picker
              v-model="searchData.year"
              type="year"
              placeholder="请选择年份"
              @change="onSearch"
            />
          </div>
        </div>
        <el-divider />
        <div class="bottom">
          <comprehensive-year />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import ComprehensiveAssessmentCheck from "./ComprehensiveAssessmentCheck.vue";
import comprehensiveYear from "@/components/history/comprehensive-year.vue";
// 时间转换
import { formatDate } from "@/assets/js/utils/format-date";
import { reactive } from "vue";
const searchData = reactive({
  class: "student-information",
  year: "",
  list: [
    {
      label: "学生信息",
      value: "student-information",
    },
    {
      label: "志愿填报信息",
      value: "volunteer-write-information",
    },
    {
      label: "学生综测信息",
      value: "comprehensive-information",
    },
    {
      label: "专业分流信息",
      value: "professional-triage-information",
    },
  ],
});
const onSearch = () => {
  console.log(formatDate(searchData.year).slice(0, 4));
};
</script>
<style src="@/assets/css/show-container.css" scoped />
<style src="@/assets/css/search-top.css" scoped />
