<template>
  <div class="role">
    <div class="show-container">
      <div class="text">角色管理</div>
      <div class="context">
        <div class="top">
          <div class="left">
            <el-row>
              <el-col :span="3">
                <el-button type="primary" :icon="Plus" @click="addUser"
                  >添加角色</el-button
                ></el-col
              >
              <el-col :span="14" :offset="7"
                ><el-input v-model="search.searchData" placeholder="请输入">
                  <template #suffix>
                    <el-icon @click="onSearch"><Search /></el-icon>
                  </template> </el-input
              ></el-col>
            </el-row>
          </div>
          <div class="right">
            <el-icon :size="23" color="#409EFC" @click="onReSearch"
              ><Refresh
            /></el-icon>
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
              <template #default>
                <el-button link type="primary">角色成员</el-button>
                <el-button link type="success">角色权限</el-button>
                <el-button link type="danger">删除</el-button>
              </template></el-table-column
            >
          </el-table>
        </div>
        <div class="bottom">
          <el-button type="primary">批量启用</el-button>
          <el-button type="success">批量禁用</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// 接口 添加用户，搜索用户
import { Plus } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
const search = reactive({
  searchData: "",
});
// 添加用户
const addUser = () => {};
// 搜索
const onSearch = () => {
  console.log(search.searchData);
};
// 刷新搜索
const onReSearch = () => {};
const multipleTableRef = ref();
const multipleSelection = ref([]);

const handleSelectionChange = (val) => {
  console.log(val);
  multipleSelection.value = val;
};

const tableData = reactive([
  {
    name: "tom",
    description: "1111",
    status: true,
  },
]);
// 修改用户状态
const handleChangeStatus = (data) => {
  console.log(data);
};
</script>
<style src="@/assets/css/show-container.css" scoped></style>
<style scoped>
.context > div {
  margin-bottom: 2rem;
}
.top,
.top .left {
  display: flex;
  justify-content: space-between;
}
::v-deep.el-table .cell {
  display: flex;
  justify-content: center;
}
.status {
  display: flex;
  align-items: center;
}
.status > div:last-child {
  padding-left: 1rem;
}
</style>
