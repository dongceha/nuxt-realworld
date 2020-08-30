import axios from 'axios';

// 创建请求对象
export const request = axios.create({
    // baseURL: 'https://conduit.productionready.io',
    baseURL: 'http://realworld.api.fed.lagounews.com'
})

// 通过插件机制 获取到上下文对象
// 插件导出 只能使用 default 成员
export default ({store}) => {
    request.interceptors.request.use((config) => {
        const {user} = store.state
        if (user && user.token) {
            config.headers.Authorization = `Token ${user.token}`
        }
        return config
    }, (error) => {
        return Promise.reject(error)
    })
}
