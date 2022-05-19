import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    props: true,
  },
  {
    path: "/libary",
    name: "libary",
    props: true,
    component: () =>
      import(/* webpackChunkName: "libary" */ "@/views/LibaryView.vue"),
  },
  {
    path: "/book/:id",
    name: "book",
    props: true,
    component: () => import("@/views/BookView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});

export default router;
