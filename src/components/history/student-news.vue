<template>
  <div class="comprehenisve-year">
    <div class="top">
      <div class="search-item">
        <div class="text">选择年份：</div>
        <el-date-picker
          v-model="data.searchData.year"
          type="year"
          placeholder="请选择年份"
          @change="onSearchYear"
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
                :key="item.classId"
                :label="item.className"
                :value="item.classId"
              />
            </el-select>
          </div>
          <div class="search-item">
            <div class="text">选择学生：</div>
            <el-input
              v-model="data.searchData.student"
              placeholder="请输入学生学号或者姓名"
              @change="onSearchStudent"
            />
          </div>
        </div>
        <div class="right">
          <el-button type="primary" @click="handleExcelExport"
            >按班级导出
            <el-icon :size="18"><Download /></el-icon>
          </el-button>
        </div>
      </div>
    </div>
    <div class="middle">
      <div class="table">
        <el-table :data="data.assessment" style="width: 100%">
          <el-table-column prop="userNumber" label="学号" min-width="120" />
          <el-table-column prop="username" fixed label="姓名" min-width="100" />
          <el-table-column prop="sex" label="性别" />
          <el-table-column prop="school" label="目标学校" min-width="120" />
          <el-table-column prop="plan" label="性质计划" min-width="100" />
          <el-table-column prop="subjects" label="选考科目" min-width="120" />
          <el-table-column prop="className" label="班级" min-width="130" />
          <el-table-column prop="idCard" label="身份证号" min-width="150" />
          <el-table-column prop="nation" label="民族" />
          <el-table-column
            prop="politicsStatus"
            label="政治面貌"
            min-width="100"
          />
          <el-table-column prop="province" label="省份" />
          <el-table-column label="联系方式" min-width="100">
            <el-table-column prop="phone" label="电话" min-width="120" />
            <el-table-column
              prop="parentPhone"
              label="父母电话"
              min-width="120"
            />
            <el-table-column prop="address" label="地址" min-width="120" />
          </el-table-column>
          <el-table-column label="收件信息" fixed="right" min-width="100">
            <el-table-column
              prop="consigneeName"
              label="收件人"
              min-width="120"
            />
            <el-table-column
              prop="consigneePhone"
              label="收件电话"
              min-width="120"
            />
            <el-table-column
              prop="consigneeAddress"
              label="收件地址"
              min-width="120"
            />
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="bottom">
      <div class="pager">
        <el-pagination
          :page-size="data.pager.size"
          :current-page="data.pager.current"
          layout="prev, pager, next"
          :total="data.pager.total"
          @current-change="handleChangePage"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive } from "vue";
// 导出数据
import { historyStudentHeader } from "@/assets/js/excel/history/student";
import { export_json_to_excel } from "@/assets/js/excel/excel-export-multi";
import { getYearNews } from "@/constants/date";
import managerFun from "@/api/manager";
import historyFun from "@/api/history";
import { throttle } from "@/assets/js/utils/throttle";
import { ElMessage } from "element-plus";
import { DELAY_TIME } from '@/constants/date';
import { debounce } from "@/assets/js/utils/throttle";
const data = reactive({
  searchData: {
    year: "",
    class: "",
    student: "",
    list: [],
  },
  assessment: [],
  pager: {
    current: 1,
    size: 10,
    total: 0,
  },
});
// 搜索年份获得当年的班级信息
const onSearchYear = debounce((val) => {
  data.searchData.year = getYearNews(val);
  data.searchData.class = "";
  data.searchData.student = "";
  data.searchData.list = [];
  data.assessment = [];
  managerFun.class.getAllClass(data.searchData.year).then((res) => {
    res.forEach((element) => {
      data.searchData.list.push({
        className: element.className,
        classId: element.classId,
      });
    });
  });
},DELAY_TIME);
// 搜索学生信息
const onSearchStudent = debounce(() => {
  if (data.searchData.class == "") {
    ElMessage.error("请选择时间和班级");
  } else {
    data.pager.current = 1;
    getStudentNews();
  }
},DELAY_TIME);
// 搜索
const onSearch = debounce(() => {
  data.pager.current = 1;
  data.searchData.student = "";
  getStudentNews();
},DELAY_TIME);
// 手动修改页码数
const handleChangePage = (val) => {
  data.pager.current = val;
  getStudentNews();
};
// 整理收件人的信息
const getConsignee = (val) => {
  val.forEach((element) => {
    element.consigneeName = element.consignee.username;
    element.consigneePhone = element.consignee.phone;
    element.consigneeAddress = element.consignee.address;
  });
  return val;
};
// 导出信息
const handleExcelExport = () => {
  if (data.searchData.class == "") {
    ElMessage.error("请选择班级");
  } else {
    let className = data.searchData.list.filter((element) => {
      return element.classId === data.searchData.class;
    })[0].className;
    historyFun.manager.getStudentByClass(data.searchData.class).then((res) => {
      export_json_to_excel(
        historyStudentHeader,
        getConsignee(res),
        data.searchData.year + "年-" + className + "学生信息表"
      );
    });
  }
};
// 获取学生信息
const getStudentNews = throttle(() => {
  historyFun.manager
    .student({
      year: data.searchData.year,
      className: data.searchData.class,
      keyword: data.searchData.student,
      current: data.pager.current,
      size: data.pager.size,
    })
    .then((res) => {
      data.assessment = res.records;
      data.assessment = getConsignee(data.assessment);
      data.pager = {
        current: res.current,
        size: res.size,
        total: res.total,
      };
    });
}, 100);
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
.search {
  display: flex;
  justify-content: space-between;
}
</style>
