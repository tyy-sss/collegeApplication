<template>
  <div class="volunteer-address">
    <div class="show-container">
      <div class="title">
        <div class="text">志愿地区管理</div>
      </div>
      <div class="context">
        <div class="top">
          <div class="search">
            <div class="left">
              <div class="search-item">
                <div class="text">组合姓名:</div>
                <div class="input">
                  <el-input
                    v-model="searchData.searchName"
                    placeholder="请输入"
                  />
                </div>
              </div>
              <div class="search-item">
                <div class="text">省份搜索:</div>
                <div class="input">
                  <el-input
                    v-model="searchData.searchProvince"
                    placeholder="请输入"
                  />
                </div>
              </div>
            </div>
            <div class="right">
              <div class="search-button">
                <el-button type="primary" @click="handleSearchAddress"
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
        </div>
        <div class="add">
          <el-button type="primary" :icon="Plus" @click="handleAddAddress"
            >新建</el-button
          >
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
            <el-table-column prop="id" label="组合编号" min-width="120" />
            <el-table-column prop="name" label="组合名称" min-width="120" />
            <el-table-column
              prop="provinceGroup"
              label="涵盖省份"
              min-width="250"
            />
            <el-table-column
              prop="updateTime"
              label="更新时间"
              min-width="120"
            />
            <el-table-column label="操作" min-width="180px">
              <template #default="scope">
                <el-button
                  link
                  type="primary"
                  @click="handleChangeAddress(scope.row)"
                  >修改</el-button
                >
                <el-button
                  link
                  type="danger"
                  @click="handleDeteleAddress(scope.row)"
                  >删除</el-button
                >
              </template></el-table-column
            >
          </el-table>
        </div>
        <div class="bottom">
          <div class="button">
            <el-button type="success" @click="handleBatchDeleteAddress"
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
          <add-volunteer-address
            ref="addVolunteerAddressRef"
            @handleClose="handleClose"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import addVolunteerAddress from "@/components/volunteer/address/add-volunteer-address.vue";
// 搜索数据
const searchData = reactive({
  searchName: "",
  searchProvince: "",
});
// 表格数据
const tableData = reactive([
  {
    id: 1,
    name: "3+3改革省份",
    provinceGroup: ["北京", "天津", "上海", "浙江", "山东", "海南"],
    updateTime: "2024-01-01 23:12:02",
  },
]);
// 分页数据
const page = reactive({
  pageSize: [5, 10, 15],
  currentPage: 1,
  nowPageSize: 5,
  pageCount: 5,
  total: 10,
});
// 搜索地址
const handleSearchAddress = () => {};
// 重置搜索
const onReSearch = () => {
  searchData.searchName = "";
  searchData.searchProvince = "";
};
// 新增地址
const addVolunteerAddressRef = ref(null);
const handleAddAddress = () => {
  addVolunteerAddressRef.value.form.dialogVisible = true;
};
// 批量处理
const multipleSelection = ref([]);
const handleSelectionChange = (val) => {
  multipleSelection.value = val;
  console.log(multipleSelection.value);
};
// 修改地址
const handleChangeAddress = (val) => {
  console.log(val);
  console.log(addVolunteerAddressRef.value.form);
  addVolunteerAddressRef.value.form.dialogVisible = true;
  addVolunteerAddressRef.value.form.isChange = true;
  addVolunteerAddressRef.value.form.oldAddressName = val.name;
  addVolunteerAddressRef.value.form.ruleForm = val;
};
// 关闭插件
const handleClose = () => {
  // 获取新的地址信息
};
// 删除地址
const handleDeteleAddress = () => {};
// 批量删除地址
const handleBatchDeleteAddress = () => {
  console.log(multipleSelection.value);
};
// 修改每页的个数
const handleSizeChange = () => {};
// 页码跳转界面
const handleCurrentChange = () => {
  alert(page.currentPage);
};
</script>
<style src="@/assets/css/show-container.css" scoped/>
<style src="@/assets/css/search-top-left-right.css" scoped/>
<style src="@/assets/css/pager.css" scoped/>
<style scoped>
.volunteer-address > div:not(:last-child) {
  padding-bottom: 1rem;
}
.top .search .right {
  width: 8%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 5rem;
}
</style>