<!--
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-11-28 21:00:57
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2023-12-03 10:31:39
 * @FilePath: \collegeApplication\src\views\Volunteer.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="show-container">
    <div class="title"><div class="text">志愿填报情况</div></div>

    <hr />
    <h1>{{ myclass }}班级志愿填报情况</h1>
    <br />
    <div style="height: 40px">
      <span style="float: left">学生姓名: &nbsp;</span>
      <el-input
        style="float: left; width: 20%"
        v-model="search"
        size="small"
        placeholder="输入学生姓名关键字"
      />
      <el-button style="float: right" @click="handleExcelExport"
        ><el-icon><Download /></el-icon>&nbsp; 导出</el-button
      >
    </div>
    <el-table
      :data="filterTableData"
      style="min-width: 100px"
      @cell-mouse-enter="handleCellEnter"
      @cell-mouse-leave="handleCellLeave"
    >
      <el-table-column prop="target" label="目标学校" />
      <el-table-column prop="num" label="序号" width="80" />
      <el-table-column prop="province" label="省份" />
      <el-table-column prop="class" label="班级" width="60" />
      <el-table-column prop="id" label="学号" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="sex" label="性别" width="60" />
      <el-table-column prop="category" label="科类" />
      <el-table-column prop="selectSubjects" label="选考科目" />
      <el-table-column prop="grades" label="分流成绩" />
      <el-table-column label="志愿情况" fixed="right">
        <el-table-column prop="voluntary1" label="一志愿" />
        <el-table-column prop="voluntary2" label="二志愿" />
        <el-table-column prop="voluntary3" label="三志愿愿" />
      </el-table-column>
    </el-table>
      <!-- 分页 -->
      <div class="pagination">
      <el-pagination
        :page-size="7"
        :pager-count="5"
        layout="prev, pager, next"
        :total="60"
        style="margin-left: auto;"
      />
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, computed } from "vue";
import { volunteerHeader } from "@/assets/js/excel/format/volunteer";
import { export_json_to_excel } from "@/assets/js/excel/excel-export-multi";
let myclass = "2023级1班";
const search = ref("");
const filterTableData = computed(() =>
  assessments.filter(
    (data) => !search.value || data.name.includes(search.value)
  )
);
const assessments = reactive([
  {
    target: "吉首大学",
    num: "470",
    province: "贵州",
    class: "7",
    id: "20222113002",
    name: "玉苏普·吐荪江",
    sex: "男",
    category: "理工",
    selectSubjects: "生物+地理",
    grades: "78.233",
    voluntary1: "医学检验技术",
    voluntary2: "护理学",
    voluntary3: "软件工程",
  },
  {
    target: "吉首大学",
    num: "470",
    province: "贵州",
    class: "7",
    id: "20222113002",
    name: "玉苏普·吐荪江",
    sex: "男",
    category: "理工",
    selectSubjects: "生物+地理",
    grades: "78.233",
    voluntary1: "医学检验技术",
    voluntary2: "护理学",
    voluntary3: "软件工程",
  },
  {
    target: "吉首大学",
    num: "470",
    province: "贵州",
    class: "7",
    id: "20222113002",
    name: "玉苏普·吐荪江",
    sex: "男",
    category: "理工",
    selectSubjects: "生物+地理",
    grades: "78.233",
    voluntary1: "医学检验技术",
    voluntary2: "护理学",
    voluntary3: "软件工程",
  },
  {
    target: "吉首大学",
    num: "470",
    province: "贵州",
    class: "7",
    id: "20222113002",
    name: "玉苏普·吐荪江",
    sex: "男",
    category: "理工",
    selectSubjects: "生物+地理",
    grades: "78.233",
    voluntary1: "医学检验技术",
    voluntary2: "护理学",
    voluntary3: "软件工程",
  },
  {
    target: "吉首大学",
    num: "470",
    province: "贵州",
    class: "7",
    id: "20222113002",
    name: "玉苏普·吐荪江",
    sex: "男",
    category: "理工",
    selectSubjects: "生物+地理",
    grades: "78.233",
    voluntary1: "医学检验技术",
    voluntary2: "护理学",
    voluntary3: "软件工程",
  },
  {
    target: "吉首大学",
    num: "470",
    province: "贵州",
    class: "7",
    id: "20222113002",
    name: "玉苏普·吐荪江",
    sex: "男",
    category: "理工",
    selectSubjects: "生物+地理",
    grades: "78.233",
    voluntary1: "医学检验技术",
    voluntary2: "护理学",
    voluntary3: "软件工程",
  },
  {
    target: "吉首大学",
    num: "470",
    province: "贵州",
    class: "7",
    id: "20222113002",
    name: "玉苏普·吐荪江",
    sex: "男",
    category: "理工",
    selectSubjects: "生物+地理",
    grades: "78.233",
    voluntary1: "医学检验技术",
    voluntary2: "护理学",
    voluntary3: "软件工程",
  },
  {
    target: "吉首大学",
    num: "470",
    province: "贵州",
    class: "7",
    id: "20222113002",
    name: "玉苏普·吐荪江",
    sex: "男",
    category: "理工",
    selectSubjects: "生物+地理",
    grades: "78.233",
    voluntary1: "医学检验技术",
    voluntary2: "护理学",
    voluntary3: "软件工程",
  },
  {
    target: "吉首大学",
    num: "470",
    province: "贵州",
    class: "7",
    id: "20222113002",
    name: "玉苏普·吐荪江",
    sex: "男",
    category: "理工",
    selectSubjects: "生物+地理",
    grades: "78.233",
    voluntary1: "医学检验技术",
    voluntary2: "护理学",
    voluntary3: "软件工程",
  },
  {
    target: "吉首大学",
    num: "470",
    province: "贵州",
    class: "7",
    id: "20222113002",
    name: "玉苏普·吐荪江",
    sex: "男",
    category: "理工",
    selectSubjects: "生物+地理",
    grades: "78.233",
    voluntary1: "医学检验技术",
    voluntary2: "护理学",
    voluntary3: "软件工程",
  },
  {
    target: "吉首大学",
    num: "470",
    province: "贵州",
    class: "7",
    id: "20222113002",
    name: "玉苏普·吐荪江",
    sex: "男",
    category: "理工",
    selectSubjects: "生物+地理",
    grades: "78.233",
    voluntary1: "医学检验技术",
    voluntary2: "护理学",
    voluntary3: "软件工程",
  },
  {
    target: "吉首大学",
    num: "470",
    province: "贵州",
    class: "7",
    id: "20222113002",
    name: "玉苏普·吐荪江",
    sex: "男",
    category: "理工",
    selectSubjects: "生物+地理",
    grades: "78.233",
    voluntary1: "医学检验技术",
    voluntary2: "护理学",
    voluntary3: "软件工程",
  },
  {
    target: "吉首大学",
    num: "470",
    province: "贵州",
    class: "7",
    id: "20222113002",
    name: "玉苏普·吐荪江",
    sex: "男",
    category: "理工",
    selectSubjects: "生物+地理",
    grades: "78.233",
    voluntary1: "医学检验技术",
    voluntary2: "护理学",
    voluntary3: "软件工程",
  },
  {
    target: "吉首大学",
    num: "470",
    province: "贵州",
    class: "7",
    id: "20222113002",
    name: "玉苏普·吐荪江",
    sex: "男",
    category: "理工",
    selectSubjects: "生物+地理",
    grades: "78.233",
    voluntary1: "医学检验技术",
    voluntary2: "护理学",
    voluntary3: "软件工程",
  },
]);
// 数据excel导出
const handleExcelExport = () => {
  export_json_to_excel(
    volunteerHeader,
    assessments,
    `${myclass}班级志愿填报情况表`
  );
};
</script>
<style src="@/assets/css/show-container.css" scoped></style>
<style lang="scss" scoped>
hr {
  border-color: #ebf3ff4d;
}
h1 {
  margin-top: 30px;
  text-align: center;
}
.pagination{
  display: flex;
}
</style>