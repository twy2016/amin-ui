import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Index from "@/views/Index"
import Home from "@/views/Home"
import User from "@/views/sys/User"
import Role from "@/views/sys/Role"
import Menu from "@/views/sys/Menu"

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        children: [
            {
                path: '/index',
                name: 'index',
                component: Index
            },
            {
                path: '/sys/user',
                name: 'user',
                component: User
            },
            {
                path: '/sys/role',
                name: 'role',
                component: Role
            },
            {
                path: '/sys/menu',
                name: 'menu',
                component: Menu
            },
            {
                path: '/userCenter',
                name: 'userCenter',
                component: () => import('@/views/UserCenter.vue')
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
