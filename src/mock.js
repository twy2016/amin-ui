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