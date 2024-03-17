// 对最后分流表导入进行处理
export const excelLeadingInForFinalProfession = (results) => {
    let obj = [];
    results.map((item, index) => {
      obj.push({
        // 键名为绑定 el 表格的关键字，值则是 ws[i][对应表头名]
        userNumber: results[index]["学号"],
        admissionResultName: results[index]["_2"],
      });
    });
    obj.shift();
    return obj;
  };