// 对联级选择器进行处理成上传到后端的值
const getCascaderData = (changeData) => {
  let [...data] = changeData;
  let labelString = [];
  let n = data.length - 1;
  for (let i = 0; i <= n; i++) {
    if (i == n) {
      labelString.push(JSON.stringify(data[i]));
    } else {
      labelString.push(data[i]);
    }
  }
  return {
    areaId: changeData[n].areaId,
    optionalSubjects: changeData[n].optionalSubjects,
    requiredSubjects: changeData[n].requiredSubjects,
    strings: labelString,
    subjectGroups: [0],
  };
};

// 把修改的数据上传给后端
export const handleCascaderData = (changeData, allData) => {
  // 获得最后上传的联级选择器的值 改成深拷贝
  let cascaderData = getCascaderData(changeData);
  let subjectRules = [];
  allData.subjectRule.forEach((element) => {
    if (element.strings.length != 0 && element.areaId != 0) {
      subjectRules.push(JSON.parse(JSON.stringify(element)));
    }
  });
  // 修改专业信息
  for (let i = 0; i < subjectRules.length; i++) {
    if (subjectRules[i].areaId == cascaderData.areaId) {
      subjectRules[i] = {
        areaId: cascaderData.areaId,
        optionalSubjects: cascaderData.optionalSubjects,
        requiredSubjects: cascaderData.requiredSubjects,
        strings: cascaderData.strings,
        subjectGroups: cascaderData.subjectGroups,
      };
    } else {
      let n = subjectRules[i].strings.length - 1;
      if (subjectRules[i].strings[n] != "") {
        subjectRules[i].strings[n] = JSON.stringify(subjectRules[i].strings[n]);
      }
    }
  }
  return {
    college: allData.college,
    enrollmentNumber: allData.enrollmentNumber,
    majorId: allData.majorId,
    name: allData.name,
    schoolId: allData.schoolId,
    subjectRule: subjectRules,
  };
};

// 修改专业的人数
export const handleCascaderDataForEnrollmentNumber = (allData) => {
  let subjectRules = [];
  allData.subjectRule.forEach((element) => {
    if (element.strings.length != 0 && element.areaId != 0) {
      subjectRules.push(JSON.parse(JSON.stringify(element)));
    }
  });
  for (let i = 0; i < subjectRules.length; i++) {
    let n = subjectRules[i].strings.length - 1;
    if (subjectRules[i].strings[n] != "") {
      subjectRules[i].strings[n] = JSON.stringify(subjectRules[i].strings[n]);
    }
  }
  return {
    college: allData.college,
    enrollmentNumber: allData.enrollmentNumber,
    majorId: allData.majorId,
    name: allData.name,
    schoolId: allData.schoolId,
    subjectRule: subjectRules,
  };
};
