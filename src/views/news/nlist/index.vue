<template>
    <div class="router-wrap">
        <navBar :navData="routerTabs"></navBar>
        <div class="router-page">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import navBar from '@/components/basics/nav/index'
    export default {
        components: {
            navBar
        },
        data() {
            return {
                routerTabs: [{
                    name: '已发布',
                    pathName: 'publish',
                }, {
                    name: '草稿箱',
                    pathName: 'drafts',
                }]
            }
        },
        methods: {}
    }
</script>

<style lang='less' scoped>
    
</style>