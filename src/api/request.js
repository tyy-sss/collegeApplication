import axios from "axios";

//1.利用axios对象的方法create，去创建一个axios实例。
const requests = axios.create({
  //配置对象
  //接口当中：路径都带有/api     基础路径，发送请求的时候，路径当中会出现api
  baseURL: "http://192.168.50.36:8080/",
  //代表请求超时的时间
  timeout: 5000,
});

//请求拦截器：
requests.interceptors.request.use((config) => {
  return config;
}),
  (error) => {
    return Promise.reject(error);
  };

//响应拦截器
requests.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//对外暴露
export default requests;
