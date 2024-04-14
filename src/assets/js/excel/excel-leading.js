// 文件导入
import XLSX from "xlsx";
import managerFun from "@/api/manager";

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
  console.log(list, "初步处理的数据");
  return list;
};
// 对学生信息进行处理
export const handleStudentInformation = (data, subjectList) => {
  const handleData = [];
  data.forEach((item) => {
    // 学生的姓名，学号，班级,目标学校不能为空
    if (!item.username || !item.userNumber || !item.className || !item.school)
      return;
    // 把班级变成字符串
    item.className = item.className.toString();
    // 对选考科目进行处理
    let electiveSubjectList = [];
    if (item.subjects.length === 0) {
      if (
        item.object.indexOf("文史") != -1 ||
        item.object.indexOf("文科") != -1
      ) {
        electiveSubjectList = ["历史", "政治", "地理"];
      } else if (
        item.object.indexOf("理工") != -1 ||
        item.object.indexOf("理科") != -1
      ) {
        electiveSubjectList = ["物理", "生物", "化学"];
      }
    } else if (item.subjects.length !== 0) {
      for (let i = 0; i < item.subjects.length; i++) {
        if (
          item.subjects[i] === "," ||
          item.subjects[i] === "+" ||
          item.subjects[i] === "，" ||
          item.subjects[i] === "." ||
          item.subjects[i] === "&" ||
          item.subjects[i] === "/" ||
          item.subjects[i] === "*"
        )
          continue;
        let subject = "";
        while (
          item.subjects[i] !== "*" &&
          item.subjects[i] !== "," &&
          item.subjects[i] !== "+" &&
          item.subjects[i] !== "，" &&
          item.subjects[i] !== "." &&
          item.subjects[i] !== "&" &&
          item.subjects[i] !== "/" &&
          item.subjects[i] !== "*"
        ) {
          subject = subject.concat(item.subjects[i]);
          i++;
          if (i >= item.subjects.length) {
            break;
          }
        }
        // 判断是不是在科目数组中
        if (subjectList.includes(subject)) {
          electiveSubjectList.push(subject);
        }
      }
    }
    // 去除重复科目
    electiveSubjectList = new Set(electiveSubjectList);
    if (electiveSubjectList.size !== 3) {
      return;
    }
    item.subjects = Array.from(electiveSubjectList);
    // 删除Object属性
    delete item.object;
    handleData.push(item);
  });
  console.log(handleData, "处理后的学生导入信息");
  return handleData;
};
// 对老师信息进行处理
export const handleTeacherInformation = (data) => {
  const handleData = [];
  data.forEach((item) => {
    if (!item.userNumber || !item.username) {
      return;
    }
    handleData.push(item);
  });
  console.log(handleData, "处理后的老师导入信息");
  return handleData;
};
