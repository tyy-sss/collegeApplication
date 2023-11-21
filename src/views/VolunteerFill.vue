<!--
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-11-06 22:04:48
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2023-11-09 18:35:11
 * @FilePath: \collegeApplication\src\views\VolunteerFill.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="show-container">
    <div class="title"><div class="text">志愿填报（正式填报）</div></div>
    <hr />
    <div class="box">
      <div class="tip">
        <b>⚠提示：</b><br />
        <div style="margin-left: 20px">
          <span
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
              <span class="tag">学生班级 :</span
              ><span>{{ student.class }}</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 填写志愿 -->
      <div class="box2">
        <el-form-item label="第一志愿 ：">
          <el-cascader
            :options="options"
            placeholder="请输入专业名称"
            :show-all-levels="false"
            v-model="object1"
          />
        </el-form-item>
        <el-form-item label="第二志愿 ：">
          <el-cascader
            :options="options"
            placeholder="请输入专业名称"
            :show-all-levels="false"
            v-model="object2"
          />
        </el-form-item>
        <el-form-item label="第三志愿 ：">
          <el-cascader
            :options="options"
            placeholder="请输入专业名称"
            :show-all-levels="false"
            v-model="object3"
          />
        </el-form-item>
      </div>
      <el-button type="primary">提交志愿</el-button>

      <div class="tip2">
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
  </div>
</template>
<script setup>
let student = {
  name: "付小小",
  id: "415567569789",
  card: "365124200103052214",
  sex: "女",
  class: "2023级预科1班",
  school: "湘南学院",
};
let object1 = null;
let object2 = null;
let object3 = null;
const options = [
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
];
</script>
<style src="@/assets/css/show-container.css" scoped></style>
<style scoped>
hr {
  border-color: #ebf3ff4d;
}
.box {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.tip {
  line-height: 25px;
  padding: 20px;
  margin: 40px 0 40px 0;
  background-color: rgba(172, 171, 171, 0.082);
  box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px,
    rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
}
.tip2 {
  color: gray;
  line-height: 25px;
  margin: 20px 0;
  padding: 20px;
  border-top: 1px solid rgba(87, 86, 86, 0.158);
}
.info {
  width: 70%;
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
  margin: 40px 0 40px 0;
}
</style>
  