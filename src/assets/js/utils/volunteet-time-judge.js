import { setSchoolTimeId, getSchoolTimeId } from "@/constants/schoolId-timeId";

// 判断是否在正式志愿结束之后
export const judgeEndOfVolunteerTime = (element) => {
  let changeObj = element;
  changeObj.time = [element.startTime, element.endTime];
  if (new Date(element.endTime) <= new Date()) {
    changeObj.isOpen = false;
  } else {
    changeObj.isOpen = true;
  }
  return changeObj;
};
// 对学校正式志愿时间数组进行处理
export const handleSchoolTimeId = (item, element) => {
  let data;
  if (item == null) {
    data = [];
  } else {
    data = item;
  }
  data = data.filter((ele) => {
    return ele.schoolId != element.schoolId;
  });
  data.push({
    schoolId: element.schoolId,
    timeId: element.timeId,
  });
  setSchoolTimeId(data);
};
