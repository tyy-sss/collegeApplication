<template>
  <div class="comprehenisve-year">
    <div class="top">
      <div class="search">
        <div class="left">
          <div class="search-item">
            <div class="text">选择年份：</div>
            <el-date-picker
              v-model="data.searchData.year"
              type="year"
              placeholder="请选择年份"
              @change="onSearch"
            />
          </div>
          <div class="search-item">
            <div class="text">选择学校：</div>
            <el-select
              v-model="data.searchData.school"
              class="m-2"
              @change="onSearch"
            >
              <el-option
                v-for="item in data.searchData.list"
                :key="item.schoolId"
                :label="item.name"
                :value="item.schoolId"
              />
            </el-select>
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
          <el-table-column prop="name" label="目标学校" min-width="90" />
          <el-table-column prop="userName" label="姓名" />
          <el-table-column prop="userNumber" label="学号" min-width="110" />
          <el-table-column prop="sex" label="性别" width="60" />
          <el-table-column prop="province" label="省份" />
          <el-table-column prop="className" label="班级" min-width="130" />
          <el-table-column prop="subjects" label="选考科目" min-width="120">
            <template #default="scope">
              {{ handleSubject(scope.row.subjects) }}
            </template>
          </el-table-column>
          <el-table-column prop="score" label="分流成绩" min-width="90" />
          <el-table-column label="志愿填报" fixed="right">
            <el-table-column prop="firstName" label="一志愿" />
            <el-table-column prop="secondName" label="二志愿" />
            <el-table-column prop="thirdName" label="三志愿" />
            <el-table-column
              prop="majorName"
              label="拟录专业"
              min-width="100"
            />
            <el-table-column prop="result" label="录取说明" min-width="100" />
          </el-table-column>
          <el-table-column label="联系方式" fixed="right">
            <el-table-column prop="phone" label="电话号码" min-width="120" />
            <el-table-column
              prop="parentPhone"
              label="父母电话"
              min-width="120"
            />
            <el-table-column prop="address" label="收件地址" min-width="130" />
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
import { reactive, onMounted } from "vue";
// 导出数据
import { professionHeaderNoCollege } from "@/assets/js/excel/profession/forecast-profession/forecast-profession-export";
import { export_json_to_excel } from "@/assets/js/excel/excel-export-multi";
import { getYearNews } from "@/constants/date";
import managerFun from "@/api/manager";
import { ElMessage } from "element-plus";
import volunteerFun from "@/api/volunteer";
import { DELAY_TIME } from '@/constants/date';
import { debounce } from "@/assets/js/utils/throttle";
const data = reactive({
  searchData: {
    year: "",
    school: "",
    timeId: "",
    list: [],
  },
  assessment: [],
  pager: {
    current: 1,
    size: 10,
    total: 0,
  },
});
// 搜索
const onSearch = debounce(() => {
  data.pager.current = 1;
  if (data.searchData.school != "" && data.searchData.year != "") {
    getVolunteerNews();
  } else if (data.searchData.school == "") {
    ElMessage.error("请选择学校");
  } else if (data.searchData.year == "") {
    ElMessage.error("请选择年份");
  }
},DELAY_TIME);
// 手动修改页码数
const handleChangePage = (val) => {
  data.pager.current = val;
  getVolunteerNews();
};
// 数据excel导出
const handleExcelExport = () => {
  volunteerFun.manager
    .checkAllEndVolunteerDiversion({
      schoolId: data.searchData.school,
      timeId: data.searchData.timeId,
    })
    .then((res) => {
      let allData = res;
      let schoolName = getSchoolName();
      let headerTitle =
        getYearNews(data.searchData.year) + "年-" + schoolName + "-" + "分流表";
      export_json_to_excel(professionHeaderNoCollege, allData, headerTitle);
    });
};
// 获取学校的姓名
const getSchoolName = () => {
  return data.searchData.list.filter((element) => {
    if (element.schoolId == data.searchData.school) {
      return element;
    }
  })[0].name;
};
// 获取学校的信息
const getSchoolList = () => {
  managerFun.school.searchSchool("").then((res) => {
    data.searchData.list = res;
  });
};
// 对科目展示进行处理
const handleSubject = (val) => {
  val = JSON.parse(val);
  let endString = "";
  for (let i = 0; i < val.length; i++) {
    endString += val[i];
    if (i != val.length - 1) {
      endString += ",";
    }
  }
  return endString;
};
// 获取分流的信息
const getVolunteerNews = () => {
  managerFun.wishTime
    .selectWishTime1(
      data.searchData.school,
      Number(getYearNews(data.searchData.year))
    )
    .then((res) => {
      res.records.forEach((element) => {
        if (element.type == true) {
          data.searchData.timeId = element.id;
        }
      });
      // 获取timeId
      if (data.searchData.timeId) {
        volunteerFun.manager
          .checkEndVolunteerDiversion({
            schoolId: data.searchData.school,
            timeId: data.searchData.timeId,
            current: data.pager.current,
            size: data.pager.size,
          })
          .then((res) => {
            data.assessment = res.records;
            data.pager = {
              size: res.size,
              total: res.total,
              current: res.current,
            };
          });
      } else {
        ElMessage.error("没有历史分流信息");
      }
    });
};
onMounted(() => {
  getSchoolList();
});
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
