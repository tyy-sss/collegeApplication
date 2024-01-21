// 用户管理
import http from "./request";

let managerFun = {
  user: {},
  class: {},
  school: {},
  area: {},
  subject: {},
  major: {},
  wishTime: {},
};

/**
 * 查询用户数据
 * @param {*} username 姓名
 * @param {*} role 角色
 * @param {*} current 页码
 * @param {*} size 分页数据大小
 * @returns
 */
managerFun.user.searchUser = (username, role, current, size) => {
  return http.get("/user", { username, role, current, size });
};
/**
 * 批量上传学生数据
 * @param {} data
 * @returns
 */
managerFun.user.addStudentsByExcel = (data) => {
  return http.post("/user/students", data);
};
/**
 * 批量上传老师数据
 * @param {} data
 * @returns
 */
managerFun.user.addTeacherByExcel = (data) => {
  return http.post("/user/teachers", data);
};
/**
 * 重置密码
 * @param {*} data 用户账号数组
 * @returns
 */
managerFun.user.reset = (data) => {
  return http.put("/user/reset", data);
};
/**
 * 删除用户
 * @param {*} data 用户账号数组
 */
managerFun.user.deleteUser = (data) => {
  return http.delete("/user", data);
};
/**
 * 获得老师的信息
 * @returns
 */
managerFun.user.getTeacherList = () => {
  return http.get("/user/teachers");
};
managerFun.class.searchClass = (year, current, size) => {
  return http.get("/class", { year, current, size });
};

/** 班级 */
/**
 * 班级名查重
 * @param {*} className
 * @returns
 */
managerFun.class.existsClass = (className) => {
  return http.get("/class/exists", { className });
};
/**
 * 创建班级
 * @param {*} userNumber
 * @param {*} className
 */
managerFun.class.addClass = (userNumber, className) => {
  return http.post("/class", { userNumber, className });
};
/**
 * 修改班级信息
 * @param {*} userNumver
 * @param {*} className
 */
managerFun.class.changeClass = (classId, userNumber, className) => {
  return http.put("/class", { classId, userNumber, className });
};
/**
 * 删除班级
 * @param {*} data 班级编号数组
 */
managerFun.class.deleteClass = (data) => {
  return http.delete("/class", data);
};

/** 学校 */
/**
 * 学校名查重
 * @param {*} name
 * @returns
 */
managerFun.school.existsSchool = (schoolName) => {
  return http.get("/school/exists", { schoolName });
};
/**
 * 搜索学校
 * @param {*} schoolName
 * @returns
 */
managerFun.school.searchSchool = (schoolName) => {
  return http.get("/school", { schoolName });
};
/**
 * 添加学校
 * @param {*} data
 * @returns
 */
managerFun.school.addSchool = (data) => {
  return http.post("/school", data);
};
/**
 * 修改学校信息
 * @param {*} data
 * @returns
 */
managerFun.school.changeSchool = (data) => {
  return http.put("/school", data);
};
/**
 * 删除学校
 * @param {*} number 学校编号
 */
managerFun.school.deleteSchool = (number) => {
  return http.delete("/school", number);
};

/** 地区 */
/**
 * 搜索组合
 * @param {组合名} name
 * @returns
 */
managerFun.area.selectArea = (name) => {
  return http.get("/area/selectArea?name=" + name);
};
/**
 * 添加地址组合
 * @param {地区对象} data
 */
managerFun.area.addArea = (data) => {
  return http.post("/area/addArea", data);
};
/**
 * 修改地址组合
 * @param {地区对象} data
 * @returns
 */
managerFun.area.modifyArea = (data) => {
  return http.put("/area/modifyArea", data);
};
/**
 * 删除地址
 * @param {地址组合id} data
 * @returns
 */
managerFun.area.deleteArea = (data) => {
  return http.delete("/area/deleteArea?areaIds=" + data);
};

/* 科目 */
/**
 * 查看所有的科目
 * @returns
 */
managerFun.subject.checkSubject = () => {
  return http.get("/subject/selectSubject");
};
/**
 * 添加科目
 * @param {添加的科目名} data
 * @returns
 */
managerFun.subject.addSubject = (data) => {
  return http.post("/subject/addSubject", {
    subjectId: 0,
    subjectName: data,
  });
};
/**
 * 删除科目
 * @param {科目id} subjectId
 * @returns
 */
managerFun.subject.deleteSubject = (subjectId) => {
  return http.delete("/subject/delete?subjectIds=" + subjectId);
};

/** 专业 */
/**
 * 通过学校id获得这个学校的专业信息
 * @param {学校编号} schoolId
 * @returns
 */
managerFun.major.allMajor = (schoolId) => {
  return http.get("/major/selectSchoolMajor1?schoolId=" + schoolId);
};
/**
 * 搜索专业
 * @param {学校编号} schoolId
 * @param {搜索类型} type
 * @param {搜索词} word
 * @param {当前页码} current
 * @param {页数} size
 * @returns
 */
managerFun.major.selectSchoolMajor = (schoolId, type, word, current, size) => {
  return http.get("/major/selectSchoolMajor?", {
    schoolId,
    type,
    word,
    current,
    size,
  });
};
/**
 * 添加专业(excel批量添加)
 * @param {专业数组} data
 * @returns
 */
managerFun.major.addMajor = (data) => {
  return http.post("/major/addMajor", data);
};
/**
 * 修改专业
 * @param {修改后的数据} data
 * @returns
 */
managerFun.major.modifyMajor = (data) => {
  return http.put("/major/modifyMajor", data);
};
/**
 * 删除专业
 * @param {专业id} majorIds
 * @returns
 */
managerFun.major.deleteMajor = (majorIds) => {
  return http.delete("/major/deleteMajor?MajorId=" + majorIds);
};

/**
 * 根据入学时间搜索志愿时间接口
 * @param {学校编号} schoolId
 * @param {学年} age
 * @param {*} current
 * @param {*} size
 * @returns
 */
managerFun.wishTime.selectWishTime1 = (schoolId, ago, current = 1, size = 2) => {
  return http.get("/wishTime/selectWishTime1", {
    schoolId,
    ago,
    current,
    size,
  });
};
/**
 * 根据学校编号搜索志愿时间接口
 * @param {学校编号} schoolId
 * @param {*} current
 * @param {*} size
 * @returns
 */
managerFun.wishTime.selectWishTime = (schoolId,  current = 1, size = 10) => {
  return http.get("/wishTime/selectWishTime", {
    schoolId,
    current,
    size,
  });
};
/**
 *填写志愿时间
 * @param {志愿时间对象} timeData
 * @returns
 */
managerFun.wishTime.addWishTime = (timeData) => {
  return http.post("/wishTime/addWishTime", timeData);
};
managerFun.wishTime.modifyWiseTime = (timeData) =>{
  return http.put("/wishTime/modifyWiseTime", timeData);
}
export default managerFun;
