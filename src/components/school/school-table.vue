<template>
  <div class="school-table">
    <div class="title">
      <div class="text">学校信息</div>
    </div>
    <div class="context">
      <div class="top">
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
      <el-divider />
      <div class="bottom">
        <div class="pager">
          <div class="page-news">共{{ page.total }}条信息</div>
          <el-pagination
            v-model:current-page="page.currentPage"
            v-model:page-size="page.nowPageSize"
            :page-sizes="page.pageSize"
            :pager-count="page.pageCount"
            layout="prev, pager, next,sizes,jumper"
            :total="page.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive } from "vue";
// 表格数据
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
// 分页数据
const page = reactive({
  pageSize: [5, 10, 25],
  currentPage: 1,
  nowPageSize: 5,
  pageCount: 5,
  total: 20,
});
// 修改每页的个数
const handleSizeChange = (val) => {
  console.log(val);
};
// 页码跳转界面
const handleCurrentChange = () => {
  alert(page.currentPage);
};
</script>
<style src="@/assets/css/show-container.css" scoped/>
<style src="@/assets/css/search-top-left-right.css" scoped/>
<style src="@/assets/css/pager.css" scoped/>
<style scoped>
.school-table > div:not(:last-child) {
  padding-bottom: 1rem;
}
</style>