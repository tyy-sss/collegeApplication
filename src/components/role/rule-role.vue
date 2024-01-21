<template>
  <div class="add-role">
    <el-drawer
      ref="drawerRef"
      :with-header="false"
      v-model="form.dialogVisible"
      :before-close="handleClose"
      size="50%"
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
                    <el-checkbox-group>
                      <el-checkbox
                        class="checkbox"
                        v-for="(item, index) in scope.row.rule"
                        :key="index"
                        :label="item.label"
                        size="large"
                      />
                    </el-checkbox-group>
                  </template>
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
      { label: "查看", value: false },
      { label: "修改", value: false },
    ],
  },
  {
    name: "志愿填报",
    rule: [
      { label: "查看", value: false },
      { label: "修改", value: false },
      { label: "导出", value: false },
    ],
  },
  {
    name: "学生个人综测",
    rule: [
      { label: "查看", value: false },
      { label: "修改", value: false },
    ],
  },
  {
    name: "综合测评",
    rule: [
      { label: "查看", value: false },
      { label: "修改", value: false },
      { label: "导出", value: false },
    ],
  },
  {
    name: "学生查询排名",
    rule: [
      { label: "查看", value: false },
      { label: "查询", value: false },
    ],
  },
  {
    name: "班主任班级管理",
    rule: [
      { label: "查看", value: false },
      { label: "管理班级成员", value: false },
      { label: "申诉处理", value: false },
    ],
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
<style src="@/assets/css/role/role-drawer.css" scoped/>
<style scoped>
::v-deep .el-checkbox-group {
  width: 100%;
}
</style>