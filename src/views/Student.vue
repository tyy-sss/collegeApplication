<template>
  <div class="show-container">
    <div class="title">
      <div class="text">班级管理 - {{ myclass }}</div>
    </div>
    <hr />
    <br />
    <div class="card">
      <!-- 处理盒子 -->
      <el-row :gutter="12">
        <el-col :span="6">
          <el-card shadow="hover">
            🧑 学生总人数： {{ studentNum }} 人
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover"
            >👧 评测小组成员人数： {{ cadreNum }} 人
            <el-button
              type="warning"
              size="small"
              plain
              style="float: right"
              @click="dialogVisible3 = true"
              >管理</el-button
            >
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            💬 待处理申述
            <el-button
              type="warning"
              size="small"
              plain
              style="float: right"
              @click="dialogVisible = true"
              >处理</el-button
            ></el-card
          >
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            📮 回收站
            <el-button
              type="warning"
              size="small"
              plain
              style="float: right"
              @click="dialogVisible2 = true"
              >查看</el-button
            ></el-card
          >
        </el-col>
      </el-row>
    </div>
    <div class="box">
      <!-- 班级学生管理列表 -->
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
        <el-table-column label="班级职位" prop="post" />
        <el-table-column label="当前班级综测排名" sortable prop="num" />
        <el-table-column label="最新更新" sortable width="180" prop="date" />
        <el-table-column align="right">
          <template #header>
            <el-input
              v-model="search"
              size="small"
              placeholder="输入学生姓名或班级职位关键字"
            />
          </template>
          <template #default="scope">
            <el-button
              size="small"
              type="danger"
              @click="handleRepasswd(scope.$index, scope.row)"
              >重置密码</el-button
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
      <el-button type="danger" @click="handleRepasswds">批量重置密码</el-button>
      <br />
      <!-- 分页 -->
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
  <!-- 对话框1 -->
  <el-dialog v-model="dialogVisible" title="💬 待申述处理" width="50%">
    <div>
      <el-table :data="complaintData" style="width: 100%">
        <el-table-column type="index" />
        <el-table-column label="申诉学生姓名" prop="name" min-width="120" />
        <el-table-column label="学号" prop="id" min-width="100" />
        <el-table-column label="申诉内容" prop="content" min-width="300" />
        <el-table-column
          label="申诉时间"
          sortable
          prop="date"
          min-width="100"
        />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >移入回收站</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-dialog>
  <!-- 对话框2 -->
  <el-dialog v-model="dialogVisible2" title="📮 回收站" width="50%">
    <div>
      <el-table :data="dustbinData" style="width: 100%">
        <el-table-column type="index" />
        <el-table-column label="申诉学生姓名" prop="name" min-width="120" />
        <el-table-column label="学号" prop="id" min-width="100" />
        <el-table-column label="申诉内容" prop="content" min-width="300" />
        <el-table-column
          label="申诉时间"
          sortable
          prop="date"
          min-width="100"
        />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              size="small"
              @click="handleRecover(scope.$index, scope.row)"
              >恢复</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <br />
      <el-button type="danger" size="small">清空回收站</el-button>
    </div>
  </el-dialog>
  <!-- 对话框3 -->
  <el-dialog v-model="dialogVisible3" title="评测小组成员管理" width="50%">
    <div>
      <el-table :data="evaluationData" style="width: 100%">
        <el-table-column type="index" />
        <el-table-column label="学生学号" prop="id" min-width="100" />
        <el-table-column label="学生姓名" prop="name" min-width="120" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              size="small"
              @click="handleRecover2(scope.$index, scope.row)"
              >重置密码</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleFired(scope.$index, scope.row)"
              >撤销职位</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <br />
      <span style="color: gray"
        >【这里的重置密码指的是重置测评小组账号的密码为学生学号后6位】</span
      >
    </div>
  </el-dialog>
</template>
<script setup>
import { ref, reactive, computed } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import studentFun from "@/api/student";
import teacherFun from "@/api/teacher";
import { useRouter } from "vue-router";

const router = useRouter();
let studentNum = 50;
let cadreNum = 6;
let myclass = "2021级预科4班";
//多选
const multipleTableRef = ref();
const multipleSelection = ref([]);
const handleSelectionChange = (val) => {
  multipleSelection.value = val;
  console.log(val);
};
const search = ref("");
//搜索逻辑
const filterTableData = computed(() =>
  studentsData.filter(
    (data) =>
      !search.value ||
      data.name.includes(search.value) ||
      data.post.includes(search.value)
  )
);
//重置密码
const handleRepasswd = (index, row) => {
  console.log("重置密码", index, row);
};
//批量重置密码
const handleRepasswds = () => {
  console.log("批量重置密码", multipleSelection.value);
};
//详细信息(可编辑)
const handleEdit = (index, row) => {
  console.log("详细信息(可编辑)", index, row);
};
//对话框
const dialogVisible = ref(false);
const dialogVisible2 = ref(false);
const dialogVisible3 = ref(false);
//删除申诉项
const handleDelete = (index, row) => {
  console.log("删除申诉项", index, row);
};
//恢复回收站项
const handleRecover = (index, row) => {
  console.log("恢复回收站项", index, row);
};
//重置测评账号密码
const handleRecover2 = (index, row) => {
  console.log("重置测评账号密码", index, row);
};
//撤销评测小组人员账号
const handleFired = (index, row) => {
  console.log("撤销评测小组人员账号", index, row);
};
// 申诉列表
const complaintData = [
  {
    date: "2023-05-07",
    id: "2022100030",
    name: "杨世博",
    content: "个人信息性别错误，需要更改为男",
  },
  {
    date: "2023-05-11",
    name: "李珊",
    id: "2022100030",
    content: "综测1月加分计算错误，少加了1分英语竞赛二等奖分",
  },
  {
    date: "2023-05-24",
    name: "涂圆元",
    id: "2022100031",
    content: "个人信息民族错误，需要更改为土家族",
  },
  {
    date: "2023-05-11",
    name: "陈翔",
    id: "2022100032",
    content: "综测1月加分计算错误，少加了3分软件杯全国二等奖分",
  },
  {
    date: "2023-05-12",
    name: "刘橙晨",
    id: "2022100040",
    content: "个人信息目标学校错误，需要修改为‘长沙学院’",
  },
];
// 学生列表
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
// 垃圾列表
const dustbinData = [
  {
    date: "2023-05-07",
    id: "2022100030",
    name: "杨世博",
    content: "个人信息性别错误，需要更改为男",
  },
  {
    date: "2023-05-11",
    name: "李珊",
    id: "2022100030",
    content: "综测1月加分计算错误，少加了1分英语竞赛二等奖分",
  },
  {
    date: "2023-05-24",
    name: "涂圆元",
    id: "2022100031",
    content: "个人信息民族错误，需要更改为土家族",
  },
  {
    date: "2023-05-11",
    name: "陈翔",
    id: "2022100032",
    content: "综测1月加分计算错误，少加了3分软件杯全国二等奖分",
  },
  {
    date: "2023-05-12",
    name: "刘橙晨",
    id: "2022100040",
    content: "个人信息目标学校错误，需要修改为‘长沙学院’",
  },
];
const evaluationData = [
  {
    name: "杨世博",
    id: "2022100029",
  },
  {
    name: "李珊",
    id: "2022100030",
  },
  {
    name: "涂圆元",
    id: "2022100031",
  },
  {
    name: "陈翔",
    id: "2022100032",
  },
  {
    name: "周威宇",
    id: "2022100033",
  },
  {
    name: "王君月",
    id: "2022100034",
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
  