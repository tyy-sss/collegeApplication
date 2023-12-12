<!--
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-11-19 11:54:17
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2023-12-12 22:30:27
 * @FilePath: \collegeApplication\src\components\ExportExcel.vue
 * @Description: 导出demo
-->
<template>
  <el-button
    type="primary"
    :loading="downloadLoading"
    icon="el-icon-top-right"
    size="small"
    @click="exportExcel"
  >
    导出
  </el-button>
</template>

<script setup>
import { ref } from "vue";
import FileSaver from "file-saver";
import XLSX from "xlsx";

const props = defineProps({
  id: {
    type: String,
    default: "table",
  },
  name: {
    type: String,
    default: "Table",
  },
});

const downloadLoading = ref(false);

const exportExcel = () => {
  downloadLoading.value = true;
  const xlsxParam = { raw: true };
  const wb = XLSX.utils.table_to_book(
    document.querySelector("#" + props.id),
    xlsxParam
  );
  const wbout = XLSX.write(wb, {
    bookType: "xlsx",
    bookSST: true,
    type: "array",
  });
  try {
    FileSaver.saveAs(
      new Blob([wbout], {
        type: "application/octet-stream",
      }),
      props.name + ".xlsx"
    );
  } catch (e) {
    if (typeof console !== "undefined") console.log(e, wbout);
  }
  downloadLoading.value = false;
  return wbout;
};
</script>
