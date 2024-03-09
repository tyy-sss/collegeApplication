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
              <el-table :data="form.tableData" border style="width: 100%">
                <el-table-column prop="name" label="功能名称" min-width="120" />
                <el-table-column prop="rule" label="权限" min-width="280">
                  <template #default="scope">
                    <el-checkbox-group v-model="scope.row.rule.ruleDetail">
                      <el-checkbox
                        class="checkbox"
                        v-for="(item, index) in scope.row.rule.allRule"
                        :key="index"
                        :label="item"
                        :value="item"
                        size="large"
                        disabled
                      />
                    </el-checkbox-group>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
    <script setup>
// 获得角色的权限数据，修改权限数据
import { reactive, ref } from "vue";
import { getTableDataByRole } from "@/assets/js/data/rule-role";
const form = reactive({
  role: "老师",
  dialogVisible: false,
  ruleForm: {
    name: "yyy",
    searchData: "",
  },
  tableData: [],
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
const getAllRuleByRole = (data) => {
  form.dialogVisible = true;
  form.ruleForm.name = data.strName;
  form.tableData = getTableDataByRole(data.strName);
};
defineExpose({
  getAllRuleByRole,
});
</script>
<style src="@/assets/css/role/role-drawer.css" scoped/>
<style scoped>
::v-deep .el-checkbox-group {
  width: 100%;
}
</style>