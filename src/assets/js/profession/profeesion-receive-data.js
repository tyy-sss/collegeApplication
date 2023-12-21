const changeStringsType = (item) => {
  for (let i = 0, len = item.subjectRule.length; i < len; i++) {
    let n = item.subjectRule[i].strings.length - 1;
    if (item.subjectRule[i].strings[n] != "") {
      item.subjectRule[i].strings[n] = JSON.parse(
        item.subjectRule[i].strings[n]
      );
    }
  }
  return item;
};

// 展示所有的分页数据 把后端传过来的数据 处理
export const handleTableData = (res, tableHeader) => {
  console.log(res);
  // 表格数据处理 处理strings数组最后一个元素的strings属性
  res.records.forEach((element) => {
    changeStringsType(element);
  });
  let tableData = res.records.concat();
  // 对数据进行处理 表头没有的专业信息 添加strings（为了展示）
  tableData.forEach((element) => {
    for (let i = 0, len = tableHeader.length; i < len; i++) {
      let isExist = element.subjectRule.filter((item) => {
        return item.areaId == Number(tableHeader[i].areaId);
      });
      if (isExist.length == 0) {
        element.subjectRule.push({
          areaId: Number(tableHeader[i].areaId),
          strings: [],
        });
      }
    }
  });
  return tableData;
};
// 对单个专业信息进行处理
export const handleTableDataForSingle = (res, tableData) => {
  changeStringsType(res);
  for (let i = 0, len = tableData.length; i < len; i++) {
    if (tableData[i].majorId == res.majorId) {
      for (let k = 0, len1 = res.subjectRule.length; k < len1; k++) {
        for (let j = 0, len2 = tableData[i].subjectRule.length; j < len2; j++) {
          if (res.subjectRule[k].areaId == tableData[i].subjectRule[j].areaId) {
            tableData[i].subjectRule[j] = res.subjectRule[k];
          }
        }
      }
    }
  }
  return tableData;
};
