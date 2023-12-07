<template>
  <div class="profession-address">
    <el-drawer
      ref="drawerRef"
      :with-header="false"
      v-model="data.dialogVisible"
      :before-close="handleClose"
      class="demo-drawer"
      size="50%"
    >
      <div class="context">
        <div class="text">选择地区限制组合</div>
        <div class="table">
          <el-table
            ref="multipleTableRef"
            :data="data.tableData"
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
          </el-table>
        </div>
        <div class="text">当前选择组合：{{ combination.toString() }}</div>
      </div>
    </el-drawer>
  </div>
</template>
  <script setup>
import { reactive, ref } from "vue";
const data = reactive({
  dialogVisible: false,
  // 表格数据
  tableData: [
    {
      id: "1",
      name: "3+3改革省份",
      provinceGroup: ["北京", "天津", "上海", "浙江", "山东", "海南"],
    },
    {
      id: "2",
      name: "3+31改革省份",
      provinceGroup: ["北京", "天津", "上海", "浙江", "山东", "海南"],
    },
  ], 
});
// 组合数据
var combination = ref("");
// 批量处理
const multipleSelection = ref([]);
const handleSelectionChange = (val) => {
  multipleSelection.value = val;
  console.log(multipleSelection.value);
  combination.value = [];
  multipleSelection.value.forEach((item) => {
    combination.value.push(item.name);
  });
};
// 关闭对话框
const handleClose = () => {
  data.dialogVisible = false;
};
defineExpose({
  data,
});
</script>
<style scoped>
.profession-address {
  display: flex;
  align-items: center;
  justify-content: center;
}
.context {
  display: flex;
  flex-direction: column;
}
.context > div {
  margin-bottom: 1rem;
}
.text {
  font-size: 18px;
  line-height: 38px;
  font-weight: 700;
  margin-bottom: 1rem;
}
.pager {
  display: flex;
  justify-content: flex-end;
}
</style>