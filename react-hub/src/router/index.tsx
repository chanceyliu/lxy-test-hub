import { lazy } from "react";

export const routes = [
  {
    name: "TODO_LIST",
    path: "/todo-list",
    component: lazy(() => import("@/pages/todo-list")),
  },
  {
    name: "SCROLL_TO_BOTTOM",
    path: "/scroll-to-bottom",
    component: lazy(() => import("@/pages/scroll-to-bottom")),
  },
];
