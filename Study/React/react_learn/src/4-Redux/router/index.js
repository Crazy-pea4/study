import React from "react";
import { useRoutes, Navigate } from "react-router-dom";

import Page1 from "../views/Home/Page1";
import Page2 from "../views/Home/Page2";

export default function AppRoutes() {
  return useRoutes([
    {
      index: true,
      element: <Navigate to={"/home"}>{LazyLoad("/Home")}</Navigate>,
    },
    {
      path: "/home",
      element: LazyLoad("/Home"),
      children: [
        {
          index: true,
          element: <Page1></Page1>,
        },
        {
          path: "page1",
          element: <Page1></Page1>,
        },
        {
          path: "page2/:id?",
          element: <Page2></Page2>,
        },
      ],
    },
    {
      path: "/center",
      element: LazyLoad("/Center"),
    },
  ]);
}

/**
 * 路由懒加载组件封装
 */
function LazyLoad(path) {
  // React.lazy接收一个回调，回调的返回值是import(path)。本身返回一个函数
  const Com = React.lazy(() => import(`../views${path}`));
  return (
    // 将React.lazy返回的函数写成组件包裹在React.Suspense中
    <React.Suspense fallback={<p>加载中...</p>}>
      <Com></Com>
    </React.Suspense>
  );
}