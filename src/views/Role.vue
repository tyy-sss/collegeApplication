<template>
  <div class="role">
    <div class="show-container">
      <div class="title">
        <div class="text">角色管理</div>
        <div class="prompt">
          注意：角色个数固定设置为4个，只有部分权限可以进行改动。
        </div>
      </div>
      <div class="context">
        <div class="middle">
          <el-table
            :data="data.tableData"
            border
            style="width: 100%"
          >
            <el-table-column label="角色名称" property="strName" />
            <el-table-column
              class="description"
              label="角色说明"
              property="description"
            />
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
                  >查看角色权限</el-button
                >
              </template></el-table-column
            >
          </el-table>
        </div>
        <user-role
          ref="userRoleRef"
          @handleClose="handleClose"
        />
        <rule-role
          ref="ruleRoleRef"
          @handleClose="handleClose"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
// 接口 获取用户列表，修改用户状态，批量修改用户状态,搜索角色,删除角色
import { onMounted, reactive, ref } from "vue";
import userRole from "@/components/role/user-role.vue";
import ruleRole from "@/components/role/rule-role.vue";
const userRoleRef = ref(null);
const ruleRoleRef = ref(null);
// 接口
import roleFun from "@/api/role";
// 数据
const data = reactive({
  search: {
    searchData: "",
  },
  form: {
    choose: "",
  },
  tableData: [
    {
      strName: "tom",
      description: "1111",
    },
  ],
});
// 获取角色列表
const getRoleList = () => {
  roleFun.user.getAllRole().then((res) => {
    res = res.filter((element) => {
      return element.strName !== "超级管理员";
    });
    data.tableData = res;
  });
};
// 查看一个角色的所有用户
const handleCheckUserRole = (role) => {
  userRoleRef.value.getAllUserByRole(role);
};
// 查看一个角色的所有权限
const handleCheckRuleRole = (role) => {
  ruleRoleRef.value.getAllRuleByRole(role);
};
// 关闭子组件
const handleClose = () => {
  data.form.choose = "";
};
onMounted(() => {
  getRoleList();
});
</script>
<style src="@/assets/css/show-container.css" scoped></style>
<style src="@/assets/css/search-top-left-right.css" scoped/>
<style src="@/assets/css/utils/table-center.css" scoped>
</style>
<style scoped>
.description {
  white-space: pre-line;
}
</style>
