import Layout from "@/layout/index.vue";
import Demo from "@/views/demo/index.vue";
import Register from "@/views/auth/Register.vue";
import Login from "@/views/auth/Login.vue";
import RPassword from "@/views/auth/RPassword.vue";

const routes = [

  // 1. 布局外路由（注册/登录）
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: {
      hideTabbar: true
    }
  },
  // 2. 布局外路由（注册/登录）
  {
    path: '/Register',
    name: 'Register',
    component: Register,
    meta: {
      hideTabbar: true
    }
  },
  // 2. 布局外路由（注册/登录）
  {
    path: '/RPassword',
    name: 'RPassword',
    component: RPassword,
    meta: {
      hideTabbar: true
    }
  },
  //报名详情
  {
    path: "/serveritems/detail",
    name: "Detail",
    component: () => import("@/views/serveritems/detail/index.vue"),
    meta: {
      title: "报名信息",

    }
  },
  {
    path: "/",
    name: "root",
    component: Layout,
    redirect: { name: "Demo" },
    children: [
      // {
      //   path: "demo",
      //   name: "Demo",
      //   component: Demo,
      //   meta: {
      //     title: "主页",
      //     ideTabbar: false
      //   }
      // },
      // {
      //   path: "demo",
      //   name: "Demo",
      //   component: () => import("@/views/demo/index.vue"),
      //   meta: {
      //     title: "主页",
      //     ideTabbar: false
      //   }
      // },
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
