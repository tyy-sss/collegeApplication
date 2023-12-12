/*
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-12-12 21:20:08
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2023-12-12 22:30:58
 * @FilePath: \collegeApplication\src\assets\js\utils\adaptive-column-width.js
 * @Description: el-table列宽根据内容自适应方法封装
 */
export function adaptiveColumnWidthFun(assessments) {
  function getColumnWidth(prop) {
    const minWidth = 80; // 最小宽度
    const padding = 16; // 列内边距

    const contentWidths = assessments.map((item) => {
      const value = item[prop] ? String(item[prop]) : "";
      const textWidth = getTextWidth(value);
      return textWidth + padding;
    });

    const maxWidth = Math.max(...contentWidths);

    return Math.max(minWidth, maxWidth);
  }
  function getTextWidth(text) {
    const span = document.createElement("span");
    span.style.visibility = "hidden";
    span.style.position = "absolute";
    span.style.top = "-9999px";
    span.style.whiteSpace = "nowrap";
    span.innerText = text;
    document.body.appendChild(span);
    const width = span.offsetWidth + 5;
    document.body.removeChild(span);
    return width;
  }
  return { getColumnWidth, }
}