<!--
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-11-06 22:04:48
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2024-03-28 16:31:41
 * @FilePath: \collegeApplication\src\views\VolunteerCheck.vue
 * @Description: 查看志愿页面
-->
<template>
  <div class="box column-center-flex">
    <!-- 基本信息 -->
    <div class="info-box">
      <div class="grid-item">
        <div>
          <span class="tag">学生姓名 :</span
          ><span>{{ data.student.username }}</span>
        </div>
        <div>
          <span class="tag">学生学号 :</span
          ><span>{{ data.student.userNumber }}</span>
        </div>
        <div>
          <span class="tag">身份证号 :</span
          ><span>{{ data.student.idCard }}</span>
        </div>
        <div>
          <span class="tag">学生性别 :</span><span>{{ data.student.sex }}</span>
        </div>
        <div>
          <span class="tag">录取学校 :</span
          ><span
            ><b>{{ data.student.school }}</b></span
          >
        </div>
        <div>
          <span class="tag">学生班级 :</span
          ><span>{{ data.student.className }}</span>
        </div>
      </div>
    </div>
    <!-- 填写志愿盒子 -->
    <el-card shadow="hover" class="card voluteer-box">
      <div class="column-center-flex">
        <br />
        <h1>第一志愿：{{ data.volunteers.firstName || "未填报" }}</h1>
        <br />
        <h1>第二志愿：{{ data.volunteers.secondName || "未填报" }}</h1>
        <br />
        <h1>第三志愿：{{ data.volunteers.thirdName || "未填报" }}</h1>
        <br /></div
    ></el-card>
    <el-button type="danger" @click="changeVolunteer"
      >{{ data.volunteers.frequency == 3 ? "填报" : "修改" }}志愿</el-button
    >
    <br />
    <!-- 修改截止日期，次数tip -->
    <div>
      截止时间{{ data.volunteers.endTime }}前，您还有<strong
        style="color: red"
        >{{ data.volunteers.frequency }}</strong
      >次修改机会
    </div>
    <br />
    <!-- 温馨提示 -->
    <div class="tip">
      <div><b>⚠提示</b></div>
      <div>▪ 该表格填写关系到您今后的录取学校选择，请一定要认真对待</div>
      <div>▪ 截止世界前，每人只有三次志愿修改机会。</div>
      <div>▪ 非本人请勿修改志愿信息。</div>
    </div>
    <br />
  </div>
</template>
<script setup>
import { reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import studentFun from "@/api/student";
import volunteerFun from "@/api/volunteer";
import { useRouter } from "vue-router";
const router = useRouter();
const data = reactive({
  volunteerId: null,
  state: null,
  student: {
    username: "",
    userNumber: "",
    idCard: "",
    sex: "",
    class: "",
    className: "",
  },
  volunteers: {
    firstName: "",
    secondName: "",
    thirdName: "",
    endTime: "",
    frequency: 0,
  },
});
onMounted(() => {
  init();
});
function init() {
  data.volunteerId = router.currentRoute.value.query.id;
  studentFun.user.getInformation().then((res) => {
    data.student = res;
  });
  getVolunteer();
}
//初始化志愿/剩余填写次数数据
function getVolunteer() {
  volunteerFun.student.selectWish(data.volunteerId).then((res) => {
    data.volunteers = res;
  });
}
// 跳转至志愿填报页面
function changeVolunteer() {
  if (data.volunteers.frequency > 0) {
    router.replace({
      name: "volunteer-fill",
      query: { originVolunteers: data.volunteers, id: data.volunteerId },
    });
  } else {
    ElMessage({
      type: "error",
      message: "您已经没有志愿修改资格",
    });
  }
}
</script>
<style src="@/assets/css/show-container.css" scoped></style>
<style src="@/assets/css/student/volunteerCheck.scss" lang="scss" scoped/>