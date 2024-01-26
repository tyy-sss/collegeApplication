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
                  placeholder="请输入"
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
            <add-grades
              ref="addGradesRef"
              :gradesList="data.tableHeader"
              @get-grades-list="getGradesList"
            />
          </div>
          <div class="add-item">
            <el-button
              type="primary"
              :icon="Download"
              @click="handleExportGrades"
            >
              导出成绩
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
            <el-table-column label="学号" property="userNumber" />
            <el-table-column label="姓名" property="username" />
            <el-table-column
              v-for="(item, index) in data.tableHeader"
              :key="index"
              :label="item.gradeName"
              min-width="60"
            >
              <template #default="scope">
                {{
                  scope.row.gradeSubjectBos.find(
                    (element) => element.gradeId == item.gradeId
                  )
                    ? scope.row.gradeSubjectBos.find(
                        (element) => element.gradeId == item.gradeId
                      ).grade
                    : 0
                }}
              </template>
            </el-table-column>
            <el-table-column label="总成绩" property="score" />
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
                  @click="handleResetGrades(scope.row)"
                  >重置成绩信息</el-button
                >
              </template></el-table-column
            >
          </el-table>
        </div>
        <add-grades-single
          ref="addGradesSingleRef"
          :gradesList="data.tableHeader"
          @get-grades-list="getGradesList"
        />
        <div class="bottom">
          <el-button type="primary" @click="handleBatchResetGrades"
            >批量重置成绩</el-button
          >
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
import { Plus, Download } from "@element-plus/icons-vue";
import { formatDate } from "@/assets/js/utils/format-date";
import { debounceRight } from "@/assets/js/utils/throttle";
import { excelExport } from "@/assets/js/excel/excel-export";
import { getGradesHeader } from "@/assets/js/excel/grades/grades-export";
import managerFun from "@/api/manager";
import addGrades from "@/components/grades/add-grades.vue";
import addGradesSingle from "@/components/grades/change-grades-single.vue";
import { ElMessage, ElMessageBox } from "element-plus";

const addGradesRef = ref(null);
const addGradesSingleRef = ref(null);
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
// 导出学生成绩单
const handleExportGrades = () => {
  let year =
    data.searchData.date != ""
      ? formatDate(data.searchData.date).slice(0, 4)
      : formatDate(new Date()).slice(0, 4);
  console.log(year);
  managerFun.grades.getAllGradesList(year).then((res) => {
    res.forEach((element) => {
      element.gradeSubjectBos.forEach((item) => {
        element[String(item.gradeId)] = item.grade;
      });
    });
    console.log(res);
    const gradesHeader = getGradesHeader(data.tableHeader);
    excelExport(res, gradesHeader, year + "年成绩单");
  });
};
// 按年份搜索成绩单
const onSearch = debounceRight(() => {
  if (data.searchData.date) {
    data.searchData.date = formatDate(data.searchData.date).slice(0, 4);
  }
  getGradesList();
}, 50);
// 重置搜索
const onReSearch = () => {
  data.searchData = {
    date: "",
    descript: "",
  };
  getGradesList();
};
// 修改成绩信息
const handleChangeGrades = (val) => {
  addGradesSingleRef.value.data.ruleForm = val;
  addGradesSingleRef.value.data.dialogVisible = true;
};
// 重置成绩信息
const handleResetGrades = (val) => {
  resetGrades([val.userNumber]);
};
// 批量处理
const multipleSelection = ref([]);
const handleSelectionChange = (val) => {
  multipleSelection.value = val;
};
// 批量重置成绩
const handleBatchResetGrades = () => {
  if (multipleSelection.value.length === 0) {
    ElMessage.error("请至少选择一个成绩信息");
  } else {
    const gradesList = [];
    multipleSelection.value.forEach((item) => {
      gradesList.push(item.userNumber);
    });
    // 重置班级
    resetGrades(gradesList);
  }
};
// 获取预科考试科目列表
const getExamSubjectList = () => {
  managerFun.examSubject.checkSubject().then((res) => {
    data.tableHeader = res;
    getGradesList();
  });
};
// 获得成绩具体信息
const getGradesList = () => {
  managerFun.grades
    .getGradesList(
      data.searchData.date,
      data.searchData.descript,
      data.page.currentPage,
      data.page.nowPageSize
    )
    .then((res) => {
      data.tableData = res.records;
      data.page.total = res.total;
      data.page.nowPageSize = res.size;
      data.page.currentPage = res.current;
    });
};
// 重置成绩信息
const resetGrades = (val) => {
  ElMessageBox.confirm("确定重置所选成绩信息", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      managerFun.grades
        .resetGrades(val)
        .then((res) => {
          ElMessage.success(res);
        })
        .catch(() => {})
        .finally(() => {
          getGradesList();
        });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消改操作",
      });
    });
};
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

  