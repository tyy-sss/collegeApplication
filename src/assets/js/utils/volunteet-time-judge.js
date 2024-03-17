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
