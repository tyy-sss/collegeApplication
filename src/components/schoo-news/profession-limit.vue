<template>
  <div class="profession-limit">
    <div class="context">
      <div class="add">
        <div class="add-item">
          <el-button
            color="#626aef"
            :icon="Plus"
            @click="handleAddProfessionInformation"
            >添加科目</el-button
          >
          <profession-information ref="professionInformationRef" />
        </div>
        <div class="add-item">
          <el-button
            type="success"
            :icon="Share"
            @click="handleCheckProfessionAddress"
            >选择志愿地区组合</el-button
          >
          <profession-address ref="professionAddressRef" />
        </div>
      </div>
      <div class="top">
        <div class="search">
          <div class="left">
            <div class="search-item">
              <div class="text">专业姓名:</div>
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
        </div>
        <div class="add-item">
          <el-button type="primary" :icon="Download">导出所有信息</el-button>
        </div>
      </div>
      <div class="middle">
        <el-table :data="data.tableData" border stripe style="width: 100%">
          <el-table-column prop="college" label="教学学院" />
          <el-table-column prop="professionName" label="专业名称" />
          <el-table-column
            v-for="(item, index) in data.tableHeader"
            :key="index"
            :prop="item.value"
            :label="item.label"
            min-width="250"
          >
            <template #default="scope">
              <el-cascader
                v-model="scope.row[item.value]"
                :options="data.options"
                :show-all-levels="false"
              />
            </template>
          </el-table-column>
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
            :page-size="data.pager.size"
            :pager-count="9"
            layout="prev, pager, next"
            :total="data.pager.total"
            @current-change="handleChangePage"
          />
        </div>
      </div>
    </div>
  </div>
</template>
  <script setup>
import { onMounted, reactive, ref } from "vue";
import professionInformation from "@/components/schoo-news/limit/profession-information.vue";
import professionAddress from "@/components/schoo-news/limit/profession-address.vue";
import { Download, Plus, Share, Check, Edit } from "@element-plus/icons-vue";
// 下拉框数据
import { optionsChoose } from "@/assets/js/data/address-cascader";
const data = reactive({
  // 搜索数据
  searchData: {
    searchName: "",
  },
  // 分页数据
  pager: {
    size: 10,
    total: 10,
  },
  // 表头数据
  tableHeader: [
    {
      value: "1",
      label: "3+1+2省份",
    },
    {
      value: "2",
      label: "3+3省份",
    },
  ],
  // 表格数据
  tableData: [
    {
      college: "文学院",
      professionName: "新闻学",
      1: [""],
      2: [""],
      peopleNum: 100,
    },
  ],
  options: [
    {
      value: "guide",
      label: "Guide",
    },
  ],
});
const professionInformationRef = ref(null);
const professionAddressRef = ref(null);
// 添加科目
const handleAddProfessionInformation = () => {
  professionInformationRef.value.data.dialogTableVisible = true;
};
// 选择志愿组合
const handleCheckProfessionAddress = () => {
  professionAddressRef.value.data.dialogVisible = true;
};
// 查询专业
const handleSearchProfession = () => {};
// 手动修改页码数
const handleChangePage = (val) => {
  console.log(val);
};
onMounted(() => {
  data.options =  optionsChoose();
});
</script>
  <style src="@/assets/css/utils/table-center.css" scoped/>
  <style src="@/assets/css/show-container.css" scoped/>
  <style src="@/assets/css/search-top-left-right.css" scoped/>
  <style scoped>
.profession-limit {
  display: flex;
  justify-content: center;
  align-items: center;
}
.context {
  padding: 1.5rem;
  width: 98%;
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
  
    