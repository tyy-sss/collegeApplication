<template>
  <div class="profession-address">
    <div class="context">
      <div class="text">选择地区限制组合</div>
      <div class="table">
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
        </el-table>
      </div>
      <div class="text">当前选择组合：{{ combination.toString() }}</div>
      <div class="buttom">
        <el-button type="primary" @click="handleNextStep">下一步</el-button>
      </div>
    </div>
  </div>
</template>
  <script setup>
import { reactive, ref } from "vue";
// 表格数据
const tableData = reactive([
  {
    id: 1,
    name: "3+3改革省份",
    provinceGroup: ["北京", "天津", "上海", "浙江", "山东", "海南"],
  },
  {
    id: 2,
    name: "3+31改革省份",
    provinceGroup: ["北京", "天津", "上海", "浙江", "山东", "海南"],
  },
]);
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
// 调用父组件的方法
const emit = defineEmits(["changeStepActive"]);
// 下一步
const handleNextStep = () =>{
  emit("changeStepActive",3)
}
</script>
<style scoped>
.profession-address {
  display: flex;
  align-items: center;
  justify-content: center;
}
.context {
  padding: 2rem;
  width: 85%;
  background-color: RGBA(237, 242, 246, 0.5);
  border-radius: 1rem;
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
.buttom {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>