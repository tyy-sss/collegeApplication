// 文件导入
import XLSX from "xlsx";
import { subjectList } from "@/assets/js/data/information-dropdown-data";
import { PHONE_TEST, IDENTITY_TEST } from "@/assets/js/utils/regular-expression";

// 按照二进制读取文件
export const readFile = (file) => {
  return new Promise((resolve) => {
    let reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (e) => {
      resolve(e.target.result);
    };
  });
};
// 得到上传的excel的数据
export const getExcelData = (data) => {
  let workbook = XLSX.read(data, { type: "binary" });
  //拿到第一个sheet表的数据，把第一个表格的数据转换成JSON数据
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  data = XLSX.utils.sheet_to_json(worksheet);
  return data;
};
//excel文件导入
export const excelLeadingIn = (data, character) => {
  //把读取出来的数据变成最后可以传递给服务器的数据
  let list = [];
  data.forEach((item) => {
    let obj = {};
    for (let key in character) {
      if (!character.hasOwnProperty(key)) break;
      let v = character[key];
      const text = v.text;
      const type = v.type;
      v = item[text] || "";
      type === "string" ? (v = String(v)) : null;
      type === "number" ? (v = Number(v)) : null;
      obj[key] = v;
    }
    list.push(obj);
  });
  //得要预处理的数据，把数据处理后传入后端。
  console.log(list, "得到要处理的数据");
  return list;
};

// 把前端获取的数据 进行正则判断，或者处理筛选后处理成上传给后端的数据

// 对学生信息进行处理
export const handleStudentInformation = (data) => {
  const handleData = [];
  data.forEach((item) => {
    // 学生的姓名，学号，班级,目标学校不能为空
    if (!item.name || !item.uId || !item.class || !item.targetSchool) return;
    // 对手机号，身份证号进行正则验证
    var phone = PHONE_TEST.test(item.phone);
    var parentPhone = PHONE_TEST.test(item.parentPhone);
    var identity = IDENTITY_TEST.test(item.identity);
    if (!phone || !parentPhone || !identity) {
      return;
    }
    // 对选考科目进行处理
    let electiveSubjectList = [];
    for (let i = 0; i < item.electiveSubject.length; i++) {
      if (
        item.electiveSubject[i] === "*" ||
        item.electiveSubject[i] === "," ||
        item.electiveSubject[i] === "+" ||
        item.electiveSubject[i] === "，" ||
        item.electiveSubject[i] === "." ||
        item.electiveSubject[i] === "&"
      )
        continue;
      let subject = "";
      while (
        item.electiveSubject[i] !== "*" &&
        item.electiveSubject[i] !== "," &&
        item.electiveSubject[i] !== "+" &&
        item.electiveSubject[i] !== "，" &&
        item.electiveSubject[i] !== "." &&
        item.electiveSubject[i] !== "&"
      ) {
        subject = subject.concat(item.electiveSubject[i]);
        i++;
        if (i >= item.electiveSubject.length) {
          break;
        }
      }
      // 判断是不是在科目数组中
      if (subjectList.includes(subject)) {
        electiveSubjectList.push(subject);
      }
    }
    // 去除重复科目
    electiveSubjectList = new Set(electiveSubjectList);
    if (electiveSubjectList.size !== 3) {
      return;
    }
    item.electiveSubject = electiveSubjectList;
    handleData.push(item);
  });
  console.log(handleData);
  return handleData;
};
// 对老师信息进行处理
export const handleTeacherInformation = (data) => {
  const handleData = [];
  data.forEach((item) => {
    if (!item.uId || !item.name) {
      return;
    }
    // 对手机号进行正则验证
    var p = /^[1][0-9]{10}$/;
    var phone = p.test(item.phone);
    if (!phone) {
      return;
    }
    handleData.push(item);
  });
  console.log(handleData);
  return handleData;
};
