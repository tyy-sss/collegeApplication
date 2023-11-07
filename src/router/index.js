/*
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-11-06 22:04:48
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2023-11-07 19:02:49
 * @FilePath: \collegeApplication\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "main",
    component: () => import("@/views/Main.vue"),
  },
  {
    path:'/school-news',
    name:"school-news",
    component: () => import("@/views/school/SchoolNews.vue")
  },
  {
    path:'/student-info',
    name:"student-info",
    component:()=>import("@/views/StudentInfo.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
