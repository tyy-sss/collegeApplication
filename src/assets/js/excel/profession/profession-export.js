import { excelExport } from "@/assets/js/excel/excel-export";
export const handleProfessionExportData = (tableHeader) => {
  const obj = {};

  // 创建一个 Map 对象来维护属性的顺序
  const propertyOrder = new Map();

  // 按照指定的顺序添加属性到 Map 对象
  propertyOrder.set("college", "教学学院");
  propertyOrder.set("name", "专业名称");
  for (let i = 0, len = tableHeader.length; i < len; i++) {
    let name = String(tableHeader[i].areaId);
    let val = tableHeader[i].name;
    propertyOrder.set(name, val);
  }
  propertyOrder.set("enrollmentNumber", "限制人数");

  // 根据 Map 对象的顺序，遍历属性并将其添加到对象中
  for (const [property, value] of propertyOrder) {
    obj[property] = value;
  }

  console.log(obj);
  //   let headerData = {};
  //   headerData["college"] = "教学学院";
  //   headerData["name"] =  "专业名称";
  //   for (let i = 0, len = tableHeader.length; i < len; i++) {
  //     let name = String(tableHeader[i].areaId);
  //     let val = tableHeader[i].name;
  //     headerData[name] = val;
  //   }
  //   headerData["enrollmentNumber"] = "限制人数";
  // //   excelExport(headerData,[],"test")
  //   console.log(headerData);
};
