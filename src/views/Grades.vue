<template>
  <div class="class">
    <div class="show-container">
      <div class="title">
        <div class="text">成绩管理</div>
      </div>
      <div class="context">
        <div class="top">
          <div class="search">
            <div class="left">
              <div class="search-item">
                <el-date-picker
                  v-model="data.searchData.date"
                  type="year"
                  placeholder="请选择年份"
                  @change="onSearch"
                />
              </div>
              <div class="search-item">
                <el-input
                  v-model="data.searchData.descript"
                  @change="onSearch"
                />
              </div>
            </div>
            <div class="right">
              <el-icon :size="23" color="#409EFC" @click="onReSearch"
                ><Refresh
              /></el-icon>
            </div>
          </div>
        </div>
        <div class="add">
          <div class="add-item">
            <el-button type="primary" :icon="Plus" @click="handleAddGrades">
              批量导入成绩
            </el-button>
            <add-grades ref="addGradesRef" :gradesList="data.tableHeader" @get-grades-list="getGradesList"/>
          </div>
          <div class="add-item">
            <el-button type="primary" :icon="Plus" @click="addGrades">
              单个导入成绩
            </el-button>
          </div>
        </div>
        <div class="middle">
          <el-table
            ref="multipleTableRef"
            :data="data.tableData"
            border
            stripe
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="35" />
            <el-table-column label="学号" property="classId" />
            <el-table-column label="姓名" property="className" />
            <el-table-column
              v-for="(item, index) in data.tableHeader"
              :key="index"
              :prop="String(item.gradeId)"
              :label="item.gradeName"
              min-width="60"
            />
            <el-table-column label="操作" min-width="180px">
              <template #default="scope">
                <el-button
                  link
                  type="primary"
                  @click="handleChangeGrades(scope.row)"
                  >修改成绩信息</el-button
                >
                <el-button
                  link
                  type="success"
                  @click="handleDeleteGrades(scope.row)"
                  >删除成绩信息</el-button
                >
              </template></el-table-column
            >
          </el-table>
        </div>
        <div class="bottom">
          <el-divider />
          <div class="pager">
            <div class="page-news">共{{ data.page.total }}条信息</div>
            <el-pagination
              v-model:current-page="data.page.currentPage"
              v-model:page-size="data.page.nowPageSize"
              :page-sizes="data.page.pageSize"
              :pager-count="data.page.pageCount"
              layout="prev, pager, next,sizes,jumper"
              :total="data.page.total"
              @size-change="getGradesList"
              @current-change="getGradesList"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
    <script setup>
import { onMounted, reactive, ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { formatDate } from "@/assets/js/utils/format-date";
import { debounce } from "@/assets/js/utils/throttle";
import managerFun from "@/api/manager";
import addGrades from "@/components/grades/add-grades.vue";

const addGradesRef = ref(null);
//   数据
const data = reactive({
  searchData: {
    date: "",
    descript: "",
  },
  // 分页数据
  page: {
    pageSize: [10, 15, 20],
    currentPage: 1,
    nowPageSize: 10,
    pageCount: 5,
    total: 0,
  },
  // 表格数据
  tableData: [],
  // 考试科目列表
  tableHeader: [],
});
// 导入学生成绩单
const handleAddGrades = () => {
  addGradesRef.value.data.dialogTableVisible = true;
};
// 按年份搜索成绩单
const onSearch = debounce(() => {
  data.searchData.date = formatDate(data.searchData.date).slice(0, 4);
}, 1000);
// 重置搜索
const onReSearch = () => {
  data.searchData = {};
};
// 修改成绩信息
const handleChangeGrades = (val) => {};
// 删除成绩信息
const handleDeleteGrades = (val) => {};
// 批量处理
const multipleSelection = ref([]);
const handleSelectionChange = (val) => {
  multipleSelection.value = val;
};
// 获取预科考试科目列表
const getExamSubjectList = () => {
  managerFun.examSubject.checkSubject().then((res) => {
    data.tableHeader = res;
  });
};
// 获得成绩具体信息
const getGradesList = () => {};
onMounted(() => {
  getExamSubjectList();
});
</script>
<style src="@/assets/css/utils/table-center.css" scoped/>
<style src="@/assets/css/show-container.css" scoped/>
<style src="@/assets/css/search-top-left-right.css" scoped/>
<style src="@/assets/css/pager.css" scoped/>
<style scoped>
/* 头部样式设置 */
.top > div,
.middle {
  margin-bottom: 1rem;
}
.add {
  display: flex;
}
.add-item {
  margin-right: 1rem;
}
</style>

  