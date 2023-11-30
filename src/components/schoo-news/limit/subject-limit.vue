<template>
  <div class="subject-information">
    <div class="context">
      <div class="top">
        <div class="search">
          <div class="left">
            <div class="search-item">
              <div class="text">专业姓名:</div>
              <div class="input">
                <el-input
                  v-model="searchData.searchName"
                  placeholder="请输入"
                />
              </div>
            </div>
          </div>
          <div class="right">
            <div class="search-button">
              <el-button type="primary" @click="handleSearchProfession"
                >查询</el-button
              >
            </div>
          </div>
        </div>
      </div>
      <div class="add">
        <div class="add-item">
          <el-button type="primary" :icon="Download">导出单页信息</el-button>
          <add-user ref="addUserRef" />
        </div>
        <div class="add-item">
          <el-button type="primary" :icon="Download">导出所有信息</el-button>
          <add-user-single ref="addUserSingleRef" />
        </div>
      </div>
      <div class="middle">
        <el-table :data="tableData" border stripe style="width: 100%">
          <el-table-column prop="college" label="教学学院" />
          <el-table-column prop="professionName" label="专业名称" />
          <el-table-column
            v-for="(item, index) in tableHeader"
            :key="index"
            :prop="item.value"
            :label="item.label"
          ></el-table-column>
          <el-table-column prop="peopleNum" label="限制人数" />
          <el-table-column prop="editStatus" label="编辑状态">
            <template #default="scope">
              <el-button
                v-if="Object.values(scope.row).includes('')"
                type="primary"
                size="small"
                :icon="Edit"
                circle
              />
              <el-button
                v-else
                type="success"
                size="small"
                :icon="Check"
                circle
              />
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="bottom">
        <div class="pager">
          <el-pagination
            :page-size="pager.size"
            :pager-count="9"
            layout="prev, pager, next"
            :total="pager.total"
            @current-change="handleChangePage"
          />
        </div>
      </div>
    </div>
  </div>
</template>
  <script setup>
// 接口 搜索用户 删除用户 重置密码 修改用户角色
import addUser from "@/components/user/add-user.vue";
import addUserSingle from "@/components/user/add-user-single.vue";
import { reactive, ref } from "vue";
import { Download, Edit, Check } from "@element-plus/icons-vue";
const addUserRef = ref(null);
const addUserSingleRef = ref(null);

const searchData = reactive({
  searchName: "",
  searchRole: "",
});
// 分页数据
const pager = reactive({
  size: 10,
  total: 10,
});
// 表头数据
const tableHeader = reactive([
  {
    value: 1,
    label: "3+1+2省份",
  },
  {
    value: 2,
    label: "3+3省份",
  },
]);
const tableData = [
  {
    college: "文学院",
    professionName: "新闻学",
    1: "不限",
    2: "物理",
    peopleNum: 10,
  },
];
// 查询专业
const handleSearchProfession = () => {};
// 手动修改页码数
const handleChangePage = (val) => {
  console.log(val);
};
</script>
  <style src="@/assets/css/utils/table-center.css" scoped/>
  <style src="@/assets/css/show-container.css" scoped/>
  <style src="@/assets/css/search-top-left-right.css" scoped/>
  <style scoped>
.subject-information {
  display: flex;
  justify-content: center;
  align-items: center;
}
.context {
  padding: 2rem;
  width: 90%;
  min-width: 700px;
  background-color: RGBA(237, 242, 246, 0.5);
  border-radius: 1rem;
}
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
.bottom {
  float: right;
}
</style>
  
    