/*
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-11-06 22:04:48
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2023-11-07 19:02:49
 * @FilePath: \collegeApplication\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, createWebHistory } from "vue-router";
import { stringifyQuery, parseQuery } from "./utils/parameter-encryption";

const routes = [
  {
    path: "/",
    name: "main",
    component: () => import("@/views/Main.vue"),
  },
  {
    // 管理员查看学校的信息
    path: "/school-manager",
    name: "school-manager",
    component: () => import("@/views/school/Main.vue"),
    children: [
      {
        path: "school-news",
        name: "school-news",
        component: () => import("@/views/school/SchoolNews.vue"),
      },
    ],
  },

  {
    path: "/test1",
    name: "test1",
    component: () => import("@/test/test1.vue"),
  },
  {
    path: "/test2",
    name: "test2",
    component: () => import("@/test/test2.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  // 参数加密和解密配置
  stringifyQuery,
  parseQuery,
});

export default router;
