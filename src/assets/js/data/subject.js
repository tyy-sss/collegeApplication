import managerFun from "@/api/manager";

const getSubject = (callback) => {
  let subjectList = [];
  managerFun.subject
    .checkSubject()
    .then((res) => {
      res.forEach((element) => {
        subjectList.push(element.subjectName);
      });
    })
    .catch(() => {})
    .finally(() => {
      console.log(subjectList);
      return subjectList;
    });
};

export { getSubject };
