// 科目数组
// import { subjectList } from "@/assets/js/data/information-dropdown-data";
let subjectList = [];
let labelList = [];
let vis = [];
let musts = []; //存储强制选的集合
let valueList = [];
// 强制科目集合
const mustFunction = (sum, j, vt) => {
  if (sum == 0) {
    musts.push([].concat(vt));
    return;
  }
  for (let i = j; i < subjectList.length; i++) {
    if (vis[i]) continue;
    vis[i] = 1;
    vt.push(i);
    mustFunction(sum - 1, i + 1, vt);
    vt.pop(); //回溯
    vis[i] = 0;
  }
};
// 必选科目集合
const requiredFunction = (sum, j, vt, mustSum, xuanSum) => {
  //递归筛出必选的种类
  if (sum == 0) {
    if (mustSum != 0) {
      mustFunction(mustSum, 0, []);
      musts.forEach((item) => {
        getList(vt, item, xuanSum);
      });
    } else {
      getList(vt, [], xuanSum);
    }
    musts = [];
    return;
  }
  for (let i = j; i < subjectList.length; i++) {
    if (vis[i]) continue;
    vis[i] = 1;
    vt.push(i);
    requiredFunction(sum - 1, i + 1, vt, mustSum, xuanSum);
    vt.pop();
    vis[i] = 0;
  }
};
// 通过数组得到要显示的label
const getLabelForList = (requiredList, mustList, xuanSum) => {
  let ss = "";
  if (requiredList.length) {
    ss += "必选";
    for (let i = 0; i < requiredList.length; i++) {
      ss += requiredList[i];
      if (i != requiredList.length - 1) {
        ss += "，";
      }
    }
    ss += "。";
  }
  if (xuanSum != 0) {
    for (let i = 0; i < mustList.length; i++) {
      ss += mustList[i];
      if (i != mustList.length - 1) {
        ss += "，";
      }
    }
    ss += "中任选" + xuanSum + "门。";
  }
  return ss;
};
// 通过数字得到要显示的label
const getLabelForNum = (requiredSum, mustSum, xuanSum) => {
  let ss = "";
  if (requiredSum != 0) {
    ss += "必选" + requiredSum + "门";
  }
  if (xuanSum != 0) {
    if (requiredSum != 0) {
      ss += ",";
    }
    ss += "强制从" + mustSum + "门中选" + xuanSum + "门";
  }
  return ss;
};
// 得到list
const getList = (requiredList, mustList, xuanSum) => {
  let subjectRequiredList = [];
  [].concat(requiredList).forEach((item) => {
    subjectRequiredList.push(subjectList[item]);
  });
  let subjectMustList = [];
  mustList.forEach((item) => {
    subjectMustList.push(subjectList[item]);
  });
  valueList.push({
    value: {
      SubjectScope: subjectList,
      // 必选科目数组
      RequiredSubject: subjectRequiredList,
      // 任选科目
      OptionalSubjectScope: {
        // 任选科目数量
        SubjectNum: xuanSum,
        // 任选科目数组
        OptionalSubject: [...subjectMustList],
      },
    },
    label: getLabelForList(subjectRequiredList, subjectMustList, xuanSum),
  });
};
// 得到Label
const getLabel = (n) => {
  //n表示一共几门
  for (let requiredSum = n; requiredSum >= 0; requiredSum--) {
    let xuanSum = n - requiredSum;
    for (
      let mustSum = xuanSum + 1;
      mustSum <= subjectList.length - requiredSum - 1;
      mustSum++
    ) {
      if (requiredSum === n) {
        requiredFunction(requiredSum, 0, [], 0, xuanSum);
      } else {
        requiredFunction(requiredSum, 0, [], mustSum, xuanSum);
      }
      let labelString = getLabelForNum(requiredSum, mustSum, xuanSum);
      labelList.push({
        value: labelString,
        label: labelString,
        children: [].concat(valueList),
      });
      musts = [];
      valueList = [];
      if (requiredSum === n) {
        break;
      }
    }
  }
};
// 得到总的联级选择框
export const optionsChoose = () => {
  subjectList = ["物理", "化学", "生物", "历史", "地理", "政治"];
  let firstChildren = [];
  let allList = [
    {
      value: {
        SubjectScope: subjectList,
        RequiredSubject: [],
        OptionalSubjectScope: {
          SubjectNum: 3,
          OptionalSubject: [...subjectList],
        },
      },
      label: "不限科目",
    },
    {
      value: "",
      label: "限制科目",
      children: firstChildren,
    },
  ];
  for (let i = 1; i <= 3; i++) {
    getLabel(i);
    firstChildren.push({
      value: i + "门",
      label: i + "门",
      children: [].concat(labelList),
    });
    labelList = [];
  }
  return allList;
};
