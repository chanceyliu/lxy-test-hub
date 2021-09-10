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
    name: "主题决定颜色",
    path: "/theme-decide-color",
    component: lazy(() => import("../pages/theme-decide-color/index")),
  },
  {
    name: "测试",
    path: "/theme-color",
    component: lazy(() => import("../pages/theme-color/index")),
  },
];
