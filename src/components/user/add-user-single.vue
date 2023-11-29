<template>
  <div class="add-role">
    <el-drawer
      ref="drawerRef"
      :with-header="false"
      v-model="form.dialogVisible"
      :before-close="handleClose"
      class="demo-drawer"
    >
      <div class="add-role-show">
        <div class="top">
          <div class="title item">添加用户</div>
          <el-divider />
        </div>
        <div class="content item">
          <el-form
            ref="ruleFormRef"
            label-position="top"
            :model="form.ruleForm"
            :rules="form.rules"
            label-width="120px"
            class="demo-ruleForm"
          >
            <el-form-item label="角色名称" prop="name">
              <el-input v-model="form.ruleForm.name" />
              <div class="prompt">请输入长度在2到10位之间的中英文字母</div>
            </el-form-item>
            <el-form-item label="角色说明" prop="description">
              <el-input
                v-model="form.ruleForm.description"
                :autosize="{ minRows: 4, maxRows: 6 }"
                type="textarea"
              />
            </el-form-item>
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
// 添加角色,角色姓名查重
import { reactive, ref } from "vue";
const validateName = (rule, value, callback) => {
  if (
    (form.isChange === false && value) ||
    (form.isChange === true && value != form.oldSchoolName)
  ) {
    // 学校查重
    callback(new Error("角色名称重复"));
  }
  callback();
};
const form = reactive({
  dialogVisible: false,
  ruleForm: {
    name: "",
    description: "",
  },
  rules: {
    name: [
      { required: true, message: "请输入角色名称", trigger: "blur" },
      {
        min: 2,
        max: 10,
        pattern: /^[\u4e00-\u9fa5a-zA-Z]+$/,
        message: "请输入中文或英文（2~10位）",
        trigger: "blur",
      },
      { validator: validateName, trigger: "blur" },
    ],
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
  