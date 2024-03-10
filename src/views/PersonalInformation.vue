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
          <img
            v-if="data.avatar"
            :src="data.avatar"
            class="passport"
            alt="未上传证件照或图片加载有误，请刷新"
          />
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
          <div style="margin-top: 1rem">
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
            <!-- <div>
              <span class="tag">科类 :</span>
              <span>{{ data.student.category || "-" }}</span>
            </div> -->
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
    <div v-if="identity == 1" class="teacher">
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
              ><span>{{ data.teacherType == 0 ? "非班主任" : "班主任" }}</span>
            </div>
            <!-- <div class="infoRow">
              <span class="tag">授课班级 :</span
              ><span>{{ data.teacher.teachClass || "-" }}</span>
            </div> -->
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
              <span class="tag">测评员姓名 :</span
              ><span>{{ data.teacher.username || "-" }}</span>
            </div>
            <div>
              <span class="tag">测评员账号 :</span
              ><span>{{ data.teacher.userNumber || "-" }}</span>
            </div>
            <div>
              <span class="tag">所在班级 :</span
              ><span>{{ data.teacher.phone || "-" }}</span>
            </div>
          </div>
        </div>
        <br />
      </div>
      <!-- 按钮区 -->
      <div class="btnBox">
        <el-button v-if="identity != 2" type="primary" class="changeInfo" @click="data.drawer = true"
          >修改资料</el-button
        >
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
      <div style="display: flex; flex-direction: column">
        <h4>基本信息</h4>
        <br />
        <el-form-item label="电话号码 ：">
          <el-input
            v-model="updataData.phone"
            style="width: 30%"
            :placeholder="data.student.phone || '-'"
          />
        </el-form-item>
        <div v-if="identity == 0">
          <h4>收件信息</h4>
          <br />
          <el-form-item label="收件名称 ：">
            <el-input
              v-model="updataData.consigneeBo.username"
              style="width: 30%"
              :placeholder="data.consignee.username || '-'"
            />
          </el-form-item>
          <el-form-item label="收件电话 ：">
            <el-input
              v-model="updataData.consigneeBo.phone"
              style="width: 30%"
              :placeholder="data.consignee.phone || '-'"
            />
          </el-form-item>
          <el-form-item label="详细地址 ：">
            <el-input
              v-model="updataData.consigneeBo.address"
              style="width: 30%"
              :placeholder="data.consignee.address || '-'"
          /></el-form-item>
        </div>
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
  <!-- 修改密码抽屉 -->
  <el-drawer v-model="data.drawer2" direction="ttb" style="min-height: 50%">
    <!-- 标题 -->
    <template #header>
      <h4>修改密码</h4>
    </template>
    <!-- 内容区 -->
    <template #default>
      <div style="display: flex; flex-direction: column">
        <el-form-item label="新设密码 ：">
          <el-input
            v-model="updatePasswords.password"
            style="width: 30%"
            type="password"
            placeholder="请输入新设密码"
          />
        </el-form-item>
        <el-form-item label="确认密码 ：">
          <el-input
            v-model="updatePasswords.password2"
            style="width: 30%"
            type="password"
            placeholder="请确认密码"
        /></el-form-item>
      </div>
    </template>
    <!-- 尾部按钮区 -->
    <template #footer>
      <div style="flex: auto">
        <el-button @click="data.drawer2 = false">取消</el-button>
        <el-button type="primary" @click="updatePassword">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { getRole } from "@/constants/token";
import studentFun from "@/api/student";
import teacherFun from "@/api/teacher";
onMounted(() => {
  identity.value = getRole();
  data.teacherType = getRole();
  if (identity.value == 3) {
    identity.value = 1;
  } //班主任也是老师信息页
  data.loading2 = true;
  init();
});
let identity = ref(getRole()); //获取当前用户身份
console.log("获取当前用户身份", identity.value);
const data = reactive({
  loading: false,
  loading2: false,
  drawer: false,
  drawer2: false,
  avatar: "",
  student: {},
  consignee: {},
  teacher: {},
  teacherType: "",
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
  password: "",
  password2: "",
});
//渲染初始数据
const init = function () {
  if (identity.value == 0) {
    //获取学生/测评小组信息
    studentFun.user.getInformation().then((res) => {
      console.log("学生信息", res);
      data.student = res;
      data.consignee = res.consignee;
      data.avatar = "http://192.168.50.35:8081" + res.headshot;
      data.loading2 = false;
    });
  } else if (identity.value == 1) {
    //获取老师信息
    teacherFun.user.getInformation().then((res) => {
      console.log(res);
      data.teacher = res;
      data.loading2 = false;
    });
  } else if (identity.value == 2) {
    // studentFun.assess.getInformation().then((res) => {
    //   console.log("学生信息", res);
    //   data.student = res;
    //   data.consignee = res.consignee;
    //   data.avatar = "http://192.168.50.35:8081" + res.headshot;
    //   data.loading2 = false;
    // });
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
      data.avatar = "http://192.168.50.35:8081" + res;
      data.loading = false;
      ElMessage.success("证件照上传成功");
      console.log(data.avatar);
    });
  }
}
//修改资料
function confirmClick() {
  ElMessageBox.confirm("确定进行资料修改吗")
    .then(() => {
      data.drawer = false;
      //修改资料接口
      if (identity.value == 0) {
        studentFun.user.updateInformation(updataData).then((res) => {
          ElMessage.success(res);
        });
      } else if (identity.value == 1) {
        teacherFun.user.updatePhone(updataData.phone).then((res) => {
          ElMessage.success(res);
        });
      }
      Object.keys(updataData).forEach((key) => (updataData[key] = "")); //快速清空内容
      init();
    })
    .catch(() => {});
}
//修改密码
function updatePassword() {
  if (updatePasswords.password == "" || updatePasswords.password2 == "") {
    ElMessage.error("新密码或确认密码不能为空");
  } else {
    if (updatePasswords.password !== updatePasswords.password2) {
      ElMessage.error("两次密码输入不一致");
    } else {
      if (identity.value == 0) {
        //学生修改密码
        studentFun.user.updatePassword(updatePasswords.password).then((res) => {
          ElMessage.success(res);
          data.drawer2 = false;
        });
      } else if (identity.value == 1) {
        //老师修改密码
        teacherFun.user.updatePassword(updatePasswords.password).then((res) => {
          ElMessage.success(res);
          data.drawer2 = false;
        });
      }
      Object.keys(updatePasswords).forEach(
        (key) => (updatePasswords[key] = "")
      ); //快速清空内容
    }
  }
}
//模拟数据
// let student = ref({
//   username: "",
//   userNumber: "",
//   idCard: "",
//   phone: "",
//   parentPhone: "",
//   sex: "",
//   className: "",
//   politicsStatus: "",
//   school: "",
//   nation: "",
//   province: "",
//   plan: "",
//   subjects: {},
//   consignee: {
//     username: "",
//     phone: "",
//     address: "",
//   },
//   address: "",
// });
// let studentData = {
//   avatar:
//     "https://th.bing.com/th/id/OIP.-yzce0XE8eHoGLr9Dqaw5wHaJ4?w=480&h=640&rs=1&pid=ImgDetMain",
//   username: "付小小",
//   userNumber: "415567569789",
//   idCard: "365124200103052214",
//   phone: "1385 2222 222",
//   parentPhone:"1481 2222 222",
//   sex: "女",
//   className: "2023级预科1班",
//   politicsStatus: "共青团员",
//   school: "湘南学院",
//   nation: "土家族",
//   province: "湖南省",
//   category: "普通类（首选物理）",
//   plan: "国家计划",
//   subjects: "化学+地理",
//   consignee:{
//     username:"小付",
//     phone:"128 0000 000",
//     address:"湖南省长沙市芙蓉区泉升大酒店",
//   },
//   address: "湖南省张家界市永定区大庸桥街道吉首大学张家界校区",
// };
// let teacherData = ref({
//   username: "杨世博",
//   userNumber: "43251648512",
//   sex: "男",
//   nation: "汉族",
//   politicsStatus: "党员",
//   phone: "1810 0000 000",
//   manageClass: "2022级预科1班",
//   teachClass: "2022级预科1班、2022级预科4班",
// });
</script>

<style src="@/assets/css/show-container.css" scoped></style>
<style lang="scss" scoped>
.left {
  display: flex;
  align-items: center;
  flex-direction: column;
  .fileInput {
    display: none;
  }
  .imgBox {
    width: 100%;
    height: 13rem;
    .passport {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .uploadPassport {
    font-size: 0.8rem;
    width: 5rem;
  }
}

.box {
  padding: 0 0 1rem 0;
  .littleTitle {
    margin-bottom: 2rem;
    font-weight: 1000;
  }
}

.tag {
  display: inline-block;
  margin-right: 1rem;
  width: 6rem;
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

.teacher {
  overflow: auto; /* 清除浮动 */
}
.grid-item {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
  gap: 1rem 1.2rem;
  grid-auto-flow: row dense;
}
.btnBox {
  width: 100%;
  text-align: right;
  .changeInfo {
    width: 6rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
}
.student {
  display: flex;
  flex-wrap: wrap;
}

@media (max-width: 1000px) {
  /* 当屏幕宽度小于等于800px时 */
  .left,
  .right {
    width: 100%; /* 将宽度设置为100%以确保在小屏幕上上下摆放 */
  }
  .pickup_box {
    width: 100%;
  }
}
@media (min-width: 1000px) and (max-width: 1250px) {
  .left {
    margin-right: 1rem;
    width: 25%; /* 左侧宽度固定为15% */
  }
  .right {
    width: 73%; /* 右侧宽度固定为85% */
  }
  .pickup_box {
    width: 100%;
  }
}
@media (min-width: 1250px) {
  .left {
    margin-right: 1rem;
    width: 10%; /* 左侧宽度固定为10% */
  }
  .right {
    width: 88%; /* 右侧宽度固定为90% */
  }
}
</style>