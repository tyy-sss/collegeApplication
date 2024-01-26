<template>
  <div class="add-user">
    <el-drawer
      ref="drawerRef"
      :with-header="false"
      v-model="data.dialogVisible"
      :before-close="handleClose"
      class="demo-drawer"
      size="45%"
    >
      <div class="add-user-show add-show">
        <div class="top">
          <div class="title item">修改成绩信息</div>
          <el-divider />
        </div>
        <div class="content item">
          <el-form
            ref="ruleFormRef"
            label-position="right"
            :model="data.ruleForm"
            :inline="true"
            label-width="85px"
          >
            <el-form-item label="学号" prop="userNumber">
              <el-input v-model="data.ruleForm.userNumber" disabled />
            </el-form-item>
            <el-form-item label="姓名" prop="username">
              <el-input v-model="data.ruleForm.username" disabled />
            </el-form-item>
            <el-form-item
              v-for="(item, index) in props.gradesList"
              :key="index"
              :prop="String(item.gradeId)"
              :label="item.gradeName"
              min-width="60"
            >
              <el-input
                v-model="
                  data.ruleForm.gradeSubjectBos.find(
                    (element) => element.gradeId == item.gradeId
                  ).grade
                "
              />
            </el-form-item>
            <el-form-item label="总成绩" prop="score">
              <el-input v-model="data.ruleForm.score" />
            </el-form-item>
          </el-form>
        </div>
        <div class="footer">
          <el-divider />
          <span class="button-footer item">
            <el-button type="primary" @click="handleChangeGrades">
              确定
            </el-button>
            <el-button @click="handleClose">取消</el-button>
          </span>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
    <script setup>
// 修改学生的成绩单
// 接口
import managerFun from "@/api/manager";
import {  reactive, ref, watch } from "vue";
import { ElMessage } from "element-plus";
const props = defineProps({ gradesList: Array });
// 表单数据
const data = reactive({
  dialogVisible: false,
  ruleForm: {},
});
// 调用父组件的方法
const emit = defineEmits(["getGradesList"]);
// 表单验证
const ruleFormRef = ref(null);
// 修改学生成绩
const handleChangeGrades = () => {
  changeGrades();
};
// 上传成功之后
const handleClose = () => {
  // 清空表单验证消息
  new Promise((resolve, reject) => {
    resolve((data.dialogVisible = false));
  }).then(() => {
    ruleFormRef.value.resetFields();
    emit("getGradesList");
  });
};
// 修改学生成绩信息
const changeGrades = () =>{
  managerFun.grades.changeGrades(data.ruleForm).then((res)=>{
    ElMessage.success(res)
  }).finally(()=>{
    handleClose();
  })
}
watch(
  () => data.ruleForm,
  (newVal, oldVal) => {
    console.log(newVal);
    props.gradesList.forEach((element) => {
      let subject = data.ruleForm.gradeSubjectBos.find(
        (item) => item.gradeId == element.gradeId
      );
      if (!subject) {
        data.ruleForm.gradeSubjectBos.push({
          gradeId: element.gradeId,
          grade: 0,
        });
      }
    });
  }
);
defineExpose({ data });
</script>
    <style src="@/assets/css/role/role-drawer.css" scoped>
</style>
  <style scoped>
.choose-role {
  display: flex;
  align-items: center;
  color: RGB(96, 98, 102);
  margin: 1rem 1rem;
}
.choose-role > div {
  margin-right: 0.5rem;
}
/* 多选框 */
.checkbox-group {
  display: flex;
}
</style>
    