<!--
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-11-06 22:04:48
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2024-03-31 15:50:27
 * @FilePath: \collegeApplication\src\views\VolunteerFill.vue
 * @Description: 志愿填报页面
-->
<template>
  <div class="box column-center-flex">
    <!-- 提示信息 -->
    <div class="tip">
      <div class="tip-margin">
        <span class="red-tip"
          >▪
          首要提醒：该表格填写关系到您今后的录取学校选择,请一定要认真对待。</span
        ><br />
        <span>▪ 您的志愿顺序直接影响您能否进入理想的学校和专业。</span><br />
        <span>▪ 一旦提交后很难更改,请三思而后行。</span><br />
        <span>▪ 不要因为随意填写而影响自己的人生规划。</span><br />
        <span
          >▪
          志愿选择关系到您未来四年的学习生活。请在充分研究和与家长商量后进行。</span
        ><br />
        <span>▪ 不要因为轻视或草率而影响自己的大学生涯。</span>
      </div>
    </div>
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
    <!-- 填写志愿 -->
    <div class="volunteers-box">
      <el-form-item label="第一志愿 ：">
        <el-cascader
          :options="data.options"
          placeholder="请输入专业名称"
          :show-all-levels="false"
          :props="props"
          v-model="data.volunteers.firstName"
        />
      </el-form-item>
      <el-form-item label="第二志愿 ：">
        <el-cascader
          :options="data.options"
          placeholder="请输入专业名称"
          :show-all-levels="false"
          :props="props"
          v-model="data.volunteers.secondName"
        />
      </el-form-item>
      <el-form-item label="第三志愿 ：">
        <el-cascader
          :options="data.options"
          placeholder="请输入专业名称"
          :show-all-levels="false"
          :props="props"
          v-model="data.volunteers.thirdName"
        />
      </el-form-item>
    </div>
    <el-button type="primary" @click="submitVolunteer">提交志愿</el-button>
    <br />
    <!-- 填报记录 -->
    <el-popover
      :width="300"
      popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
    >
      <template #reference>
        <el-icon><InfoFilled /></el-icon>
      </template>
      <template #default>
        <div>
          <h3>您的上一次的志愿填报数据：</h3>
          <br />
          <span
            >第一志愿 :<b>{{
              data.originVolunteers.firstName || "暂无数据"
            }}</b></span
          ><br />
          <span
            >第二志愿 :<b>{{
              data.originVolunteers.secondName || "暂无数据"
            }}</b></span
          ><br />
          <span
            >第三志愿 :<b>{{
              data.originVolunteers.thirdName || "暂无数据"
            }}</b></span
          >
        </div>
      </template>
    </el-popover>
    <!-- 说明 -->
    <div class="tip top-border">
      <div><b>说明</b></div>
      <br />
      <div><b>志愿分流规则</b></div>
      <div>
        使用的志愿录取规则可能是第一志愿机制或平行志愿机制，请了解各校具体政策。
      </div>
      <br />
      <div><b>专业选择范围</b></div>
      <div>
        系统根据您的学业背景和各所录取学校的要求，已为您预先筛选可选择的志愿。不符合条件的专业和学校在列表中呈现不可选的状态
      </div>
    </div>
  </div>
  <!-- 电子签名对话框 -->
  <el-dialog v-model="data.dialogVisible" title="提交志愿" width="50%">
    <div>
      <div class="dialog-margin">
        <span>您的第一,第二,第三志愿分别为</span><br />
        <b>第一志愿：{{ data.first[0] }}</b
        ><br />
        <b>第二志愿：{{ data.second[0] }}</b
        ><br />
        <b>第三志愿：{{ data.third[0] }}</b
        ><br />
        <span>请确认准确无误后提交</span><br /><br />
      </div>
      <signatures @finish="finish"></signatures>
    </div>
  </el-dialog>
</template>
<script setup>
import signatures from "@/components/utils/Signatures.vue";
import { ref, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import volunteerFun from "@/api/volunteer";
import studentFun from "@/api/student";
import { useRouter } from "vue-router";
const router = useRouter();
const props = {
  emitPath: false, //绑定的内容只获取最后一级的value值。
};
const data = reactive({
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
  },
  originVolunteers: {},
  options: [],
  first: [],
  second: [],
  third: [],
  volunteerId: null,
  dialogVisible: false,
});
onMounted(() => {
  init();
});
function init() {
  data.volunteerId = router.currentRoute.value.query.id;
  data.originVolunteers = router.currentRoute.value.query.originVolunteers;
  getInformation();
  selectStudentMajor();
}
//获取基本信息
function getInformation() {
  studentFun.user.getInformation().then((res) => {
    data.student = res;
  });
}
//获取可选专业选项
function selectStudentMajor() {
  volunteerFun.options.selectStudentMajor().then((res) => {
    let myOptions = [];
    for (let i = 0; i < res.length; i++) {
      let college = res[i].college;
      let majors = res[i].majors;
      let children = [];
      for (let j = 0; j < majors.length; j++) {
        children.push({
          value: majors[j].name + "&" + majors[j].majorId,
          label: majors[j].name,
        });
      }
      myOptions.push({
        value: college,
        label: college,
        children: children,
      });
    }
    data.options = myOptions;
  });
}
//提交志愿进行签名按钮
function submitVolunteer() {
  if (
    data.volunteers.firstName[0] == null ||
    data.volunteers.secondName[0] == null ||
    data.volunteers.thirdName[0] == null ||
    checkDuplicate(
      data.volunteers.firstName[0],
      data.volunteers.secondName[0],
      data.volunteers.thirdName[0]
    )
  ) {
    ElMessage.error(
      "任何一项志愿不能为空，且不能选择相同志愿，请认真完成志愿填报"
    );
  } else {
    data.first = splitString(data.volunteers.firstName);
    data.second = splitString(data.volunteers.secondName);
    data.third = splitString(data.volunteers.thirdName);
    data.dialogVisible = true;
  }
}
//查重
function checkDuplicate(str1, str2, str3) {
  if (str1 === str2 || str1 === str3 || str2 === str3) {
    return true;
  } else {
    return false;
  }
}
//签名后提交数据和电子签名
function finish(file) {
  const formData = new FormData();
  formData.append("file", file);
  volunteerFun.basis
    .modifyWise(
      {
        first: parseInt(data.first[1]), //第一志愿
        firstName: data.first[0], //第一志愿
        second: parseInt(data.second[1]), //第二志愿
        secondName: data.second[0], //第二志愿
        third: parseInt(data.third[1]), //第三志愿
        thirdName: data.third[0], //第三志愿
        timeId: data.originVolunteers.timeId, //时间段id
      },
      formData
    )
    .then((res) => {
      router.replace({ name: "volunteer-table" });
      ElMessage({
        type: "success",
        message: "提交志愿成功",
      });
    });
}
//处理数据:"专业名称&专业编号"=>["专业名称",专业编号]
function splitString(str) {
  return str.split("&");
}
</script>
<style src="@/assets/css/show-container.css" scoped></style>
<style src="@/assets/css/student/volunteerFill.scss" lang="scss" scoped/>