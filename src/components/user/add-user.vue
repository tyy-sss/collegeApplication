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
            accept=".doc,.zip,.xlsx,."
            action="#"
            :http-request="uploadAction"
            :before-upload="beforeUpload"
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

// 接口
// import { uploadSingleResume } from "@/api/resume";
import { ElMessage } from "element-plus";
const data = reactive({
  dialogTableVisible: false,
  post: "",
  upload: {
    isProgress: false,
  },
});
// 获得上传文件的数据
const uploadAction = (option) => {

};
const beforeUpload = (rawFile) => {
  data.upload.isProgress = true;
};
// 导出学生信息表
const handleExportStudent = () => {
  excelExport(
    JSON.parse(JSON.stringify(studentModelData)),
    studentHeader,
    "学生信息模板表"
  );
};
// 导出老师信息表
const handleExportTeach = () => {
  excelExport(
    JSON.parse(JSON.stringify(teacherModelData)),
    teacherHeader,
    "老师信息模板表"
  );
};
// 把参数暴露给父组件，让父组件进行修改
defineExpose({
  data,
});
</script>
<style scoped>
.post {
  display: flex;
  font-size: 17px;
}
.post > div {
  margin-right: 5px;
}
::v-deep .el-divider--horizontal {
  margin: 2px 0;
}
.content,
.img {
  display: flex;
  justify-content: center;
  align-items: center;
}
.content,
.post,
.img {
  padding: 20px;
}
.upload {
  width: 90%;
}
.img {
  padding: 10px;
  border: 3px dashed RGB(217, 217, 217);
  border-radius: 10px;
  background: #eef0f5;
}

img {
  width: 200px;
  height: 150px;
}
.text > div {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
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
  height: 200px;
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
  padding-bottom: 0.5rem;
}
.explain .detail:last-child {
  padding-bottom: 1rem;
}
</style>