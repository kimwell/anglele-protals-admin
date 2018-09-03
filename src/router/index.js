import Vue from 'vue';
import iView from 'iview'
import Router from 'vue-router';
import store from '@/store/store'
import * as types from '@/store/types'
import VueLocalStorage from 'vue-ls';
import {
    resolve
} from 'path';

Vue.use(VueLocalStorage);
Vue.use(Router);


// 页面刷新时，重新赋值token
if (Vue.ls.get('authorization_bg')) {
    store.commit(types.LOGIN, {
        authorization: Vue.ls.get('authorization_bg'),
        loginId: Vue.ls.get('loginId_bg')
    })
}

const router = new Router({
    mode: 'history',
    base: '/bg/',
    routes: [{
            path: '/',
            name: '/',
            component: resolve => require(['@/views/index/index'], resolve),
            children: [{
                path: 'news',
                name: 'news',
                component: resolve => require(['@/views/news/index'], resolve),
                children: [{
                    path: 'nadd/:id/:type',
                    name: 'nadd',
                    component: resolve => require(['@/views/news/nadd/index'], resolve)
                }, {
                    path: 'nlist',
                    name: 'nlist',
                    redirect: 'nlist/publish',
                    component: resolve => require(['@/views/news/nlist/index'], resolve),
                    meta: {
                        requireAuth: true
                    },
                    children: [{
                        path: 'publish',
                        name: 'publish',
                        component: resolve => require(['@/views/news/nlist/publish/index'], resolve),
                        meta: {
                            requireAuth: true
                        }
                    }, {
                        path: 'drafts',
                        name: 'drafts',
                        component: resolve => require(['@/views/news/nlist/drafts/index'], resolve),
                        meta: {
                            requireAuth: true
                        }
                    }]
                }, {
                    path: 'nconfig',
                    name: 'nconfig',
                    component: resolve => require(['@/views/news/nconfig/index'], resolve)
                }]
            }]
        },
        {
            path: '/login',
            name: 'login',
            meta: {
                requireAuth: true
            },
            component: resolve => require(['@/views/login/index'], resolve),
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    }
})

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        next();
    } else {
        if (store.state.authorization) {
            next();
        } else {
            iView.Modal.error({
                content: '登录过期，请重新登录。',
                onOk() {
                    next({
                        path: '/login',
                        query: {
                            redirect: to.fullPath
                        }
                    })
                }
            })
        }
    }
})

router.afterEach((to, from, next) => {

});

export default router;