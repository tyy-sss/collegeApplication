<template>
  <div class="comprehenisve-year">
    <div class="top">
      <div class="search">
        <div class="left">
          <div class="search-item">
            <div class="text">选择班级：</div>
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
            <div class="text">选择学生：</div>
            <el-input v-model="searchData.student" placeholder="请输入" />
          </div>
        </div>
        <div class="right">
          <el-button type="primary"
            >导出
            <el-icon :size="18"><Download /></el-icon>
          </el-button>
        </div>
      </div>
    </div>
    <div class="middle">
      <div class="table">
        <el-table :data="assessment">
          <el-table-column prop="id" label="学号" min-width="120" />
          <el-table-column prop="name" label="姓名" min-width="100" />
          <el-table-column prop="class" label="班级" min-width="160" />
          <el-table-column prop="point1" label="德育得分" min-width="100" />
          <el-table-column prop="point2" label="智育得分" min-width="100" />
          <el-table-column prop="point3" label="体育得分" min-width="100" />
          <el-table-column prop="point4" label="美育得分" min-width="100" />
          <el-table-column prop="point5" label="劳动得分" min-width="100" />
          <el-table-column label="综合测评得分" fixed="right">
            <el-table-column prop="add_total" label="加分" min-width="120" />
            <el-table-column prop="sub_total" label="减分" min-width="120" />
            <el-table-column
              prop="point_total"
              label="综测总分"
              min-width="120"
            />
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="bottom">
      <div class="pager">
        <el-pagination
          :page-size="pager.size"
          :pager-count="9"
          layout="prev, pager, next"
          :total="pager.total"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive } from "vue";

// 搜索栏数据
const searchData = reactive({
  class: "cid",
  student: "",
  list: [
    {
      label: "2021预科1班",
      value: "cid",
    },
  ],
});
// 表格数据
const assessment = [
  {
    id: "2021401449",
    name: "付小小",
    class: "2022级预科1班",
    add1: "帮助老师批改作业2分",
    sub1: "旷课1分",
    point1: 1,
    add2: "绩点8分",
    sub2: "挂科1门2分",
    point2: 6,
    add3: "铅球比赛一等奖5分1km二等奖4分",
    sub3: "无",
    point3: 9,
    add4: "捐献书法画1分",
    sub4: "破环草坪1分",
    point4: 0,
    add5: "值日2次4分",
    sub5: "无",
    point5: 4,
    add_total: 24,
    sub_total: 4,
    pre_total: 18,
    point_total: 20,
  },
];
// 分页数据
const pager = reactive({
  size: 10,
  total: 1000,
});
</script>
<style src="@/assets/css/search-top-left-right.css" scoped/>
<style scoped>
.comprehenisve-year > div:not(:last-child) {
  margin-bottom: 1rem;
}
.pager {
  display: flex;
  justify-content: flex-end;
}
</style>
  