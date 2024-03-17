import axios from "axios";
import qs from "qs"; //转json数据工具包
import router from "@/router";
import { ElMessage } from "element-plus";
import { addRequest, refreshToken } from "./two-token";
import {
  getAccessToken,
  removeAccessToken,
  removeRefreshToken,
} from "@/constants/token";

//1.利用axios对象的方法create，去创建一个axios实例。
const YSB = "http://192.168.50.36:8081/";
const ZWY = "http://192.168.50.160:8081/";
const CX = "http://192.168.50.236:8081/";
const requests = axios.create({
  //配置对象
  //接口当中：路径都带有/api     基础路径，发送请求的时候，路径当中会出现api
  baseURL: ZWY,
  //代表请求超时的时间
  timeout: 30 * 1000,
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
requests.interceptors.response.use(
  async (response) => {
    // 获取到配置和后端响应的数据
    let { config, data } = response;
    return new Promise((resolve, reject) => {
      if (data.code === 2039) {
        // 短token失效
        removeAccessToken();
        // 保存未发送的请求，携带长token去请求新的token
        addRequest(() => resolve(requests(config)));
        refreshToken();
      } else if (data.code === 2005) {
        //长token失效，退出登录
        removeRefreshToken();
        router.push({ path: "/login" });
      } else if (data.code === 200) {
        resolve(data);
      } else {
        if (data.msg) ElMessage.error(data.msg);
        reject(data);
      }
    });
  },
  (error) => {
    return Promise.reject(error);
  }
);

const header = {
  "Content-Type": "application/json;charset=UTF-8",
};
const header2 = {
  "Content-Type": "multipart/form-data;charset=UTF-8",
};
const http = {
  upload(url = "", formData) {
    return new Promise((resolve, reject) => {
      requests({
        url,
        data: formData,
        headers: header2,
        method: "POST",
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
