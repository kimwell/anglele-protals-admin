<template>
    <i class="check iconfont" :class="check ? 'icon-arrowicon' : 'icon-placeholder'" @click="check = !check"></i>
</template>

<script>
    export default {
        props: {
            value: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                check: false
            }
        },
        watch: {
            value(val) {
                this.check = val;
            },
            check(val) {
                this.$emit('input', val);
            }
        },
        created() {
            if (this.value)
                this.check = this.value
        }
    }
</script>

<style lang="less" scoped>
    @import url('../../assets/less/base.less');
    .icon-arrowicon {
        color: @blue!important;
    }
</style>


