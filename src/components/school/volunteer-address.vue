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
                    @change="getAddressList"
                  />
                </div>
              </div>
            </div>
            <div class="right">
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
            <el-table-column prop="subjectNumber" label="高考科目数量" />
            <el-table-column
              prop="subjectScope"
              label="所含科目"
              min-width="160"
            />
            <el-table-column
              prop="includingProvinces"
              label="涵盖省份"
              min-width="180"
            />
            <el-table-column prop="updateTime" label="修改时间" min-width="110">
              <template #default="scope">{{
                getAllTimeNews(scope.row.updateTime)
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
              </template></el-table-column
            >
          </el-table>
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
import { DELAY_TIME, getAllTimeNews } from "@/constants/date";
import { debounce } from "@/assets/js/utils/throttle";
const data = reactive({
  // 搜索数据
  searchData: {
    searchName: "",
  },
  tableData: [],
});
// 重置搜索
const onReSearch = debounce(() => {
  data.searchData.searchName = "";
  getAddressList();
},DELAY_TIME);
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
// 获得地址列表
const getAddressList = debounce(() => {
  managerFun.area.selectArea(data.searchData.searchName).then((res) => {
    data.tableData = [];
    if (res) {
      data.tableData = res;
      data.tableData.forEach((item) => {
        item.includingProvinces = JSON.parse(item.includingProvinces);
        item.subjectScope = JSON.parse(item.subjectScope);
      });
    }
  });
}, DELAY_TIME);
onMounted(() => {
  getAddressList();
});
</script>
<style src="@/assets/css/show-container.css" scoped />
<style src="@/assets/css/search-top-left-right.css" scoped />
<style src="@/assets/css/pager.css" scoped />
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
