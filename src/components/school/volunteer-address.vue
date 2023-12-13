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
                    v-model="data.searchData.searchName"
                    placeholder="请输入"
                  />
                </div>
              </div>
            </div>
            <div class="right">
              <div class="search-button">
                <el-button type="primary" @click="getAddressList"
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
          <add-volunteer-address
            ref="addVolunteerAddressRef"
            @handleClose="getAddressList"
          />
        </div>
        <div class="middle">
          <el-table
            ref="multipleTableRef"
            :data="data.tableData"
            border
            stripe
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="35" />
            <el-table-column prop="areaId" label="组合编号" />
            <el-table-column prop="name" label="组合名称" />
            <el-table-column prop="subjectNumber" label="高考科目数量"/>
            <el-table-column prop="subjectScope" label="所含科目" min-width="160"/>
            <el-table-column
              prop="includingProvinces"
              label="涵盖省份"
              min-width="180"
            />
            <el-table-column
              prop="updateTime"
              label="修改时间"
              min-width="110"
            >
              <template #default="scope">{{
                formatDate(scope.row.updateTime)
              }}</template></el-table-column
            >>
            <el-table-column label="操作">
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
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import addVolunteerAddress from "@/components/volunteer/address/add-volunteer-address.vue";
// 接口
import managerFun from "@/api/manager";
import { ElMessage, ElMessageBox } from "element-plus";
import { formatDate } from "@/assets/js/utils/format-date";
const data = reactive({
  // 搜索数据
  searchData: {
    searchName: "",
  },
  tableData: [],
});
// 重置搜索
const onReSearch = () => {
  data.searchData.searchName = "";
  getAddressList();
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
  addVolunteerAddressRef.value.form.dialogVisible = true;
  addVolunteerAddressRef.value.form.isChange = true;
  addVolunteerAddressRef.value.form.oldAddressName = val.name;
  addVolunteerAddressRef.value.form.ruleForm = Object.assign({}, val);
};
// 删除地址
const handleDeteleAddress = (val) => {
  const areaList = [];
  areaList.push(val.areaId);
  // 删除地址组合
  deleteAreaList(areaList);
};
// 批量删除地址
const handleBatchDeleteAddress = () => {
  if (multipleSelection.value.length === 0) {
    ElMessage.error("请至少选择一个班级");
  } else {
    const areaList = [];
    multipleSelection.value.forEach((item) => {
      areaList.push(item.areaId);
    });
    // 删除地址组合
    deleteAreaList(areaList);
  }
};
// 删除地址组合接口
const deleteAreaList = (val) => {
  console.log(val);
  ElMessageBox.confirm("确定删除所选地址组合", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      val.forEach((item) => {
        managerFun.area
          .deleteArea(item)
          .then((res) => {
            ElMessage.success("操作成功");
          })
          .catch(() => {})
          .finally(() => {
            getAddressList();
          });
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消删除",
      });
    });
};
// 获得地址列表
const getAddressList = () => {
  managerFun.area.selectArea(data.searchData.searchName).then((res) => {
    data.tableData = [];
    if (res) {
      data.tableData = res;
      data.tableData.forEach((item) => {
        item.includingProvinces = JSON.parse(item.includingProvinces);
        item.subjectScope = JSON.parse(item.subjectScope)
      });
    }
  });
};
onMounted(() => {
  getAddressList();
});
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