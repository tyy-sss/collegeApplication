export const SCHOOL_TIMEID = "school_timeId";

// 存储学校正式志愿填报时间的id
export const setSchoolTimeId = (data) => {
  sessionStorage.setItem(SCHOOL_TIMEID, JSON.stringify(data));
};
// 获得学校正式志愿填报时间的id
export const getSchoolTimeId = () => {
  return JSON.parse(sessionStorage.getItem(SCHOOL_TIMEID));
};
