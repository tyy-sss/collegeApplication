<template>
  <div class="add-user">
    <el-dialog v-model="data.dialogTableVisible" title="导入分流结果">
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
            <div>（1）仅支持上传excel文件。</div>
            <div>（2）限制一个文件，下一个文件会覆盖上一个文件。</div>
            <div>（3）每一次上传数据最多上传1100条。</div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script setup>
import { reactive } from "vue";
// 接口
import { ElMessage } from "element-plus";
import { readFile, getExcelData } from "@/assets/js/excel/excel-leading";
import { excelLeadingInForFinalProfession } from "@/assets/js/excel/profession/forecast-profession/final-profession";
import volunteerFun from "@/api/volunteer";
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
    let excelData = getExcelData(data);
    excelData = excelLeadingInForFinalProfession(excelData);
    addFinalProfession(excelData);
  }
};
// 调用父组件的方法
const emit = defineEmits(["getFinalProfessionList"]);
// 上传之后
const handleClose = () => {
  new Promise((resolve, reject) => {
    resolve((data.dialogTableVisible = false));
  }).then(() => {
    data.upload.isProgress = false;
    emit("getFinalProfessionList");
  });
};
// 新增最后的分流结果
const addFinalProfession = (finalData) => {
  volunteerFun.manager
    .uploadResult(finalData)
    .then((res) => {
      ElMessage.success("上传数据成功");
    })
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
