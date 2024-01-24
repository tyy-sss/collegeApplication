// 成绩单导出表头数据
const getGradesHeader = (gradesList) => {
  const gradesHeader = {
    userNumber: "学号",
    username: "姓名",
  };
  for (let item of gradesList) {
    gradesHeader[String(item.gradeId)] = item.gradeName;
  }
  return gradesHeader;
};
export { getGradesHeader };
