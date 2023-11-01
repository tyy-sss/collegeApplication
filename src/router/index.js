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
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
