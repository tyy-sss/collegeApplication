<template>
  <div class="role">
    <div class="show-container">
      <div class="title">
        <div class="text">角色管理</div>
        <div class="prompt">注意：角色个数固定设置为4个，只有部分权限可以进行改动。</div>
      </div>
      <div class="context">
        <div class="top">
          <div class="search">
            <div class="left">
              <!-- <div class="search-item">
                <el-button type="primary" :icon="Plus" @click="handleAddRole"
                  >添加角色</el-button
                >
              </div> -->
              <div class="search-item">
                <el-input v-model="search.searchData" placeholder="请输入">
                  <template #suffix>
                    <el-icon @click="onSearch"><Search /></el-icon>
                  </template>
                </el-input>
              </div>
            </div>
            <div class="right">
              <el-icon :size="23" color="#409EFC" @click="onReSearch"
                ><Refresh
              /></el-icon>
            </div>
          </div>
        </div>
        <div class="middle">
          <el-table
            ref="multipleTableRef"
            :data="tableData"
            border
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="40" />
            <el-table-column label="角色名称" property="name" />
            <el-table-column label="角色说明" property="description" />
            <el-table-column
              property="status"
              label="角色状态"
              min-width="100px"
            >
              <template #default="scope">
                <div class="status">
                  <div v-if="scope.row.status">启动</div>
                  <div v-else>禁用</div>
                  <el-switch
                    v-model="scope.row.status"
                    @click="handleChangeStatus(scope.row)"
                  />
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" min-width="150px">
              <template #default="scope">
                <el-button
                  link
                  type="primary"
                  @click="handleCheckUserRole(scope.row)"
                  >角色成员</el-button
                >
                <el-button
                  link
                  type="success"
                  @click="handleCheckRuleRole(scope.row)"
                  >角色权限</el-button
                >
                <el-button
                  link
                  type="danger"
                  @click="handleChangeRole(scope.row)"
                  >修改信息</el-button
                >
              </template></el-table-column
            >
          </el-table>
        </div>
        <div class="bottom">
          <el-button type="primary" @click="handleBatchUserStatus(open)"
            >批量启用</el-button
          >
          <el-button type="success" @click="handleBatchUserStatus(colse)"
            >批量禁用</el-button
          >
        </div>
        <change-role v-if="form.choose === 'changeRole'" @handleClose="handleClose" />
        <user-role
          v-else-if="form.choose === 'userRole'"
          @handleClose="handleClose"
        />
        <rule-role
          v-else-if="form.choose === 'ruleRole'"
          @handleClose="handleClose"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
// 接口 获取用户列表，修改用户状态，批量修改用户状态,搜索角色,删除角色
import { Plus } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { reactive, ref } from "vue";
import changeRole from "@/components/role/change-role.vue";
import userRole from "@/components/role/user-role.vue";
import ruleRole from "@/components/role/rule-role.vue";
// 数据
const search = reactive({
  searchData: "",
});
const tableData = reactive([
  {
    name: "tom",
    description: "1111",
    status: true,
  },
]);
const form = reactive({
  choose: "",
});
// 获取角色列表
const getRoleList = () => {};
// 查看一个角色的所有用户
const handleCheckUserRole = (role) => {
  form.choose = "userRole";
};
// 查看一个角色的所有权限
const handleCheckRuleRole = (role) => {
  form.choose = "ruleRole";
};
// 删除一个角色
const handleChangeRole = (val) => {
  form.choose = "changeRole";
};
// 搜索
const onSearch = () => {
  console.log(search.searchData);
};
// 刷新搜索
const onReSearch = () => {};
const multipleTableRef = ref();
const multipleSelection = ref([]);
const handleSelectionChange = (val) => {
  multipleSelection.value = val;
  console.log(multipleSelection.value);
};
// 修改用户状态
const handleChangeStatus = (data) => {
  console.log(data);
};
// 批量修改用户状态
const handleBatchUserStatus = (val) => {
  if (multipleSelection.value.length === 0) {
    ElMessage.success("请至少选择一个用户");
  }
  // 批量启动
  if (val === true) {
  } else {
    //批量禁用
  }
};
// 关闭子组件
const handleClose = () => {
  form.choose = "";
};
</script>
<style src="@/assets/css/show-container.css" scoped></style>
<style src="@/assets/css/search-top-left-right.css" scoped/>
<style src="@/assets/css/utils/table-center.css" scoped>
</style>
<style scoped>
.status {
  display: flex;
  align-items: center;
}
.status > div:last-child {
  padding-left: 1rem;
}
</style>
