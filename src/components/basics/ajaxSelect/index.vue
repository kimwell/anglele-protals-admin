<template>
    <i-select filterable v-model="select" @on-change="asyncValue" >
        <i-option v-for="item in list" :key="item.id" :value="item.id+'-'+item.name">{{ item.name }}</i-option>
    </i-select>
</template>

<script>
    export default {
        props: {
            api: String,
            objKey: {
                type: String,
                default: 'data'
            },
            value: String
        },
        data() {
            return {
                list: [],
                hasLoad: false,
                select: ''
            }
        },
        methods: {
            // 获取仓库列表
            getList() {
                this.$http.post(this.api).then(res => {
                    if (res.code === 1000) {
                        this.list = res[this.objKey]
                    }
                })
            },
            asyncValue() {
                if (this.select != '') {
                    this.$emit('on-select', {
                        id: this.select.split('-')[0],
                        name: this.select.split('-')[1]
                    });
                }
            }
        },
        watch: {
            value(val){
                this.select = val != '-' ? val : '';
            }
        },
        created() {
            this.select = this.value != '-' ? this.value : '';
            this.getList();
        }
    }
</script>

