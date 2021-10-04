import { lazy } from "react";

export const routes = [
  {
    name: "TODO_LIST",
    path: "/todo-list",
    component: lazy(() => import("../pages/todo-list/index")),
  },
  {
    name: "SCROLL_TO_BOTTOM",
    path: "/scroll-to-bottom",
    component: lazy(() => import("../pages/scroll-to-bottom/index")),
  },
  {
    name: "文字颜色测试",
    path: "/theme-color",
    component: lazy(() => import("../pages/theme-color/index")),
  },
];
