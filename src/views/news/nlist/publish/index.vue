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
            <FormItem label="状态">
                <Select v-model="filterData.dStatus" @on-change="onFilter" placeholder="请选择" style="width:150px">
                    <Option v-for="item in onlineData" :key="item.id" :value="item.id">{{ item.name }}</Option>
                </Select>
            </FormItem>
            <FormItem label="发布时间">
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
                    <Col class-name="col" span="3">发布时间</Col>
                    <Col class-name="col" span="6">标题</Col>
                    <Col class-name="col" span="1">状态</Col>
                    <Col class-name="col" span="2">创建人</Col>
                    <Col class-name="col" span="2">最近操作人</Col>
                    <Col class-name="col" span="2">置顶排序</Col>
                    <Col class-name="col" span="6">操作</Col> 
                </Row>
                <Row v-for="(item,index) in list" :key="item.id">
                    <Col class-name="col" span="2">{{item.typeName}}</Col>
                    <Col class-name="col" span="3" v-if="item.releaseTime == ''">  </Col>
                    <Col class-name="col" span="3" v-else>{{item.releaseTime | dateformat}}</Col>
                    <Col class-name="col" span="6">{{item.title}}</Col>
                    <Col class-name="col" span="1">{{item.dStatus == 1 ? '在线': '已删除'}}</Col>
                    <Col class-name="col" span="2">{{item.createUser}}</Col>
                    <Col class-name="col" span="2">{{item.updateUser}}</Col>
                    <Col class-name="col" span="2">{{item.flag}}</Col>
                    <Col class-name="col" span="6">
                    <template v-if="item.dStatus == 1">
                        <Button type="warning" size="small" @click="detailNews(item)">查看</Button>
                        <Button type="warning" size="small" @click="editNews(item)">编辑</Button>
                        <Button type="warning" size="small" @click="editTop(item)">置顶</Button>
                        <Button v-if="item.flag > 0" type="warning" size="small" @click="cancelTop(item)">取消置顶</Button>
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
        <Modal v-model="editTopShow" title="置顶" :closable="false" :mask-closable="false">
            <Form :label-width="80" :model="topApi">
                <FormItem label="排序数字" class="ivu-form-item-required" >
                    <Input type="text" v-model="topApi.num" size="small" placeholder="请输入..."></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="editTopShow = false">取消</Button>
                <Button type="primary" @click="saveTop" :loading="loading">保存</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                list: [],
                filterData: {
                    pageSize: 10,
                    currentPage: 1,
                    status: '1',
                    typeId: '',
                    startTime: '',
                    endTime: '',
                    title: '',
                    article: '',
                    flag: '',
                    dStatus: ''
                },
                dateValue: ['', ''],
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
                onlineData: [{
                    id: '',
                    name: '所有'
                }, {
                    id: 1,
                    name: '在线'
                }, {
                    id: 0,
                    name: '已删除'
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
                editTopShow: false,
                topApi: {
                    id: '',
                    num: ''
                },
                loading: false,
                rules:{
                    num: [{
                        required: true,
                        message: '不能为空',
                        trigger: 'blur'
                    }]
                },
            }
        },
        computed: {
            handleData() {
                return {
                    pageSize: this.filterData.pageSize,
                    currentPage: this.filterData.currentPage,
                    status: this.filterData.status,
                    typeId: this.filterData.typeId,
                    startTime: this.dateValue[0] != '' ? new Date(this.dateValue[0]).getTime() : '',
                    endTime: this.dateValue[1] != '' ? new Date(this.dateValue[1]).getTime() : '',
                    title: this.filterData.title,
                    article: '',
                    flag: this.filterData.flag,
                    dStatus:this.filterData.dStatus
                }
            }
        },
        watch: {
            'handleData': {
                handler: _.debounce(function(val, oldVal) {
                    // 是否是翻页操作
                    if (val.currentPage == oldVal.currentPage)
                        this.filterData.currentPage = 1;
                    this.getList();
                }, 200),
                deep: true
            }
        },
        methods: {
            changePage(page) {
                this.filterData.currentPage = page;
                this.getList(this.handleData);
            },
            onFilter() {
                this.getList(this.handleData)
            },
            resetFilter() {
                this.filterData = {
                    pageSize : 10,
                    currentPage : 1,
                    status : '1',
                    typeId : '',
                    startTime : '',
                    endTime : '',
                    title : '',
                    article : '',
                    flag : '',
                    dStatus: ''
                }
                this.dateValue = ['','']
                this.getList(this.handleData)
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
                                this.getList(this.handleData)
                            }else{
                                this.$Message.error(res.message)
                            }
                        })
                    }})
            },
            //  查看
            detailNews(item) {
                this.$router.push('../nadd/'+item.id+'/detail')
            },
            //  编辑
            editNews(item) {
                this.$router.push('../nadd/'+item.id+'/edit')
            },
            //  置顶
            editTop(data) {
                this.topApi = {
                    id: data.id,
                    num: data.flag
                }
                this.editTopShow = true;
            },
            saveTop() {
                if(this.topApi.num != ''){
                    this.loading = true;
                    this.$http.post(this.api.articleRise,this.topApi).then(res => {
                        if(res.code === 1000){
                            this.$Message.success('置顶成功');
                            this.editTopShow = false
                            this.getList(this.handleData);
                        }else{
                            this.$Message.error(res.message)
                        }
                        this.loading = false
                    })
                }else{
                    this.$Message.error('排序不能为空')
                } 
            },
            // 取消置顶
            cancelTop(data) {
                let params = {
                    id: data.id
                }
                this.$Modal.confirm({
                    title: '取消置顶',
                    content:'确认取消置顶？',
                    onOk: () => {
                        this.$http.post(this.api.articleZero,params).then(res => {
                            if(res.code === 1000){
                                this.$Message.success('取消成功');
                                this.getList(this.handleData)
                            }else{
                                this.$Message.error(res.message)
                            }
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
    .new-main{
        h2{
            font-size: 22px;
            margin-bottom: 20px;
        }
        .section{
            img{
                max-width: 100%;
            }
        }
        p{
            span{
                display: inline-block;
                margin-right: 20px;
            }
        }
        .paper{
            margin-top: 20px;
            margin-bottom: 20px;
        }
    }
</style>