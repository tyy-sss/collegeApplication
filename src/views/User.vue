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
                <div class="text">用户姓名:</div>
                <div class="input">
                  <el-input
                    v-model="searchData.searchName"
                    placeholder="请输入"
                  />
                </div>
              </div>
              <div class="search-item">
                <div class="text">用户角色:</div>
                <div class="input">
                  <el-input
                    v-model="searchData.searchRole"
                    placeholder="请输入"
                  />
                </div>
              </div>
            </div>
            <div class="right">
              <div class="search-button">
                <el-button type="primary" @click="handleSearchUser"
                  >查询</el-button
                >
              </div>
              <div class="search-icon">
                <el-icon :size="23" color="#409EFC" @click="onReSearch"
                  ><Refresh
                /></el-icon>
              </div>
            </div>
          </div>
          <div class="add">
            <el-button type="primary" :icon="Plus" @click="handleAddUser"
              >添加用户</el-button
            >
            <add-user ref="addUserRef" />
          </div>
        </div>
        <div class="middle">
          <el-table
            ref="multipleTableRef"
            :data="tableData"
            border
            stripe
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="35" />
            <el-table-column prop="id" label="用户账号" min-width="120" />
            <el-table-column prop="name" label="用户姓名" min-width="120" />
            <el-table-column prop="uId" label="身份证号" min-width="150" />
            <el-table-column prop="role" label="用户角色" min-width="120" />
            <el-table-column prop="class" label="所在班级" />
            <el-table-column
              prop="update_time"
              label="最近更新"
              min-width="100"
            />
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
            <div class="page-news">共{{ page.total }}条信息</div>
            <el-pagination
              v-model:current-page="page.currentPage"
              v-model:page-size="page.nowPageSize"
              :page-sizes="page.pageSize"
              :pager-count="page.pageCount"
              layout="prev, pager, next,sizes,jumper"
              :total="page.total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// 接口 搜索用户 删除用户 重置密码 修改用户角色
import addUser from "@/components/user/add-user.vue";
import { reactive, ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
const addUserRef = ref(null);

const searchData = reactive({
  searchName: "",
  searchRole: "",
});
const page = reactive({
  pageSize: [10, 15, 20],
  currentPage: 1,
  nowPageSize: 10,
  pageCount: 5,
  total: 700,
});
const tableData = [
  {
    id: "2016-05-03",
    name: "Tom",
    uId: 20249480324,
    role: "老师",
    class: "1",
    update_time: "1930214:139L:11",
  },
];
// 重置搜索
const onReSearch = () => {
  searchData.searchName = "";
  searchData.searchRole = "";
};
// 查询用户
const handleSearchUser = () => {};
// 添加用户
const handleAddUser = () => {
  addUserRef.value.data.dialogTableVisible = true;
};
// 批量处理
const multipleSelection = ref([]);
const handleSelectionChange = (val) => {
  multipleSelection.value = val;
  console.log(multipleSelection.value);
};
// 删除单个用户
const handleDeleteUser = (val) => {};
// 重置密码
const handleResetUser = (val) => {};
// 修改角色
const handleChangeUserRole = (val) => {};
// 批量重置密码
const handleBatchResetUser = () => {
  if (multipleSelection.value.length === 0) {
    ElMessage.error("请至少选择一个用户");
  }
};
// 批量删除用户
const handleBatchDeleteUser = () => {
  if (multipleSelection.value.length === 0) {
    ElMessage.error("请至少选择一个用户");
  }
};
// 修改每页的个数
const handleSizeChange = () => {};
// 页码跳转界面
const handleCurrentChange = () => {
  alert(page.currentPage);
};
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
</style>

  