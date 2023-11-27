<template>
  <div class="add-role">
    <el-drawer
      ref="drawerRef"
      :with-header="false"
      v-model="form.dialogVisible"
      :before-close="handleClose"
      size="40%"
      class="demo-drawer"
    >
      <div class="add-role-show">
        <div class="top">
          <div class="title item">志愿地址</div>
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
            <el-form-item label="组合名称" prop="name">
              <el-input v-model="form.ruleForm.name" />
            </el-form-item>
            <el-form-item label="涵盖省份" prop="province">
              <div
                class="choose-group"
                v-for="(item, index) in cities"
                :key="index"
              >
                <div class="text">{{ item.text }}:</div>
                <div class="choose-item">
                  <el-checkbox-group
                    v-model="form.ruleForm.provinceGroup"
                    size="large"
                  >
                    <el-checkbox
                      v-for="city in item.list"
                      :key="city"
                      :label="city"
                    >
                      {{ city }}
                    </el-checkbox>
                  </el-checkbox-group>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="footer">
          <el-divider />
          <span class="button-footer item">
            <el-button type="primary" @click="handleAddAddress">
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
// 添加地址组合,组合姓名查重
import { reactive, ref, watch } from "vue";
// 省份数据
import { cities } from "@/assets/js/utils/province-name.js";
const props = defineProps({ addressVal: Object });
const validateName = (rule, value, callback) => {
  if (
    (form.isChange === false && value) ||
    (form.isChange === true && value != form.oldAddressName)
  ) {
    // 学校查重
    callback(new Error("组合名称重复"));
  }
  callback();
};
const form = reactive({
  dialogVisible: false,
  isChange: false,
  oldAddressName: "",
  ruleForm: {
    id: "",
    name: "",
    provinceGroup: [],
  },
  rules: {
    name: [
      { required: true, message: "请输入角色名称", trigger: "blur" },
      { validator: validateName, trigger: "blur" },
    ],
    provinceGroup: [
      { required: true, message: "至少选择一个省份", trigger: "blur" },
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
  form.isChange = false;
  form.oldAddressName = "";
  form.ruleForm = {};
  // 清楚父组件的信息
  emit("handleClose");
};
// 添加地址
const handleAddAddress = () => {
  ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      // 判断还是添加还是修改学校
      // 清空表单验证消息
      // 重新刷新角色列表
      console.log(form.ruleForm.provinceGroup);
      ruleFormRef.value.resetFields();
    }
  });
};
defineExpose({
  form,
});
</script>
  <style src="@/assets/css/role/role-drawer.css" scoped>
</style>
<style scoped>
/* 省份选择展示框 */
.choose-group {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  border: 1px solid RGB(220, 223, 230);
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
}
.choose-group:not(:first-child) {
  border-top: 0px;
}
.choose-group .text {
  min-width: 88px;
  color: RGB(17, 17, 17);
  text-align: center;
}
</style>
  