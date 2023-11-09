<!--
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-11-06 22:04:48
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2023-11-09 02:24:36
 * @FilePath: \collegeApplication\src\views\VolunteerFill.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="show-container">
    <div class="text">志愿填报（正式填报）</div>
    <hr />
    <br />
    <div style="display: block" class="info">
      <el-descriptions>
        <el-descriptions-item label="学生姓名">{{
          student.name
        }}</el-descriptions-item>
        <el-descriptions-item label="学生学号">{{
          student.id
        }}</el-descriptions-item>
        <el-descriptions-item label="身份证号">{{
          student.card
        }}</el-descriptions-item>
        <el-descriptions-item label="学生性别">
          {{ student.sex }}
        </el-descriptions-item>
        <el-descriptions-item label="录取学校"
          ><b>{{ student.school }}</b></el-descriptions-item
        >
        <el-descriptions-item label="学生班级">{{
          student.class
        }}</el-descriptions-item>
      </el-descriptions>
    </div>
    <br />
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
let object1=null
let object2=null
let object3=null
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
</style>
  