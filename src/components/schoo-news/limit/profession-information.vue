<template>
  <div class="profession-information">
    <el-dialog v-model="data.dialogTableVisible" title="添加科目">
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
        <el-button type="info" @click="handleExportProfession"
          >下载专业信息模板</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { excelExport } from "@/assets/js/excel/excel-export";
import { professionInformationLimitHeader } from "@/assets/js/excel/excel-export-data";
import {
  readFile,
  getExcelData,
  excelLeadingIn,
} from "@/assets/js/excel/excel-leading";
import { professionInformationLimitCharacter } from "@/assets/js/excel/excel-leading-data";
// 学校id
const route = new useRoute();
const schoolId = ref(route.query.id);
// 接口
import managerFun from "@/api/manager";
import { ElMessage } from "element-plus";
const data = reactive({
  dialogTableVisible: false,
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
    const addData = excelLeadingIn(
      excelData,
      professionInformationLimitCharacter
    );
    uploadFile(addData);
  }
};
// 导出专业限制专业信息模板表
const handleExportProfession = () => {
  excelExport([], professionInformationLimitHeader, "专业限制专业信息模板表");
};
// 上传专业文件
const uploadFile = (val) => {
  for (let i = 0; i < val.length; i++) {
    val[i] = {
      majorId: 0,
      schoolId: Number(schoolId.value),
      name: val[i].name,
      college: val[i].college,
      subjectRule: [
        {
          areaId: 0,
          requiredSubjects: [""],
          optionalSubjects: {
            subjectNumber: 0,
            optionalSubjectScope: [""],
          },
          subjectGroups: [0],
          strings: [""],
        },
      ],
      enrollmentNumber: 0,
    };
  }
  managerFun.major
    .addMajor(val)
    .then((res) => {
      ElMessage.success("上传成功");
    })
    .catch(() => {
      ElMessage.error("上传失败 ");
    })
    .finally(() => {
      data.upload.isProgress = false;
      data.dialogTableVisible = false;
    });
};
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