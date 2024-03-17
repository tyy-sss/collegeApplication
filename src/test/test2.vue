<!--
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-11-21 00:22:36
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2023-12-12 22:29:14
 * @FilePath: \collegeApplication\src\test\test2.vue
 * @Description: 自适应长度
-->
<template>
  <el-table :data="tableData" style="width: 1200px">
    <el-table-column
      prop="name"
      label="姓名"
      :width="getColumnWidth('name')"
      :min-width="getColumnWidth('name')"
    ></el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      :width="getColumnWidth('name')"
      :min-width="getColumnWidth('name')"
    ></el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      :width="getColumnWidth('name')"
      :min-width="getColumnWidth('name')"
    ></el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      :width="getColumnWidth('name')"
      :min-width="getColumnWidth('name')"
    ></el-table-column>
    <el-table-column
      prop="age"
      label="年龄"
      :width="getColumnWidth('age')"
      :min-width="getColumnWidth('age')"
    ></el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        { name: "我的姓名很短", age: 25 },
        { name: "我的姓名很长很长很长很长很长很长很长", age: 30 },
        // 更多数据...
      ],
    };
  },
  methods: {
    getColumnWidth(prop) {
      const minWidth = 80; // 最小宽度
      const padding = 16; // 列内边距

      const contentWidths = this.tableData.map((item) => {
        const value = item[prop] ? String(item[prop]) : "";
        const textWidth = this.getTextWidth(value);
        return textWidth + padding;
      });

      const maxWidth = Math.max(...contentWidths);

      return Math.max(minWidth, maxWidth);
      // return null;
    },
    getTextWidth(text) {
      const span = document.createElement("span");
      span.style.visibility = "hidden";
      span.style.position = "absolute";
      span.style.top = "-9999px";
      span.style.whiteSpace = "nowrap";
      span.innerText = text;
      document.body.appendChild(span);
      const width = span.offsetWidth;
      document.body.removeChild(span);
      return width;
    },
  },
};
</script>