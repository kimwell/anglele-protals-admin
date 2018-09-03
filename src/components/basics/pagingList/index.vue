<template>
    <div class="page-list-container">
        <slot></slot>
        <Page class="page-count" size="small" :total="totalCount" :page-size="pageSize" @on-change="changePage"></Page>
    </div>
</template>


<script>
    export default {
        props:['totalCount','pageSize'],
        methods: {
            changePage(page){
                this.$emit('on-page-change',page)
            }
        }
    }
</script>


<style lang="less" scoped>
    .page-list-container{
        position: relative;
        width: 100%;
        padding-bottom: 20px;
        .page-count{
            position: absolute;
            right: 0;
            bottom: 0;
        }
    }
</style>
