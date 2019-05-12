import Vue from 'vue'
import Router from 'vue-router'
import DashView from './components/Dash.vue'
import LoginView from './components/Login.vue'
import NotFoundView from './components/404.vue'

// Import Views - Dash
// import DashboardView from './components/views/Dashboard.vue'
import User from './components/views/User.vue'
import UserAdd from './components/views/UserAdd.vue'
import UserEdit from './components/views/UserEdit.vue'
Vue.use(Router)

let router = new Router({
  mode: 'history', // Demo is living in GitHub.io, so required! hash
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '',
      name: '',
      component: DashView,
      // meta: {requiresAuth: true},
      children: [
        {
          path: '/',
          name: 'User',
          component: User
          // meta: {requiresAuth: true}
        },
        {
          path: '',
          // redirect: '/',
          name: 'Home',
          component: {
            render (c) { return c('router-view') }
          },
          meta: {requiresAuth: true},
          children: [
            {
              path: 'user/',
              component: User,
              meta: {requiresAuth: true},
              name: 'User'
            },
            {
              path: 'user_add/',
              component: UserAdd,
              meta: {requiresAuth: true},
              name: 'User add'
            },
            {
              path: 'user_edit/:id',
              component: UserEdit,
              props: true,
              meta: {requiresAuth: true},
              name: 'User edit'
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'LoginView',
      component: LoginView
    },
    {
      path: '*',
      name: 'Page404',
      component: NotFoundView
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const authUser = JSON.parse(window.localStorage.getItem('authUser'))
    if (authUser) {
      next({name: from.name})
    } else {
      next({path: '/login'})
    }
  }
  next()
})
export default router
