import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from "@/views/Index"
import Home from "@/views/Home"
import axios from "axios"
import store from "@/store"

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/index',
                name: 'Index',
                meta: {
                    title: "首页"
                },
                component: Index
            },
            {
                path: '/userCenter',
                name: 'UserCenter',
                meta: {
                    title: "个人中心"
                },
                component: () => import('@/views/UserCenter.vue')
            },
            // {
            // 	path: '/sys/users',
            // 	name: 'SysUser',
            // 	component: User
            // },
            // {
            // 	path: '/sys/roles',
            // 	name: 'SysRole',
            // 	component: Role
            // },
            // {
            // 	path: '/sys/menus',
            // 	name: 'SysMenu',
            // 	component: Menu
            // },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    let hasRoute = store.state.menus.hasRoutes
    if (!hasRoute) {
        let newRoutes = router.options.routes
        axios.get('/sys/menu/nav', {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then(res => {
            store.commit("setMenuList", res.data.data.nav)
            store.commit("setPermList", res.data.data.authoritys)
            let newRoutes = router.options.routes
            res.data.data.nav.forEach(menu => {
                if (menu.children) {
                    menu.children.forEach(e => {
                        let route = menuToRoute(e)
                        if (route) {
                            newRoutes[0].children.push(route)
                        }
                    })
                }
            })
            router.addRoutes(newRoutes)
            store.commit("changeRouteStatus", true)
        })
        next()
    }
})

// 导航转成路由
const menuToRoute = (menu) => {

    if (!menu.component) {
        return null
    }

    let route = {
        name: menu.name,
        path: menu.path,
        meta: {
            icon: menu.icon,
            title: menu.title
        }
    }
    route.component = () => import('@/views/' + menu.component +'.vue')

    return route
}

export default router
