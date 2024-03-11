<!--
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-11-06 22:04:48
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2024-03-11 21:54:20
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
          ><span>{{ data.student.name }}</span>
        </div>
        <div>
          <span class="tag">学生学号 :</span><span>{{ data.student.id }}</span>
        </div>
        <div>
          <span class="tag">身份证号 :</span
          ><span>{{ data.student.card }}</span>
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
          ><span>{{ data.student.class }}</span>
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
import { ref, reactive, computed, onMounted } from "vue";
import { ElMessage } from "element-plus";
import studentFun from "@/api/student";
import volunteerFun from "@/api/volunteer";
import { useRouter } from "vue-router";
const router = useRouter();
const data = reactive({
  volunteerId:null,
  student: {
    name: "付小小",
    id: "415567569789",
    card: "365124200103052214",
    sex: "女",
    class: "2023级预科1班",
    school: "湘南学院",
  },
  volunteers: {
    firstName: "",
    secondName: "",
    thirdName: "",
    endTime: "2023.11.09",
    frequency: 3,
  },
});

onMounted(() => {
  data.volunteerId=router.currentRoute.value.query.id;
  console.log("获取到的TimeID是:",data.volunteerId)
  init();
});
function init() {
  getVolunteer();
}
//初始化志愿/剩余填写次数数据
function getVolunteer() {
  volunteerFun.student.selectWish(data.volunteerId).then((res) => {
    console.log("初始化志愿/剩余填写次数数据",res)
    data.volunteers = res;
  });
}

// 跳转至志愿填报页面
function changeVolunteer() {
  if (data.volunteers.frequency > 0) {
    router.push({
      name: "volunteer-fill",
      query: { originVolunteers: data.volunteers,id:data.volunteerId },
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
<style lang="scss" scoped>
$small-margin: 1rem;
$big-margin: 3rem;
.box {
  width: 100%;
}
.info-box {
  width: 80%;
  margin: $big-margin 0 $big-margin 0;
  .tag {
    width: 7rem;
    display: inline-block;
    margin-right: $small-margin;
    text-align: right;
  }
}
.card {
  margin: $big-margin 0;
}
.card:hover {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
.tip {
  color: gray;
  line-height: 1.5rem;
  margin: $small-margin 0 $small-margin 0;
  padding: 3rem;
  border-top: 0.1rem solid rgba(87, 86, 86, 0.158);
}
.grid-item {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  gap: 1rem 1.2rem;
  grid-auto-flow: row dense;
}

@media screen and (max-width: 1000px) {
  .voluteer-box {
    padding: 0;
  }
}
@media screen and (min-width: 1000px) {
  .voluteer-box {
    padding: 2rem;
  }
}
</style>
  