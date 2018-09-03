<template>
    <div class="ggh-picker-container" :class="size">
        <div class="inner-container" @click.self="showPanel">
            <span class="empty" v-if="showR" @click="setEmpty">清空</span>
            <span v-if="!multi || resoutStrs == ''" class="value" :class="{ 'place-holder' : placeholderShow }">{{ placeholderShow ? placeholder :  resout.name | intercept(maxNum)}}</span>
            <span v-else class="value" :class="{ 'place-holder' : placeholderShow }">{{ placeholderShow ? placeholder : resoutStrs| intercept(maxNum) }}</span>
            <span class="iconfont" :class=" show ? iconUp : iconDown"></span>
            <div class="area-box" :class="position" v-clickoutside="ousideClick" v-if="show">
                <Spin fix v-show="ajaxLoad">
                    <loading-icon></loading-icon>
                </Spin>
                <div class="items-contnet">
                    <span class="item" :style="{width:`${width}px`}" :class="{ 'active': multi ? item.selected : activeIndex == i }" v-for="(item,i) in dataList" :key="item.id" @click="pick(i)">{{ item.name }}</span>
                </div>
                <div v-if="multi" class="multi-btn"><a @click="closePanel" class="cancel">取消</a><a @click="closePanel">确定</a></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            showRest: {
                type: Boolean,
                default: false
            },
            multi: {
                type: Boolean,
                default: false
            },
            width: {
                type: Number,
                default: 70
            },
            iconUp: {
                type: String,
                default: 'icon-shang'
            },
            iconDown: {
                type: String,
                default: 'icon-xia'
            },
            placeholder: {
                type: String,
                default: '请选择'
            },
            value: {
                type: [Object, String, Array],
                default: function() {
                    return {
                        id: '',
                        name: ''
                    }
                }
            },
            size: {
                type: String,
                default: ''
            },
            apiUrl: {
                type: String,
                default: ''
            },
            position: {
                type: String,
                default: 'left'
            }
        },
        data() {
            return {
                ajaxLoad: false,
                show: false,
                dataList: [],
                activeIndex: null,
                resout: {
                    id: '',
                    name: ''
                },
                resoutList: [],
                maxNum: 4
            }
        },
        computed: {
            // 是否显示清空按钮
            showR() {
                let hasSome = this.multi ? this.resoutList.length > 0 : this.resout.id != ''
                return this.showRest && hasSome
            },
            activeItem() {
                return this.activeIndex == null ? '' : this.dataList[this.activeIndex];
            },
            // 是否显示placeHolder
            placeholderShow() {
                if (this.multi) {
                    return this.resoutList.length == 0
                } else {
                    return this.resout.id == ''
                }
            },
            resoutStrs() {
                let strs = '';
                let len = this.resoutList.length - 1;
                this.resoutList.forEach((item, i) => {
                    strs += i < len ? item.name + ',' : item.name
                })
                return this.multi ? strs : ''
            }
        },
        watch: {
            resout(val) {
                this.$emit('input', val)
            },
            resoutList(val) {
                this.$emit('input', val)
            },
            show(val) {
                // 减少对服务器的请求
                if (this.dataList.length == 0)
                    this.getData()
    
                // 计算最多显示的字数，根据容器宽度
                this.$nextTick(() => {
                    let warpWid = this.$el.getBoundingClientRect().width;
                    this.maxNum = parseInt(warpWid / 16)
                })
    
            },
            value(val) {
                this.init();
            }
        },
        methods: {
            getData() {
                this.ajaxLoad = true;
                this.$http.post(this.apiUrl).then(res => {
                    if (res.code === 1000) {
                        let list = res.data;
                        if (this.multi)
                            list = list.map(item => {
                                item.selected = false;
                                return item
                            })
                        this.dataList = list;
                        this.initSelected();
                    }
                    this.ajaxLoad = false;
                })
            },
            pick(i) {
                if (this.multi) {
                    // 如果是不限、选中的时候把其他的都取消
                    if (this.dataList[i].name == '不限' && !this.dataList[i].selected) {
                        this.dataList.forEach(item => item.selected = false);
                    } else {
                        let bxIndex = this.dataList.findIndex(item => item.name == '不限');
                        if (bxIndex >= 0)
                            this.dataList[bxIndex].selected = false;
                    }
                    this.dataList[i].selected = !this.dataList[i].selected;
                    this.resoutList = this.dataList.filter(item => item.selected);
                } else {
                    this.activeIndex = i;
                    this.resout = this.activeItem;
                    this.closePanel();
                }
    
            },
            setEmpty() {
                if (this.multi) {
                    this.resoutList = [];
                } else {
                    this.activeIndex = null;
                    this.resout = {
                        id: '',
                        name: ''
                    };
                }
                this.closePanel();
            },
            showPanel() {
                this.show = true;
            },
            closePanel() {
                this.show = false;
            },
            ousideClick() {
                this.closePanel()
            },
            initSelected() {
                // 多选、单选
                if (this.multi) {
                    if (this.resoutList.length > 0) {
                        this.resoutList.forEach(select => {
                            let ind = this.dataList.findIndex(item => item.id == select.id);
                            this.dataList[ind].selected = true;
                        })
                    }
                } else {
                    if (this.resout.id != '') {
                        let avIndex = this.dataList.findIndex(item => item.id == this.value.id);
                        this.activeIndex = avIndex;
                    }
                }
            },
            init() {
                if (this.multi) {
                    this.resoutList = Array.isArray(this.value) ? this.value : JSON.parse(this.value)
                } else {
                    this.resout = this.value;
                }
                if (this.dataList.length > 0 && this.show)
                    this.initSelected();
            }
        },
        created() {
            this.init();
        }
    }
</script>

<style lang="less" scoped>
    @import url('../less/picker.less');
</style>

