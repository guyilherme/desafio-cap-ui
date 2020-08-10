import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/login'
import Home from '@/components/home'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    }
  ],
  mode: 'history'
})