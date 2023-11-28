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
          <div class="title item">角色权限管理</div>
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
              <el-input v-model="form.ruleForm.name" disabled />
            </el-form-item>
            <el-form-item label="权限明细">
              <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="name" label="功能名称" min-width="120" />
                <el-table-column prop="rule" label="权限" min-width="280">
                  <template #default="scope">
                    <div
                      class="checkbox"
                      v-for="(item, index) in scope.row.rule"
                      :key="index"
                    >
                      <el-checkbox
                        v-model="item.value"
                        :label="item.label"
                        size="large"
                      /></div
                  ></template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-form>
        </div>
        <div class="footer">
          <el-divider />
          <span class="button-footer item">
            <el-button type="primary" @click="handleChangeRuleRole">
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
// 获得角色的权限数据，修改权限数据
import { reactive, ref } from "vue";
const form = reactive({
  role: "老师",
  dialogVisible: true,
  ruleForm: {
    name: "yyy",
    searchData: "",
  },
});
const tableData = reactive([
  {
    name: "个人信息",
    rule: [
      { label: "查看", value: true },
      { label: "查看", value: true },
      { label: "查看", value: true },
      { label: "查看", value: true },
    ],
  },
  {
    name: "志愿分流结果",
  },
  {
    name: "志愿填报",
  },
  {
    name: "综合测评",
  },
  {
    name: "班级信息",
  },
]);
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
//  修改角色的权限
const handleChangeRuleRole = () => {};
</script>
  <style src="@/assets/css/role/role-drawer.css" scoped>
</style>
  <style scoped>
/* 设置分页展示 */
.table {
  width: 100%;
}
.pager {
  float: right;
  padding: 0.5rem 0;
}
.checkbox{
    width: 100%;
    display: flex;
    justify-content: flex-start;
}
</style>