<template>
  <div class="volunteer-time">
    <div class="time-item">
      <div class="title">
        <div class="text">预志愿时间：</div>
        <div class="switch">
          <el-switch v-model="data.preVolunteerTime.isOpen" disabled />
        </div>
      </div>
      <div class="time">
        <div class="text">设置时间：</div>
        <el-date-picker
          v-model="data.preVolunteerTime.time"
          type="datetimerange"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
          @change="handleSetPreVolunteerTime"
        />
      </div>
    </div>
    <div class="time-item">
      <div class="title">
        <div class="text">正式志愿时间：</div>
        <div class="switch">
          <el-switch v-model="data.volunteerTime.isOpen" disabled />
        </div>
      </div>
      <div class="time">
        <div class="text">设置时间：</div>
        <el-date-picker
          v-model="data.volunteerTime.time"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
          @change="handleSetVolunteerTime"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref } from "vue";
import { NOW_YEAR,getAllTimeNews } from "@/constants/date";
// 接口
import managerFun from "@/api/manager";
const data = reactive({
  volunteerTime: {},
  preVolunteerTime: {},
  nowYear: Number(NOW_YEAR),
});
import { useRoute } from "vue-router";
// 获得路由显示的学校id
const route = new useRoute();
const schoolId = Number(ref(route.query.schoolId).value);
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
// 有值的修改时间显示
const changeTimeObject = (element) => {
  let changeObj = element;
  changeObj.time = [element.startTime, element.endTime];
  if (
    new Date(element.startTime) <= new Date() &&
    new Date(element.endTime) >= new Date()
  ) {
    changeObj.isOpen = true;
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
}
.text {
  font-size: 17px;
  margin-bottom: 0.5rem;
  margin: 0;
}
.title .text {
  font-weight: bold;
}
.time {
  width: 600px;
}
</style>