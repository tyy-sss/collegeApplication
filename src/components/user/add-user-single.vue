<template>
  <div class="add-user">
    <el-drawer
      ref="drawerRef"
      :with-header="false"
      v-model="form.dialogVisible"
      :before-close="handleClose"
      class="demo-drawer"
      size="50%"
    >
      <div class="add-user-show add-show">
        <div class="top">
          <div class="title item">添加用户</div>
          <el-divider />
        </div>
        <div class="choose-role">
          <div class="role-text">老师</div>
          <el-switch v-model="form.isTeacher" />
          <div class="role-text">学生</div>
        </div>
        <div class="content item">
          <el-form
            ref="ruleFormRef"
            label-position="right"
            :model="form.ruleForm"
            :rules="form.rules"
            label-width="85px"
          >
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item
                  :label="form.isTeacher ? '工号:' : '学号:'"
                  prop="uId"
                >
                  <el-input v-model="form.ruleForm.uId" /> </el-form-item
              ></el-col>
              <el-col :span="8">
                <el-form-item label="姓名:" prop="name">
                  <el-input v-model="form.ruleForm.name" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="性别:" prop="sex">
                  <el-radio-group v-model="form.ruleForm.sex" class="ml-4">
                    <el-radio label="man" size="large">男</el-radio>
                    <el-radio label="woman" size="large">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item
              v-if="!form.isTeacher"
              label="身份证号:"
              prop="identity"
            >
              <el-input v-model="form.ruleForm.identity" />
            </el-form-item>

            <el-row :gutter="80">
              <el-col :span="12">
                <el-form-item label="政治面貌:" prop="politicalStatus">
                  <el-input
                    v-model="form.ruleForm.politicalStatus"
                  /> </el-form-item
              ></el-col>
              <el-col :span="12">
                <el-form-item label="民族:" prop="ethniGroup">
                  <el-input v-model="form.ruleForm.ethniGroup" /> </el-form-item
              ></el-col>
            </el-row>

            <el-row v-if="!form.isTeacher" :gutter="80">
              <el-col :span="12">
                <el-form-item label="计划性质:" prop="natureProgram">
                  <el-input
                    v-model="form.ruleForm.natureProgram"
                  /> </el-form-item
              ></el-col>
              <el-col :span="12">
                <el-form-item label="选课科目:" prop="electiveSubject">
                  <el-input
                    v-model="form.ruleForm.electiveSubject"
                  /> </el-form-item
              ></el-col>
            </el-row>

            <el-row v-if="!form.isTeacher" :gutter="40">
              <el-col :span="8">
                <el-form-item label="来源省份:" prop="province">
                  <el-input v-model="form.ruleForm.province" /> </el-form-item
              ></el-col>
              <el-col :span="8">
                <el-form-item label="目标学校:" prop="targetSchool">
                  <el-input v-model="form.ruleForm.targetSchool" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="班级:" prop="class">
                  <el-input v-model="form.ruleForm.class" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item
              v-if="!form.isTeacher"
              label="家庭地址:"
              prop="homeAddress"
            >
              <el-input v-model="form.ruleForm.homeAddress" />
            </el-form-item>

            <el-row :gutter="80">
              <el-col :span="12">
                <el-form-item label="联系电话:" prop="phone">
                  <el-input v-model="form.ruleForm.phone" /> </el-form-item
              ></el-col>
              <el-col v-if="!form.isTeacher" :span="12">
                <el-form-item label="父母电话:" prop="parentPhone">
                  <el-input
                    v-model="form.ruleForm.parentPhone"
                  /> </el-form-item
              ></el-col>
            </el-row>
          </el-form>
        </div>
        <div class="footer">
          <el-divider />
          <span class="button-footer item">
            <el-button type="primary" @click="handleAddRole"> 确定 </el-button>
            <el-button @click="handleClose">取消</el-button>
          </span>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
  <script setup>
// 添加用户
import { reactive, ref } from "vue";
const form = reactive({
  // 角色是否是老师
  isTeacher: true,
  dialogVisible: false,
  ruleForm: {
    uId: "",
    name: "",
    sex: "",
    identity: "",
    politicalStatus: "",
    ethniGroup: "",
    class: "",
    targetSchool: "",
    province: "",
    electiveSubject: [],
    natureProgram: "",
    homeAddress: "",
    phone: "",
    parentPhone: "",
  },
  rules: {
    name: [{ required: true, message: "请输入用户姓名", trigger: "blur" }],
  },
});
// 调用父组件的方法
const emit = defineEmits(["handleClose"]);
// 表单验证
const ruleFormRef = ref(null);
// 关闭对话框
const handleClose = () => {
  // 清空表单验证消息
  ruleFormRef.value.resetFields();
  form.dialogVisible = false;
  // 清楚父组件的信息
  emit("handleClose");
};
// 添加角色
const handleAddRole = () => {
  ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      // 判断还是添加还是修改学校
      // 清空表单验证消息
      // 重新刷新角色列表
      ruleFormRef.value.resetFields();
    }
  });
};
defineExpose({ form });
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
</style>
  