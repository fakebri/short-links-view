import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import("@/views/LoginView.vue")
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import("@/views/AdminView.vue"),
    beforeEnter: (to, from, next) => {
      // 在这个路由的独享守卫中进行操作
      if (localStorage.getItem("user") == null) {
        next('/login');
      } else {
        next();
      }
    },
    meta: { hideNav: true },
    //设置嵌套路由
    children: [
      {
        path: "/user/list",
        component: () => import("@/views/user/List.vue"),
        meta: { hideNav: true }

      },
      {
        path: "/surl/list",
        component: () => import("@/views/surl/List.vue"),
        meta: { hideNav: true }
      }
    ]
  },
  {
    path: '/test',
    name: 'test',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("@/views/TestView.vue")
  }
]

const router = new VueRouter({
  routes
})

export default router
