import axios from "axios";
import qs from "qs"; //转json数据工具包
import { ElMessage } from "element-plus";
import { addRequest, refreshToken } from "./two-token";
import { getAccessToken, removeAccessToken } from "@/constants/token";

//1.利用axios对象的方法create，去创建一个axios实例。
const requests = axios.create({
  //配置对象
  //接口当中：路径都带有/api     基础路径，发送请求的时候，路径当中会出现api
  baseURL: "http://192.168.50.159:8081/",
  //代表请求超时的时间
  timeout: 10000,
});
//请求拦截器：
requests.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});
//接收请求拦截器
requests.interceptors.response.use((res) => {
  if (typeof res.data !== "object") {
    ElMessage.error("服务端异常！");
    return Promise.reject(res);
  }
  if (res.data.code != 200) {
    // console.log(res.data);
    if (res.data.code === 2044) {
      // 移除失效的短token
      removeAccessToken();
      // 把过期请求存储起来，用于请求到新的短token，再次请求，达到无感刷新
      addRequest(() => resolve(server(config)));
      // 携带长token去请求新的token
      refreshToken();
    }else if(res.data.code == 2018){

    }else{
      if (res.data.msg) ElMessage.error(res.data.msg);
    }
    // if (res.data.resultCode == 419) {
    //   router.push({ path: "/login" });
    // }
    return Promise.reject(res.data);
  }
  return res.data; //返回的是数据
});

const header = {
  "Content-Type": "application/json;charset=UTF-8",
};

const http = {
  get(url = "", params = {}) {
    return new Promise((resolve, reject) => {
      requests({
        url,
        params,
        headers: header,
        method: "GET",
      })
        .then((res) => {
          resolve(res.data);
          return res;
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  post(url = "", params = {}) {
    return new Promise((resolve, reject) => {
      requests({
        url,
        data: params,
        headers: header,
        method: "POST",
      })
        .then((res) => {
          resolve(res.data);
          return res.data;
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  put(url = "", params = {}) {
    return new Promise((resolve, reject) => {
      requests({
        url,
        data: params,
        headers: header,
        method: "PUT",
      })
        .then((res) => {
          resolve(res.data);
          return res.data;
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  delete(url = "", params = {}) {
    return new Promise((resolve, reject) => {
      requests({
        url,
        data: params,
        headers: header,
        method: "DELETE",
      })
        .then((res) => {
          resolve(res.data);
          return res.data;
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

//对外暴露
export default http;
