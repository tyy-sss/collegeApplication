<!--
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-11-06 22:04:48
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2023-12-14 21:25:26
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
          <span class="tag">学生姓名 :</span><span>{{ student.name }}</span>
        </div>
        <div>
          <span class="tag">学生学号 :</span><span>{{ student.id }}</span>
        </div>
        <div>
          <span class="tag">身份证号 :</span><span>{{ student.card }}</span>
        </div>
        <div>
          <span class="tag">学生性别 :</span><span>{{ student.sex }}</span>
        </div>
        <div>
          <span class="tag">录取学校 :</span
          ><span
            ><b>{{ student.school }}</b></span
          >
        </div>
        <div>
          <span class="tag">学生班级 :</span><span>{{ student.class }}</span>
        </div>
      </div>
    </div>
    <!-- 填写志愿 -->
    <div class="volunteers-box">
      <el-form-item label="第一志愿 ：">
        <el-cascader
          :options="options"
          placeholder="请输入专业名称"
          :show-all-levels="false"
          v-model="volunteers.object1"
        />
      </el-form-item>
      <el-form-item label="第二志愿 ：">
        <el-cascader
          :options="options"
          placeholder="请输入专业名称"
          :show-all-levels="false"
          v-model="volunteers.object2"
        />
      </el-form-item>
      <el-form-item label="第三志愿 ：">
        <el-cascader
          :options="options"
          placeholder="请输入专业名称"
          :show-all-levels="false"
          v-model="volunteers.object3"
        />
      </el-form-item>
    </div>
    <el-button type="primary" @click="submitVolunteer">提交志愿</el-button>

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
</template>
<script setup>
import { ref, reactive, computed } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import studentFun from "@/api/student";
import { useRouter } from "vue-router";
const router = useRouter();
let student = {
  name: "付小小",
  id: "415567569789",
  card: "365124200103052214",
  sex: "女",
  class: "2023级预科1班",
  school: "湘南学院",
};
// 志愿
let volunteers = reactive({
  object1: null,
  object2: null,
  object3: null,
});
const options = reactive([
  {
    value: "计算机科学与工程学院",
    label: "计算机科学与工程学院",
    children: [
      {
        value: "软件工程",
        label: "软件工程",
      },
      {
        value: "物联网工程",
        label: "物联网工程",
      },
      {
        value: "人工智能",
        label: "人工智能",
        disabled: true,
      },
      {
        value: "大数据网络",
        label: "大数据网络",
        disabled: true,
      },
    ],
  },
  {
    value: "美术学院",
    label: "美术学院",
    children: [
      {
        value: "服装设计",
        label: "服装设计",
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
    value: "医学院",
    label: "医学院",
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
]);
// 提交志愿
function submitVolunteer() {
  ElMessageBox.confirm(
    `您的第一,第二,第三志愿分别为${volunteers.object1},${volunteers.object2},${volunteers.object3},请确认准确无误后提交。`,
    "Warning",
    {
      confirmButtonText: "确认提交",
      cancelButtonText: "返回修改",
      type: "warning",
    }
  )
    .then(() => {
      //提交志愿接口(成功需要把志愿剩余次数减一)
      // studentFun.user.updataVolunteer().then((res) => {
      //   if (res.code === 200) {
      //提交志愿到服务端
      router.push({ name: "volunteer-check" });
      ElMessage({
        type: "success",
        message: "提交志愿成功",
      });
      //   }
      // });
    })
    .catch(() => {});
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
  