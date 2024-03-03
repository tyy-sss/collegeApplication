<template>
  <div class="user">
    <div class="show-container">
      <div class="title">
        <div class="text">用户管理</div>
      </div>
      <div class="context">
        <div class="top">
          <div class="search">
            <div class="left">
              <div class="search-item">
                <div class="text">搜索信息:</div>
                <div class="input">
                  <el-input
                    v-model="data.searchData.searchName"
                    placeholder="请输入用户账号或者姓名"
                  />
                </div>
              </div>
              <div class="search-item">
                <div class="text">用户角色:</div>
                <div class="input">
                  <el-select
                    placeholder="选择一个角色"
                    v-model="data.searchData.searchRole"
                  >
                    <el-option
                      v-for="(item, index) in data.roleList"
                      :key="index"
                      :label="item.strName"
                      :value="item.strName"
                    />
                  </el-select>
                </div>
              </div>
            </div>
            <div class="right">
              <div class="search-button">
                <el-button type="primary" @click="searchUser">查询</el-button>
              </div>
              <div class="search-icon">
                <el-icon :size="23" color="#409EFC" @click="onReSearch"
                  ><Refresh
                /></el-icon>
              </div>
            </div>
          </div>
        </div>
        <div class="add">
          <div class="add-item">
            <el-button type="primary" :icon="Plus" @click="handleAddUser"
              >批量添加用户</el-button
            >
            <add-user ref="addUserRef" @get-user-list="getUserList" />
          </div>
          <div class="add-item">
            <el-button type="primary" :icon="Plus" @click="handleAddUserSingle"
              >单个添加用户</el-button
            >
            <add-user-single
              ref="addUserSingleRef"
              @get-user-list="getUserList"
            />
          </div>
        </div>
        <div class="middle">
          <el-table
            ref="multipleTableRef"
            :data="data.tableData"
            border
            stripe
            style="width: 100%"
            @selection-change="handleSelectionChange"
            empty-text="暂无数据"
          >
            <el-table-column type="selection" width="35" />
            <el-table-column
              prop="userNumber"
              label="用户账号"
              min-width="120"
            />
            <el-table-column prop="username" label="用户姓名" min-width="120" />
            <el-table-column prop="role" label="用户角色" min-width="120" />
            <el-table-column prop="className" label="所在班级" />
            <el-table-column
              prop="lastDdlTime"
              label="最近更新"
              min-width="100"
            >
              <template #default="scope">
                {{ scope.row.lastDdlTime.replace("T", " ") }}
              </template>
            </el-table-column>
            <el-table-column label="操作" min-width="180px">
              <template #default="scope">
                <el-button
                  link
                  type="primary"
                  @click="handleDeleteUser(scope.row)"
                  >删除用户</el-button
                >
                <el-button
                  link
                  type="success"
                  @click="handleResetUser(scope.row)"
                  >重置密码</el-button
                >
                <el-button
                  link
                  type="danger"
                  @click="handleChangeUserRole(scope.row)"
                  >修改角色</el-button
                >
              </template></el-table-column
            >
          </el-table>
        </div>
        <div class="bottom">
          <div class="button">
            <el-button type="primary" @click="handleBatchResetUser"
              >批量重置密码</el-button
            >
            <el-button type="success" @click="handleBatchDeleteUser"
              >批量删除</el-button
            >
          </div>
          <el-divider />
          <div class="pager">
            <div class="page-news">共{{ data.page.total }}条信息</div>
            <el-pagination
              v-model:current-page="data.page.currentPage"
              v-model:page-size="data.page.nowPageSize"
              :page-sizes="data.page.pageSize"
              :pager-count="data.page.pageCount"
              layout="prev, pager, next,sizes,jumper"
              :total="data.page.total"
              @size-change="getUserList"
              @current-change="getUserList"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- 对话框 -->
    <el-dialog v-model="data.dialogVisible" title="修改角色" width="30%">
      <el-form>
        <el-form-item label="用户姓名:">
          <div>{{ data.chooseUser.username }}</div>
        </el-form-item>
        <el-form-item label="用户角色:">
          <el-select
            placeholder="选择一个角色"
            v-model="data.chooseUser.roleId"
          >
            <el-option
              v-for="(item, index) in data.roleList"
              :key="index"
              :label="item.strName"
              :value="item.roleId"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="handleChangeUserRoleEnd">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
// 接口 搜索用户 删除用户 重置密码 修改用户角色
import managerFun from "@/api/manager";
import roleFun from "@/api/role";
import addUser from "@/components/user/add-user.vue";
import addUserSingle from "@/components/user/add-user-single.vue";
import { onMounted, reactive, ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
const addUserRef = ref(null);
const addUserSingleRef = ref(null);
const data = reactive({
  // 搜索数据
  searchData: {
    searchName: "",
    searchRole: "",
  },
  // 分页数据
  page: {
    pageSize: [10, 15, 20],
    currentPage: 1,
    nowPageSize: 10,
    pageCount: 5,
    total: 0,
  },
  // 表格数据
  tableData: [],
  // 对话框
  dialogVisible: false,
  chooseUser: {
    username: "",
    roleId: "",
    userId: "",
  },
  roleList: [],
});
// 重置搜索
const onReSearch = () => {
  data.searchData.searchName = "";
  data.searchData.searchRole = "";
  searchUser();
};
// 搜索用户
const searchUser = () => {
  data.page.currentPage = 1;
  getUserList();
};
// 添加用户
const handleAddUser = () => {
  addUserRef.value.data.dialogTableVisible = true;
};
// 单个添加用户
const handleAddUserSingle = () => {
  addUserSingleRef.value.form.dialogVisible = true;
};
// 批量处理
const multipleSelection = ref([]);
const handleSelectionChange = (val) => {
  multipleSelection.value = val;
};
// 删除单个用户
const handleDeleteUser = (val) => {
  let userNumberList = [];
  userNumberList.push(val.userNumber);
  deleteUserList(userNumberList);
};
// 重置密码
const handleResetUser = (val) => {
  let userNumberList = [];
  userNumberList.push(val.userNumber);
  resetUserList(userNumberList);
};
// 修改角色
const handleChangeUserRole = (val) => {
  data.dialogVisible = true;
  data.chooseUser = { ...val };
  data.chooseUser.roleId = "";
};
// 修改角色权限
const handleChangeUserRoleEnd = () => {
  console.log(data.chooseUser);
  roleFun.user
    .changeUserRole(data.chooseUser.userId, data.chooseUser.roleId)
    .then((res) => {
      ElMessage.success("修改用户角色成功");
      handleClose();
      getUserList();
    });
};
// 关闭对话框
const handleClose = () => {
  data.dialogVisible = false;
};
// 批量重置密码
const handleBatchResetUser = () => {
  if (multipleSelection.value.length === 0) {
    ElMessage.error("请至少选择一个用户");
  } else {
    let userNumberList = [];
    multipleSelection.value.forEach((item) => {
      userNumberList.push(item.userNumber);
    });
    resetUserList(userNumberList());
  }
};
// 批量删除用户
const handleBatchDeleteUser = () => {
  if (multipleSelection.value.length === 0) {
    ElMessage.error("请至少选择一个用户");
  } else {
    let userNumberList = [];
    multipleSelection.value.forEach((item) => {
      userNumberList.push(item.userNumber);
    });
    deleteUserList(userNumberList);
  }
};
// 删除用户接口
const deleteUserList = (val) => {
  ElMessageBox.confirm("确定删除所选用户", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      managerFun.user
        .deleteUser(val)
        .then((res) => {
          ElMessage.success(res);
        })
        .catch(() => {})
        .finally(() => {
          getUserList();
        });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消删除",
      });
    });
};
// 重置密码接口
const resetUserList = (val) => {
  // 重置密码
  managerFun.user
    .reset(val)
    .then((res) => {
      ElMessage.success(res);
    })
    .catch(() => {})
    .finally(() => {
      getUserList();
    });
};
// 获得更新之后的用户列表
const getUserList = () => {
  managerFun.user
    .searchUser(
      data.searchData.searchName,
      data.searchData.searchRole,
      data.page.currentPage,
      data.page.nowPageSize
    )
    .then((res) => {
      data.page.total = parseInt(res.total);
      data.page.currentPage = res.current;
      data.tableData = res.records;
    })
    .catch((err) => {
      console.log(err);
    });
};
// 获得用户角色列表
const getRoleList = () => {
  roleFun.user.getAllRole().then((res) => {
    res = res.filter((element) => {
      return element.strName !== "超级管理员";
    });
    data.roleList = res;
  });
};
onMounted(() => {
  getUserList();
  getRoleList();
});
</script>
<style src="@/assets/css/utils/table-center.css" scoped/>
<style src="@/assets/css/show-container.css" scoped/>
<style src="@/assets/css/search-top-left-right.css" scoped/>
<style src="@/assets/css/pager.css" scoped/>
<style scoped>
/* 头部样式设置 */
.top > div,
.middle {
  margin-bottom: 1rem;
}
.top .search .right {
  width: 8%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 5rem;
}
.add {
  display: flex;
}
.add-item {
  margin-right: 1rem;
}
</style>

  