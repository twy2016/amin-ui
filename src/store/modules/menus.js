import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
    state: {
        // 菜单栏数据
        menuList: [],
        // 权限数据
        permList: [],
        hasRoutes: false,
        editableTabsValue: 'Index',
        editableTabs: [{
            title: '首页',
            name: 'Index',
        }]
    },
    mutations: {
        changeRouteStatus(state, hasRoute) {
            state.hasRoute = hasRoute
            sessionStorage.setItem("hasRoute", hasRoute)
        },
        setMenuList(state, menus) {
            state.menuList = menus
        },
        setPermList(state, authoritys) {
            state.permList = authoritys
        },
        addTab(state, tab) {
            let index = state.editableTabs.findIndex(e => e.title === tab.title)
            if (index === -1) {
                state.editableTabs.push({
                    title: tab.title,
                    name: tab.name
                });
            }
            state.editableTabsValue = tab.name;
        },
        resetState: (state) => {
            state.token = '',
            state.menuList = [],
            state.permList = [],
            state.hasRoutes = false,
            state.editableTabsValue = 'Index',
            state.editableTabs = [{
                title: '首页',
                name: 'Index',
            }]
        }
    },
    actions: {},
}
