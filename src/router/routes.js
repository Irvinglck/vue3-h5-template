import Layout from "@/layout/index.vue";
import Demo from "@/views/demo/index.vue";
import Register from "@/views/auth/Register.vue";

const routes = [
  // 1. 布局外路由（注册/登录）
  {
    path: '/register',
    name: 'Register',
    component: Register,
    // redirect: { name: "Register" },
    meta: {
      hideTabbar: true
    }
  },
  {
    path: "/",
    name: "root",
    component: Layout,
    // redirect: { name: "Demo" },
    children: [
      {
        path: "demo",
        name: "Demo",
        component: Demo,
        meta: {
          title: "主页",
          ideTabbar: false
        }
      },
      {
        path: "tools",
        name: "Tools",
        component: () => import("@/views/tools/index.vue"),
        meta: {
          title: "工具",
          ideTabbar: false
        }
      },
      {
        path: "about",
        name: "About",
        component: () => import("@/views/about/index.vue"),
        meta: {
          title: "关于",
          noCache: true,
          ideTabbar: false
        }
      }
    ]
  }
];

export default routes;
