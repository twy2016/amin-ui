const Mock = require('mockjs')

const Random = Mock.Random
let Result = {
    code: 200,
    msg: '操作成功',
    data: null
}
Mock.mock('/captcha', 'get', () => {
    Result.data = {
        token: Random.string(32),
        captchaImage: Random.dataImage("100x40", "11111")
    }
    return Result
})

Mock.mock('/login', 'post', () => {
    return Result
})

Mock.mock('/logout', 'post', () => {
    return Result
})

Mock.mock('/sys/userInfo', 'get', () => {
    Result.data = {
        id: "1",
        username: "唐万言",
        avatar: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
    }
    return Result
})

Mock.mock('/sys/menu/nav', 'get', () => {
    // 菜单json
    let nav = [{
        "id": 1,
        "title": "系统管理",
        "icon": "el-icon-s-operation",
        "path": "",
        "name": "sys:manage",
        "component": "",
        "children": [{
            "id": 2,
            "title": "用户管理",
            "icon": "el-icon-s-custom",
            "path": "/sys/user",
            "name": "sys:user:list",
            "component": "sys/User",
            "children": []
        }, {
            "id": 3,
            "title": "角色管理",
            "icon": "el-icon-rank",
            "path": "/sys/role",
            "name": "sys:role:list",
            "component": "sys/Role",
            "children": []
        }, {
            "id": 4,
            "title": "菜单管理",
            "icon": "el-icon-menu",
            "path": "/sys/menu",
            "name": "sys:menu:list",
            "component": "sys/Menu",
            "children": []
        }]
    }, {
        "id": 5,
        "title": "系统工具",
        "icon": "el-icon-s-tools",
        "path": "",
        "name": "sys:tools",
        "component": null,
        "children": [{
            "id": 6,
            "title": "数字字典",
            "icon": "el-icon-s-order",
            "path": "/sys/dict",
            "name": "sys:dict:list",
            "component": "sys/Dict",
            "children": []
        }]
    }]
    // 权限数据
    let authoritys = ['SysUser', "SysUser:save"]
    Result.data = {}
    Result.data.nav = nav
    Result.data.authoritys = authoritys
    return Result
})