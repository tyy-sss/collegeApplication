<!--
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-11-06 22:04:48
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2024-03-18 22:30:23
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
        <el-card shadow="hover" class="item"
          >⚙ 综测流程管理
          <el-button
            type="warning"
            size="small"
            plain
            style="float: right"
            @click="data.dialogVisible2 = true"
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
      <!-- <el-button type="primary" @click="handleDeletePosts">撤销职位</el-button> -->
      <el-button type="primary" @click="handleSetPosts"
        >设为评测小组人员</el-button
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
  <!-- 对话框2 -->
  <el-dialog v-model="data.dialogVisible2" title="⚙ 综测流程管理" width="40%">
    <div>
      <el-select
        v-model="data.curMonth"
        placeholder="请选择要查询的综测月份"
        style="width: 100px; margin-right: 1rem"
        @change="getAssessmentDetails"
      >
        <el-option
          v-for="item in data.monthes"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      开启本月电子签名确认期:
      <el-switch v-model="data.isEnd" :disabled="data.isEnd == null" />
      <br /><br />
      <div style="color: rgba(14, 13, 13, 0.493)">
        当您开启按钮时,学生和测评小组端将会开放电子签名确认综测入口.
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="data.dialogVisible2 = false">取消</el-button>
        <el-button type="primary" @click="changeAssessState">
          确认修改
        </el-button>
      </div>
    </template>
  </el-dialog>
  <!-- 对话框3 -->
  <el-dialog v-model="data.dialogVisible3" title="评测小组成员管理" width="50%">
    <div>
      <el-table
        v-loading.lock="data.evaluationTableLoading"
        :data="data.evaluationData"
        style="width: 100%"
      >
        <el-table-column type="expand">
          <template #default="props">
            <div style="margin-left: 6rem">
              <h3>
                【{{ props.row.username }}】所负责班级成员列表（{{
                  props.row.appraisalTeamMemberVos.length
                }}人）
              </h3>
              <el-table
                :data="props.row.appraisalTeamMemberVos"
                :border="childBorder"
              >
                <el-table-column label="班级成员" prop="username" />
                <el-table-column label="学号" prop="userNumber" />
                <!-- <el-table-column label="操作">
                  <template #default="scope">
                    <el-button
                      size="small"
                      @click="handleRecover2(scope.$index, scope.row)"
                      >切换综测小组负责人</el-button
                    >
                  </template>
                </el-table-column> -->
              </el-table>
            </div>
          </template>
        </el-table-column>
        <el-table-column type="index" />
        <el-table-column
          label="测评小组账号"
          prop="userNumber"
          min-width="100"
        />
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
      <div style="float: right">
        <el-button type="primary" @click="allocat">一键分配班级成员</el-button>
        <el-button
          type="danger"
          @click="revokeAllocat"
          style="margin-right: 2rem"
          >一键撤销成员分配</el-button
        >
      </div>
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
import { ref, reactive, onMounted, computed } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { getMonthName } from "@/assets/js/utils/month";
import teacherFun from "@/api/teacher";
import apiFun from "@/api/user";
onMounted(() => {
  init();
});
const data = reactive({
  myclass: "2021级预科4班",
  search: "",
  dialogVisible: false,
  dialogVisible2: false,
  dialogVisible3: false,
  drawer: false,
  drawer2: false,
  // multipleSelection: [],
  studentsData: [], //学生列表
  evaluationData: [], //测评小组列表
  //申诉列表
  complaintData: [],
  page: {
    total: 200, // 总条数
    currentPage: 1, // 当前页
    pageSize: 8, //一页的数据量
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
  curMonth: 2, //测试默认值
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
  getComplaintsDeatils();
  getStudentDeatils();
  getAssessmentStudent();
  getAssessmentMonth();
  getAssessmentDetails();
  getClass();
}
//获取申诉列表数据
function getComplaintsDeatils() {
  teacherFun.complaint.getAssessments().then((res) => {
    console.log("申诉列表", res);
    data.complaintData = res;
  });
}
//获取学生列表数据
function getStudentDeatils() {
  data.studentTableLoading = true;
  console.log("SDF");
  teacherFun.class
    .updateInformation({
      keyword: data.search,
      role: null,
      rank: 0,
      current: data.page.currentPage,
      size: 12,
    })
    .then((res) => {
      console.log("学生信息：", res);
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
    console.log("获取测评小组成员列表数据", res);
    data.evaluationData = res;
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
  console.log(`current page: ${val}`);
  data.page.currentPage = val;
  getStudentDeatils();
};
//获取可选月份方法
function getAssessmentMonth() {
  apiFun.user.getAssessmentsMonth().then((res) => {
    console.log("获取可选月份方法:", res);
    res.forEach((item) => {
      console.log(item);
      data.monthes.push({
        value: item,
        label: getMonthName(item),
      });
    });
  });
}
//获取当月情况
function getAssessmentDetails() {
  teacherFun.assessment
    .getAssessmentsProcess({
      month: data.curMonth,
    })
    .then((res) => {
      console.log(res);
      data.isEnd = res;
    });
}
//修改选择月综测情况
function changeAssessState() {
  console.log("修改选择月情况,月：", data.curMonth, ",状态：", data.isEnd);
  teacherFun.assessment
    .updateAssessmentState({
      month: data.curMonth,
      end: data.isEnd,
    })
    .then((res) => {
      data.dialogVisible2 = false;
      ElMessage.success(res);
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
  // console.log("重置密码列表：",dealArray)
  teacherFun.class.updateStudentPassword(dealArray).then((res) => {
    ElMessage.success(res);
    toggleSelection();
  });
};
//批量撤销测评小组职位
const handleDeletePosts = () => {
  const dealArray = [];
  multipleSelection.value.forEach((item) => {
    dealArray.push(item.userNumber);
  });
  teacherFun.class.deleteAssessPost(dealArray).then((res) => {
    ElMessage.success(res);
    multipleSelection.value.forEach((item) => {
      item.identity = 1;
    });
    toggleSelection();
  });
};
//批量设置测评小组职位
const handleSetPosts = () => {
  const dealArray = [];
  multipleSelection.value.forEach((item) => {
    dealArray.push(item.userNumber);
  });
  teacherFun.class.setAssessPost(dealArray).then((res) => {
    ElMessage.success(res);
    multipleSelection.value.forEach((item) => {
      item.identity = 2;
    });
    getAssessmentStudent();
    toggleSelection();
  });
};
//刷新按钮
function onReSearch() {
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
      console.log("AFSDF", data.updataData.idCard);
      teacherFun.class.updateStudentInformation(data.updataData).then((res) => {
        ElMessage.success(res);
        Object.keys(data.updataData).forEach(
          (key) => (data.updataData[key] = null)
        ); //快速清空内容
        console.log("ssssss", data.updataData);
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
//撤销评测小组人员账号
const handleFired = (index, row) => {
  ElMessageBox.confirm(
    `确定要撤销【${row.username}】的测评小组账号吗？
    提示：该操作一旦执行将无法撤销以及恢复数据，且分配给【${row.username}】的学生将暂时处于无测评人员负责状态。`
  )
    .then(() => {
      // console.log(row.userNumber)
      teacherFun.class.deleteAssessPost([row.userNumber]).then((res) => {
        ElMessage.success("撤销成功");
        data.evaluationData.splice(index, 1);
      });
    })
    .catch(() => {});
};
//一键分配成员给测评小组成员
function allocat() {
  teacherFun.class.averageAllocated().then((res) => {
    ElMessage.success(res);
    getAssessmentStudent();
  });
}
//一键撤销成员分配
function revokeAllocat() {
  teacherFun.class.revokeAllocated().then((res) => {
    ElMessage.success(res);
    getAssessmentStudent();
  });
}
//筛选器
const filterTag = (value, row) => {
  // console.log(row.state, value, row);
  return row.state == value;
};
// //申诉列表
// complaintData: [
//   {
//     appealId: "111",
//     created: "2023-05-07",
//     userNumber: "2022100030",
//     username: "杨世博",
//     content: "个人信息性别错误，需要更改为男",
//     state: 1,
//     type: true,
//   },
// ],
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
<style lang="scss" scoped>
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

.mybox {
  padding: 0 0 1rem 0;
}
.littleTitle {
  margin-bottom: 2rem;
  font-weight: 1000;
}
.tag {
  display: inline-block;
  margin-right: 1rem;
  width: 5rem;
  text-align: right;
}
.infoRow {
  margin-bottom: 1rem;
}
.pickup_box {
  width: 50%;
  padding: 0.8rem;
  background-color: rgba(224, 230, 230, 0.438);
}
.flex_box {
  display: flex;
  flex-direction: column;
}
.grid-item {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
  gap: 1rem 1.2rem;
  grid-auto-flow: row dense;
}
</style>
  