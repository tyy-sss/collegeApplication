<template>
  <div class="forecast-profession">
    <div class="top">
      <div class="left">
        <div class="text">志愿规则选择：</div>
        <div class="choose">
          <el-radio-group
            v-model="data.volunteerRule"
            class="ml-4"
            @change="getVounteerDiversion"
          >
            <el-tooltip
              v-for="(item, index) in data.mateTtypeData"
              :key="index"
              class="box-item"
              effect="light"
              placement="bottom"
            >
              <template #content>
                <rule-explain :volunteer-rule="item.volunteerRule" />
              </template>
              <el-radio :label="item.type" size="large">{{
                item.label
              }}</el-radio>
            </el-tooltip>
          </el-radio-group>
        </div>
      </div>
      <div class="right">
        <el-button type="primary" @click="handleResetReuslt">
          重新生成结果
        </el-button>
      </div>
    </div>
    <div class="middle">
      <div class="left">
        <el-radio-group
          v-model="data.activeName"
          size="large"
          @change="handleGetCheckVounteerDiversion"
        >
          <el-radio-button
            v-for="(item, index) in data.typeData"
            :key="index"
            :label="item.type"
            size="large"
            >{{ item.label }}</el-radio-button
          >
        </el-radio-group>
      </div>
      <div class="right">
        <el-button
          type="primary"
          :icon="Download"
          @click="handleExportVolunteerDiversion"
        >
          导出分流表
        </el-button>
      </div>
    </div>
    <div class="bottom">
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
            <el-table-column prop="college" label="所属学院"  min-width="100" />
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
import { reactive, ref, onMounted } from "vue";
import { NOW_YEAR } from "@/constants/date";
import ruleExplain from "@/components/rule/rule-explain.vue";
import { rangeVolunteer, firstVolunteer } from "@/assets/js/data/rule-explain";
import { Download } from "@element-plus/icons-vue";
import { export_json_to_excel } from "@/assets/js/excel/excel-export-multi";
import { excelExport } from "@/assets/js/excel/excel-export";
import {
  professionHeader,
  professionMajor,
} from "@/assets/js/excel/profession/forecast-profession/forecast-profession-export";
import managerFun from "@/api/manager";
// 接口
import volunteerFun from "@/api/volunteer";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
const route = new useRoute();
const schoolId = Number(ref(route.query.schoolId).value);
const data = reactive({
  mateTtypeData: [
    {
      label: "第一志愿优先",
      type: 1,
      volunteerRule: firstVolunteer,
    },
    {
      label: "平行志愿",
      type: 2,
      volunteerRule: rangeVolunteer,
    },
  ],
  typeData: [
    {
      label: "录取名单",
      type: 1,
    },
    {
      label: "未录取名单",
      type: 0,
    },
  ],
  isExport: false,
  volunteerRule: "",
  activeName: "",
  tableData: [],
  timeId: "",
  pager: {
    current: 1,
    size: 10,
    total: 100,
  },
  type1: 0,
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
// 跳转界面
const handleChangePage = (val) => {
  data.pager.current = val;
  getCheckVounteerDiversion();
};
// 选择录取还是未录取的展示界面
const handleGetCheckVounteerDiversion = (value) => {
  data.activeName = value;
  data.pager.current = 1;
  getCheckVounteerDiversion();
};
// 导出最后的分流结果
const handleExportVolunteerDiversion = () => {
  if (!data.isExport) {
    ElMessage.error("无法导出分流信息");
  } else {
    let endData = [];
    let schoolName = ref(route.query.schoolName).value;
    let volunteerRuleName = data.mateTtypeData.filter((element) => {
      return element.type == data.volunteerRule;
    })[0].label;
    let headerTitle =
      Number(NOW_YEAR) +
      "-" +
      schoolName +
      "-" +
      volunteerRuleName +
      "-" +
      "预测分流表";
    volunteerFun.manager
      .exportVolunteerDiversion(schoolId, data.timeId, data.volunteerRule, 1)
      .then((res) => {
        endData = res;
        volunteerFun.manager
          .exportVolunteerDiversion(
            schoolId,
            data.timeId,
            data.volunteerRule,
            0
          )
          .then((res) => {
            res.forEach((element) => {
              endData.push(element);
            });
            // 导出最后分流结果
            export_json_to_excel(professionHeader, endData, headerTitle);
          })
          .catch(() => {
            ElMessage.error("没有分流结果");
          });
      });
    // 未录取的专业结果,先得到地区组合消息
    managerFun.area.selectArea("").then((res) => {
      const addressData = [];
      res.forEach((element) => {
        addressData.push({
          areaId: element.areaId,
          name: element.name,
        });
      });
      // 未录取的专业结果,与地区消息做匹配
      volunteerFun.manager
        .getRemainMajor(data.volunteerRule, data.timeId)
        .then((res) => {
          const finalData = [];
          res.forEach((element) => {
            element.classification = JSON.parse(element.classification);
            var request = "";
            for (var i = 0; i < element.classification.length; i++) {
              const addressItem = addressData.filter((item) => {
                return (item.areaId == element.classification[i].areaId);
              })[0].name;
              request +=
                addressItem +
                "：" +
                JSON.parse(element.classification[i].strings[3]).strings +
                " ";
            }
            finalData.push({
              college: element.college,
              name: element.name,
              request: request,
              enrollmentNumber: element.enrollmentNumber,
              first: element.first,
              second: element.second,
              third: element.third,
              surplusNumber: element.surplusNumber,
            });
          });
          excelExport(
            finalData,
            professionMajor,
            headerTitle + "-剩余专业信息"
          );
        });
    });
  }
};
// 重新导出分流结果
const handleResetReuslt = () => {
  data.type1 = 1;
  new Promise((resolve, reject) => {
    resolve(getVounteerDiversion(data.volunteerRule));
  }).then(() => {
    data.type1 = 0;
    data.volunteerRule = data.volunteerRule;
  });
};
// 获得最后志愿结果
const getCheckVounteerDiversion = () => {
  volunteerFun.manager
    .checkVolunteerDiversion({
      schoolId: schoolId,
      timeId: data.timeId,
      mateWay: data.volunteerRule,
      current: data.pager.current,
      size: data.pager.size,
      type: data.activeName,
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
// 根据志愿规则匹配志愿
const getVounteerDiversion = (value) => {
  data.pager.current = 1;
  data.volunteerRule = value;
  volunteerFun.manager
    .volunteerDiversion({
      schoolId: schoolId,
      type: data.volunteerRule,
      timeId: data.timeId,
      type1: data.type1,
    })
    .then((res) => {
      ElMessage.success("志愿匹配成功，正在获取志愿结果");
      data.activeName = 1;
      data.isExport = true;
      getCheckVounteerDiversion();
    })
    .catch((res) => {
      switch (res.code) {
        case 3009:
          data.activeName = 1;
          data.isExport = true;
          getCheckVounteerDiversion();
          break;
      }
    });
};
// 获得正式志愿填报时间Id
const getWishTime = () => {
  managerFun.wishTime
    .selectWishTime1(schoolId, Number(NOW_YEAR))
    .then((res) => {
      res.records.forEach((element) => {
        if (element.type == true) {
          data.timeId = Number(element.id);
        }
      });
    });
};
onMounted(() => {
  getWishTime();
});
</script>
<style scoped>
.forecast-profession > div:not(:last-child) {
  margin-bottom: 1rem;
}
.text {
  font-size: 17px;
  margin-bottom: 0.5rem;
  margin: 0;
}
.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.left {
  display: flex;
  align-items: center;
}
.rule-explain {
  max-width: 600px;
}
.bottom > div:not(:last-child) {
  margin-bottom: 1rem;
}
.pager {
  display: flex;
  justify-content: flex-end;
}
.middle {
  display: flex;
  justify-content: space-between;
}
</style>
