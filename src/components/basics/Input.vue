<template>
    <div class="ggh-input-container" :class="[size,disable ? 'disable' : '']">
        <div class="input-warp" :class="{'pd-r':showUnit}">
            <input class="goast-input" v-model="results" :placeholder="placeholder" :type="type">
        </div>
        <div class="unit" v-show="showUnit">{{ unit }}</div>
    </div>
</template>

<script>
    export default {
        props: {
            placeholder: {
                type: String,
                default: '请输入'
            },
            size: {
                type: String,
                default: ''
            },
            unit: {
                type: String,
                default: '单位'
            },
            showUnit: {
                type: Boolean,
                default: false
            },
            type: {
                type: String,
                default: 'text'
            },
            disable: {
                type: Boolean,
                default: false
            },
            value: {
                type: [Number, String],
                default: ''
            }
        },
        data() {
            return {
                results: ''
            }
        },
        watch: {
            results(val) {
                this.$emit('input', val)
            },
            value(val){
                this.results = val;
            },
            disable(val){
                if(val)
                    this.results = ''
            }
        },
        created() {
            this.results = this.value;
        }
    }
</script>



<style lang="less" scoped>
    @import url('../../assets/less/base.less');
    .ggh-input-container {
        position: relative;
        display: inline-block;
        width: 100%;
        min-width: 50px;
        height: 42px;
        line-height: 40px;
        border: 1px solid @border_line;
        .borderRadius;
        cursor: pointer;
        .noselect;
        .transition(all,
        1s);
        font-size: 14px;
        &.small {
            height: 28px;
            line-height: 26px;
            font-size: 12px;
            .value {
                font-size: 12px;
            }
            .goast-input{
                padding: 0 6px!important;
            }
        }
        &:hover,
        &:hover .unit {
            border-color: @blue;
        }
        &.disable {
            background: #fafafa;
            color: @light_gray;
            .goast-input {
                pointer-events: none;
            }
        }
        .input-warp {
            width: 100%;
            height: 100%;
            &.pd-r {
                padding-right: 42px;
            }
        }
        .goast-input {
            display: inline-block;
            width: 100%;
            border: 0;
            background: none;
            padding: 0 16px;
            .ellipsis;
            &:focus {
                outline: 0
            }
            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
                -webkit-appearance: none !important;
                margin: 0;
            }
        }
        .unit {
            position: absolute;
            width: 42px;
            height: 100%;
            right: 0;
            top: 0;
            background: #fafafa;
            border-left: 1px solid @border_line;
            .transition(all,
            1s);
            font-size: 12px;
            color: rgba(153, 153, 153, 1);
            text-align: center;
            .borderRadius(0 4px 4px 0);
        }
    }
</style>

