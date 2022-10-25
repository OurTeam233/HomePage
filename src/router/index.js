import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入加载条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 配置
NProgress.inc()
NProgress.configure({
    easing: 'ease', // 动画方式
    speed: 800, // 递增进度条的速度
    showSpinner: false, // 是否显示加载ico
    trickleSpeed: 200, // 自动递增间隔
    minimum: 0.1 // 初始化时的最小百分比
})


Vue.use(VueRouter)
var title = ' | 智慧餐口';
//将路由单独抽出来
const routes = [{
        //默认首页
        path: '',
        //redirect重定向
        redirect: 'login',
        component: () => import('../views/Login.vue'),
    },
    {
        // 商家的登录页面
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue'),
        meta: {
            title: '登录' + title
        }
    },
    {
        // 404页面
        path: '*',
        name: 'NotFound',
        component: () => import('../views/NotFound.vue'),
        meta: {
            title: '页面未找到呢'
        }
    },

    {
        //订餐页面
        path: '/ordering',
        name: 'Ordering',
        component: () => import('../Layout/Ordering.vue'),
        meta: {
            title: '首页'
        }
    }
]

/* 解决重复点击相同路由的报错问题 */
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
    routes,
    mode: 'history',
})




// 路由守卫(登录登出跳转)
router.beforeEach((to, from, next) => {

    //设置标题
    let title = to.meta.title;
    if (title) {
        document.title = title
    }

    let isLogin = sessionStorage.getItem('isLogin');
    // 退出登录
    if (to.path == '/logout') {
        // 将缓存清空
        sessionStorage.clear();
        next({
            path: '/login'
        })
    } else if (to.path == '/login') {
        // 如果已经登录，就跳转到首页
        if (isLogin) {
            next({
                path: '/Ordering/OverallStatistics'
            })
        } else {
            next()
        }
    } else if (isLogin == null) {
        // 如果没有登录，就跳转到登录页面
        next({
            path: '/login'
        })
    } else {
        next()
    }

})


// 挂载路由守卫 - 访问结束
router.afterEach(() => {
    // 关闭加载条
    NProgress.done()
})



export default router