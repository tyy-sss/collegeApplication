<template>
  <div class="profession-information">
    <div class="context">
      <div class="top">
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
      <div class="middle">
        <el-button type="primary" @click="handleNextStep">下一步</el-button>
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
        <el-button type="info" @click="handleExportProfession"
          >下载专业信息模板</el-button
        >
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive } from "vue";
import { excelExport } from "@/assets/js/excel/excel-export";
import { professionInformationLimitHeader } from "@/assets/js/excel/excel-export-data";
import {
  readFile,
  getExcelData,
  excelLeadingIn,
} from "@/assets/js/excel/excel-leading";
import { professionInformationLimitCharacter } from "@/assets/js/excel/excel-leading-data";

// 接口
import { ElMessage } from "element-plus";
const data = reactive({
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
    // console.log(file)
    //读取file中的数据
    let data = await readFile(file);
    const excelData = getExcelData(data);
    const addData = excelLeadingIn(
      excelData,
      professionInformationLimitCharacter
    );
    console.log(addData);
  }
};
// 导出学生信息表
const handleExportProfession = () => {
  excelExport([], professionInformationLimitHeader, "专业限制专业信息模板表");
};
// 调用父组件的方法
const emit = defineEmits(["changeStepActive"]);
// 下一步
const handleNextStep = () =>{
  emit("changeStepActive",2)
}
</script>
<style scoped>
.profession-information {
  display: flex;
  align-items: center;
  justify-content: center;
}
.context {
  padding: 2rem;
  width: 85%;
  min-width: 700px;
  background-color: RGBA(237, 242, 246, 0.5);
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.context > div {
  margin-bottom: 1rem;
}
.upload {
  min-width: 400px;
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
  color: RGB(50,50,93);
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