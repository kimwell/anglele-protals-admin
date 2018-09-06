<template>
    <div class="panel">
        <Card :bordered="false" class="card">
            <p slot="title">{{title}}管理</p>
            <Button slot="extra" size="small" type="success" @click="openModel(false)">新增新闻分类</Button>
            <div class="card-contnet">
                <div class="table-contnet">
                    <Row class-name="head">
                        <Col class-name="col" span="7">分类名称</Col>
                        <Col class-name="col" span="3">分类排序</Col>
                        <Col class-name="col" span="5">备注</Col>
                        <Col class-name="col" span="4">更新时间</Col>
                        <Col class-name="col" span="3">最近操作人</Col>
                        <Col class-name="col" span="2">操作</Col>
                    </Row>
                    <Row v-for="(item,index) in list" :key="item.id">
                        <Col class-name="col" span="7">{{ item.name }}</Col>
                        <Col class-name="col" span="3">{{ item.orderIndex }}</Col>
                        <Col class-name="col" span="5">{{ item.remark | isEmpty(params ='暂无')}}</Col>
                        <Col class-name="col" span="4">{{ item.updateTime | dateformat}}</Col>
                        <Col class-name="col" span="3">{{ item.updateUser}}</Col>
                        <Col class-name="col" span="2">
                        <Button size="small" type="warning" @click="openModel(true,item)">编辑</Button>
                        <Button size="small" type="error" @click="deleteItem(item)">删除</Button>
                        </Col>
                    </Row>
                    <Row v-if="list.length == 0">
                        <Col class-name="col" span="24">暂无数据</Col>
                    </Row>
                </div>
                <Page class="page-count" size="small" :total="totalCount" show-total :current="apiData.pageIndex" :page-size="apiData.pageSize" @on-change="changePage"></Page>
            </div>
        </Card>
        <Modal v-model="show" :title="isEdit?`编辑${title}`:`添加${title}`" :closable="false" :mask-closable="false">
            <Form :label-width="80" :ref="ref" :model="itemApi" :rules="rules">
                <FormItem label="分类名称" prop="name">
                    <Input type="text" v-model="itemApi.name" size="small" placeholder="请输入..."></Input>
                </FormItem>
                <FormItem label="备注说明" prop="remark">
                    <Input type="text" v-model="itemApi.remark" size="small" placeholder="请输入..."></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="show = false">取消</Button>
                <Button type="primary" @click="handleSubmit" :loading="loading">{{ isEdit ? '编辑' : '添加' }}</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                title: '新闻分类',
                ref: 'form' + new Date().getTime(),
                isEdit: false,
                show: false,
                loading: false,
                editItem: {},
                itemApi: {
                    id: '',
                    name: '',
                    orderIndex: '',
                    remark: ''
                },
                apiData: {
                    pageIndex: 1,
                    pageSize: 10
                },
                rules: {
                    name: [{
                        required: true,
                        message: '不能为空',
                        trigger: 'blur'
                    }]
                },
                list: [],
                totalCount: 0
            }
        },
        methods: {
            openModel(isEdit, item) {
                this.isEdit = isEdit;
                if (isEdit = isEdit) {
                    this.editItem = item || {};
                    this.itemApi = {
                        name: item.name,
                        remark: item.remark
                    }
                } else {
                    this.itemApi = {
                        name: '',
                        remark: ''
                    }
                }
                this.show = true;
            },
            changePage(page) {
                this.apiData.pageIndex = page;
                this.getList();
            },
            getList() {
                this.$http.post(this.api.articleCategoryPage, this.apiData).then(res => {
                    if (res.code === 1000) {
                        this.list = res.data.data;
                        this.totalCount = res.data.totalCount
                    }
                })
            },
            // 编辑，新增提交表单
            handleSubmit() {
                this.$refs[this.ref].validate((valid) => {
                    if (valid) {
                        if (this.itemApi.orderIndex != '') {
                            this.loading = true;
                            let params = JSON.parse(JSON.stringify(this.itemApi));
                            if (this.isEdit) {
                                params.id = this.editItem.id;
                                params.name = this.itemApi.name;
                                params.orderIndex = this.itemApi.orderIndex;
                                params.remark = this.itemApi.remark;
                            }
                            let apiUrl = this.isEdit ? this.api.saveArticleInfo : this.api.saveArticleInfo;
                            this.$http.post(apiUrl, params).then(res => {
                                if (res.code === 1000) {
                                    this.getList();
                                    this.$Message.success('操作成功');
                                    this.show = false;
                                } else {
                                    this.$Message.error(res.message);
                                }
                                this.loading = false
                            })
                        } else {
                            this.$Message.error('分类排序不能为空');
                        }
                    } else {
                        this.$Message.error('表单验证失败');
                    }
                })
            },
            //  删除
            deleteItem(item) {
                this.$Modal.confirm({
                    title: '删除提示！',
                    content: '删除后无法撤销，是否继续？',
                    onOk: () => {
                        let params = {
                            id: item.id
                        }
                        this.$http.post(this.api.deleteArticleInfoById, params).then(res => {
                            if (res.code === 1000) {
                                this.getList();
                                this.$Message.success('删除成功')
                            } else if (res.code === -1) {
                                this.$Message.error(res.message)
                            } else {
                                this.$message.error('删除失败')
                            }
                        })
                    }
                })
            }
        },
        created() {
            this.getList()
        }
    
    }
</script>

<style lang="less" scoped>
    .card {
        position: relative;
        margin-bottom: 20px;
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
            bottom: 0;
        }
    }
</style>
