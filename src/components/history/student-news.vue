<template>
  <div class="comprehenisve-year">
    <div class="top">
      <div class="search-item">
        <div class="text">选择年份：</div>
        <el-date-picker
          v-model="data.searchData.year"
          type="year"
          placeholder="请选择年份"
          @change="onSearch"
        />
      </div>
    </div>
    <div class="top">
      <div class="search">
        <div class="left">
          <div class="search-item">
            <div class="text">选择班级：</div>
            <el-select
              v-model="data.searchData.class"
              class="m-2"
              @change="onSearch"
            >
              <el-option
                v-for="item in data.searchData.list"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="search-item">
            <div class="text">选择学生：</div>
            <el-input v-model="data.searchData.student" placeholder="请输入" />
          </div>
        </div>
        <div class="right">
          <el-button type="primary" @click="handleExcelExport"
            >导出
            <el-icon :size="18"><Download /></el-icon>
          </el-button>
        </div>
      </div>
    </div>
    <div class="middle">
      <div class="table">
        <el-table :data="data.assessment" style="width: 100%">
          <el-table-column prop="userNumber" label="学号" min-width="120" />
          <el-table-column prop="username" fixed label="姓名" min-width="150" />
          <el-table-column label="德育">
            <el-table-column
              prop="content.add1"
              label="加分明细"
              min-width="120"
            />
            <el-table-column prop="sub1" label="减分明细" min-width="120" />
            <el-table-column prop="point1" label="得分" min-width="60" />
          </el-table-column>
          <el-table-column label="智育">
            <el-table-column prop="add2" label="加分明细" min-width="120" />
            <el-table-column prop="sub2" label="减分明细" min-width="120" />
            <el-table-column prop="point2" label="得分" min-width="60" />
          </el-table-column>
          <el-table-column label="体育">
            <el-table-column prop="add3" label="加分明细" min-width="120" />
            <el-table-column prop="sub3" label="减分明细" min-width="120" />
            <el-table-column prop="point3" label="得分" min-width="60" />
          </el-table-column>
          <el-table-column label="美育">
            <el-table-column prop="add4" label="加分明细" min-width="120" />
            <el-table-column prop="sub4" label="减分明细" min-width="120" />
            <el-table-column prop="point4" label="得分" min-width="60" />
          </el-table-column>
          <el-table-column label="劳动">
            <el-table-column prop="add5" label="加分明细" min-width="120" />
            <el-table-column prop="sub5" label="减分明细" min-width="120" />
            <el-table-column prop="point5" label="得分" min-width="60" />
          </el-table-column>
          <el-table-column label="综测总得分" fixed="right" min-width="100" />
        </el-table>
      </div>
    </div>
    <div class="bottom">
      <div class="pager">
        <el-pagination
          :page-size="data.pager.size"
          :pager-count="9"
          layout="prev, pager, next"
          :total="data.pager.total"
          @current-change="handleChangePage"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive,onMounted  } from "vue";
// 导出数据
import { historyComprehensiveYearHeader } from "@/assets/js/excel/history/comprehensive-style";
import { export_json_to_excel } from "@/assets/js/excel/excel-export-multi";
import { formatDate } from "@/assets/js/utils/format-date";
const data = reactive({
  searchData: {
    year: "",
    class: "cid",
    student: "",
    list: [
      {
        label: "2021预科1班",
        value: "cid",
      },
    ],
  },
  assessment: [],
  pager: {
    current: 1,
    size: 10,
    total: 1000,
  },
});
// 搜索
const onSearch = () => {
  console.log(formatDate(data.searchData.year).slice(0, 4));
};
// 手动修改页码数
const handleChangePage = (val) => {
  console.log(val);
};
// 数据excel导出
const handleExcelExport = () => {
  export_json_to_excel(
    historyComprehensiveYearHeader,
    assessment,
    "历史综合测评信息"
  );
};
const getStudentNews = () => {};
onMounted(() => {});
</script>
<style src="@/assets/css/search-top-left-right.css" scoped />
<style src="@/assets/css/utils/table-empty.css" scoped />
<style scoped>
.comprehenisve-year > div:not(:last-child) {
  margin-bottom: 1rem;
}
.pager {
  display: flex;
  justify-content: flex-end;
}
</style>
