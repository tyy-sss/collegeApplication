<!--
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-11-06 22:04:48
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2023-12-28 20:01:40
 * @FilePath: \collegeApplication\src\views\Student.vue
 * @Description: 班级管理页面
-->
<template>
  <div class="show-container">
    <div class="title">
      <div class="text">班级管理 - {{ data.myclass }}</div>
    </div>
    <hr />
    <br />
    <div class="card">
      <!-- 处理盒子 -->
      <div>
        <el-card shadow="hover" class="item">
          🧑 学生总人数： {{ data.page.total }} 人
        </el-card>
      </div>
      <div>
        <el-card shadow="hover" class="item"
          >👧 评测成员人数： {{ data.evaluationData.length }} 人
          <el-button
            type="warning"
            size="small"
            plain
            style="float: right"
            @click="data.dialogVisible3 = true"
            >管理</el-button
          >
        </el-card>
      </div>
      <div>
        <el-card shadow="hover" class="item">
          💬 待处理申述
          <el-button
            type="warning"
            size="small"
            plain
            style="float: right"
            @click="data.dialogVisible = true"
            >处理</el-button
          ></el-card
        >
      </div>
      <!-- <div>
        <el-card shadow="hover" class="item">
          📮 回收站
          <el-button
            type="warning"
            size="small"
            plain
            style="float: right"
            @click="data.dialogVisible2 = true"
            >查看</el-button
          ></el-card
        >
      </div> -->
    </div>
    <br />
    <!-- 处理行 -->
    <div class="search">
      <div class="left">
        <div class="search-item">
          <el-input
            v-model="data.search"
            placeholder="输入学生姓名或学号关键字"
            style="min-width: 300px"
          >
            <template #suffix>
              <el-icon @click="conditionSearch"><Search /></el-icon>
            </template>
          </el-input>
        </div>
      </div>
    </div>
    <div class="box">
      <!-- 班级学生管理列表 -->
      <el-table
        :data="filterTableData"
        :default-sort="{ prop: 'date', order: 'descending' }"
        @selection-change="handleSelectionChange"
        style="width: 100%"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="学生学号" prop="userNumber" />
        <el-table-column label="学生姓名" prop="username" />
        <el-table-column label="班级职位">
          <template #default="scope">
            <span v-if="scope.row.identity == 1">班级成员</span>
            <span v-if="scope.row.identity == 2">测评小组成员</span>
          </template>
        </el-table-column>
        <el-table-column label="本月综测分数" sortable prop="score" />
        <el-table-column label="操作" align="right">
          <template #header>
            <div>
              <el-icon :size="23" color="#409EFC" @click="onReSearch"
                ><Refresh
              /></el-icon>
            </div>
            <!-- <el-input
              v-model="search"
              size="small"
              placeholder="输入学生姓名或学号关键字"
            /> -->
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
      <el-button type="primary" @click="handleRepasswds"
        >批量重置密码</el-button
      >
      <el-button type="primary" @click="handleSetPost">撤销职位</el-button>
      <el-button type="primary" @click="handleSetPost"
        >设为评测小组人员</el-button
      >
      <br />
      <!-- 分页 -->
      <el-pagination
        :page-size="15"
        :pager-count="1"
        layout="prev, pager, next"
        :total="2"
        style="float: right"
      />
      <br />
    </div>
  </div>
  <!-- 对话框1 -->
  <el-dialog v-model="data.dialogVisible" title="💬 待申述处理" width="50%">
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
              >标为已处理</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-dialog>
  <!-- 对话框2 -->
  <!-- <el-dialog v-model="data.dialogVisible2" title="📮 回收站" width="50%">
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
  </el-dialog> -->
  <!-- 对话框3 -->
  <el-dialog v-model="data.dialogVisible3" title="评测小组成员管理" width="50%">
    <div>
      <el-table :data="data.evaluationData" style="width: 100%">
        <el-table-column type="index" />
        <el-table-column label="学生学号" prop="userNumber" min-width="100" />
        <el-table-column label="学生姓名" prop="username" min-width="120" />
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
import { ref, reactive, onMounted, computed } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import teacherFun from "@/api/teacher";
onMounted(() => {
  getDatas();
});
const data = reactive({
  myclass: "2021级预科4班",
  search: "",
  //对话框
  dialogVisible: false,
  // dialogVisible2: false,
  dialogVisible3: false,
  multipleSelection: [],
  studentsData:[],//学生列表
  evaluationData: [],//测评小组列表
  complaintData:[],//申诉列表
  page: {
    total: 200, // 总条数
    currentPage: 1, // 当前页
    pageSize: 8, //一页的数据量
  },

});

//获取数据
function getDatas() {
  // teacherFun.complaint.getAssessments((res)=>{
  //   console.log("申诉列表",res)
  // })
  teacherFun.class
    .updateInformation({
      userNumber: null,
      username: null,
      role: null,
      rank: 0,
      current: 1,
      size: 15,
    })
    .then((res) => {
      console.log(res);
      data.studentsData = res.records;
      data.page.total=res.total;
      //填装测评小组列表
      data.studentsData.forEach((item) => {
        if (item.identity == 2) {
          data.evaluationData.push(item);
        }
      });
    });
}
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
//多选选项改变
const handleSelectionChange = (val) => {
  data.multipleSelection = val;
};
//条件搜索
function conditionSearch() {
  //条件搜索
}
//搜索逻辑
const filterTableData = computed(() =>
  data.studentsData.filter(
    (d) =>
      !d.search ||
      d.username.includes(data.search) ||
      d.userNumber.includes(data.search)
  )
);
//重置密码
const handleRepasswd = (index, row) => {
  console.log("重置密码", index, row);
};
//批量重置密码
const handleRepasswds = () => {
  console.log("批量重置密码", data.multipleSelection);
};
//详细信息(可编辑)
const handleEdit = (index, row) => {
  console.log("详细信息(可编辑)", index, row);
};
//删除申诉项
const handleDelete = (index, row) => {
  console.log("删除申诉项", index, row);
};
//重置测评账号密码
const handleRecover2 = (index, row) => {
  console.log("重置测评账号密码", index, row);
};
//撤销评测小组人员账号
const handleFired = (index, row) => {
  console.log("撤销评测小组人员账号", index, row);
};
// //恢复回收站项
// const handleRecover = (index, row) => {
//   console.log("恢复回收站项", index, row);
// };
//学生列表
// const studentsData = ref([
//   {
//     username: "杨世博",
//     userNumber: "2022100029",
//     identity: 1,
//     score: 110,
//   },
//   {
//     username: "李珊",
//     userNumber: "2022100030",
//     identity: 1,
//     score: 80,
//   },
//   {
//     username: "涂圆元",
//     userNumber: "2022100031",
//     identity: 1,
//     score: 40,
//   },
//   {
//     username: "陈翔",
//     userNumber: "2022100032",
//     identity: 1,
//     score: 110,
//   },
//   {
//     username: "周威宇",
//     userNumber: "2022100033",
//     identity: 2,
//     score: 64,
//   },
//   {
//     username: "王君月",
//     userNumber: "2022100034",
//     identity: 2,
//     score: 77,
//   },
//   {
//     username: "彭政",
//     userNumber: "2022100035",
//     identity: 2,
//     score: 88,
//   },
//   {
//     username: "罗义恒",
//     userNumber: "2022100036",
//     identity: 2,
//     score: 77,
//   },
//   {
//     username: "文凯",
//     userNumber: "2022100037",
//     identity: 2,
//     score: 67,
//   },
//   {
//     username: "周建政",
//     userNumber: "2022100038",
//     identity: 2,
//     score: 98,
//   },
// ]);
// 申诉列表
// const complaintData = [
//   {
//     date: "2023-05-07",
//     id: "2022100030",
//     name: "杨世博",
//     content: "个人信息性别错误，需要更改为男",
//   },
//   {
//     date: "2023-05-11",
//     name: "李珊",
//     id: "2022100030",
//     content: "综测1月加分计算错误，少加了1分英语竞赛二等奖分",
//   },
//   {
//     date: "2023-05-24",
//     name: "涂圆元",
//     id: "2022100031",
//     content: "个人信息民族错误，需要更改为土家族",
//   },
//   {
//     date: "2023-05-11",
//     name: "陈翔",
//     id: "2022100032",
//     content: "综测1月加分计算错误，少加了3分软件杯全国二等奖分",
//   },
//   {
//     date: "2023-05-12",
//     name: "刘橙晨",
//     id: "2022100040",
//     content: "个人信息目标学校错误，需要修改为‘长沙学院’",
//   },
// ];
//测评小组成员列表
// const evaluationData = [
//   {
//     username: "杨世博",
//     userNumber: "2022100029",
//   },
//   {
//     username: "李珊",
//     userNumber: "2022100030",
//   },
//   {
//     username: "涂圆元",
//     userNumber: "2022100031",
//   },
//   {
//     username: "陈翔",
//     userNumber: "2022100032",
//   },
//   {
//     username: "周威宇",
//     userNumber: "2022100033",
//   },
//   {
//     username: "王君月",
//     userNumber: "2022100034",
//   },
// ];
// 垃圾箱列表
// const dustbinData = [
//   {
//     date: "2023-05-07",
//     id: "2022100030",
//     name: "杨世博",
//     content: "个人信息性别错误，需要更改为男",
//   },
//   {
//     date: "2023-05-11",
//     name: "李珊",
//     id: "2022100030",
//     content: "综测1月加分计算错误，少加了1分英语竞赛二等奖分",
//   },
//   {
//     date: "2023-05-24",
//     name: "涂圆元",
//     id: "2022100031",
//     content: "个人信息民族错误，需要更改为土家族",
//   },
//   {
//     date: "2023-05-11",
//     name: "陈翔",
//     id: "2022100032",
//     content: "综测1月加分计算错误，少加了3分软件杯全国二等奖分",
//   },
//   {
//     date: "2023-05-12",
//     name: "刘橙晨",
//     id: "2022100040",
//     content: "个人信息目标学校错误，需要修改为‘长沙学院’",
//   },
// ];
</script>
<style src="@/assets/css/show-container.css" scoped></style>
<style src="@/assets/css/search-top-left-right.css" scoped/>
<style scoped>
.box {
  margin: 10px 0 20px 0;
}
.card {
  /* grid布局 */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  grid-gap: 20px 20px;
  grid-auto-rows: 50px;
  grid-auto-flow: row dense;
}
.item {
  text-align: left;
}
</style>
  