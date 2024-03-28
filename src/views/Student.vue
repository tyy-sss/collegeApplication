<!--
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-11-06 22:04:48
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2024-03-28 16:34:05
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
      <div>
        <el-card shadow="hover" class="item">
          🧑 学生总人数： {{ data.page.total }} 人
        </el-card>
      </div>
      <div>
        <el-card shadow="hover" class="item"
          >⚙ 综测小组账号管理
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
              <el-icon @click="getStudentDeatils"><Search /></el-icon>
            </template>
          </el-input>
        </div>
      </div>
    </div>
    <div class="box">
      <!-- 班级学生管理列表 -->
      <el-table
        v-loading.lock="data.studentTableLoading"
        ref="multipleTableRef"
        :data="data.studentsData"
        @selection-change="handleSelectionChange"
        style="width: 100%"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="学生学号" prop="userNumber" />
        <el-table-column label="学生姓名" prop="username" />
        <el-table-column label="本月综测分数" prop="appraisalScore" />
        <el-table-column label="操作" align="right">
          <template #header>
            <div>
              <el-icon :size="23" color="#409EFC" @click="onReSearch"
                ><Refresh
              /></el-icon>
            </div>
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
      <br />
      <!-- 分页 -->
      <el-pagination
        :page-size="data.page.pageSize"
        :pager-count="10"
        layout="total,prev, pager, next"
        :total="data.page.total"
        @current-change="handleCurrentChange"
        style="float: right"
      />
      <br />
    </div>
  </div>
  <!-- 对话框1 -->
  <el-dialog v-model="data.dialogVisible" title="💬 待申述处理" width="60%">
    <div>
      <el-table :data="data.complaintData">
        <el-table-column type="index" />
        <el-table-column label="申诉学生姓名" prop="username" min-width="120" />
        <el-table-column label="学号" prop="userNumber" min-width="120" />
        <el-table-column label="申诉内容" prop="content" min-width="300" />
        <el-table-column
          label="申诉时间"
          prop="created"
          min-width="200"
          sortable
        />
        <el-table-column
          label="申诉状态"
          width="100"
          :filters="[
            { text: '待处理', value: '0' },
            { text: '已处理', value: '1' },
            { text: '已撤销', value: '2' },
          ]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template #default="scope">
            <el-tag
              :type="
                scope.row.state === 0
                  ? ''
                  : scope.row.state === 1
                  ? 'success'
                  : 'info'
              "
              disable-transitions
            >
              <span v-if="scope.row.state == 0">待处理</span>
              <span v-if="scope.row.state == 1">已处理</span>
              <span v-if="scope.row.state == 2">已撤销</span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              size="small"
              type="danger"
              v-if="scope.row.state == 1 || scope.row.state == 2"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
            <el-button
              size="small"
              type="success"
              v-if="scope.row.state == 0"
              @click="handleDeal(scope.$index, scope.row)"
              >完成</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-dialog>
  <!-- 对话框3 -->
  <el-dialog v-model="data.dialogVisible3" title="评测小组账号管理" width="50%">
    <div>
      <el-table
        v-loading.lock="data.evaluationTableLoading"
        :data="data.evaluationData"
        style="width: 100%"
      >
        <el-table-column
          label="测评小组账号"
          prop="userNumber"
          min-width="100"
        />
        <el-table-column label="账号名" prop="username" min-width="120" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              size="small"
              type="danger"
              @click="handleRecover2(scope.$index, scope.row)"
              >重置密码</el-button
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
  <!-- 学生信息抽屉 -->
  <el-drawer v-model="data.drawer" direction="btt" style="min-height: 50%">
    <template #header>
      <h3>学生信息</h3>
      <el-button
        type="primary"
        style="margin-right: 1rem"
        @click="
          data.drawer = false;
          data.drawer2 = true;
        "
        >修改学生信息</el-button
      >
    </template>
    <template #default>
      <div>
        <!-- 信息区 -->
        <div class="right">
          <div class="mybox">
            <div class="littleTitle">基本信息</div>
            <div class="grid-item">
              <div>
                <span class="tag">学生姓名 :</span
                ><span>{{ data.student.username || "-" }}</span>
              </div>
              <div>
                <span class="tag">学生学号 :</span
                ><span>{{ data.student.userNumber || "-" }}</span>
              </div>
              <div>
                <span class="tag">身份证号 :</span
                ><span>{{ data.student.idCard || "-" }}</span>
              </div>
              <div>
                <span class="tag">联系电话 :</span
                ><span>{{ data.student.phone || "-" }}</span>
              </div>
              <div>
                <span class="tag">父母电话 :</span
                ><span>{{ data.student.parentPhone || "-" }}</span>
              </div>
              <div>
                <span class="tag">学生性别 :</span
                ><span>{{ data.student.sex || "-" }}</span>
              </div>
              <div>
                <span class="tag">学生班级 :</span
                ><span>{{ data.student.className || "-" }}</span>
              </div>
            </div>
            <div style="margin-top: 1rem">
              <span class="tag">家庭地址 :</span
              ><span>{{ data.student.address || "-" }}</span>
            </div>
          </div>
          <hr />
          <br />
          <div class="mybox">
            <div class="littleTitle">其他信息</div>
            <div class="grid-item">
              <div>
                <span class="tag">政治面貌 :</span
                ><span>{{ data.student.politicsStatus || "-" }}</span>
              </div>
              <div>
                <span class="tag">目标学校 :</span
                ><span>{{ data.student.school || "-" }}</span>
              </div>
              <div>
                <span class="tag">民族 :</span
                ><span>{{ data.student.nation || "-" }}</span>
              </div>
              <div>
                <span class="tag">来源省份 :</span
                ><span>{{ data.student.province || "-" }}</span>
              </div>
              <div>
                <span class="tag">性质计划 :</span
                ><span>{{ data.student.plan || "-" }}</span>
              </div>
              <div>
                <span class="tag">选考科目 :</span>
                <span
                  v-for="(item, index) in data.student.subjects"
                  :key="index"
                  >{{ item }}&nbsp;</span
                >
              </div>
            </div>
          </div>
          <hr />
          <br />
          <div class="mybox">
            <div class="littleTitle">收件信息</div>
            <div class="flex_box pickup_box">
              <div class="infoRow">
                <span class="tag">收件人 :</span>
                <span>{{ data.consignee.username || "-" }}</span>
              </div>
              <div class="infoRow">
                <span class="tag">收件电话 :</span>
                <span>{{ data.consignee.phone || "-" }}</span>
              </div>
              <div class="infoRow">
                <span class="tag">详细地址 :</span>
                <span>{{ data.consignee.address || "-" }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </el-drawer>
  <!-- 修改学生信息抽屉 -->
  <el-drawer v-model="data.drawer2" direction="ttb" style="min-height: 50%">
    <!-- 标题 -->
    <template #header>
      <h4>修改资料</h4>
    </template>
    <!-- 内容区 -->
    <template #default>
      <div class="littleTitle">基本信息</div>
      <div class="grid-item">
        <el-form-item label="学生姓名 ：">
          <el-input
            v-model="data.updataData.username"
            :placeholder="data.student.username || '-'"
          />
        </el-form-item>
        <el-form-item label="身份证号 ：">
          <el-input
            v-model="data.updataData.idCard"
            :placeholder="data.student.idCard || '-'"
          />
        </el-form-item>
        <el-form-item label="联系电话 ：">
          <el-input
            v-model="data.updataData.phone"
            :placeholder="data.student.phone || '-'"
          />
        </el-form-item>
        <el-form-item label="父母电话 ：">
          <el-input
            v-model="data.updataData.parentPhone"
            :placeholder="data.student.parentPhone || '-'"
          />
        </el-form-item>
        <el-form-item label="学生性别 ：">
          <el-input
            v-model="data.updataData.sex"
            :placeholder="data.student.sex || '-'"
          />
        </el-form-item>
        <el-form-item label="家庭地址 ：">
          <el-input
            v-model="data.updataData.address"
            :placeholder="data.student.address || '-'"
          />
        </el-form-item>
      </div>
      <hr />
      <br />
      <div class="littleTitle">其他信息</div>
      <div class="grid-item">
        <el-form-item label="政治面貌 ：">
          <el-input
            v-model="data.updataData.politicsStatus"
            :placeholder="data.student.politicsStatus || '-'"
          />
        </el-form-item>
        <el-form-item label="民族 ：">
          <el-input
            v-model="data.updataData.nation"
            :placeholder="data.student.nation || '-'"
          />
        </el-form-item>
      </div>
    </template>
    <!-- 尾部按钮区 -->
    <template #footer>
      <div style="flex: auto">
        <el-button @click="data.drawer = false">取消</el-button>
        <el-button type="primary" @click="confirmClick">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { getMonthName } from "@/assets/js/utils/month";
import teacherFun from "@/api/teacher";
import apiFun from "@/api/user";
onMounted(() => {
  init();
});
const data = reactive({
  myclass: "- 级- 班",
  search: "",
  dialogVisible: false,
  dialogVisible3: false,
  drawer: false,
  drawer2: false,
  studentsData: [], //学生列表
  evaluationData: [], //测评小组列表
  complaintData: [], //申诉列表
  page: {
    total: 200,
    currentPage: 1,
    pageSize: 8,
  },
  student: {}, //学生信息
  consignee: {}, //学生收件信息
  updataData: {
    userNumber: null,
    username: null,
    sex: null,
    idCard: null,
    politicsStatus: null,
    nation: null,
    address: null,
    phone: null,
    parentPhone: null,
  }, //修改资料数据
  studentTableLoading: false,
  evaluationTableLoading: false,
  curMonth: null, //测试默认值
  monthes: [
    // {
    //   value: "1",
    //   label: "一月",
    // },
    // {
    //   value: "2",
    //   label: "二月",
    // },
    // {
    //   value: "3",
    //   label: "三月",
    // },
    // {
    //   value: "4",
    //   label: "四月",
    // },
  ],
  isEnd: null,
});
const multipleTableRef = ref();
const multipleSelection = ref([]);
//获取数据
function init() {
  getStudentDeatils(); //获取学生列表数据
  getAssessmentStudent(); //获取测评小组成员列表数据
  getAssessmentMonth(); //获取可选月份方法
  getClass(); //获取班级
  getComplaintsDeatils(); //获取申诉列表数据
}
//获取申诉列表数据
function getComplaintsDeatils() {
  teacherFun.complaint.getAssessments().then((res) => {
    data.complaintData = res;
  });
}
//获取学生列表数据
function getStudentDeatils() {
  data.studentTableLoading = true;
  teacherFun.class
    .updateInformation({
      keyword: data.search,
      role: null,
      rank: 0,
      current: data.page.currentPage,
      size: 12,
    })
    .then((res) => {
      data.studentsData = res.records;
      data.page.currentPage = res.current;
      data.page.pageSize = res.size;
      data.page.total = res.total;
      data.studentTableLoading = false;
    });
}
//获取测评小组成员列表数据
function getAssessmentStudent() {
  data.evaluationTableLoading = true;
  teacherFun.assessment.getAssessmentStudent().then((res) => {
    data.evaluationData = [res];
    data.evaluationTableLoading = false;
  });
}
//获取班级
function getClass() {
  teacherFun.user.getInformation().then((res) => {
    data.myclass = res.className;
  });
}
//多选选项改变
const handleSelectionChange = (val) => {
  multipleSelection.value = val;
};
//清空多选项
const toggleSelection = (rows) => {
  if (rows) {
    rows.forEach((row) => {
      multipleTableRef.value.toggleRowSelection(row, undefined);
    });
  } else {
    multipleTableRef.value.clearSelection();
  }
};
//改变分页页数
const handleCurrentChange = (val) => {
  data.page.currentPage = val;
  getStudentDeatils();
};
//获取可选月份方法
function getAssessmentMonth() {
  apiFun.user.getAssessmentsMonth().then((res) => {
    res.reverse();
    data.curMonth = res[0];
    // getAssessmentDetails();
    res.forEach((item) => {
      data.monthes.push({
        value: item,
        label: getMonthName(item),
      });
    });
  });
}
//重置密码
const handleRepasswd = (index, row) => {
  teacherFun.class.updateStudentPassword([row.userNumber]).then((res) => {
    ElMessage.success(res);
  });
};
//批量重置密码
const handleRepasswds = () => {
  const dealArray = [];
  multipleSelection.value.forEach((item) => {
    dealArray.push(item.userNumber);
  });
  if (dealArray.length !== 0) {
    teacherFun.class.updateStudentPassword(dealArray).then((res) => {
      ElMessage.success(res);
      toggleSelection();
    });
  }
};
//刷新按钮
function onReSearch() {
  data.search = "";
  getStudentDeatils();
}
//详细信息
const handleEdit = (index, row) => {
  teacherFun.class
    .getStudentInformation({
      number: row.userNumber,
    })
    .then((res) => {
      data.student = res;
      data.consignee = res.consignee;
      data.drawer = true;
    });
};
//修改资料
function confirmClick() {
  ElMessageBox.confirm("确定进行资料修改吗")
    .then(() => {
      data.drawer2 = false;
      data.updataData.userNumber = data.student.userNumber; //必须传回去被修改用户的学号，否则无法确定修改的是哪个学生的信息
      //修改资料接口
      teacherFun.class.updateStudentInformation(data.updataData).then((res) => {
        ElMessage.success(res);
        Object.keys(data.updataData).forEach(
          (key) => (data.updataData[key] = null)
        ); //快速清空内容
      });
    })
    .catch(() => {});
}
//删除申诉项
const handleDelete = (index, row) => {
  teacherFun.complaint.deleteComplaint([row.appealId]).then((res) => {
    data.complaintData.splice(index, 1);
    ElMessage.success(res);
  });
};
//处理申诉项
const handleDeal = (index, row) => {
  teacherFun.complaint.dealComplaint(row.appealId).then((res) => {
    row.state = 1;
    ElMessage.success(res);
  });
};
//重置测评小组学生账号密码
const handleRecover2 = (index, row) => {
  ElMessageBox.confirm(`确定要重置【${row.username}】的测评小组账号的密码吗？`)
    .then(() => {
      teacherFun.class
        .updateAssessPassword({
          userNumber: row.userNumber,
        })
        .then((res) => {
          ElMessage.success(res);
        });
    })
    .catch(() => {});
};
//筛选器
const filterTag = (value, row) => {
  // console.log(row.state, value, row);
  return row.state == value;
};
</script>
<style src="@/assets/css/show-container.css" scoped></style>
<style src="@/assets/css/search-top-left-right.css" scoped/>
<style src="@/assets/css/teacher/studentManage.scss" lang="scss" scoped/>