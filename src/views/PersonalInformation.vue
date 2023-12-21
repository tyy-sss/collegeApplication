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
    <div
      v-if="identity === 'STUDENT'"
      class="student"
      v-loading.lock="loading2"
    >
      <!-- 证件照区 -->
      <div class="left" v-loading.lock="loading">
        <input
          type="file"
          id="fileInput"
          class="fileInput"
          v-on:change="handleFileSelect($event)"
        />
        <div class="imgBox">
          <img
            v-if="avatar"
            :src="avatar"
            class="passport"
            alt="未上传证件照或图片加载有误，请刷新"
          />
        </div>

        <br />
        <el-button class="uploadPassport" @click="fackBtn"
          >上传证件照</el-button
        >
      </div>
      <!-- 信息区 -->
      <div class="right">
        <div class="box">
          <div class="littleTitle">基本信息</div>
          <div class="grid-item">
            <div>
              <span class="tag">学生姓名 :</span
              ><span>{{ student.username || "-" }}</span>
            </div>
            <div>
              <span class="tag">学生学号 :</span
              ><span>{{ student.userNumber || "-" }}</span>
            </div>
            <div>
              <span class="tag">身份证号 :</span
              ><span>{{ student.idCard || "-" }}</span>
            </div>
            <div>
              <span class="tag">联系电话 :</span
              ><span>{{ student.phone || "-" }}</span>
            </div>
            <div>
              <span class="tag">父母电话 :</span
              ><span>{{ student.parentPhone || "-" }}</span>
            </div>
            <div>
              <span class="tag">学生性别 :</span
              ><span>{{ student.sex || "-" }}</span>
            </div>
            <div>
              <span class="tag">学生班级 :</span
              ><span>{{ student.className || "-" }}</span>
            </div>
          </div>
          <div style="margin-top: 1rem">
            <span class="tag">家庭地址 :</span
            ><span>{{ student.address || "-" }}</span>
          </div>
        </div>
        <hr />
        <br />
        <div class="box">
          <div class="littleTitle">其他信息</div>
          <div class="grid-item">
            <div>
              <span class="tag">政治面貌 :</span
              ><span>{{ student.politicsStatus || "-" }}</span>
            </div>
            <div>
              <span class="tag">目标学校 :</span
              ><span>{{ student.school || "-" }}</span>
            </div>
            <div>
              <span class="tag">民族 :</span
              ><span>{{ student.nation || "-" }}</span>
            </div>
            <div>
              <span class="tag">来源省份 :</span
              ><span>{{ student.province || "-" }}</span>
            </div>
            <div>
              <span class="tag">科类 :</span>
              <!-- <span>{{ student.category || "-" }}</span> -->
              <span>{{ "-" }}</span>
            </div>
            <div>
              <span class="tag">性质计划 :</span
              ><span>{{ student.plan || "-" }}</span>
            </div>
            <div>
              <span class="tag">选考科目 :</span
              ><span>{{ student.subjects || "-" }}</span>
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
              <span>{{ student.consignee.username || "-" }}</span>
            </div>
            <div class="infoRow">
              <span class="tag">收件电话 :</span>
              <span>{{ student.consignee.phone || "-" }}</span>
            </div>
            <div class="infoRow">
              <span class="tag">详细地址 :</span>
              <span>{{ student.consignee.address || "-" }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 按钮区 -->
      <div class="btnBox">
        <el-button type="primary" class="changeInfo" @click="drawer = true"
          >修改资料</el-button
        >
      </div>
    </div>
    <!-- 老师信息 -->
    <div v-if="identity === 'TEACHER'" class="teacher">
      <!-- 信息区 -->
      <div>
        <div class="box">
          <div class="littleTitle">基本信息</div>
          <div class="grid-item">
            <div>
              <span class="tag">教师姓名 :</span
              ><span>{{ teacher.username || "-" }}</span>
            </div>
            <div>
              <span class="tag">教师编号 :</span
              ><span>{{ teacher.userNumber || "-" }}</span>
            </div>
            <div>
              <span class="tag">联系电话 :</span
              ><span>{{ teacher.phone || "-" }}</span>
            </div>
            <div>
              <span class="tag">性别 :</span
              ><span>{{ teacher.sex || "-" }}</span>
            </div>
            <div>
              <span class="tag">民族 :</span
              ><span>{{ student.nation || "-" }}</span>
            </div>
            <div>
              <span class="tag">政治面貌 :</span
              ><span>{{ teacher.politicsStatus || "-" }}</span>
            </div>
          </div>
        </div>
        <hr />
        <br />
        <div class="box">
          <div class="littleTitle">其他信息</div>
          <div class="flex_box">
            <div class="infoRow">
              <span class="tag">主任班级 :</span
              ><span>{{ teacher.manageClass || "非班主任" }}</span>
            </div>
            <!-- <div class="infoRow">
              <span class="tag">授课班级 :</span
              ><span>{{ teacher.teachClass || "-" }}</span>
            </div> -->
          </div>
        </div>
      </div>
      <!-- 按钮区 -->
      <div class="btnBox">
        <el-button type="primary" class="changeInfo" @click="drawer = true"
          >修改资料</el-button
        >
      </div>
    </div>
  </div>

  <!-- 修改资料抽屉 -->
  <el-drawer v-model="drawer" direction="ttb" style="min-height: 50%">
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
            :placeholder="student.phone || '-'"
          />
        </el-form-item>
        <div v-if="moreDitail">
          <h4>收件信息</h4>
          <br />
          <el-form-item label="收件名称 ：">
            <el-input
              v-model="updataData.recipient"
              style="width: 30%"
              :placeholder="student.consignee.username || '-'"
            />
          </el-form-item>
          <el-form-item label="收件电话 ：">
            <el-input
              v-model="updataData.phone2"
              style="width: 30%"
              :placeholder="student.consignee.phone || '-'"
            />
          </el-form-item>
          <el-form-item label="详细地址 ：">
            <el-input
              v-model="updataData.address"
              style="width: 30%"
              :placeholder="student.consignee.address || '-'"
          /></el-form-item>
        </div>
      </div>
    </template>
    <!-- 尾部按钮区 -->
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">取消</el-button>
        <el-button type="primary" @click="confirmClick">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>
<script setup>
import { ref, reactive, onMounted, computed, onBeforeMount } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { getRole } from "@/constants/token";
import studentFun from "@/api/student";
import teacherFun from "@/api/teacher";
const data = reactive({});

onMounted(() => {
  loading2.value=true;
  Per();
});

function Per() {
  init();
}
const loading = ref(false);
const loading2 = ref(false);
let identity = ref(getRole()); //获取当前用户身份
console.log("获取当前用户身份", identity.value);
identity.value = "STUDENT";

//渲染初始数据
const init = function () {
  if (identity.value === "STUDENT") {
    moreDitail.value = true;
    //获取学生信息接口
    studentFun.user.getInformation().then((res) => {
      student.value = res;
      avatar.value =
      "https://img.zcool.cn/community/01cf695e71cda9a80120a8953bb057.jpg?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100";
      loading2.value=false;
    });
    } else if (identity.value === "TEACHER") {
    moreDitail.value = false;
    //获取老师信息接口
    teacherFun.user.getInformation().then((res) => {
      teacher.value = res;
      loading2.value=false;
    });
  }
};

//方便测试
function changeidentity() {
  if (identity.value === "TEACHER") {
    identity.value = "STUDENT";
    init();
  } else {
    identity.value = "TEACHER";
    init();
  }
}

//修改资料抽屉
const drawer = ref(false);
const moreDitail = ref();
let avatar = ref("");
let student = ref({
  username: "",
  userNumber: "",
  idCard: "",
  phone: "",
  parentPhone: "",
  sex: "",
  className: "",
  politicsStatus: "",
  school: "",
  nation: "",
  province: "",
  plan: "",
  subjects: "",
  consignee: {
    username: "",
    phone: "",
    address: "",
  },
  address: "",
});
let updataData = reactive({
  phone: "",
  username: "",
  phone2: "",
  address: "",
});
let teacher = ref({});
//上传证件照假按钮
function fackBtn() {
  document.getElementById("fileInput").click();
}
//上传证件照并回显
function handleFileSelect(e) {
  loading.value = true;
  const file = e.target.files[0];
  console.log(file);
  const formData = new FormData();
  formData.append("file", file);
  //传文件给后端（对接口）
  // studentFun.user.setAvatar(formData).then((res)=>{
  //   student.avatar = res.data.avatar;
  // })
  let myAvatar =
    "https://th.bing.com/th/id/OIP.-yzce0XE8eHoGLr9Dqaw5wHaJ4?w=480&h=640&rs=1&pid=ImgDetMain";
  //返回虚拟路径
  setTimeout(() => {
    avatar.value = myAvatar;
    loading.value = false;
  }, 2000);
}
//抽屉按钮
function cancelClick() {
  drawer.value = false;
}
// 修改资料
function confirmClick() {
  ElMessageBox.confirm("确定进行资料修改吗")
    .then(() => {
      drawer.value = false;
      //修改资料接口
      if (identity.value === "STUDENT") {
        // studentFun.user.updataInfo().then((res) => {
        //   if (res.code === 200) {
        ElMessage({
          message: "修改资料成功",
          type: "success",
        });

        //   }
        // });
      } else if (identity.value === "TEACHER") {
        // teacherFun.user.updataInfo().then((res) => {
        // if (res.code === 200) {
        ElMessage({
          message: "修改资料成功",
          type: "success",
        });
        //   }
        // });
      }
    })
    .catch(() => {});
}

//模拟数据
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
  