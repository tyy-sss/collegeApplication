<template>
  <div class="volunteer-time">
    <div class="time-item">
      <div class="title">
        <div class="text">预志愿时间：</div>
        <div class="switch">
          <el-switch v-model="data.preVolunteerTime.isOpen" disabled />
          <div v-if="data.preVolunteerTime.isOpen">
            <el-button
              type="primary"
              @click="handleExportUnAcceptedList(data.preVolunteerTime.id)"
              >导出未填报学生名单</el-button
            >
          </div>
          <div v-if="data.preVolunteerTime.afterOpen">
            <el-button type="primary" @click="handleExportStudentList"
              >导出学生填报信息名单</el-button
            >
          </div>
        </div>
      </div>
      <div class="time">
        <div class="text">设置时间：</div>
        <el-date-picker
          class="date-picker"
          v-model="data.preVolunteerTime.time"
          type="datetimerange"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
          @change="handleSetPreVolunteerTime"
        />
        <div class="right">
          <el-button
            v-show="data.preVolunteerTime.id"
            type="success"
            @click="handleDeleteWishTime(data.preVolunteerTime.id, true)"
            >清除志愿数据</el-button
          >
        </div>
      </div>
    </div>
    <div class="time-item">
      <div class="title">
        <div class="text">正式志愿时间：</div>
        <div class="switch">
          <el-switch v-model="data.volunteerTime.isOpen" disabled />
          <div v-if="data.volunteerTime.isOpen">
            <el-button
              type="primary"
              @click="handleExportUnAcceptedList(data.volunteerTime.id)"
              >导出未填报学生名单</el-button
            >
          </div>
        </div>
      </div>
      <div class="time">
        <div class="text">设置时间：</div>
        <el-date-picker
          class="date-picker"
          v-model="data.volunteerTime.time"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
          @change="handleSetVolunteerTime"
        />
        <div class="right">
          <el-button
            v-show="data.volunteerTime.id"
            type="success"
            @click="handleDeleteWishTime(data.volunteerTime.id, false)"
            >清除志愿数据</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref } from "vue";
import { NOW_YEAR, getAllTimeNews } from "@/constants/date";
// 接口
import managerFun from "@/api/manager";
const data = reactive({
  volunteerTime: {},
  preVolunteerTime: {},
  nowYear: Number(NOW_YEAR),
});
import { useRoute } from "vue-router";
import volunteerFun from "@/api/volunteer";
import { excelExport } from "@/assets/js/excel/excel-export";
import { export_json_to_excel } from "@/assets/js/excel/excel-export-multi";
import { unAcceptedHeader } from "@/assets/js/excel/excel-export-data";
import { professionHeaderNoCollege } from "@/assets/js/excel/profession/forecast-profession/forecast-profession-export";
import { ElMessage } from "element-plus";
// 获得路由显示的学校id
const route = new useRoute();
const schoolId = Number(ref(route.query.schoolId).value);
const schoolName = ref(route.query.schoolName).value;
// 设置预填报志愿的时间
const handleSetPreVolunteerTime = () => {
  const startTime = getAllTimeNews(data.preVolunteerTime.time[0]);
  const endTime = getAllTimeNews(data.preVolunteerTime.time[1]);
  if (!data.preVolunteerTime.id) {
    addWishTime(false, startTime, endTime);
  } else {
    changeWishTime(data.preVolunteerTime, startTime, endTime);
  }
};
// 设置正式志愿填报时间
const handleSetVolunteerTime = () => {
  const startTime = getAllTimeNews(data.volunteerTime.time[0]);
  const endTime = getAllTimeNews(data.volunteerTime.time[1]);
  if (!data.volunteerTime.id) {
    addWishTime(true, startTime, endTime);
  } else {
    changeWishTime(data.volunteerTime, startTime, endTime);
  }
};
// 导出当前未填报志愿的学生名单
const handleExportUnAcceptedList = (timeId) => {
  volunteerFun.manager
    .checkUnAccepted(timeId)
    .then((res) => {
      if (res.length == 0) {
        ElMessage.error("所有学生已完成志愿填报");
      } else {
        let unAcceptedList = [];
        res.forEach((element) => {
          element.notAcceptedVoList.forEach((item) => {
            unAcceptedList.push(item);
          });
        });
        let fileName = getAllTimeNews(new Date()).slice(0, 10);
        excelExport(
          unAcceptedList,
          unAcceptedHeader,
          fileName + " - " + schoolName + " - 未填报志愿的学生名单"
        );
      }
    })
    .catch(() => {});
};
// 清除志愿填报信息
const handleDeleteWishTime = (timeId, isPreVolunteerTime) => {
  deleteWiseTime(timeId, isPreVolunteerTime);
};
// 导出预志愿填报信息名单
const handleExportStudentList = () => {
  const timeId = data.preVolunteerTime.id;
  // 预志愿规则匹配志愿
  volunteerFun.manager
    .volunteerDiversion({
      schoolId: schoolId,
      type: 1,
      timeId: timeId,
      type1: 1,
    })
    .then((res) => {
      let headerTitle = schoolName + "-" + "预志愿填报表";
      let endData = [];
      volunteerFun.manager
        .exportVolunteerDiversion(schoolId, timeId, 1, 1)
        .then((res) => {
          console.log(res);
          endData = res;
          volunteerFun.manager
            .exportVolunteerDiversion(schoolId, timeId, 1, 0)
            .then((res) => {
              res.forEach((element) => {
                endData.push(element);
              });
              // 导出最后分流结果
              export_json_to_excel(professionHeaderNoCollege, endData, headerTitle);
            })
            .catch(() => {});
        });
    })
    .catch((res) => {});
};
// 有值的修改时间显示
const changeTimeObject = (element) => {
  let changeObj = element;
  changeObj.time = [element.startTime, element.endTime];
  if (
    new Date(element.startTime) <= new Date() &&
    new Date(element.endTime) >= new Date()
  ) {
    changeObj.isOpen = true;
  } else if (new Date(element.endTime) < new Date()) {
    changeObj.afterOpen = true;
    changeObj.isOpen = false;
  } else {
    changeObj.isOpen = false;
  }
  return changeObj;
};
// 没有值的复制
const changeNotimeObject = () => {
  return {
    time: [],
    isOpen: false,
  };
};
// 获得当年的志愿填报时间
const getWishTime = () => {
  managerFun.wishTime.selectWishTime1(schoolId, data.nowYear).then((res) => {
    res.records.forEach((element) => {
      if (element.type == true) {
        data.volunteerTime = changeTimeObject(element);
      }
      if (element.type == false) {
        data.preVolunteerTime = changeTimeObject(element);
      }
    });
    if (!data.volunteerTime.time) {
      data.volunteerTime = changeNotimeObject();
    }
    if (!data.preVolunteerTime.time) {
      data.preVolunteerTime = changeNotimeObject();
    }
  });
};
// 添加志愿时间
const addWishTime = (type, startTime, endTime) => {
  managerFun.wishTime
    .addWishTime({
      id: 0,
      type: type, // true为正式填报
      startTime: startTime,
      endTime: endTime,
      schoolId: schoolId,
      ago: data.nowYear,
    })
    .then(() => {})
    .catch(() => {})
    .finally(() => {
      getWishTime();
    });
};
// 修改志愿时间
const changeWishTime = (val, startTime, endTime) => {
  managerFun.wishTime
    .modifyWiseTime({
      id: val.id,
      type: val.type, // true为正式填报
      startTime: startTime,
      endTime: endTime,
      schoolId: parseInt(val.schoolId),
      ago: val.ago,
    })
    .then(() => {})
    .catch(() => {})
    .finally(() => {
      getWishTime();
    });
};
// 删除志愿填报信息
const deleteWiseTime = (timeId, isPreVolunteerTime) => {
  managerFun.wishTime
    .deleteWiseTime(timeId)
    .then(() => {
      ElMessage.success("操作成功");
      if (isPreVolunteerTime) {
        data.preVolunteerTime = {};
      } else {
        data.volunteerTime = {};
      }
    })
    .catch(() => {})
    .finally(() => {
      getWishTime();
    });
};
onMounted(() => {
  getWishTime();
});
</script>
<style scoped>
.time-item > div {
  margin-bottom: 1rem;
}
.title,
.time {
  display: flex;
  align-items: center;
  max-width: 650px;
  .right {
    margin-left: 20px;
  }
}

.text {
  font-size: 17px;
  margin-bottom: 0.5rem;
  margin: 0;
  width: 120px;
  text-align: end;
}
.title .text {
  font-weight: bold;
}
.switch {
  width: 480px;
  display: flex;
  justify-content: space-between;
}
</style>
