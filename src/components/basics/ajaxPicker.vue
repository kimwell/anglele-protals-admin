<template>
    <div class="ggh-picker-container" :class="size">
        <div class="inner-container" @click.self="showPanel">
            <span class="value" :class="{ 'place-holder' : placeholderShow }">{{ placeholderShow ? placeholder : resout.name }}</span>
            <span class="iconfont" :class=" show ? iconUp : iconDown"></span>
            <div class="area-box" :class="position" v-clickoutside="ousideClick" v-if="show">
                <Spin fix v-show="ajaxLoad">加载中...</Spin>
                <div class="items-contnet">
                    <span class="item" :class="{ 'active': activeIndex == i }" v-for="(item,i) in dataList" :key="item.id" @click="pick(i)">{{ item.name }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
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
                type: [Object, String],
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
                hasAjaxed: false, //是否请求国数据
                ajaxLoad: false,
                show: false,
                dataList: [],
                activeIndex: null,
                resout: ''
            }
        },
        computed: {
            activeItem() {
                return this.activeIndex == null ? '' : this.dataList[this.activeIndex];
            },
            // 是否显示placeHolder
            placeholderShow() {
                return this.activeIndex == null || this.resout.id == ''
            }
        },
        watch: {
            resout(val) {
                this.$emit('input', val)
            },
            show(val) {
                // 减少对服务器的请求
                if (this.activeIndex == null && this.dataList.length == 0)
                    this.getData()
            },
            value(val) {
                this.resout = val;
                this.init();
            }
        },
        methods: {
            getData(func) {
                this.ajaxLoad = true;
                this.$http.post(this.apiUrl).then(res => {
                    if (res.code === 1000) {
                        this.dataList = res.data;
                        // this.hasAjaxed = true;
                        if (func)
                            func()
                    }
                    this.ajaxLoad = false;
                })
            },
            pick(i) {
                this.activeIndex = i;
                this.resout = this.activeItem;
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
            init() {
                this.getData(() => {
                    this.resout = this.value;
                    let avIndex = this.dataList.findIndex(item => item.id == this.value.id);
                    this.activeIndex = avIndex == -1 ? null : avIndex;
                });
                if (this.apiUrl == '') {
                    console.log("请务必传入有效api地址！");
                }
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

