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
        </div>
        <el-divider />
        <div class="bottom">
          <student-news v-if="searchData.class == 'student-news'" />
          <comprehensive-assessment
            v-else-if="searchData.class == 'comprehensive-assessment'"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import studentNews from "@/components/history/student-news.vue";
import comprehensiveAssessment from "@/components/history/comprehensive-assessment.vue";
// 时间转换
import { reactive } from "vue";
const searchData = reactive({
  class: "student-news",
  list: [
    {
      label: "学生信息",
      value: "student-news",
    },
    {
      label: "学生综测信息",
      value: "comprehensive-assessment",
    },
    {
      label: "专业分流信息",
      value: "professional-triage-information",
    },
  ],
});
const onSearch = (val) => {
  searchData.class = val;
};
</script>
<style src="@/assets/css/show-container.css" scoped />
<style src="@/assets/css/search-top.css" scoped />
