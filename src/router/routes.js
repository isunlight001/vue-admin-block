// import { resolve } from 'path'
// import { request } from 'http'

// 路由配置
export default[
  {
    path: '/login',
    name: 'Login',
    component: resolve => {
      require(['@/views/Login'], resolve)
    }
  }, {
    path: '/',
    redirect: '/',
    name: 'SysLayout',
    component: resolve => {
      require(['@/views/common/layouts/Layout'], resolve)
    },
    children: [
      {
        path: '/',
        name: 'Dashboard',
        component: resolve => {
          require(['@/views/Dashboard'], resolve)
        }
      }, {
        path: '/test',
        name: 'Test',
        component: resolve => {
          require(['@/views/Test'], resolve)
        }
      }, {
        path: '/hello/hello-world',
        name: 'HelloWorld',
        component: resolve => {
          require(['@/views/hello/HelloWorld'], resolve)
        }
      }, {
        path: '/manage/users',
        name: '用户管理',
        component: resolve => {
          require(['@/views/manage/Users'], resolve)
        }
      }, {
        path: '/manage/scripts',
        name: '脚本管理',
        component: resolve => {
          require(['@/views/manage/Scripts'], resolve)
        }
      }, {
        path: '/webscoket/test',
        name: 'webscokettest',
        component: resolve => {
          require(['@/views/webscoket/Test'], resolve)
        }
      }
    ]
  }, {
    path: '*',
    name: 'NotFound',
    component: resolve => {
      require(['@/views/common/pages/NotFound'], resolve)
    }
  }
]
