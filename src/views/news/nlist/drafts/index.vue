<template>
    <div class="new-wrap">
        <Form :mode="filterData" :label-width="80" inline>
            <FormItem label="分类">
                <Select v-model="filterData.typeId" @on-change="onFilter" placeholder="请选择" style="width:150px">
                    <Option v-for="item in typeData" :key="item.id" :value="item.id" >{{ item.name }}</Option>
                </Select>
            </FormItem>
            <FormItem label="置顶">
                <Select v-model="filterData.flag" @on-change="onFilter" placeholder="请选择" style="width:150px">
                    <Option v-for="item in topType" :key="item.id" :value="item.id">{{ item.name }}</Option>
                </Select>
            </FormItem>
            <FormItem label="更新时间">
                <DatePicker type="daterange" :clearable="false" :options="dateOption" @on-change="onFilter" v-model="dateValue" placement="bottom-end" placeholder="选择日期"></DatePicker>
            </FormItem>
            <FormItem label="标题">
                <Input type="text" v-model="filterData.title" @on-change="onFilter" placeholder="请输入..."></Input>
            </FormItem>
            <FormItem>
                <Button type="warning" @click.native="resetFilter">清除</Button>
            </FormItem>
        </Form>
        <div class="card-contnet">
            <div class="table-contnet">
                <Row class-name="head">
                    <Col class-name="col" span="2">分类</Col>
                    <Col class-name="col" span="3">更新时间</Col>
                    <Col class-name="col" span="8">标题</Col>
                    <Col class-name="col" span="3">创建人</Col>
                    <Col class-name="col" span="2">最近操作人</Col>
                    <Col class-name="col" span="2">置顶排序</Col>
                    <Col class-name="col" span="4">操作</Col>
                </Row>
                <Row v-for="(item,index) in list" :key="item.id">
                    <Col class-name="col" span="2">{{item.typeName}}</Col>
                    <Col class-name="col" span="3">{{item.updateTime | dateformat}}</Col>
                    <Col class-name="col" span="8">{{item.title}}</Col>
                    <Col class-name="col" span="3">{{item.createUser}}</Col>
                    <Col class-name="col" span="2">{{item.updateUser}}</Col>
                    <Col class-name="col" span="2">{{item.flag}}</Col>
                    <Col class-name="col" span="4">
                        <Button type="warning" size="small" @click="detailNews(item)">查看</Button>
                        <Button v-if="item.dStatus == 1" type="warning" size="small" @click="delNews(item)">删除</Button>
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
                filterData: {
                    pageSize: 20,
                    currentPage: 1,
                    status: '0',
                    typeId: '',
                    startTime: '',
                    endTime: '',
                    title: '',
                    article: '',
                    flag: '',
                    dStatus: ''
                },
                dateValue: ['', ''],
                list: [],
                typeData: [],
                topType: [{
                    id: '',
                    name: '所有'
                }, {
                    id: 1,
                    name: '已置顶'
                }, {
                    id: 0,
                    name: '未置顶'
                }],
                dateOption: {
                    shortcuts: [{
                            text: '最近一周',
                            value() {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                return [start, end];
                            }
                        },
                        {
                            text: '最近一个月',
                            value() {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                return [start, end];
                            }
                        },
                        {
                            text: '最近三个月',
                            value() {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                return [start, end];
                            }
                        }
                    ]
                },
                totalCount: 0,
            }
        },
        computed: {
            handleData() {
                return {
                    pageSize: this.filterData.pageSize,
                    currentPage: this.filterData.currentPage,
                    status: 0,
                    typeId: this.filterData.typeId,
                    startTime: this.dateValue[0] != '' ? new Date(this.dateValue[0]).getTime() : '',
                    endTime: this.dateValue[1] != '' ? new Date(this.dateValue[1]).getTime() : '',
                    title: this.filterData.title,
                    flag: this.filterData.flag,
                    dStatus: this.filterData.dStatus
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
            onFilter() {
                this.getList(this.handleData)
            },
            resetFilter() {
                this.filterData = {
                    pageSize : 20,
                    currentPage : 1,
                    status: 0,
                    typeId : '',
                    startTime : '',
                    endTime : '',
                    title : '',
                    flag : '',
                    dStatus: ''
                }
                this.dateValue = ['','']
                this.getList(this.handleData)
            },
            changePage(page) {
                this.filterData.currentPage = page;
                this.getList(this.handleData);
            },
            getList(val) {
                this.$http.post(this.api.findArticleList, this.handleData).then(res => {
                    if (res.code === 1000) {
                        this.list = res.data.list
                        this.totalCount = res.data.totalCount
                    }
                })
            },
            getType() {
                this.$http.post(this.api.findAllArticleType).then(res => {
                    if (res.code === 1000) {
                        this.typeData = res.data;
                    }
                })
            },
            //  查看
            detailNews(item){
                this.$router.push('../nadd/'+item.id+'/edit')
            },
            // 删除新闻
            delNews(item) {
                let params = {
                    id: item.id
                }
                this.$Modal.confirm({
                    title: '删除提示',
                    content: '确认删除新闻？',
                    onOk: () => {
                        this.$http.post(this.api.articleRemove,params).then(res => {
                            if(res.code === 1000){
                                this.$Message.success('删除成功')
                                this.getList(this.handleData);
                            }else{
                                this.$Message.error(res.message)
                            }
                        })
                    }})
            },
        },
        created() {
            this.getType();
            this.getList(this.handleData)
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