<!--
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-11-06 22:04:48
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2024-01-24 16:48:50
 * @FilePath: \collegeApplication\src\views\VolunteerFill.vue
 * @Description: 志愿填报页面
-->
<template>
  <div class="box column-center-flex">
    <div class="tip">
      <div style="margin-left: 20px">
        <span style="color: rgb(163, 6, 6)"
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
  <el-dialog v-model="dialogVisible" title="提交志愿" width="50%">
    <div>
      <div style="margin-left: 1rem">
        <span>您的第一,第二,第三志愿分别为</span><br />
        <b>第一志愿：{{ data.volunteers.firstName }}</b
        ><br />
        <b>第二志愿：{{ data.volunteers.secondName }}</b
        ><br />
        <b>第三志愿：{{ data.volunteers.thirdName }}</b
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
import { ElMessageBox, ElMessage } from "element-plus";
import volunteerFun from "@/api/volunteer";
import studentFun from "@/api/student";
import { useRouter } from "vue-router";
const router = useRouter();
const props = {
  emitPath: false, //绑定的内容只获取最后一级的value值。
};
const data = reactive({
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
  },
  originVolunteers: {},
  options: [
    {
      value: "学院1",
      label: "学院1",
      children: [
        {
          value: "汉语言文学（师范）",
          label: "汉语言文学（师范）",
        },
        {
          value: "旅游管理",
          label: "旅游管理",
        },
      ],
    },
    {
      value: "学院2",
      label: "学院2",
      children: [
        {
          value: "文化产业管理",
          label: "文化产业管理",
        },
        {
          value: "视觉传达设计",
          label: "视觉传达设计",
        },
        {
          value: "漫画设计",
          label: "漫画设计",
        },
      ],
    },
    {
      value: "学院3",
      label: "学院3",
      children: [
        {
          value: "药物科学",
          label: "药物科学",
        },
        {
          value: "动物医学",
          label: "动物医学",
        },
        {
          value: "法医",
          label: "法医",
        },
      ],
    },
  ],
});
// 提交志愿
let dialogVisible = ref(false);
onMounted(() => {
  init();
});
function init() {
  data.originVolunteers = router.currentRoute.value.query.originVolunteers;
  console.log("志愿情况初始值initDetial:", data.originVolunteers);
  //获取可选专业选项
  volunteerFun.options.selectStudentMajor().then((res) => {
    console.log("获取可选专业选项:", res);
    // 假设原始数据保存在变量data中
    let myOptions = [];
    for (let i = 0; i < res.length; i++) {
      let college = res[i].college;
      let majors = res[i].majors;
      let children = [];
      for (let j = 0; j < majors.length; j++) {
        children.push({
          value: majors[j].majorId,
          label: majors[j].name,
        });
      }
      myOptions.push({
        value: college,
        label: college,
        children: children,
      });
    }
    console.log("我的可选专业选项是：", myOptions);
    data.options = myOptions;
  });
  // //获取初始专业选择
  // data.volunteers.firstName = data.originVolunteers.firstName;
  // data.volunteers.secondName = data.originVolunteers.secondName;
  // data.volunteers.thirdName = data.originVolunteers.thirdName;
}
function submitVolunteer() {
  if (
    data.volunteers.firstName == null ||
    data.volunteers.secondName == null ||
    data.volunteers.thirdName == null
  ) {
    ElMessage.error("志愿不能为空，请认真完成志愿填报");
  } else {
    dialogVisible.value = true;
  }
}
//签名后提交数据和电子签名
function finish(sign) {
  console.log("签名img的base64", sign);
  studentFun.sign.submitSignature(sign).then((res) => {
    //提交志愿接口(成功需要把志愿剩余次数减一)
    volunteerFun.basis
      .modifyWise({
        id: initDetial.id, //志愿填报id
        userId: initDetial.userId, //用户id
        first: 0, //第一志愿
        firstName: "", //第一志愿
        second: 0, //第二志愿
        secondName: "", //第二志愿
        third: 0, //第三志愿
        thirdName: "", //第三志愿
        timeId: initDetial.timeId, //时间段id
      })
      .then((res) => {
        console.log("提交志愿结果", res);
        router.push({ name: "volunteer-check" });
        ElMessage({
          type: "success",
          message: "提交志愿成功",
        });
      });
  });
}
</script>
<style src="@/assets/css/show-container.css" scoped></style>
<style lang="scss" scoped>
$small-margin: 1rem;
$big-margin: 3rem;
.box {
  width: 100%;
}
.tip {
  color: gray;
  line-height: 1.5rem;
  margin: $small-margin 0 $small-margin 0;
  padding: 3rem;
}
.top-border {
  border-top: 0.1rem solid rgba(87, 86, 86, 0.158);
}
.info-box {
  width: 80%;
  margin: $small-margin 0 $small-margin 0;
}
.tag {
  width: 7rem;
  display: inline-block;
  margin-right: $small-margin;
  text-align: right;
}
.volunteers-box {
  margin: $big-margin 0;
}
.grid-item {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  gap: 1rem 1.2rem;
  grid-auto-flow: row dense;
}
</style>
  