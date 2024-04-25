<!--router
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-11-06 22:04:48
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2023-12-13 22:32:46
 * @FilePath: \collegeApplication\src\views\PersonalInformation.vue
 * @Description:个人信息页面（学生/老师）
-->
<template>
  <div class="show-container">
    <div class="title">
      <div class="text" @click="changeidentity">个人信息</div>
    </div>
    <hr />
    <br />
    <!-- 学生信息 -->
    <div v-if="identity == 0" class="student" v-loading.lock="data.loading2">
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

        <br />
        <el-button class="uploadPassport" @click="fackBtn"
          >上传证件照</el-button
        >
        <br />
        <el-button class="uploadPassport" @click="data.drawer2 = true"
          >修改密码</el-button
        >
      </div>
      <!-- 信息区 -->
      <div class="right">
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
      <!-- 按钮区 -->
      <div class="btnBox">
        <el-button type="primary" class="changeInfo" @click="data.drawer = true"
          >修改资料</el-button
        >
      </div>
    </div>
    <!-- 老师信息 -->
    <div v-if="identity == 3" class="teacher">
      <!-- 信息区 -->
      <div>
        <div class="box">
          <div class="littleTitle">基本信息</div>
          <div class="grid-item">
            <div>
              <span class="tag">教师姓名 :</span
              ><span>{{ data.teacher.username || "-" }}</span>
            </div>
            <div>
              <span class="tag">教师编号 :</span
              ><span>{{ data.teacher.userNumber || "-" }}</span>
            </div>
            <div>
              <span class="tag">联系电话 :</span
              ><span>{{ data.teacher.phone || "-" }}</span>
            </div>
            <div>
              <span class="tag">性别 :</span
              ><span>{{ data.teacher.sex || "-" }}</span>
            </div>
            <div>
              <span class="tag">民族 :</span
              ><span>{{ data.teacher.nation || "-" }}</span>
            </div>
            <div>
              <span class="tag">政治面貌 :</span
              ><span>{{ data.teacher.politicsStatus || "-" }}</span>
            </div>
          </div>
        </div>
        <hr />
        <br />
        <div class="box">
          <div class="littleTitle">其他信息</div>
          <div class="flex_box">
            <div class="infoRow">
              <span class="tag">老师身份 :</span
              ><span>{{ identity == 3 ? "班主任" : "非班主任" }}</span>
            </div>
            <div class="infoRow">
              <span class="tag">管理班级 :</span
              ><span>{{ data.teacher.className || "-" }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 按钮区 -->
      <div class="btnBox">
        <el-button type="primary" class="changeInfo" @click="data.drawer = true"
          >修改资料</el-button
        >
        <el-button class="changeInfo" @click="data.drawer2 = true"
          >修改密码</el-button
        >
      </div>
    </div>
    <!-- 测评小组信息 -->
    <div v-if="identity == 2" class="teacher">
      <!-- 信息区 -->
      <div>
        <div class="box">
          <div class="littleTitle">基本信息</div>
          <div class="grid-item">
            <div>
              <span class="tag">测评账号名 :</span
              ><span>{{ data.student.username || "-" }}</span>
            </div>
            <div>
              <span class="tag">测评员账号 :</span
              ><span>{{ data.student.userNumber || "-" }}</span>
            </div>
            <div>
              <span class="tag">管理班级 :</span
              ><span>{{ data.student.className || "-" }}</span>
            </div>
          </div>
        </div>
        <br />
      </div>
      <!-- 按钮区 -->
      <div class="btnBox">
        <el-button
          v-if="identity != 2"
          type="primary"
          class="changeInfo"
          @click="data.drawer = true"
          >修改资料</el-button
        >
        <el-button class="changeInfo" @click="data.drawer2 = true"
          >修改密码</el-button
        >
      </div>
    </div>
    <!-- 管理员信息 -->
    <div v-if="identity == 4" class="manager">
      <!-- 信息区 -->
      <div>
        <div class="box">
          <div class="littleTitle">基本信息</div>
          <div class="grid-item">
            <div>
              <span class="tag">管理员账号 :</span
              ><span>{{ data.manager.userNumber || "-" }}</span>
            </div>
            <div>
              <span class="tag">登录时间 :</span
              ><span>{{ data.manager.lastDdlTime || "-" }}</span>
            </div>
          </div>
        </div>
        <br />
      </div>
      <!-- 按钮区 -->
      <div class="btnBox">
        <el-button class="changeInfo" @click="data.drawer2 = true"
          >修改密码</el-button
        >
      </div>
    </div>
  </div>

  <!-- 修改资料抽屉 -->
  <el-drawer v-model="data.drawer" direction="ttb" style="min-height: 50%">
    <!-- 标题 -->
    <template #header>
      <h4>修改资料</h4>
    </template>
    <!-- 内容区 -->
    <template #default>
      <div class="content-box">
        <h4>基本信息</h4>
        <br />
        <el-form ref="ruleFormRef" :model="updataData" :rules="data.rules1">
          <div v-if="identity == 3">
            <el-form-item label="电话号码 ：" prop="phone">
              <el-input
                v-model="updataData.phone"
                class="input-width"
                :placeholder="data.teacher.phone || '-'"
              />
            </el-form-item>
          </div>
          <div v-if="identity == 0">
            <el-form-item label="电话号码 ：" prop="phone">
              <el-input
                v-model="updataData.phone"
                class="input-width"
                :placeholder="data.student.phone || '-'"
              />
            </el-form-item>
            <h4>收件信息</h4>
            <br />
            <el-form-item label="收件名称 ：" prop="consigneeBo.username">
              <el-input
                v-model="updataData.consigneeBo.username"
                class="input-width"
                :placeholder="data.consignee.username || '-'"
              />
            </el-form-item>
            <el-form-item label="收件电话 ：" prop="consigneeBo.phone">
              <el-input
                v-model="updataData.consigneeBo.phone"
                class="input-width"
                :placeholder="data.consignee.phone || '-'"
              />
            </el-form-item>
            <el-form-item label="详细地址 ：" prop="consigneeBo.address">
              <el-input
                v-model="updataData.consigneeBo.address"
                class="input-width"
                :placeholder="data.consignee.address || '-'"
            /></el-form-item>
          </div>
        </el-form>
      </div>
    </template>
    <!-- 尾部按钮区 -->
    <template #footer>
      <div class="footer-button">
        <el-button @click="data.drawer = false">取消</el-button>
        <el-button type="primary" @click="confirmClick">确定</el-button>
      </div>
    </template>
  </el-drawer>

  <!-- 修改密码抽屉 -->
  <el-drawer v-model="data.drawer2" direction="ttb" style="min-height: 50%">
    <!-- 标题 -->
    <template #header>
      <h4>修改密码</h4>
    </template>
    <!-- 内容区 -->
    <template #default>
      <div style="display: flex; flex-direction: column">
        <el-form
          ref="ruleFormRef2"
          :model="updatePasswords"
          :rules="data.rules2"
        >
          <el-form-item label="新设密码 ：" prop="password">
            <el-input
              v-model="updatePasswords.password"
              class="input-width"
              autocomplete="off"
              type="password"
              placeholder="请输入新设密码"
            />
          </el-form-item>
          <el-form-item label="确认密码 ：" prop="password2">
            <el-input
              v-model="updatePasswords.password2"
              class="input-width"
              autocomplete="off"
              type="password"
              placeholder="请确认密码"
          /></el-form-item>
        </el-form>
      </div>
    </template>
    <!-- 尾部按钮区 -->
    <template #footer>
      <div class="footer-button">
        <el-button @click="data.drawer2 = false">取消</el-button>
        <el-button type="primary" @click="updatePassword">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { PHONE_TEST, PASSWORD_TEST2 } from "@/constants/regular-expression";
import { getRole } from "@/constants/token";
import studentFun from "@/api/student";
import teacherFun from "@/api/teacher";
import managerFun from "@/api/manager";
onMounted(() => {
  identity.value = getRole();
  init();
});
let identity = ref(getRole()); //获取当前用户身份
const data = reactive({
  loading: false,
  loading2: false,
  drawer: false,
  drawer2: false,
  avatar: "",
  student: {},
  consignee: {},
  teacher: {},
  manager: {},
  rules1: {
    phone: [
      {
        pattern: PHONE_TEST,
        message: "请输入正确的手机号",
        trigger: "blur",
      },
    ],
    "consigneeBo.phone": [
      {
        pattern: PHONE_TEST,
        message: "请输入正确的手机号",
        trigger: "blur",
      },
    ],
  },
  rules2: {
    password: [
      { required: true, message: "密码不能为空", trigger: "blur" },
      {
        pattern: PASSWORD_TEST2,
        message: "请输入符合要求的密码", //这里后面还会改
        trigger: "blur",
      },
    ],
    password2: [
      { required: true, message: "密码不能为空", trigger: "blur" },
      {
        pattern: PASSWORD_TEST2,
        message: "请输入符合要求的密码", //这里后面还会改
        trigger: "blur",
      },
    ],
  },
});
//修改资料数据
const updataData = reactive({
  phone: "",
  consigneeBo: {
    username: "",
    phone: "",
    address: "",
  },
});
//修改密码数据
const updatePasswords = reactive({
  password: null,
  password2: null,
});
const ruleFormRef = ref(null);
const ruleFormRef2 = ref(null);
//渲染初始数据
const init = function () {
  data.loading2 = true;
  if (identity.value == 0) {
    //获取学生信息
    studentFun.user.getInformation().then((res) => {
      data.student = res;
      data.consignee = res.consignee;
      data.avatar = res.headshot;
      data.loading2 = false;
    });
  } else if (identity.value == 3) {
    //获取老师信息
    teacherFun.user.getInformation().then((res) => {
      data.teacher = res;
      data.loading2 = false;
    });
  } else if (identity.value == 2) {
    studentFun.assess.getInformation().then((res) => {
      data.student.userNumber = res.userNumber;
      data.student.username = res.username;
      data.student.className = res.className;
      data.loading2 = false;
    });
  } else if (identity.value == 4) {
    managerFun.user.getNews().then((res) => {
      data.manager = res;
      data.manager.lastDdlTime = data.manager.lastDdlTime.replace("T", " ");
      data.loading2 = false;
    });
  }
};
//上传证件照假按钮
function fackBtn() {
  document.getElementById("fileInput").click();
}
//上传证件照并回显
function handleFileSelect(e) {
  const file = e.target.files[0];
  const maxFileSize = 4 * 1024 * 1024; // 限制为4MB
  if (file && file.size > maxFileSize) {
    return ElMessage.error("文件大小超过限制，请选择小于4MB的文件。");
  } else {
    data.loading = true;
    const formData = new FormData();
    formData.append("file", file);
    studentFun.user.setIDPhoto(formData).then((res) => {
      data.avatar = res;
      data.loading = false;
      ElMessage.success("证件照上传成功");
    });
  }
}
//修改资料
function confirmClick() {
  ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      ElMessageBox.confirm("确定进行资料修改吗")
        .then(() => {
          data.drawer = false;
          //修改资料接口
          if (identity.value == 0) {
            studentFun.user.updateInformation(updataData).then((res) => {
              ElMessage.success(res);
            });
          } else if (identity.value == 3) {
            teacherFun.user.updatePhone(updataData.phone).then((res) => {
              ElMessage.success(res);
            });
          }
          updataData.phone = "";
          Object.keys(updataData.consigneeBo).forEach(
            (key) => (updataData.consigneeBo[key] = "")
          ); //快速清空内容
          init();
        })
        .catch(() => {});
    }
  });
}
//修改密码
function updatePassword() {
  ruleFormRef2.value.validate((valid, fields) => {
    if (valid) {
      if (updatePasswords.password !== updatePasswords.password2) {
        ElMessage.error("两次密码输入不一致");
      } else {
        ElMessageBox.confirm("确定进行密码修改吗")
          .then(() => {
            if (identity.value == 0 || identity.value == 2) {
              //学生修改密码
              studentFun.user
                .updatePassword({
                  password: updatePasswords.password,
                })
                .then((res) => {
                  ElMessage.success(res);
                  data.drawer2 = false;
                });
            } else if (identity.value == 3) {
              //老师修改密码
              teacherFun.user
                .updatePassword({
                  password: updatePasswords.password,
                })
                .then((res) => {
                  ElMessage.success(res);
                  data.drawer2 = false;
                });
            } else if (identity.value == 4) {
              // 管理员修改密码
              managerFun.user
                .uploadPassword({
                  password: updatePasswords.password,
                })
                .then((res) => {
                  ElMessage.success(res);
                  data.drawer2 = false;
                });
            }
            Object.keys(updatePasswords).forEach(
              (key) => (updatePasswords[key] = "")
            ); //快速清空内容
          })
          .catch(() => {});
      }
    }
  });
}
</script>

<style src="@/assets/css/show-container.css" scoped></style>
<style src="@/assets/css/user/personalInformation.scss" lang="scss" scoped />
