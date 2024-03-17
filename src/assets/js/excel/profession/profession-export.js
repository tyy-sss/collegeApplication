import { excelExport } from "@/assets/js/excel/excel-export";
import { changeStringsType } from "@/assets/js/profession/profeesion-receive-data";
// 导出专业分流分页的信息
export const handleProfessionExportData = (tableHeader, tableData) => {
  let headerData = {};
  headerData["college"] = "教学学院";
  headerData["name"] = "专业名称";
  for (let i = 0, len = tableHeader.length; i < len; i++) {
    let name = String(tableHeader[i].areaId);
    let val = tableHeader[i].name;
    headerData[name] = val;
  }
  headerData["enrollmentNumber"] = "限制人数";
  const data = [];
  for (let i = 0, len = tableData.length; i < len; i++) {
    let item = {
      college: tableData[i].college,
      name: tableData[i].name,
    };
    for (let j = 0, len1 = tableData[i].subjectRule.length; j < len1; j++) {
      if (tableData[i].subjectRule[j].strings.length == 0) {
        item[tableData[i].subjectRule[j].areaId] = "";
      } else {
        let len3 = tableData[i].subjectRule[j].strings.length;
        item[tableData[i].subjectRule[j].areaId] =
          tableData[i].subjectRule[j].strings[len3 - 1].strings;
      }
    }
    item.enrollmentNumber = tableData[i].enrollmentNumber;
    data.push(item);
  }
  excelExport(data, headerData, "学校专业限制信息表");
};
// 导出专业分流全部的信息
export const handleAllProfessionExportData = (tableHeader, tableData) => {
  tableData.forEach((element) => {
    changeStringsType(element);
  });
  handleProfessionExportData(tableHeader, tableData);
};
