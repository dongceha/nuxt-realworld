module.exports = {
    // 注册插件
    plugins: [
        '~/plugins/request.js',
        '~/plugins/dayjs.js',
    ],
    router: { // 自定义路由规则
        linkActiveClass: 'active',
        extendRoutes(routes, resolve) {
            // 清除默认的 路由规则
            routes.splice(0);
            routes.push(...[
                {
                    path: '/',
                    component: resolve(__dirname, 'pages/layout/'),
                    children: [
                        {
                            path: '',
                            name: 'home',
                            component: resolve(__dirname, 'pages/home/index.vue')
                        },
                        {
                            path: '/login',
                            name: 'login',
                            component: resolve(__dirname, 'pages/login')
                        },
                        {
                            path: '/register',
                            name: 'register',
                            component: resolve(__dirname, 'pages/login')
                        },
                        {
                            path: '/profile/:username',
                            name: 'profile',
                            component: resolve(__dirname, 'pages/profile')
                        },
                        {
                            path: '/settings',
                            name: 'settings',
                            component: resolve(__dirname, 'pages/settings')
                        },
                        {
                            path: '/edits',
                            name: 'edits',
                            component: resolve(__dirname, 'pages/edits')
                        },
                        {
                            path: '/article/:slug',
                            name: 'article',
                            component: resolve(__dirname, 'pages/article')
                        },
                    ]
                }
            ])
            // const index = routes.findIndex(route => route.name === 'main')
            // routes[index] = {
            //   ...routes[index],
            //   components: {
            //     default: routes[index].component,
            //     top: resolve(__dirname, 'components/mainTop.vue')
            //   },
            //   chunkNames: {
            //     top: 'components/mainTop'
            //   }
            // }
        }
    }
}