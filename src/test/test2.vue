<template>
  <el-button type="primary" style="margin-left: 16px" @click="drawer = true">
    with footer
  </el-button>

  <el-drawer v-model="drawer" direction="ttb">
    <template #header>
      <h4>set title by slot</h4>
    </template>

    <template #default>
      <div>
        <el-radio v-model="radio1" label="Option 1" size="large"
          >Option 1</el-radio
        >
        <el-radio v-model="radio1" label="Option 2" size="large"
          >Option 2</el-radio
        >
      </div>
    </template>

    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">取消</el-button>
        <el-button type="primary" @click="confirmClick">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup>
import { ref } from "vue";
import { ElMessageBox } from "element-plus";
const drawer = ref(false);
function cancelClick() {
  drawer.value = false;
}
function confirmClick() {
  ElMessageBox.confirm("确定吗")
    .then(() => {
      drawer.value = false;
    })
    .catch(() => {
      // catch error
    });
}
</script>
