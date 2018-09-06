<template>
    <div class="new-wrap">
        <Form :mode="filterData" :label-width="80" inline>
            <FormItem label="分类">
                <Select v-model="filterData.category" placeholder="请选择" style="width:150px">
                                <Option v-for="item in typeData" :key="item.name" :value="item.name" >{{ item.name }}</Option>
                            </Select>
            </FormItem>
            <FormItem label="状态">
                <Select v-model="filterData.status" placeholder="请选择" style="width:150px">
                                <Option v-for="item in onlineData" :key="item.id" :value="item.id">{{ item.name }}</Option>
                            </Select>
            </FormItem>
            <FormItem label="标题">
                <Input type="text" v-model="filterData.title" placeholder="请输入..."></Input>
            </FormItem>
            <FormItem label="发布时间：">
                <DatePicker type="daterange" v-model="dateValue" :clearable="false" placement="bottom-end" placeholder="选择日期"></DatePicker>
            </FormItem>
            <FormItem>
                <Button type="warning" @click.native="resetFilter">清除</Button>
            </FormItem>
        </Form>
        <div class="card-contnet">
            <div class="table-contnet">
                <Row class-name="head">
                    <Col class-name="col" span="2">分类</Col>
                    <Col class-name="col" span="3">发布时间</Col>
                    <Col class-name="col" span="6">标题</Col>
                    <Col class-name="col" span="1">状态</Col>
                    <Col class-name="col" span="2">创建人</Col>
                    <Col class-name="col" span="2">最近操作人</Col>
                    <Col class-name="col" span="2">置顶排序</Col>
                    <Col class-name="col" span="6">操作</Col>
                </Row>
                <Row v-for="(item,index) in list" :key="item.id">
                    <Col class-name="col" span="2">{{item.category}}</Col>
                    <Col class-name="col" span="3" v-if="item.createTime == ''"> </Col>
                    <Col class-name="col" span="3" v-else>{{item.createTime | dateformat}}</Col>
                    <Col class-name="col" span="6">{{item.title}}</Col>
                    <Col class-name="col" span="1">{{item.status == 1 ? '已发布': '已删除'}}</Col>
                    <Col class-name="col" span="2">{{item.author}}</Col>
                    <Col class-name="col" span="2">{{item.updateUser}}</Col>
                    <Col class-name="col" span="2">{{item.sortIndex}}</Col>
                    <Col class-name="col" span="6">
                    <template v-if="item.status == 1">
                            <Button type="warning" size="small" @click="detailNews(item)">查看</Button>
                            <Button type="warning" size="small" @click="editNews(item)">编辑</Button>
                            <Button type="warning" size="small" @click="editTop(item)">{{item.sortIndex === 0 ?'置顶':'取消置顶'}}</Button>
                            <Button type="warning" size="small" @click="delNews(item)">删除</Button>
</template>

<template v-else>
    <Button type="warning" size="small" @click="detailNews(item)">查看</Button>
</template>
                    </Col>
                </Row>
                <Row v-if="list.length == 0">
                    <Col class-name="col" span="24">暂无数据</Col>
                </Row>
            </div>
            <Page class="page-count" size="small" :total="totalCount" show-total :current="filterData.currentPage" :page-size="filterData.pageSize" @on-change="changePage"></Page>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                list: [],
                filterData: {
                    pageSize: 10,
                    pageIndex: 1,
                    status: '1',
                    title: '',
                    category: '',
                    deployTimeEnd: '',
                    deployTimeBegin: ''
                },
                dateValue: ['', ''],
                typeData: [],
                onlineData: [{
                    id: '0',
                    name: '已删除'
                }, {
                    id: '1',
                    name: '已发布'
                }],
                totalCount: 0,
                loading: false,
            }
        },
        computed: {
            handleData() {
                return {
                    pageSize: this.filterData.pageSize,
                    pageIndex: this.filterData.pageIndex,
                    title: this.filterData.title,
                    category: this.filterData.category,
                    status: this.filterData.status,
                    deployTimeBegin: this.dateValue[0] != '' ? new Date(this.dateValue[0]).getTime() : '',
                    deployTimeEnd: this.dateValue[1] != '' ? new Date(this.dateValue[1]).getTime() : '',
                }
            }
        },
        watch: {
            'handleData': {
                handler: _.debounce(function(val, oldVal) {
                    // 是否是翻页操作
                    if (val.currentPage == oldVal.currentPage)
                        this.filterData.currentPage = 1;
                    this.getList(this.handleData);
                }, 200),
                deep: true
            }
        },
        methods: {
            changePage(page) {
                this.filterData.currentPage = page;
                this.getList(this.handleData);
            },
            resetFilter() {
                this.filterData = {
                    pageSize: 10,
                    pageIndex: 1,
                    status: '1',
                    title: '',
                    category: '',
                    deployTimeBegin: '',
                    deployTimeEnd: ''
                }
                this.dateValue = ['', ''];
            },
            getList(params) {
                this.$http.post(this.api.articlePage, params).then(res => {
                    if (res.code === 1000) {
                        this.list = res.data.data
                        this.totalCount = res.data.totalCount
                    }
                })
            },
            getType() {
                this.$http.post(this.api.articleCategoryList).then(res => {
                    if (res.code === 1000) {
                        this.typeData = res.data;
                    }
                })
            },
            // 删除新闻
            delNews(item) {
                let params = {
                    id: item.id,
                    status: 0
                }
                this.$Modal.confirm({
                    title: '删除提示',
                    content: '确认删除新闻？',
                    onOk: () => {
                        this.$http.post(this.api.changeStatus, params).then(res => {
                            if (res.code === 1000) {
                                this.$Message.success('删除成功')
                                this.getList(this.handleData)
                            } else {
                                this.$Message.error(res.message)
                            }
                        })
                    }
                })
            },
            //  查看
            detailNews(item) {
                this.$router.push('../nadd/' + item.id + '/detail')
            },
            //  编辑
            editNews(item) {
                this.$router.push('../nadd/' + item.id + '/edit')
            },
            //  置顶
            editTop(data) {
                let sort = data.sortIndex;
                this.$Modal.confirm({
                    title: sort === 0 ? '置顶' : '取消置顶',
                    content: `确认${sort === 0 ? '置顶':'取消置顶'}?`,
                    onOk: () => {
                        this.$http.post(this.api.articletoTop, {
                            id: data.id
                        }).then(res => {
                            if (res.code === 1000) {
                                this.$Message.success('置顶成功');
                                this.getList(this.handleData);
                            } else {
                                this.$Message.error(res.message)
                            }
                            this.loading = false
                        })
                    }
                })
            }
        },
        created() {
            this.getList(this.handleData);
            this.getType();
        }
    }
</script>

<style lang='less' scoped>
    .new-wrap {
        background-color: #fff;
        padding: 20px 0;
        .card-contnet {
            position: relative;
            padding-bottom: 40px;
        }
        .table-contnet {
            line-height: 40px;
            text-align: center;
            border-top: 1px solid #d0d0d0;
            border-left: 1px solid #d0d0d0;
            .head {
                background-color: #ddd;
            }
            .col {
                height: 40px;
                padding: 0 5px;
                border-right: 1px solid #d0d0d0;
                border-bottom: 1px solid #d0d0d0;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
        .page-count {
            position: absolute;
            right: 0;
            bottom: 10px;
        }
    }
    
    .new-main {
        h2 {
            font-size: 22px;
            margin-bottom: 20px;
        }
        .section {
            img {
                max-width: 100%;
            }
        }
        p {
            span {
                display: inline-block;
                margin-right: 20px;
            }
        }
        .paper {
            margin-top: 20px;
            margin-bottom: 20px;
        }
    }
</style>