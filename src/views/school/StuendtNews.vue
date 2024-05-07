<template>
  <div class="show-container">
    <div class="title">
      <div class="text" @click="changeidentity">个人信息</div>
    </div>
    <hr />
    <br />
    <!-- 学生信息 -->
    <div class="student" v-loading.lock="data.loading2">
      <!-- 证件照区 -->
      <div class="left" v-loading.lock="data.loading">
        <input
          type="file"
          id="fileInput"
          class="fileInput"
          v-on:change="handleFileSelect($event)"
        />
        <div class="imgBox">
          <el-image class="passport" :src="data.avatar" fit="scale-down">
            <template #placeholder>
              <div class="image-slot">请上传证件照</div>
            </template></el-image
          >
        </div>
      </div>
      <!-- 信息区 -->
      <div class="right" v-if="userId">
        <el-form
          ref="ruleFormRef"
          label-position="right"
          :model="data.student"
          :rules="data.rules"
        >
          <div class="box">
            <div class="littleTitle">基本信息</div>
            <div class="grid-item">
              <el-form-item label="学生姓名 :" prop="username">
                <el-input v-model="data.student.username"></el-input>
              </el-form-item>
              <el-form-item label="学生学号 :" prop="userNumber">
                <el-input v-model="data.student.userNumber"></el-input>
              </el-form-item>
              <el-form-item label="身份证号 :" prop="idCard">
                <el-input v-model="data.student.idCard"></el-input>
              </el-form-item>
              <el-form-item label="联系电话 :" prop="phone">
                <el-input v-model="data.student.phone"></el-input>
              </el-form-item>
              <el-form-item label="父母电话 :" prop="parentPhone">
                <el-input v-model="data.student.parentPhone"></el-input>
              </el-form-item>
              <el-form-item label="学生性别 :" prop="sex">
                <el-radio-group v-model="data.student.sex" class="ml-4">
                  <el-radio label="男">男</el-radio>
                  <el-radio label="女">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="学生班级 :" prop="className">
                <el-select v-model="data.student.className" class="m-2">
                  <el-option
                    v-for="item in data.classList"
                    :key="item.classId"
                    :label="item.className"
                    :value="item.classId"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="家庭地址 :" prop="address">
                <el-input v-model="data.student.address"></el-input>
              </el-form-item>
            </div>
          </div>
          <hr />
          <br />
          <div class="box">
            <div class="littleTitle">其他信息</div>
            <div class="grid-item">
              <el-form-item label="政治面貌 :" prop="politicsStatus">
                <el-select
                  v-model="data.student.politicsStatus"
                  class="m-2"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in politicsStatusList"
                    :key="item"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="目标学校 :" prop="schoolId">
                <el-select v-model="data.student.schoolId" class="m-2">
                  <el-option
                    v-for="item in data.schoolList"
                    :key="item.schoolId"
                    :label="item.name"
                    :value="item.schoolId"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="民族 :" prop="nation">
                <el-autocomplete
                  v-model="data.student.nation"
                  :fetch-suggestions="queryEthniGroupString"
                  clearable
                  class="inline-input w-50"
                  @select="handleSelectEthnicGroup"
                />
              </el-form-item>
              <el-form-item label="来源省份 :" prop="province">
                <el-input v-model="data.student.province"></el-input>
              </el-form-item>
              <el-form-item label="性质计划 :" prop="plan">
                <el-input v-model="data.student.plan"></el-input>
              </el-form-item>
            </div>
            <el-col :span="24">
              <el-form-item label="选课科目:" prop="subjects">
                <el-checkbox-group v-model="data.student.subjects">
                  <el-checkbox
                    v-for="subject in data.subjectList"
                    :key="subject"
                    :label="subject"
                  >
                    {{ subject }}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item></el-col
            >
          </div>
          <hr />
          <br />
          <div class="box">
            <div class="littleTitle">收件信息</div>
            <div class="flex_box pickup_box">
              <el-form-item label="收件人 :" prop="consignee.username">
                <el-input v-model="data.student.consignee.username"></el-input>
              </el-form-item>
              <el-form-item label="收件电话 :" prop="consignee.phone">
                <el-input v-model="data.student.consignee.phone"></el-input>
              </el-form-item>
              <el-form-item label="详细地址 :" prop="consignee.address">
                <el-input v-model="data.student.consignee.address"></el-input>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
      <div class="right" v-if="userNumber">
        <div class="box">
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
          <div class="address">
            <span class="tag">家庭地址 :</span
            ><span>{{ data.student.address || "-" }}</span>
          </div>
        </div>
        <hr />
        <br />
        <div class="box">
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
              <span v-for="(item, index) in data.student.subjects" :key="index"
                >{{ item }}&nbsp;</span
              >
            </div>
          </div>
        </div>
        <hr />
        <br />
        <div class="box">
          <div class="littleTitle">收件信息</div>
          <div class="flex_box pickup_box">
            <div class="infoRow">
              <span class="tag">收件人 :</span>
              <span>{{ data.student.consignee.username || "-" }}</span>
            </div>
            <div class="infoRow">
              <span class="tag">收件电话 :</span>
              <span>{{ data.student.consignee.phone || "-" }}</span>
            </div>
            <div class="infoRow">
              <span class="tag">详细地址 :</span>
              <span>{{ data.student.consignee.address || "-" }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 按钮区 -->
      <div class="btnBox" v-if="userId">
        <el-button type="primary" class="changeInfo" @click="confirmClick"
          >修改资料</el-button
        >
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  NAME_TEST,
  ACCOUNT_TEST,
  PHONE_TEST,
  IDENTITY_TEST,
} from "@/constants/regular-expression";
import {
  nationList,
  politicsStatusList,
} from "@/assets/js/data/information-dropdown-data";
import { NOW_YEAR } from "@/constants/date";
import managerFun from "@/api/manager";
import { useRoute } from "vue-router";
import teacherFun from "@/api/teacher";
// 获得路由显示的学校id
const route = new useRoute();
const userId = Number(ref(route.query.userId).value);
const userNumber = Number(ref(route.query.userNumber).value);

// 验证信息
const validateElectiveSubject = (rule, value, callback) => {
  if (value.length !== 3) {
    callback(new Error("科目数应该为3个"));
  }
  callback();
};
const data = reactive({
  loading: false,
  loading2: false,
  avatar: "",
  student: {
    consignee: {},
  },
  rules: {
    username: [
      { required: true, message: "请输入姓名", trigger: "blur" },
      { pattern: NAME_TEST, message: "请输入正确的姓名", trigger: "blur" },
    ],
    userNumber: [
      { required: true, message: "请输入", trigger: "blur" },
      { pattern: ACCOUNT_TEST, message: "请输入正确的账号", trigger: "blur" },
    ],
    idCard: [
      {
        pattern: IDENTITY_TEST,
        message: "请输入正确的身份证号",
        trigger: "blur",
      },
    ],
    sex: [{ required: true, message: "请输入性别", trigger: "blur" }],
    className: [{ required: true, message: "请输入", trigger: "blur" }],
    schoolId: [{ required: true, message: "请输入", trigger: "blur" }],
    province: [{ required: true, message: "请输入", trigger: "blur" }],
    subjects: [
      { required: true, message: "请输入", trigger: "blur" },
      { validator: validateElectiveSubject, trigger: "blur" },
    ],

    phone: [
      {
        pattern: PHONE_TEST,
        message: "请输入正确的手机号",
        trigger: "blur",
      },
    ],
    parentPhone: [
      {
        pattern: PHONE_TEST,
        message: "请输入正确的手机号",
        trigger: "blur",
      },
    ],
    "consignee.username": [
      { pattern: NAME_TEST, message: "请输入正确的姓名", trigger: "blur" },
    ],
    "consignee.phone": [
      {
        pattern: PHONE_TEST,
        message: "请输入正确的手机号",
        trigger: "blur",
      },
    ],
  },
  subjectList: [],
  classList: [],
  schoolList: [],
});
const ruleFormRef = ref(null);
//渲染初始数据
const init = function () {
  data.loading2 = true;
  if (userId) {
    // 管理员通过id获取学生的个人信息
    managerFun.user.getStudentNews(userId).then((res) => {
      data.student = res;
      data.loading2 = false;
    });
  }
  if (userNumber) {
    console.log(userNumber);
    teacherFun.class
      .getStudentInformation({
        number: userNumber,
      })
      .then((res) => {
        data.student = res;
        data.loading2 = false;
      });
  }
};
// 自动补全输入框
const queryEthniGroupString = (nation, cb) => {
  const results = nation ? nationList.filter(createFilter(nation)) : nationList;
  cb(results);
};
const handleSelectEthnicGroup = (val) => {
  form.ruleForm.nation = val.value;
};
// 自动补全输入框过滤信息
const createFilter = (queryString) => {
  return (restaurant) => {
    return restaurant.value.indexOf(queryString) === 0;
  };
};
//修改资料
function confirmClick() {
  ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      ElMessageBox.confirm("确定进行资料修改吗")
        .then(() => {
          //修改资料接口
          let studentData = {
            userId: userId,
            studentDto: {
              userNumber: data.student.userNumber,
              username: data.student.username,
              sex: data.student.sex,
              idCard: data.student.idCard,
              politicsStatus: data.student.politicsStatus,
              nation: data.student.nation,
              className: data.student.className,
              schoolId: data.student.schoolId,
              province: data.student.province,
              subjects: data.student.subjects,
              plan: data.student.plan,
              address: data.student.address,
              phone: data.student.phone,
              parentPhone: data.student.parentPhone,
            },
            classId: data.student.classId,
            consignee: {
              username: data.student.consignee.username,
              phone: data.student.consignee.phone,
              address: data.student.consignee.address,
            },
          };
          managerFun.user.changeStudentNews(studentData).then((res) => {
            ElMessage.success("修改学生信息成功");
            init();
          });
        })
        .catch(() => {});
    }
  });
}
const getList = () => {
  // 获取科目信息
  managerFun.subject.checkSubject().then((res) => {
    res.forEach((element) => {
      data.subjectList.push(element.subjectName);
    });
  });
  // 获取班级的信息
  data.classList = [];
  managerFun.class.getAllClass(NOW_YEAR).then((res) => {
    res.forEach((element) => {
      data.classList.push({
        className: element.className,
        classId: element.classId,
      });
    });
  });
  // 获取学校的信息
  managerFun.school.searchSchool("").then((res) => {
    data.schoolList = res;
  });
  // 获取学生信息
  init();
};
onMounted(() => {
  getList();
});
</script>

<style src="@/assets/css/show-container.css" scoped></style>
<style src="@/assets/css/user/personalInformation.scss" lang="scss" scoped />
<style scoped>
::v-deep .el-form-item__label {
  display: inline-block;
  margin-right: 1rem;
  width: 6rem;
  text-align: right;
  color: black;
  font-size: 15px;
}
</style>
