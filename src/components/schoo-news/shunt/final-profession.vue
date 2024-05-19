<template>
  <div class="final-profession">
    <div class="top">
      <el-button type="primary" :icon="Plus" @click="handleLeading"
        >导入最终分流表</el-button
      >
      <add-final-profession
        ref="addFinalProfessionRef"
        @get-final-profession-list="getFinalProfessionList"
      />
      <el-button type="info" :icon="Download" @click="handleExport"
        >导出最终分流模板表</el-button
      >
    </div>
    <div class="middle">
      <div class="table">
        <el-table :data="data.tableData" border>
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
import { onMounted, reactive, ref } from "vue";
import { NOW_YEAR } from "@/constants/date";
import { Download, Plus } from "@element-plus/icons-vue";
import addFinalProfession from "@/components/schoo-news/shunt/add-final-profession.vue";
import { export_json_to_excel } from "@/assets/js/excel/excel-export-multi";
import { professionHeader } from "@/assets/js/excel/profession/forecast-profession/forecast-profession-export";
import managerFun from "@/api/manager";
import volunteerFun from "@/api/volunteer";
import { useRoute } from "vue-router";
const route = new useRoute();
const schoolId = Number(ref(route.query.schoolId).value);
const data = reactive({
  timeId: "",
  tableData: [],
  pager: {
    current: 1,
    size: 10,
    total: 100,
  },
  allData: [],
});
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
// 导出模板表
const handleExport = () => {
  getAllFinalProfessionList();
};
const addFinalProfessionRef = ref(null);
// 导入数据表
const handleLeading = () => {
  addFinalProfessionRef.value.data.dialogTableVisible = true;
};
// 跳转界面
const handleChangePage = (val) => {
  data.pager.current = val;
  getFinalProfessionList();
};
// 获得正式志愿填报时间Id
const getWishTime = () => {
  managerFun.wishTime
    .selectWishTime1(schoolId, Number(NOW_YEAR))
    .then((res) => {
      res.records.forEach((element) => {
        if (element.type == true) {
          data.timeId = Number(element.id);
          getFinalProfessionList();
        }
      });
    }).catch((res)=>{
    });
};
// 获取分页的最后分流结果
const getFinalProfessionList = () => {
  volunteerFun.manager
    .checkEndVolunteerDiversion({
      schoolId: schoolId,
      timeId: data.timeId,
      current: data.pager.current,
      size: data.pager.size,
    })
    .then((res) => {
      data.tableData = res.records;
      data.pager = {
        size: res.size,
        total: res.total,
        current: res.current,
      };
    });
};
// 获取所有的最后分流结果
const getAllFinalProfessionList = () => {
  volunteerFun.manager
    .checkAllEndVolunteerDiversion({
      schoolId: schoolId,
      timeId: data.timeId,
    })
    .then((res) => {
      data.allData = res;
      let schoolName = ref(route.query.schoolName).value;
      let headerTitle = schoolName + "-" + "最终分流表";
      export_json_to_excel(professionHeader, data.allData, headerTitle);
    });
};
onMounted(() => {
  getWishTime();
});
</script>
<style scoped>
.final-profession > div:not(:last-child) {
  margin-bottom: 1rem;
}
.top {
  display: flex;
  justify-content: space-between;
}
.middle > div:not(:last-child) {
  margin-bottom: 1rem;
}
.pager {
  display: flex;
  justify-content: flex-end;
}
</style>
