<template>
    <div class="router-nav">
        <a class="tab-item" :class="{'active':activeTab == i}" @click="goPage(i)" v-for="(tab,i) in navData" :key="i">{{ tab.name }}</a>
    </div>
</template>

<script>
    export default {
        props: {
            navData: Array
        },
        data() {
            return {
                activeTab: 0
            }
        },
        computed: {
            routerPath() {
                return this.navData[this.activeTab].pathName
            },
            routerIndex() {
                let name = this.$route.name;
                let routerIndex;
                this.navData.forEach((el,index) => {
                    if(el.pathName === name)
                        routerIndex = index
                })
                return routerIndex
            }
        },
        watch: {
          'routerIndex':{
                handler: _.debounce(function(val, oldVal) {
                    this.activeTab = this.routerIndex
                }, 200),
                deep: true
            }
        },
        created() {
            this.activeTab = this.routerIndex
        },
        methods: {
            goPage(i) {
                this.activeTab = i;
                this.$router.push({
                    name: this.routerPath
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .router-nav {
        border-bottom: 1px solid #e6e6e6;
        margin-bottom: 15px;
        background-color: #fff;
        height: 60px;
        a {
            position: relative;
            display: inline-block;
            padding: 0 15px;
            line-height: 60px;
            color: #333;
            font-size: 14px;
            &.active {
                color: #2d8cf0;
                cursor: default;
                &:before {
                    content: '';
                    position: absolute;
                    border-bottom: 2px solid #2d8cf0;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                }
            }
        }
    }
</style>