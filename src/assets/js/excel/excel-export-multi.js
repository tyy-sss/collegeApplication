import fs from "file-saver";
import XLSX from "xlsx";
import { s2ab } from "./excel-export";

const datenum = (v, date1904) => {
  if (date1904) v += 1462;
  var epoch = Date.parse(v);
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
};
/**
 * 处理表头展示位置
 * @param {*} data 表头数据
 * @returns
 */
const sheet_from_array_of_arrays = (data) => {
  var ws = {};
  var range = {
    s: {
      c: 0,
      r: 0,
    },
    e: {
      c: 0,
      r: 0,
    },
  };
  for (var R = 0; R != data.length; ++R) {
    for (var C = 0; C != data[R].length; ++C) {
      if (range.s.r > R) range.s.r = R;
      if (range.s.c > C) range.s.c = C;
      if (range.e.r < R) range.e.r = R;
      if (range.e.c < C) range.e.c = C;
      var cell = {
        v: data[R][C],
      };
      if (cell.v == null) continue;
      var cell_ref = XLSX.utils.encode_cell({
        c: C,
        r: R,
      });

      if (typeof cell.v === "number") cell.t = "n";
      else if (typeof cell.v === "boolean") cell.t = "b";
      else if (cell.v instanceof Date) {
        cell.t = "n";
        cell.z = XLSX.SSF._table[14];
        cell.v = datenum(cell.v);
      } else cell.t = "s";

      ws[cell_ref] = cell;
    }
  }
  if (range.s.c < 10000000) ws["!ref"] = XLSX.utils.encode_range(range);
  return ws;
};
/**
 * 对table数据进行处理
 * @param {*} filterVal 需要过滤的属性数组
 * @param {*} jsonData 过滤的数据
 * @returns
 */
const formatJson = (filterVal, jsonData) => {
  return jsonData.map((v) =>
    filterVal.map((j) => {
      if (j === "timestamp") {
        return parseTime(v[j]);
      } else {
        return v[j];
      }
    })
  );
};
/**
 * 多级表头导出excel文件
 * @param {*} headerData 表头数据
 * @param {*} data 数据
 * @param {*} filename 文件名
 * @param {*} merges 表头的位置
 */
const export_json_to_excel = (headerData, data, filename) => {
  const multiHeader = headerData.multiHeader;
  const header = headerData.header;
  const merges = headerData.merges;
  data = [
    ...formatJson(headerData.filterVal, JSON.parse(JSON.stringify(data))),
  ];
  data.unshift(header);
  for (let i = multiHeader.length - 1; i > -1; i--) {
    data.unshift(multiHeader[i]);
  }
  var ws_name = ".xlsx";
  var wb = XLSX.utils.book_new();
  var ws = sheet_from_array_of_arrays(data);
  if (merges.length > 0) {
    if (!ws["!merges"]) ws["!merges"] = [];
    merges.forEach((item) => {
      ws["!merges"].push(XLSX.utils.decode_range(item));
    });
  }
  wb.SheetNames.push(ws_name);
  wb.Sheets[ws_name] = ws;
  
  var wbout = XLSX.write(wb, {
    bookType: "xlsx",
    bookSST: false,
    type: "binary",
  });
  let blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
  fs.saveAs(blob, filename + ".xlsx");
};

export { export_json_to_excel };
