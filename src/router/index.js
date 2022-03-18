import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Reset from '@/components/Reset'
import Main from '@/components/Main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/reset',
      name: 'Reset',
      component: Reset
    },
    {
      path: '/main',
      name: 'Main',
      component: Main
    }
  ]
})
