<template>
  <div class="admission-list">
    <div class="top">
      <el-button type="primary" @click="handleExcelExport"
        >导出
        <el-icon :size="18"><Download /></el-icon>
      </el-button>
    </div>
    <div class="bottom">
      <div class="table">
        <el-table :data="tableData" border>
          <el-table-column
            prop="targetSchool"
            label="目标学校"
            min-width="90"
          />
          <el-table-column prop="name" label="姓名" />
          <el-table-column prop="uId" label="学号" min-width="110" />
          <el-table-column prop="sex" label="性别" width="60" />
          <el-table-column prop="province" label="省份" />
          <el-table-column prop="class" label="班级" min-width="130" />
          <el-table-column
            prop="electiveSubject"
            label="选考科目"
            min-width="120"
          />
          <el-table-column prop="point" label="分流成绩" min-width="90" />
          <el-table-column label="志愿填报" fixed="right">
            <el-table-column prop="firstVolunteer" label="一志愿" />
            <el-table-column prop="secondVolunteer" label="二志愿" />
            <el-table-column prop="thirdVolunteer" label="三志愿" />
            <el-table-column prop="reverso" label="拟录专业" />
            <el-table-column prop="remark" label="备注" />
          </el-table-column>
          <el-table-column label="联系方式" fixed="right">
            <el-table-column prop="phone" label="电话号码" min-width="120" />
            <el-table-column
              prop="parentPhone"
              label="父母电话"
              min-width="120"
            />
          </el-table-column>
        </el-table>
      </div>
      <div class="pager">
        <el-pagination
          :page-size="pager.size"
          :pager-count="9"
          layout="prev, pager, next"
          :total="pager.total"
          @current-change="handleChangePage"
        />
      </div>
    </div>
  </div>
</template>
  <script setup>
import { reactive, ref } from "vue";

// 表格数据
const tableData = [
  {
    uId: "2021401449",
    name: "付小小",
    class: "2022级预科1班",
    targetSchool: "吉首大学",
    province: "湖南省",
    sex: "女",
    electiveSubject: ["物理", "化学", "生物"],
    point: 89.88,
    firstVolunteer: "物理学",
    secondVolunteer: "土木工程",
    thirdVolunteer: "计算机科学与技术",
    reverso: "无",
    remark: "一志愿",
    phone: "19813404813",
    parentPhone: "19813404813",
  },
];
// 分页数据
const pager = reactive({
  size: 10,
  total: 100,
});
// 导出文件
const handleExcelExport = () => {};
// 跳转界面
const handleChangePage = (val) => {};
</script>
  <style scoped>
.admission-list > div:not(:last-child) {
  margin-bottom: 1rem;
}
.top {
  display: flex;
  justify-content: flex-end;
}
.bottom > div:not(:last-child) {
  margin-bottom: 1rem;
}
.pager {
  display: flex;
  justify-content: flex-end;
}
</style>