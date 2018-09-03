<template>
    <div class="role-tag-container">
        <span class="role-item" :class="`tag${item}`" v-for="(item,i) in roles" :key="i">{{ item | usrType }}</span>
    </div>
</template>

<script>
    export default {
        props: {
            role: {
                type: String,
                default: '1'
            }
        },
        computed: {
            roles() {
                return this.role.split(',')
            }
        },
        filters: {
            usrType(val) {
                let strs = ['未分配账户类型', '商户管理员', '报价员', '业务员'];
                return strs[val];
            }
        }
    }
</script>

<style lang="less" scoped>
    .role-tag-container {
        display: inline-block;
        width: auto;
        height: 20px;
        .role-item {
            display: inline-block;
            width: auto;
            height: 20px;
            line-height: 18px;
            padding: 0 3px;
            &:not(:last-child) {
                margin-right: 4px;
            }
        }
    }
</style>

