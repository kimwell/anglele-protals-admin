<template>
    <div class="ggh-input-container" :class="[size,{'bk':Separate}]">
        <div class="input-warp" v-show="!Separate">
            <input class="goast-input" :placeholder="placeholder" v-model="results.specifications" type="text">
        </div>
        <div class="input-warp" v-show="Separate" style="display:flex">
            <div class="input-item">
                <input class="goast-input" @focus="getRc(true)" @input="getRc(true)" v-model="results.height" placeholder="厚" type="number">
            </div>
            <div class="input-item">
                <input class="goast-input" @focus="getRc(false)" @input="getRc(false)" v-model="results.width" placeholder="宽" type="number">
            </div>
            <div class="input-item">
                <input class="goast-input" @focus="getRc(false)" @input="getRc(false)" v-model="results.length" placeholder="长" type="text">
            </div>
        </div>
    
        <div class="relation-content" v-if="rcShow && rcList.length > 0" v-clickoutside="ousideClick">
            <div class="rc-item" v-for="(rc,i) in rcList" :key="i" @click="fillRc(i)">
                {{ rc.height ? `${rc.height}*` : ''}}{{ `${rc.width}*${rc.length}` }}
            </div>
        </div>
    </div>
</template>

<script>
    import debounce from 'lodash/debounce'
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
            ironType: {
                type: [Object, String],
                default: function() {
                    return {
                        id: '',
                        name: ''
                    }
                }
            },
            surface: {
                type: [Object, String],
                default: function() {
                    return {
                        id: '',
                        name: ''
                    }
                }
            },
            value: {
                type: [Object, String],
                default: function() {
                    return {
                        specifications: '',
                        length: '',
                        height: '',
                        width: ''
                    }
                }
            },
        },
        computed: {
            Separate() {
                return this.ironType.name == '不锈钢板' || this.ironType.name == '不锈钢卷'
            },
            rcParams() {
                let params = {
                    surface: this.surface.id,
                    ironType: this.ironType.id
                }
                if (this.searchType)
                    params = Object.assign(params, {
                        width: this.results.width,
                        length: this.results.length,
                        height: this.results.height
                    })
    
                return params
            }
        },
        watch: {
            results: {　　　　　　　　　　　　
                handler(val) {　　　　　　　　　　　　
                    this.$emit('input', val)　　　　　　　　　　
                },
                deep: true　　　　　　　　
            },
            Separate(val) {
                if (val) {
                    this.results.specifications = '';
                } else {
                    this.results.length = '';
                    this.results.height = '';
                    this.results.width = '';
                }
            },
            value(val) {
                this.results = val
            }
        },
        data() {
            return {
                results: {
                    specifications: '',
                    length: '',
                    height: '',
                    width: ''
                },
                rcShow: false,
                rcList: [],
                searchType: true //true时候走G_queryGG false G_queryWL
            }
        },
        methods: {
            // 获取推荐数据
            getRc: debounce(function(b) {
                this.searchType = b;
                let apiUrl = this.searchType || this.results.height == '' ? this.api.G_queryGG : this.api.G_queryWL;
                this.$http.post(apiUrl, this.rcParams).then(res => {
                    if (res.code === 1000) {
                        this.rcList = res.data;
                        setTimeout(() => {
                            this.rcShow = true;
                        }, 200)
                    }
                })
            }, 500),
            // 填充数据
            fillRc(i) {
                let item = this.rcList[i];
                this.results.width = item.width;
                this.results.length = item.length;
                if (this.searchType || this.results.height == '')
                    this.results.height = item.height;
    
                this.rcShow = false;
            },
            ousideClick() {
                this.rcShow = false
            }
        },
        created() {
            if (typeof this.value != 'string') {
                this.results = this.value
            }
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
        &.bk {
            display: block;
        }
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
            border-color: @blue;
        }
        .input-warp {
            width: 100%;
            height: 100%;
            .goast-input {
                display: inline-block;
                width: 100%;
                border: 0;
                background: none;
                padding: 0 16px;
                &:focus {
                    outline: 0
                }
                &::-webkit-outer-spin-button,
                &::-webkit-inner-spin-button {
                    -webkit-appearance: none !important;
                    margin: 0;
                }
            }
            .input-item {
                float: left;
                width: 100%/3;
                height: 100%;
                .transition(all,
                1s);
                &:not(:last-child) {
                    border-right: 1px solid @border_line;
                }
                .goast-input {
                    padding: 0 8px;
                    text-align: center;
                }
            }
            &:hover .input-item {
                border-color: @blue;
            }
        }
        .relation-content {
            position: absolute;
            width: 100%;
            top: 45px;
            padding: 14px 4px;
            background-color: #fff;
            .box-shadow(0 1px 6px rgba(0, 0, 0, 0.2));
            .borderRadius;
            z-index: 999;
            .rc-item {
                width: 100%;
                height: 30px;
                line-height: 30px;
                font-size: 12px;
                color: @light_gray;
                text-indent: 16px;
                .borderRadius(2px);
                &:hover {
                    background-color: @mask_blue;
                    color: @blue;
                }
            }
        }
    }
</style>

