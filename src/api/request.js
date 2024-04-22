import axios from "axios";
import router from "@/router";
import { ElMessage } from "element-plus";
import { addRequest, refreshToken } from "./two-token";
import {
  getAccessToken,
  removeAccessToken,
  removeRefreshToken,
} from "@/constants/token";

//1.利用axios对象的方法create，去创建一个axios实例。
const fwq = "https://ykxsgl8081.jsu.edu.cn";
const ysb = "http://192.168.50.37:8081";
const requests = axios.create({
  //配置对象
  //接口当中：路径都带有/api     基础路径，发送请求的时候，路径                                                                                                                                                                                              当中会出现api
  baseURL: ysb,
  //代表请求超时的时间
  timeout: 50 * 1000,
});
//请求拦截器：
requests.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = token;
  }
  console.info(
    new Date() + " " + config.method + " " + JSON.stringify(config.params),
    "请求信息"
  );
  return config;
});
//接收请求拦截器
requests.interceptors.response.use(
  async (response) => {
    // 获取到配置和后端响应的数据
    let { config, data } = response;
    console.info(
      new Date() + " " + config.method + " " + JSON.stringify(data),
      "响应信息"
    );
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
    router.push({
      path: "/error",
    });
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
  upload2(url = "", formData) {
    return new Promise((resolve, reject) => {
      requests({
        url,
        data: formData,
        headers: header2,
        method: "PUT",
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
