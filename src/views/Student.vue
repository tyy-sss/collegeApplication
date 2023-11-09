<template>
  <div class="show-container">
    <div class="text">班级管理 - {{ myclass }}</div>
    <hr />
    <br />
    <div class="card">
      <el-row :gutter="12">
        <el-col :span="6">
          <el-card shadow="Hover">
            🧑 本班学生总人数： {{ studentNum }} 人
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover"
            >👧 本班评测小组成员人数： {{ studentNum }} 人
            <el-button type="warning" size="small" plain style="float: right"
              >管理</el-button
            >
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="Hover">
            💬 待处理申述
            <el-button type="warning" size="small" plain style="float: right"
              >处理</el-button
            ></el-card
          >
        </el-col>
        <el-col :span="6">
          <el-card shadow="Hover"> 📮 回收站 <el-button type="warning" size="small" plain style="float: right"
              >查看</el-button
            ></el-card>
        </el-col>
      </el-row>
    </div>
    <div class="box">
      <el-table
        :data="filterTableData"
        :default-sort="{ prop: 'date', order: 'descending' }"
        ref="multipleTableRef"
        @selection-change="handleSelectionChange"
        style="width: 100%"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="学生学号" sortable prop="id" />
        <el-table-column label="学生姓名" prop="name" />
        <el-table-column label="身份证号" prop="card" />
        <el-table-column label="当前班级综测排名" sortable prop="num" />
        <el-table-column label="最新更新" sortable width="180" prop="date" />
        <el-table-column align="right">
          <template #header>
            <el-input
              v-model="search"
              size="small"
              placeholder="输入学生姓名或学生职位关键字"
            />
          </template>
          <template #default="scope">
            <el-button
              size="small"
              @click="handleRepasswd(scope.$index, scope.row)"
              >重置密码</el-button
            >
            <el-button
              size="small"
              type="primary"
              @click="handleDelete(scope.$index, scope.row)"
              >修改职位</el-button
            >
            <el-button
              size="small"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
              >详细资料</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <br />
      <el-button>重置密码</el-button>
      <br />
      <el-pagination
        :page-size="20"
        :pager-count="13"
        layout="prev, pager, next"
        :total="1000"
        style="float: right"
      />
      <br />
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from "vue";
let studentNum = 50;
let myclass = "2021级预科4班";
const multipleTableRef = ref();
const multipleSelection = ref([]);
const handleSelectionChange = (val) => {
  multipleSelection.value = val;
  console.log(val);
};
const search = ref("");
const filterTableData = computed(() =>
  studentsData.filter(
    (data) =>
      !search.value ||
      data.name.includes(search.value) ||
      data.post.includes(search.value)
  )
);
const handleRepasswd = (index, row) => {
  console.log(index, row);
};
const handleEdit = (index, row) => {
  console.log(index, row);
};
const handleDelete = (index, row) => {
  console.log(index, row);
};

const studentsData = [
  {
    date: "2023-05-07",
    name: "杨世博",
    id: "2022100029",
    card: "433130200301178510",
    num: 1,
    post: "测评小组成员",
  },
  {
    date: "2023-05-11",
    name: "李珊",
    id: "2022100030",
    card: "433130200301178510",
    num: 2,
    post: "测评小组成员",
  },
  {
    date: "2023-05-24",
    name: "涂圆元",
    id: "2022100031",
    card: "433130200301178510",
    num: 3,
    post: "测评小组成员",
  },
  {
    date: "2023-05-11",
    name: "陈翔",
    id: "2022100032",
    card: "433130200301178510",
    num: 4,
    post: "测评小组成员",
  },
  {
    date: "2023-05-18",
    name: "周威宇",
    id: "2022100033",
    card: "433130200301178510",
    num: 5,
    post: "测评小组成员",
  },
  {
    date: "2023-05-12",
    name: "王君月",
    id: "2022100034",
    card: "433130200301178510",
    num: 6,
    post: "班级成员",
  },
  {
    date: "2023-05-07",
    name: "彭政",
    id: "2022100035",
    card: "433130200301178510",
    num: 7,
    post: "班级成员",
  },
  {
    date: "2023-05-06",
    name: "罗义恒",
    id: "2022100036",
    card: "433130200301178510",
    num: 8,
    post: "班级成员",
  },
  {
    date: "2023-05-05",
    name: "文凯",
    id: "2022100037",
    card: "433130200301178510",
    num: 9,
    post: "班级成员",
  },
  {
    date: "2023-05-12",
    name: "周建政",
    id: "2022100038",
    card: "433130200301178510",
    num: 10,
    post: "班级成员",
  },
  {
    date: "2023-05-12",
    name: "周雷鸣",
    id: "2022100039",
    card: "433130200301178510",
    num: 11,
    post: "班级成员",
  },
  {
    date: "2023-05-12",
    name: "刘橙晨",
    id: "2022100040",
    card: "433130200301178510",
    num: 12,
    post: "班级成员",
  },
  {
    date: "2023-05-12",
    name: "张玉娟",
    id: "2022100041",
    card: "433130200301178510",
    num: 13,
    post: "班级成员",
  },
];
</script>
<style src="@/assets/css/show-container.css" scoped></style>
<style scoped>
hr {
  border-color: #ebf3ff4d;
}
.box {
  margin: 20px 0 20px 0;
}
</style>
  