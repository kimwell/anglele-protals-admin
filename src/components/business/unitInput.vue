<template>
    <div class="unit-input-container" :class="[size,disable ? 'disable' : '']">
        <div class="input-warp pd-r">
            <input class="goast-input" v-model="results.weight" :type="type">
            <div class="unit br">{{ unit[0] }}</div>
        </div>
        <div class="input-warp pd-r">
            <input class="goast-input" v-model="results.number" :type="type">
            <div class="unit">{{ unit[1] }}</div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            size: {
                type: String,
                default: 'small'
            },
            unit: {
                type: Array,
                default: function() {
                    return ['吨', '-']
                }
            },
            type: {
                type: String,
                default: 'number'
            },
            disable: {
                type: Boolean,
                default: false
            },
            value: {
                type: [Object, String],
                default: function() {
                    return {
                        number: '',
                        weight: ''
                    }
                }
            }
        },
        data() {
            return {
                results: {
                    number: '',
                    weight: ''
                }
            }
        },
        watch: {
            results(val) {
                this.$emit('input', val)
            },
            value(val) {
                this.results = val;
            }
        },
        created () {
            if(this.value != '')
                this.results = this.value
        }
    }
</script>



<style lang="less" scoped>
    @import url('../../assets/less/base.less');
    .unit-input-container {
        display: flex;
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
            .goast-input {
                padding: 0 6px!important;
            }
        }
        &:hover {
            border-color: @blue!important;
        }
        &.disable {
            background: #fafafa;
            color: @light_gray;
            .goast-input {
                pointer-events: none;
            }
        }
        .input-warp {
            position: relative;
            width: 50%;
            height: 100%;
            &.pd-r {
                padding-right: 20px;
            }
            &:first-child .unit {
                border-right: 1px solid @border_line;
            }
            &:last-child .unit {
                .borderRadius(0 4px 4px 0);
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
            width: 20px;
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
        }
    }
</style>

