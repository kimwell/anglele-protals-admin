<template>
    <div class="ggh-textarea-container" :class="{'disable':disable}">
        <div class="textarea-warp">
            <textarea class="goast-textarea" :maxlength="max" v-model="results" :placeholder="placeholder"></textarea>
        </div>
        <span class="max">{{ results.length }}/{{ max }}</span>
    </div>
</template>

<script>
    export default {
        props: {
            placeholder: {
                type: String,
                default: '请输入'
            },
            disable: {
                type: Boolean,
                default: false
            },
            max: {
                type: [Number, String],
                default: 35
            },
            value: {
                type: [Number, String],
                default: ''
            }
        },
        watch: {
            results(val) {
                this.$emit('input', val);
                    
            },
            value(val){
                this.results = val;
            },
            disable(val) {
                if (val)
                    this.results = ''
            }
        },
        data() {
            return {
                results: ''
            }
        },
        created () {
            this.results = this.value;
        }
    
    }
</script>


<style lang="less" scoped>
    @import url('../../assets/less/base.less');
    .ggh-textarea-container {
        position: relative;
        display: inline-block;
        width: 100%;
        min-width: 150px;
        height: 100%;
        border: 1px solid @border_line;
        .borderRadius;
        cursor: pointer;
        .noselect;
        .transition(all,
        1s);
        font-size: 14px;
        &:hover {
            border-color: @blue;
        }
        &.disable {
            background: #fafafa;
            color: @light_gray;
            .goast-textarea {
                pointer-events: none;
            }
        }
        .max {
            position: absolute;
            right: 16px;
            bottom: 12px;
            font-size: 12px;
            color: @gray;
        }
    }
    
    .textarea-warp {
        width: 100%;
        height: 100%;
    }
    
    .goast-textarea {
        display: inline-block;
        width: 100%;
        height: 100%;
        line-height: 22px;
        border: 0;
        background: none;
        padding: 12px 16px;
        resize: none;
        &:focus {
            outline: 0
        }
    }
</style>

