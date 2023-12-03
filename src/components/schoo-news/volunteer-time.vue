<template>
  <div class="volunteer-time">
    <div class="time-item">
      <div class="title">
        <div class="text">预志愿时间：</div>
        <div class="switch">
          <el-switch v-model="volunteerTime.preVolunteer" disabled />
        </div>
      </div>
      <div class="time">
        <div class="text">设置时间：</div>
        <el-date-picker
          v-model="volunteerTime.preVolunteerTime"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="defaultTime"
          @change="handleSetPreVolunteerTime"
        />
      </div>
    </div>
    <div class="time-item">
      <div class="title">
        <div class="text">正式志愿时间：</div>
        <div class="switch">
          <el-switch v-model="volunteerTime.volunteer" disabled />
        </div>
      </div>
      <div class="time">
        <div class="text">设置时间：</div>
        <el-date-picker
          v-model="volunteerTime.volunteerTime"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="defaultTime"
          @change="handleSetVolunteerTime"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive } from "vue";
import { formatDate } from "@/assets/js/utils/format-date";
const defaultTime = new Date(2000, 1, 1, 0, 0, 0); // '0:00:00'
const volunteerTime = reactive({
  preVolunteer: true,
  preVolunteerTime: [
    new Date(2000, 10, 10, 10, 10),
    new Date(2000, 10, 11, 10, 10),
  ],
  volunteer: false,
  volunteerTime: "",
});
// 设置预填报志愿的时间
const handleSetPreVolunteerTime = () => {
  const startTime = formatDate(volunteerTime.preVolunteerTime[0]);
  const endTime = formatDate(volunteerTime.preVolunteerTime[1]);
};
// 设置正式志愿填报时间
const handleSetVolunteerTime = () => {};
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