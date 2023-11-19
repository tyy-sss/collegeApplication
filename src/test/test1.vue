<!--
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-11-08 19:08:52
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2023-11-19 11:56:58
 * @FilePath: \collegeApplication\src\test\test1.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <!-- id绑定的是el-table的id名称 -->
    <!-- name是导出excel的表格名称 -->
    <exportExcel :id="'exportTab'" :name="'导出Table'"></exportExcel>
    <el-table :data="tableData" id="exportTab" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址" width="250">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import ExportExcel from "@/components/ExportExcel.vue";
export default {
  components: {
    ExportExcel,
  },
  props: {},
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {},
};
</script>