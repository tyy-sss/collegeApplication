// 文件上传js
import SparkMD5 from "spark-md5";
import uploadFun from "@/api/upload.js";

const chunksize = 1024 * 1024;

/**
 * 文件分片处理
 * @param {File} file 文件对象
 * @param {number} chunksize 分片大小
 */
const createChunks = async (file) => {
  var chunks = [];
  for (let i = 0; i < file.size; i += chunksize) {
    chunks.push(file.slice(i, i + chunksize));
  }
  // 文件的MD5
  const md5 = await createMd5(chunks);
  console.log(md5);
  console.log(await uploadFun.test.verifyFile(md5, chunks, file));
};

/**
 * 使用MD5对分片数组进行加密
 * @param chunks
 */
const createMd5 = (chunks) => {
  var spark = new SparkMD5();
  return new Promise((resolve) => {
    const read = (i) => {
      if (i >= chunks.length) {
        const md5 = spark.end();
        resolve(md5);
        return;
      }
      const bolb = chunks[i];
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const bytes = e?.target?.result;
        spark.append(bytes);
        console.log(bytes);
        read(i + 1);
      };
      fileReader.readAsArrayBuffer(bolb);
    };
    read(0);
  });
};

/**
 * 循环上传chunks
 * @param chunks
 * @param md5 加密串
 * @param fileName 文件名
 */
const uploadChunks = (chunks, fileName = "") => {
  const allRequest = chunks.map((item, index) => {
    return uploadFun.test.uploadShardFile(item, md5, fileName, index);
  });
  return allRequest;
};

export { createChunks };
