// Import ES6 Promise
import 'es6-promise/auto'

// Import System requirements
import Vue from 'vue'
// import VueRouter from 'vue-router'

// import { sync } from 'vuex-router-sync'
import router from './routes'
import iView from 'iview'
import locale from 'iview/dist/locale/en-US'
// import locale from 'iview/dist/locale/es-ES'
import 'iview/dist/styles/iview.css'
// Import Helpers for filters
// import { domain, count, prettyDate, pluralize } from './filters'

// Import Views - Top level
import AppView from './components/App.vue'
// import VueResource from 'vue-resource'
// Vue.use(VueResource)
Vue.use(iView, { locale })

// Import Install and register helper items
// Vue.filter('count', count)
// Vue.filter('domain', domain)
// Vue.filter('prettyDate', prettyDate)
// Vue.filter('pluralize', pluralize)

// Vue.use(VueRouter)

// Routing logic
/* var router = new VueRouter({
  routes: routes,
  mode: 'history',
  linkExactActiveClass: 'active',
  scrollBehavior: function(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
}) */

// Some middleware to help us ensure the user is authenticated.
/* router.beforeEach((to, from, next) => {
  console.log('META', to.meta.requiresAuth)
  if (to.meta.requiresAuth) {
    const authUser = JSON.parse(window.localStorage.getItem('authUser'))
    if (authUser) {
      next({name: from.name})
    } else {
      next({name: '/home'})
    }
  }
  next()
}) */
// Start out app!
// eslint-disable-next-line no-new
new Vue({
  el: '#root',
  router,
  render: h => h(AppView)
})

