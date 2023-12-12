<!--
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-11-06 22:04:48
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2023-12-12 22:28:46
 * @FilePath: \collegeApplication\src\views\VolunteerCheck.vue
 * @Description: 查看志愿页面
-->
<template>
  <div class="box">
    <!-- <div class="tip">
        <b>⚠提示：</b><br /><br />
        <div style="margin-left: 20px">
          <span>▪ 该表格填写关系到您今后的录取学校选择，请一定要认真对待</span
          ><br />
          <span>▪ 截止世界前，每人只有三次志愿修改机会。</span><br />
          <span>▪ 非本人请勿修改志愿信息。</span><br />
        </div>
      </div> -->
    <!-- 基本信息 -->
    <div class="info">
      <el-row class="infoRow">
        <el-col :span="8">
          <div>
            <span class="tag">学生姓名 :</span><span>{{ student.name }}</span>
          </div></el-col
        >
        <el-col :span="8">
          <div>
            <span class="tag">学生学号 :</span><span>{{ student.id }}</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <span class="tag">身份证号 :</span><span>{{ student.card }}</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="infoRow">
        <el-col :span="8">
          <div>
            <span class="tag">学生性别 :</span><span>{{ student.sex }}</span>
          </div></el-col
        >
        <el-col :span="8">
          <div>
            <span class="tag">录取学校 :</span
            ><span
              ><b>{{ student.school }}</b></span
            >
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <span class="tag">学生班级 :</span><span>{{ student.class }}</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 填写志愿 -->
    <el-card shadow="hover" class="card">
      <div class="box2">
        <br />
        <h1>第一志愿：{{ volunteer1 }}</h1>
        <br />
        <h1>第二志愿：{{ volunteer2 }}</h1>
        <br />
        <h1>第三志愿：{{ volunteer3 }}</h1>
        <br /></div
    ></el-card>
    <el-button type="danger" @click="changeVolunteer">修改志愿</el-button>
    <br />
    <!-- 修改截止日期，次数tip -->
    <div>
      截止时间{{ danger }}前，您还有<strong style="color: red">{{
        times
      }}</strong
      >次修改机会
    </div>
    <br />
    <!-- 温馨提示 -->
    <div class="tip2">
      <div><b>⚠提示</b></div>
      <div>▪ 该表格填写关系到您今后的录取学校选择，请一定要认真对待</div>
      <div>▪ 截止世界前，每人只有三次志愿修改机会。</div>
      <div>▪ 非本人请勿修改志愿信息。</div>
    </div>
    <br />
  </div>
</template>
<script setup>
import { ref, reactive, computed } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import studentFun from "@/api/student";
import teacherFun from "@/api/teacher";
import { useRouter } from "vue-router";
const router = useRouter();
let student = reactive({
  name: "付小小",
  id: "415567569789",
  card: "365124200103052214",
  sex: "女",
  class: "2023级预科1班",
  school: "湘南学院",
});
let volunteer1 = ref("数学与应用数学");
let volunteer2 = ref("金融工程");
let volunteer3 = ref("软件工程");
let danger = ref("2023.11.09");
let times = ref("2");
function changeVolunteer() {
  // router.push({ path: "/volunteer-fill" });
  router.push({ name: "volunteer-fill" });
}
</script>
<style src="@/assets/css/show-container.css" scoped></style>
<style scoped>
.box {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.tip2 {
  color: gray;
  line-height: 25px;
  margin: 40px 0 40px 0;
  padding: 20px;
  border-top: 1px solid rgba(87, 86, 86, 0.158);
}
.info {
  width: 70%;
  margin: 80px 0 60px 0;
}
.tag {
  display: inline-block;
  margin-right: 15px;
  width: 100px;
  text-align: right;
}
.infoRow {
  margin-bottom: 15px;
}
.box2 {
  width: 100%;
  padding: 2rem 6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.card {
  margin: 40px 0 40px 0;
}
.card:hover {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
.tip2 {
  color: gray;
  line-height: 25px;
  margin: 40px 0 10px 0;
  padding: 40px;
  border-top: 1px solid rgba(87, 86, 86, 0.158);
}
</style>
  