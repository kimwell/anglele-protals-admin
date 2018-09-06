<template>
    <div class="layout">
        <Row type="flex">
            <Col span="4" class="layout-menu-left">
            <Menu ref="menu" :active-name="activeIndex" theme="dark" width="auto" @on-select="openSubpage" :open-names="openArr" style="overflow: hidden;">
                <div class="layout-logo-left">后台管理系统</div>
                <Submenu :name="index" v-for="(item,index) in menu" :key="index">
                    <template slot="title">
                            <span class="iconfont menuicon" :class="item.icon"></span>{{ item.name }}
                    </template>
                        <MenuItem :name="index+'-'+i" v-for="(sub,i) in item.children" :key="i">{{ sub.name }}</MenuItem>
                    </Submenu>
                </Menu>
            </Col>
            <Col span="20">
                <div class="layout-header" ref="layoutHeader">
                     <div class="layout-ceiling-main">
                        <a @click="loginout"><Icon type="log-out" style="margin-right:3px;font-size:14px;"></Icon>退出</a>
                    </div>   
                </div>
                <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <BreadcrumbItem v-for="(tag,index) in activeMenu.path" :key="index">{{ tag }}</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div class="layout-content" :style="{'min-height':contentHeight + 'px'}">
                     <router-view></router-view>
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
    import menu from './mainMenu.js'
    import * as types from '@/store/types'
    import {
        mapGetters
    } from 'vuex'
    import push from '@/utils/push.js'
    export default {
        mixins: [push],
        data() {
            return {
                menu: menu,
                openArr: [],
                // 导航初始选中菜单
                activeIndex: '',
                contentHeight: '700'
            }
        },
        computed: {
            //获取当前选中菜单
            activeMenu() {
                if (this.activeIndex != '') {
                    let activeItem = this.activeIndex.split("-");
                    let key1 = activeItem[0] || 0;
                    let key2 = activeItem[1] || 0;
                    // 返回信息，path 用于导航面包屑 ， router用于路由跳转信息源
                    return {
                        path: [this.menu[key1].name, this.menu[key1].children[key2].name],
                        router: this.menu[key1].children[key2].router
                    }
                } else {
                    return {
                        path: ['首页']
                    }
                }
            }
        },
        methods: {
            // 跳转子页面
            openSubpage(name) {
                this.activeIndex = name;
                this.$router.push(this.activeMenu.router);
            },
            // 设置菜单全部展开,匹配当前页面选中菜单
            setActiveMenu() {
                this.menu.forEach((el, index) => {
                    this.openArr.push(index);
                    el.children.forEach((sub, i) => {
                        if(sub.child != undefined){
                            sub.child.forEach((ch, j) => {
                                if(this.$route.fullPath === ch.router.name)
                                    this.activeIndex = `${index}-${i}`
                            })
                        }else{
                            if (this.$route.name === sub.router.name)
                                this.activeIndex = `${index}-${i}`
                        }
                    })
                });
            },
            // 设置内容区域高度
            resizeContent() {
                // 获取屏幕高度
                let winHeight = document.body.clientHeight;
                let headerHeight = this.$refs.layoutHeader.clientHeight;
                let contnetHeight = winHeight - headerHeight - 64;
                this.contentHeight = contnetHeight;
            },
            // getUserInfo() {
            //     this.$http.post(this.api.getUser).then(res => {
            //         if (res.code === 1000) {
            //             this.$store.commit(types.SET_USER_INFO, res.data);
            //             document.addEventListener('visibilitychange', () => {
            //                 let isHidden = document.hidden;
            //                 if (isHidden) {
            //                     this.isFocus = false;
            //                 } else {
            //                     this.isFocus = true;
            //                     document.title = this.titleInit;
            //                     window.clearInterval(this.stl);
            //                     if (!this.isNotice) {
            //                         this.notify(this.msg)
            //                     }
            //                 }
            //             });
            //             this.initScoket();
            //         }
            //     })
            // },
            //  退出登录
            loginout(data) {
                this.$store.commit(types.LOGOUT, data);
                window.location.href = '/bg/login';
            }
        },
        created() {
            this.setActiveMenu();
            // this.getUserInfo();
        },
        mounted() {
            this.$refs.menu.updateActiveName();
            this.resizeContent();
        },
        watch: {
            $route(a) {
                //如果回到首页，就去掉菜单的选中效果
                if (a.name === '/') {
                    this.activeIndex = '';
                }else{
                    this.setActiveMenu();
                }
            }
        }
    }
</script>

<style scoped>
    .layout {
        background: #f5f7f9;
        position: relative;
    }
    
    .layout-breadcrumb {
        padding: 10px 15px 0;
    }
    
    .layout-content {
        margin: 15px;
        /* overflow-x: hidden; */
        border-radius: 4px;
    }
    
    .layout-content-main {
        padding: 10px;
        height: 100%;
    }
    
    .layout-copy {
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    
    .layout-menu-left {
        background: #464c5b;
    }
    
    .layout-header {
        position: relative;
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
    }
    
    .layout-logo-left {
        width: 90%;
        height: 40px;
        line-height: 40px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
        color: #fff;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
    }
    
    .content-container {
        width: 100%;
        height: 100%;
        background-color: #fff;
    }
    .layout-ceiling-main{
        float: right;
        margin-right: 15px;
        line-height: 60px;
    }
    .layout-ceiling-main a{
        color: #9ba7b5;
        font-size: 14px;
    }
    .menuicon{
        margin-right: 4px;
        vertical-align: middle;
    }
</style>