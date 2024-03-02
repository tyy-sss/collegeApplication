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
          <div class="title item">角色用户管理</div>
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
            <el-form-item>
              <div class="warn">
                <el-icon
                  color="RGB(253,151,0)"
                  style="width: 1rem; height: 1rem"
                  ><WarningFilled
                /></el-icon>
                <div class="text">
                  用户加入到角色后，将拥有该角色的所有权限。
                </div>
              </div>
            </el-form-item>
            <el-form-item label="角色名称" prop="name">
              <el-input v-model="form.ruleForm.name" disabled />
            </el-form-item>
            <el-form-item label="选择用户">
              <el-input
                v-model="form.ruleForm.searchData"
                placeholder="请输入用户账号或者姓名"
              >
                <template #suffix>
                  <el-icon @click="onSearch"><Search /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <div class="table">
                <el-table
                  ref="multipleTableRef"
                  :data="form.tableData"
                  border
                  stripe
                  style="width: 100%"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column type="selection" width="30" />
                  <el-table-column prop="userNumber" label="用户账号" min-width="150" />
                  <el-table-column
                    prop="username"
                    label="用户名称"
                    min-width="100"
                  />
                  <el-table-column
                    prop="sex"
                    label="性别"
                    min-width="100"
                  />
                </el-table>
                <div class="pager">
                  <el-pagination
                    :page-size="form.page.pageSize"
                    :pager-count="form.page.pageCount"
                    layout="prev, pager, next"
                    :total="form.page.total"
                    @current-change="handleCurrentChange"
                  />
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="footer">
          <el-divider />
          <span class="button-footer item">
            <el-button type="primary" @click="handleAddUserRole">
              提交
            </el-button>
            <el-button @click="handleClose">取消</el-button>
          </span>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
  <script setup>
// 获得用户分页名单，搜索用户，给用户设置角色
// 接口
import roleFun from "@/api/role";
import { ElMessage } from "element-plus";
import { nextTick, onMounted, reactive, ref, watch } from "vue";
const form = reactive({
  role: "老师",
  dialogVisible: false,
  ruleForm: {
    name: "yyy",
    searchData: "",
  },
  tableData: [],
  page: {
    pageSize: 7,
    pageCount: 1,
    total: 700,
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
// 搜索用户
const onSearch = () => {};
// 添加角色用户
const handleAddUserRole = () => {
  if (multipleSelection.value.length <= 0) {
    ElMessage.info("请选择用户");
  }
  // 添加角色用户
  console.log(multipleSelection.value);
  // 清空表单验证消息
  // 重新刷新角色列表
  ruleFormRef.value.resetFields();
};
const multipleSelection = ref([]);
const multipleTableRef = ref(null);
const handleSelectionChange = (val) => {
  multipleSelection.value = val;
};
// 切换用户数据
const handleCurrentChange = () => {
  // 获得用户列表
  console.log("changePage");
};
onMounted(() => {
  // 获得用户列表
  // 初始化是否选中
  // nextTick(() => {
  //   // for (let i = 0; i < tableData.length; i++) {
  //   //   if (tableData[i].role === form.role) {
  //   //     multipleTableRef.value.toggleRowSelection(tableData[i]);
  //   //   }
  //   // }
  // });
});
const getAllUserByRole = (data) => {
  form.dialogVisible = true;
  form.ruleForm.name = data.strName;
  roleFun.user
    .getUserByRole(data.roleId, form.page.pageCount, form.page.pageSize)
    .then((res) => {
      console.log(res);
      form.tableData = res.records;
      form.page = {
        pageSize: res.size,
        pageCount: res.current,
        total: res.total,
      };
    });
};

defineExpose({
  getAllUserByRole,
});
</script>
<style src="@/assets/css/role/role-drawer.css" scoped>
</style>
<style scoped>
.warn {
  padding: 0.5rem;
  background-color: RGB(253, 247, 219);
  width: 100%;
  display: flex;
  align-items: center;
}
.warn .text {
  font-family: fantasy;
  font-weight: bolder;
  margin-left: 0.5rem;
}
/* 设置分页展示 */
.table {
  width: 100%;
}
.pager {
  float: right;
  padding: 0.5rem 0;
}
</style>