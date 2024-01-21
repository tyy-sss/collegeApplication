<template>
  <div class="add-user">
    <el-dialog v-model="data.dialogTableVisible" title="添加用户">
      <el-divider />
      <div class="content top">
        <div class="upload">
          <el-upload
            class="upload-demo"
            drag
            multiple
            :show-file-list="false"
            accept=".xlsx"
            action="#"
            :http-request="uploadAction"
            :before-upload="beforeUpload"
            :on-change="handleAddUser"
          >
            <div>
              <div class="loading" v-if="!data.upload.isProgress">
                <div>
                  <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                  <div class="el-upload__text">
                    <div class="big">点击 或 拖拽</div>
                    <div class="small">即可上传用户文件</div>
                  </div>
                </div>
              </div>
              <div
                class="loading"
                v-else
                v-loading="data.upload.isProgress"
              ></div>
            </div>
          </el-upload>
        </div>
      </div>
      <div class="bottom">
        <div class="explain">
          <div class="title">文件上传说明</div>
          <div class="detail">
            <div>
              （1）请下载模板文件，填写数据，然后上传，如果不使用模板文件格式上传数据，可能会发生数据上传错误。
            </div>
            <div>（2）仅支持上传excel文件。</div>
            <div>（3）限制一个文件，下一个文件会覆盖上一个文件。</div>
          </div>
        </div>
        <el-button type="primary" @click="handleExportStudent"
          >下载学生信息模板</el-button
        >
        <el-button type="primary" @click="handleExportTeach"
          >下载老师信息模板</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script setup>
import { reactive } from "vue";
import { excelExport } from "@/assets/js/excel/excel-export";
import {
  studentHeader,
  studentModelData,
  teacherHeader,
  teacherModelData,
} from "@/assets/js/excel/excel-export-data";
import {
  readFile,
  getExcelData,
  excelLeadingIn,
  handleStudentInformation,
  handleTeacherInformation,
} from "@/assets/js/excel/excel-leading";
import {
  studentCharacter,
  teacherCharacter,
} from "@/assets/js/excel/excel-leading-data";

// 接口
import managerFun from "@/api/manager";
import { ElMessage } from "element-plus";
const data = reactive({
  dialogTableVisible: false,
  post: "",
  upload: {
    isProgress: false,
  },
});
// 获得上传文件的数据
const uploadAction = (option) => {};
const beforeUpload = (rawFile) => {
  data.upload.isProgress = true;
};
// 获得上传文件的数据
const handleAddUser = async (ev) => {
  //这个是上传的文件
  const file = ev.raw;
  if (!file) {
    // 没有文件
    ElMessage.error("请上传正确的文件");
  } else {
    //读取file中的数据
    let data = await readFile(file);
    const excelData = getExcelData(data);
    const length = Object.keys(excelData[0]).length;
    let addData = [];
    if (length === Object.keys(studentCharacter).length || length+1 === Object.keys(studentCharacter).length) {
      // 批量添加学生
      addData = excelLeadingIn(excelData, studentCharacter);
      addData = handleStudentInformation(addData);
      adduerList(addData);
    } else if (length === Object.keys(teacherCharacter).length) {
      // 批量添加老师
      addData = excelLeadingIn(excelData, teacherCharacter);
      addData = handleTeacherInformation(addData);
      addTeacherList(addData);
    } else {
      ElMessage.error("上传失败，表格格式错误");
      handleClose();
    }
  }
};
// 调用父组件的方法
const emit = defineEmits(["getUserList"]);
// 上传之后
const handleClose = () => {
  new Promise((resolve, reject) => {
    resolve((data.dialogVisible = false));
  }).then(() => {
    data.upload.isProgress = false;
    emit("getUserList");
  });
};

// 导出学生信息表
const handleExportStudent = () => {
  excelExport(studentModelData, studentHeader, "学生信息模板表");
};
// 导出老师信息表
const handleExportTeach = () => {
  excelExport(teacherModelData, teacherHeader, "老师信息模板表");
};
// 添加用户接口
const adduerList = (val) => {
  // 把学生数据传给后端
  managerFun.user
    .addStudentsByExcel(val)
    .then((res) => {
      ElMessage.success(res);
    })
    .catch(() => {})
    .finally(() => {
      handleClose();
    });
};
// 添加老师接口
const addTeacherList = (val) => {
  managerFun.user
    .addTeacherByExcel(val)
    .then((res) => {
      ElMessage.success(res);
    })
    .catch(() => {})
    .finally(() => {
      handleClose();
    });
};
// 把参数暴露给父组件，让父组件进行修改
defineExpose({
  data,
});
</script>
<style scoped>
::v-deep .el-divider--horizontal {
  margin: 2px 0;
}
.content {
  display: flex;
  justify-content: center;
  align-items: center;
}
.content {
  padding: 20px;
}
.upload {
  width: 70%;
}
.big {
  color: #32325d;
  font-size: 22px;
  font-weight: 600;
}
.small {
  color: #32325d;
  font-size: 18px;
}
/* 加载框 */
.loading {
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.explain {
  color: #32325d;
}
/* 文件上传声明 */
.explain .title {
  font-size: 18px;
  padding-bottom: 1rem;
}
.explain .detail > div {
  font-size: 14px;
  padding-bottom: 0.5rem;
}
.explain .detail:last-child {
  padding-bottom: 0.5rem;
}
</style>