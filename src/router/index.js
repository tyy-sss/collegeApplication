/*
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-11-06 22:04:48
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2024-01-24 15:14:35
 * @FilePath: \collegeApplication\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import store from "@/store";
import { createRouter, createWebHistory } from "vue-router";
import { stringifyQuery, parseQuery } from "./utils/parameter-encryption";
import { giveMenu } from "@/assets/js/data/menu";
import { getAccessToken, getRole } from "@/constants/token";
import { ElMessage } from "element-plus";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/",
    name: "main",
    component: () => import("@/views/Main.vue"),
    children: [
      // 管理员

      {
        path: "role",
        name: "role",
        component: () => import("@/views/Role.vue"),
      },
      {
        path: "school",
        name: "school",
        component: () => import("@/views/School.vue"),
      },
      {
        path: "user",
        name: "user",
        component: () => import("@/views/User.vue"),
      },
      {
        path: "class",
        name: "class",
        component: () => import("@/views/Class.vue"),
      },
      {
        path: "history",
        name: "history",
        component: () => import("@/views/History.vue"),
      },
      {
        path: "personal-information",
        name: "personal-information",
        component: () => import("@/views/PersonalInformation.vue"),
      },
      {
        path: "student",
        name: "student",
        component: () => import("@/views/Student.vue"),
      },
      {
        path: "grades",
        name: "grades",
        component: () => import("@/views/Grades.vue"),
      },
      {
        path: "volunteer",
        name: "volunteer",
        component: () => import("@/views/Volunteer.vue"),
      },
      {
        path: "volunteer-basis",
        name: "volunteer-basis",
        component: () => import("@/views/VolunteerBasis.vue"),
        // redirect: "/volunteer-check",
        children: [
          {
            path: "/volunteer-basis",
            name: "volunteer-check",
            component: () => import("@/views/VolunteerCheck.vue"),
          },
          {
            path: "/volunteer-basis",
            name: "volunteer-fill",
            component: () => import("@/views/VolunteerFill.vue"),
          },
        ],
      },
      {
        path: "student-comprehensive-assessment",
        name: "student-comprehensive-assessment",
        component: () => import("@/views/StudentComprehensiveAssessment.vue"),
      },
      {
        path: "comprehensive-assessment-check",
        name: "comprehensive-assessment-check",
        component: () => import("@/views/ComprehensiveAssessmentCheck.vue"),
      },
      {
        path: "comprehensive-assessment",
        name: "comprehensive-assessment",
        component: () => import("@/views/ComprehensiveAssessment.vue"),
      },
      {
        path: "ranking-query",
        name: "ranking-query",
        component: () => import("@/views/RankingQuery.vue"),
      }
    ],
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
  {
    path: "/test3",
    name: "test3",
    component: () => import("@/test/test3.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  // 参数加密和解密配置
  stringifyQuery,
  parseQuery,
});

router.beforeEach((to, form, next) => {
  // 判断是否有token
  var token = getAccessToken();
  if (!token) {
    // 未登录
    // 在登录界面
    if (to.path == "/login") {
      next();
    } else {
      ElMessage.error("请先登录");
      next({ name: "login" });
    }
  } else {
    // 已登录
    if (to.path == "/") {
      // 跳转到菜单表的第一个菜单显示界面
      const firstPath = giveMenu(getRole())[0].path.slice(1);
      next({ name: firstPath });
    } else {
      // 未登录
      next();
    }
  }
});

export default router;
