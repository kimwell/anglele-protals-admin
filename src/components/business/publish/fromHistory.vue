<template>
    <div class="history">
        <h3 class="tit">
            从历史中选择（最近6条）
            <span class="toggle" @click="show = !show">
                    {{ show ? '收起' :'展开' }}
                    <i class="iconfont" :class="show? 'icon-shang':'icon-xia'"></i>
                </span>
        </h3>
        <div class="hs-items clearfix" v-show="show">
            <div class="item" v-for="(item,i) in list" :key="i" @click="select(i)">
                <h3>
                    <span>{{ item.ironTypeName }}</span>{{ `${item.materialName} ${item.surfaceName} ${item.locationName}` }}
                </h3>
                <p>
                    {{ item.specifications != '' ? item.specifications :`${item.height}*${item.width}*${item.length}` }} {{ item.tolerance }} {{ item.weights != '' ?`${item.weights}${item.weightUnit}` : '' }} {{ item.numbers != '' ? `${item.numbers}${item.numberUnit}` :
                    '' }}
                </p>
                <p>{{ item.remark | emptyHlod('无备注') }}</p>
                <p class="clock"><i class="iconfont icon-clock"></i>{{ item.createTime | dateformat }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import cloneDeep from 'lodash/cloneDeep'
    export default {
        props:{
            id:{
                type: String,
                default: ''
            }
        },
        data() {
            return {
                show: false,
                list: []
            }
        },
        watch: {
            show(val) {
                if (val)
                    this.getList()
            }
        },
        methods: {
            getList() {
                this.$http.post(this.api.publishHistory,{
                    buserId: this.id
                }).then(res => {
                    if (res.code == 1000) {
                        this.list = res.data;
                    }
                })
            },
            select(i){
                let item = cloneDeep(this.list[i]);
                delete item.createTime;
                this.$emit('on-picker',item);
            }
        }
    }
</script>


<style lang="less">
    @import url('../../../assets/less/base.less');
    .history {
        width: 100%;
        .tit {
            color: @dark_gray;
            font-size: 14px;
            .toggle {
                position: relative;
                display: inline-block;
                width: 58px;
                height: 20px;
                text-indent: 8px;
                vertical-align: middle;
                border: 1px solid @me_gray;
                .borderRadius;
                font-size: 12px;
                color: @light_gray;
                cursor: pointer;
            }
            .iconfont {
                position: absolute;
                right: -2px;
                top: -3px;
                .scale(.6);
            }
        }
        .hs-items {
            width: 100%;
            margin-top: 10px;
            .item {
                width: 326px;
                height: 138px;
                float: left;
                .borderRadius(8px);
                background-color: #fff;
                .box-shadow(0 1px 6px rgba(0, 0, 0, 0.2));
                padding: 20px;
                margin-top: 10px;
                border: 2px solid #fff;
                margin-right: 30px;
                &:hover{
                    border: 2px solid @blue;
                    .box-shadow(0 1px 6px @blue);
                }
                h3 {
                    width: 100%;
                    font-size: 14px;
                    height: 20px;
                    line-height: 19px;
                    .ellipsis;
                    color: @dark_gray;
                    span {
                        font-weight: bold;
                        margin-right: 10px;
                    }
                }
                p {
                    width: 100%;
                    height: 16px;
                    margin-top: 8px;
                    font-size: 12px;
                    color: @gray;
                    .ellipsis;
                    &.clock {
                        height: 20px;
                        line-height: 20px;
                        .iconfont{
                            font-size: 20px;
                            color: @dark_red;
                            vertical-align: sub;
                            margin-right: 15px;
                        }
                    }
                }
            }
        }
    }
</style>

