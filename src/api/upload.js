import http from "./request";
import requests from "./request";
// 实现分片上传和断点续传

let uploadFun = {
  user: {},
  test: {},
};

/**
 * 验证文件是否已上传
 * @param {string} md5 hash值
 * @param {Bolb[]} chunks 二进制数组
 * @param {File} file 文件
 */
uploadFun.test.verifyFile = (md5, chunks, file) => {
  let chunksName = [];
  chunks.forEach((item, index) => {
    chunksName.push(md5 + '||' + index);
  });
  return http.post("/user/upload/chunk", {
    chunksObj: { name: md5, chunksName },
    extName: file.name.split(".").slice(-1)[0],
    fileName: md5 + "." + file.name.split(".").slice(-1)[0],
  });
};
/**
 * 上传分片文件
 * @param chunk 二进制数组
 * @param md5 加密串
 * @param fileName 文件名
 * @param index 下标：失败辅助标识
 */
uploadFun.test.uoloadShardFile = (chunks, md5, index = -1) => {
  const formData = new FormData();
  formData.append("file", chunks);
  return requests({
    url: "",
    method: "post",
    headers: {
      authorization: "authorization-text",
    },
    body: formData,
    query: {
      filename: md5 + "||" + index,
      name: md5,
      fileName,
      index,
    },
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      console.log(`Uploaded ${percentCompleted}%`);
    },
  });
};
/**
 * 合并分片数组
 * @param md5
 * @param file 文件
 */
uploadFun.test.mergeFile = (md5 = "", file) => {
  return http.post("", {
    fileName: md5,
    filename: file.name,
    extName: file.name.split(".").slice(-1)[0],
  });
};

export default uploadFun 