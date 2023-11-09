<!--
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-11-08 19:08:52
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2023-11-08 19:13:28
 * @FilePath: \collegeApplication\src\test\test1.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <table id="excelTable"></table>
  </div>
</template>

<script>
window.onload = function () {
  var table = document.getElementById("excelTable");
  var csvFile = "@/test/test.csv"; // 替换为你的 CSV 文件路径

  fetch(csvFile)
    .then((response) => response.text())
    .then((data) => {
      var rows = data.split("\n");
      rows.forEach((row) => {
        var columns = row.split(",");
        var tr = document.createElement("tr");
        columns.forEach((column) => {
          var td = document.createElement("td");
          td.textContent = column;
          tr.appendChild(td);
        });
        table.appendChild(tr);
      });
    });
};
</script>

<style lang="scss" scoped>
</style>
