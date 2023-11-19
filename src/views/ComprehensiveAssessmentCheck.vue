<!--
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-11-06 22:50:19
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2023-11-19 20:46:46
 * @FilePath: \collegeApplication\src\views\StudentComprehensiveAssessment.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="show-container">
    <div class="text">个人综测查看</div>
    <hr />
    <div class="article">
      <div class="article__body">
        <div class="tag">哈哈哈</div>
        <button class="article__button--primary">primary按钮</button>
        <button class="article__button--success">success按钮</button>
      </div>
    </div>
  </div>
</template>
<script setup>
const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
];
let state = "未到确认时间";
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

<style lang="scss" scoped>
hr {
  border-color: #ebf3ff4d;
}
.article {
  max-width: 1200px;
  &__body{
    padding: 20px;
  }
  &__button{
    padding: 5px 8px;
    &--primary{background:blue;}
    &--success{background:red;}
  }
}
</style>
  