<template>
  <div class="school-table">
    <div class="title">
      <div class="text">学校信息</div>
    </div>
    <div class="context">
      <el-table :data="schoolNews">
        <el-table-column prop="id" label="学校编号" />
        <el-table-column prop="name" label="学校名称" />
        <el-table-column prop="professionalLimit" label="专业限制信息" />
        <el-table-column prop="professionalTriage" label="专业分流信息" />
        <el-table-column label="志愿填报时间设置">
          <el-table-column prop="preVolunteerStart" label="预志愿开始" />
          <el-table-column prop="preVolunteerEnd" label="预志愿结束" />
          <el-table-column prop="volunteerStart" label="正式志愿开始" />
          <el-table-column prop="volunteerEnd" label="正式志愿结束" />
        </el-table-column>
        <el-table-column prop="ruleChoose" label="志愿规则选择" />
      </el-table>
    </div>
    <div class="title">
      <div class="text">志愿规则说明</div>
    </div>
    <div class="context">
      <div class="choose">
        <div class="explain-item">
          <div class="rule-text">第一志愿优先</div>
          <rule-explain :volunteer-rule="firstVolunteer" />
        </div>
        <div class="explain-item">
          <div class="rule-text">平行志愿</div>
          <rule-explain :volunteer-rule="rangeVolunteer" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { rangeVolunteer, firstVolunteer } from "@/assets/js/data/rule-explain";
import ruleExplain from "@/components/rule/rule-explain.vue";
import { linkEmits } from "element-plus";
import { reactive } from "vue";

const schoolNews = reactive([
  {
    id: "1",
    name: "吉首大学",
    professionalLimit: "已录入",
    professionalTriage: "已录入",
    preVolunteerStart: "2023-12-01",
    preVolunteerEnd: "2023-12-01",
    volunteerStart: "2023-12-01",
    volunteerEnd: "2023-12-01",
    ruleChoose: "第一志愿优先",
  },
  {
    id: "2",
    name: "吉首大学",
    professionalLimit: "未录入",
    professionalTriage: "未录入",
    preVolunteerStart: "2023-12-01",
    preVolunteerEnd: "2023-12-01",
    volunteerStart: "2023-12-01",
    volunteerEnd: "2023-12-01",
    ruleChoose: "未选择",
  },
  {
    id: "3",
    name: "吉首大学",
    professionalLimit: "未录入",
    professionalTriage: "未录入",
    preVolunteerStart: "2023-12-01",
    preVolunteerEnd: "2023-12-01",
    volunteerStart: "2023-12-01",
    volunteerEnd: "2023-12-01",
    ruleChoose: "平行志愿",
  },
]);
</script>
<style src="@/assets/css/show-container.css" scoped/>
<style src="@/assets/css/search-top-left-right.css" scoped/>
<style scoped>
.school-table > div:not(:last-child) {
  padding-bottom: 1rem;
}
.choose {
  display: flex;
  align-items: stretch;
}
.choose .explain-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  border: 2px solid RGB(235, 235, 235);
  border-radius: 1rem;
  padding: 1rem;
  margin: 1.5rem;
  margin-top: 0;
}
.choose .explain-item .rule-text {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
</style>