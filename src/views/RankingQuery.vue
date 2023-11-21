<!--
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-11-06 22:48:59
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2023-11-21 20:40:55
 * @FilePath: \collegeApplication\src\views\StudentInfo.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="show-container">
    <div class="title"><div class="text">查询排名</div></div>
    <hr />
    <div class="box">
      <!-- 填写志愿 -->
      <div class="left">
        <el-form-item label="学校 ：">
          <el-cascader
            :options="options"
            placeholder="请输入学校名称"
            :show-all-levels="false"
            v-model="object1"
          />
        </el-form-item>
        <el-form-item label="专业 ：">
          <el-cascader
            :options="options"
            placeholder="请输入专业名称"
            :show-all-levels="false"
            v-model="object2"
          />
        </el-form-item>
        <el-form-item label="省份 ：">
          <el-cascader
            :options="options"
            placeholder="请输入省份名称"
            :show-all-levels="false"
            v-model="object3"
          />
        </el-form-item>
        <br />
        <div class="button_box">
          <el-button type="primary">查询排名</el-button>
          <el-button type="danger">历史查询</el-button>
        </div>
      </div>
      <div class="right">
        <br /><br /><br /><br />
        <h3>您的排名是：</h3>
        <br />
        <h2>{{ num }}</h2>
      </div>
    </div>
    <div class="tip_box">
      <div class="tip2">
        <div><b>说明</b></div>
        <br />
        <div><b>查询排名字段</b></div>
        <div>
          您可以限定学校，专业，省份，依据预填报情况查看该限定条件下您的排名。
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
let num = "?";
</script>
<style src="@/assets/css/show-container.css" scoped></style>
<style scoped>
hr {
  border-color: #ebf3ff4d;
}
.box {
  width: 60%;
  height: 410px;
  margin: 90px auto;
  border-radius: 15px 15px 15px 15px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
}
.left {
  width: 50%;
  padding: 100px;
  height: 410px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(184, 198, 226, 0.041);
  border-radius: 15px 0 0 15px;
  float: left;
}
.right {
  width: 50%;
  padding: 100px;
  height: 410px;
  border-radius: 0 15px 15px 0;
  background-color: rgba(255, 192, 203, 0.144);
  float: left;
  text-align: center;
}
.button_box {
  display: flex;
  justify-content: center;
}
.tip_box {
  display: flex;
  justify-content: center;
}
.tip2 {
  width: 60%;
  color: gray;
  line-height: 25px;
  margin: 20px 0;
  padding: 30px 200px;
  border-top: 1px solid rgba(87, 86, 86, 0.158);
}
</style>
  