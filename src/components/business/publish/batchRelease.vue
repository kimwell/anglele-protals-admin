<template>
    <div class="model-slot">
        <Spin fix v-show="ajaxLoad">发布中...</Spin>
        <div class="model-title">代客发布</div>
        <div class="model-content">
            <div class="publish-items">
                <table>
                    <thead class="pb-table-title">
                        <tr>
                            <td style="width:60px">
                                <i class="check iconfont" :class="allCheck ? 'icon-arrowicon' : 'icon-placeholder'" @click="toggleAllcheck"></i>
                            </td>
                            <td style="width:86px">货源地</td>
                            <td style="width:108px">品名</td>
                            <td style="width:82px">材质</td>
                            <td style="width:86px">表面</td>
                            <td style="width:140px">规格</td>
                            <td style="width:96px">公差</td>
                            <td style="width:118px">数量/重量</td>
                            <td style="width:86px">产地</td>
                            <td style="width:110px">备注</td>
                            <td style="width:60px"></td>
                        </tr>
                    </thead>
                    <tbody>
                        <publishItem v-for="(item,i) in items" :data="item.data" :saved="item.isSave" :checked="item.isCheck" :key="item.uuid" :index="i" @on-save="updateSave" @on-jastsave="onSaveItem" @on-check="checkItem" @on-copy="copy" @on-del="del"></publishItem>
                    </tbody>
                </table>
            </div>
            <div class="action-bar">
                <a v-show="itmesLength < 6 && isAllSave" class="pb-btn" @click="addItem(undefined)">新增</a>
                <a class="pb-btn blue" @click="publishCheck">批量发布</a>
            </div>
            <formHistory @on-picker="pickHistory" :id="id"></formHistory>
        </div>
    </div>
</template>

<script>
    import publishItem from './publishItem.vue'
    import formHistory from './fromHistory.vue'
    
    import {
        getuuId
    } from '@/utils/tools.js'
    import itemData from './item.json'
    import cloneDeep from 'lodash/cloneDeep'
    export default {
        components: {
            publishItem,
            formHistory
        },
        props:{
            id:{
                type: String,
                default: ''
            }
        },
        data() {
            return {
                ajaxLoad: false,
                show: false,
                items: []
            }
        },
        computed: {
            itmesLength() {
                return this.items.length
            },
            // 是否都保存了
            isAllSave() {
                return this.itmesLength > 0 ? this.items.find(el => !el.isSave) == undefined : true
            },
            lastItem() {
                return this.items[this.items.length - 1]
            },
            allCheck() {
                return this.items.find(el => !el.isCheck) == undefined && this.itmesLength > 0
            }
        },
        methods: {
            //批量发布
            publishCheck() {
                // 取出所有选中的数据
                let checkItems = [];
                this.items.map(item => {
                    if (item.isSave && item.isCheck)
                        return checkItems.push(item.data)
    
                });
                // 如果有数据就发布没有就提示
                if (checkItems.length > 0) {
                    this.ajaxLoad = true;
                    this.$http.post(this.api.superPublishAll, {
                        ironBuyInfos: JSON.stringify(checkItems),
                        buserId: this.id
                    }).then(res => {
                        if (res.code === 1000) {
                            this.$Message.success('发布成功！')
                            this.items = this.items.filter(el => !el.isCheck);
                        } else {
                            this.$Message.error(res.message)
                        }
                        this.ajaxLoad = false;
                    })
                } else {
                    this.$Message.warning('请选择至少1条已保存的求购！')
                }
            },
            //publishitem保存后，更新items里的数据
            updateSave(data) {
                let activeItem = this.items[data.index];
                activeItem.data = data.data;
                activeItem.isSave = data.isSave;
            },
            //publishitem勾选后，更新items里的check
            checkItem(data) {
                let activeItem = this.items[data.index];
                activeItem.isCheck = data.check
            },
            //publishitem勾选后，更新items里的save
            onSaveItem(data) {
                let activeItem = this.items[data.index];
                activeItem.isSave = data.save
            },
            // 全选
            toggleAllcheck() {
                let tocheck = !this.allCheck;
                this.items.forEach(item => {
                    item.isCheck = tocheck
                })
            },
            // 添加一栏
            addItem(item) {
                if (this.itmesLength < 6) {
                    let adItem = item != undefined ? item : cloneDeep(itemData);
                    adItem.uuid = getuuId();
                    adItem.isCheck = false;
                    adItem.isSave = false;
                    if (this.isAllSave) {
                        this.items.push(adItem);
                    } else {
                        let i = this.items.length - 1;
                        this.items.splice(i, 1);
                        this.items.push(adItem);
                    }
                } else {
                    this.$Message.warning('最多同时发送6条求购！')
                }
            },
            // 复制
            copy(i) {
                // 拿到当前复制的数据
                let selectItem = cloneDeep(this.items[i]);
                this.addItem(selectItem);
            },
            // 删除
            del(i) {
                this.$Modal.confirm({
                    title: '是否要删除？',
                    content: '删除后将无法撤销，是否继续？',
                    onOk: () => {
                        this.items.splice(i, 1);
                        if (this.itmesLength == 0)
                            this.addItem()
                    }
                });
            },
            // 从历史中选择
            pickHistory(item) {
                let selectItem = {};
                selectItem.data = this.$clearData(item);
                this.addItem(selectItem);
            }
        },
        created() {
            this.addItem();
        }
    }
</script>

<style lang="less">
    @import url('../../../assets/less/base.less');
    .model-slot {
        position: relative;
        width: auto;
        min-height: 640px;
        margin: 36px auto;
        background-color: @bg_gray;
        .borderRadius;
        .box-shadow(0 1px 6px rgba(0, 0, 0, 0.2));
        .model-title {
            position: relative;
            width: 100%;
            height: 60px;
            line-height: 60px;
            color: @gray;
            font-size: 18px;
            padding: 0 32px;
            background-color: #fff;
            border-bottom: 1px solid @border_line;
            .borderRadius(4px 4px 0 0);
            .iconfont {
                position: absolute;
                right: 32px;
                color: @me_gray;
                cursor: pointer;
                &:hover {
                    color: @dark_gray;
                }
            }
        }
        .model-content {
            width: 100%;
            padding: 30px 30px 50px;
        }
        .publish-items {
            width: 100%;
            background-color: #fff;
            border: 1px solid @border_line;
            border-bottom: 0;
            .borderRadius;
            table {
                width: 100%;
            }
        }
        .pb-table-title td {
            height: 46px;
            line-height: 46px;
            border-bottom: 1px solid @border_line;
        }
        .check {
            color: @border_line;
            margin-left: 20px;
            font-size: 20px;
            vertical-align: middle;
            cursor: pointer;
        }
        .icon-arrowicon {
            color: @blue!important;
        }
        .action-bar {
            position: relative;
            width: 100%;
            height: 40px;
            line-height: 40px;
            margin: 20px 0 30px;
            text-align: right;
            .pb-btn {
                display: inline-block;
                width: 120px;
                height: 40px;
                line-height: 36px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                border: 2px solid @blue;
                color: @blue;
                .borderRadius;
                &:hover {
                    background-color: @men_blue;
                }
                &.blue {
                    background-color: @blue;
                    color: #fff;
                    &:hover {
                        background-color: @dark_blue;
                        border-color: @dark_blue;
                    }
                }
            }
        }
    }
</style>

