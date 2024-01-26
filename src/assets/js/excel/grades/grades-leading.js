import { inputNumberEmits } from "element-plus";

// 成绩单导入表头数据
const getGradesCharacter = (gradesList) => {
  const gradesCharacter = {
    userNumber: {
      text: "学号",
      type: "string",
    },
    username: {
      text: "姓名",
      type: "string",
    },
    score: {
      text: "总成绩",
      type: "string",
    },
  };
  for (let item of gradesList) {
    console.log(item);
    gradesCharacter[String(item.gradeId)] = {
      text: item.gradeName,
      type: "string",
    };
  }
  return gradesCharacter;
};

// 处理前端excel导入的创建数据
const handleGradesInformation = (addData, gradesList) => {
  const handleData = [];
  addData.forEach((element) => {
    if (element.userNumber) {
      let item = {};
      item.userNumber = element.userNumber;
      const gradesSubjectList = [];
      for (let i = 0; i < gradesList.length; i++) {
        let gradeScore = element[gradesList[i].gradeId];
        let score = parseInt(gradeScore);
        if (!isNaN(score)) {
          gradeScore = score;
        } else {
          gradeScore = 0;
        }
        console.log(gradeScore);
        gradesSubjectList.push({
          gradeId: gradesList[i].gradeId,
          grade: gradeScore,
        });
      }
      item.gradeSubjectBos = gradesSubjectList;
      item.score = element.score;
      handleData.push(item);
    }
  });
  console.log(handleData);
  return handleData;
};
export { getGradesCharacter, handleGradesInformation };
