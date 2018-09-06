<template>
    <div class="panel">
        <Card :bordered="false" class="card">
            <p slot="title">新闻中心发布</p>
            <div class="card-contnet">
                <div class="publish">
                    <Form :label-width="100" :ref="ref" :model="itemApi" :rules="rules">
                        <FormItem label="分类" prop="category">
                            <Select v-model="itemApi.category" style="width:200px;">
                                            <Option v-for="item in typeList" :value="item.name" :key="item.id">{{ item.name }}</Option>
                                        </Select>
                        </FormItem>
                        <FormItem label="标题" prop="title">
                            <Input type="text" v-model="itemApi.title" placeholder="请输入标题" style="width:450px;"></Input>
                        </FormItem>
                        <FormItem label="作者" prop="author">
                            <Input type="text" v-model="itemApi.author" placeholder="请输入作者" style="width:450px;"></Input>
                        </FormItem>
                        <FormItem label="来源" prop="source">
                            <Input type="text" v-model="itemApi.source" placeholder="请输入来源" style="width:450px;"></Input>
                        </FormItem>
                        <FormItem label="来源URL" prop="sourceUrl">
                            <Input type="text" v-model="itemApi.sourceUrl" placeholder="请输入来源URL" style="width:450px;"></Input>
                        </FormItem>
                        <FormItem label="摘要内容" prop="shortContent">
                            <Input type="text" v-model="itemApi.shortContent" :maxlength="80" placeholder="请输入摘要内容" style="width:450px;"></Input>
                        </FormItem>
                        <FormItem label="关键字" prop="keyWord">
                            <Input type="text" v-model="itemApi.keyWord" placeholder="请输入关键字" style="width:450px;"></Input>
                        </FormItem>
                        <FormItem label="排序" prop="sortIndex">
                            <InputNumber :max="100000" :min="0" v-model.number="itemApi.sortIndex"></InputNumber>
                        </FormItem>
                        <FormItem label="状态" prop="status" v-if="itemApi.status != '0'">
                            <RadioGroup v-model="itemApi.status">
                                <Radio v-for="(item,index) in  [{value: '1',name: '发布'},{value: '2',name: '草稿'}]" :key="index" :label="item.value">
                                    <span>{{item.name}}</span>
                                </Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem label="封面" prop="coverImg">
                            <uploadFiles single :showPreview="false" v-model="itemApi.coverImg"></uploadFiles>
                        </FormItem>
                        <FormItem class="ivu-form-item-required" label="正文">
                            <UE :defaultMsg="defaultMsg" :config="config" ref="ue"></UE>
                        </FormItem>
                    </Form>
                    <div class="publish-btn">
                        <Button type="primary" v-if="types != 'detail'" @click="save(1)" size="large">发布</Button>
                        <!-- <Button type="primary" v-if="types != 'detail' && itemApi.status === '2'" @click="save(0)" size="large">保存草稿</Button> -->
                    </div>
                </div>
            </div>
        </Card>
    </div>
</template>

<script>
    import UE from '@/components/basics/UE';
    import uploadFiles from '@/components/basics/uploadBtn'
    export default {
        components: {
            UE,
            uploadFiles
        },
        data() {
            return {
                ref: 'form' + new Date().getTime(),
                itemApi: {
                    id: '',
                    shortContent: '',
                    content: '',
                    category: '',
                    status: '1',
                    coverImg: '',
                    title: '',
                    keyWord: '',
                    author: '',
                    source: '',
                    sourceUrl: '',
                    sortIndex: 0
                },
                typeList: [],
                type: '',
                showUpload: false,
                defaultMsg: '',
                config: {
                    initialFrameWidth: null,
                    initialFrameHeight: 550
                },
                rules: {
                    category: [{
                        required: true,
                        message: '请选择分类',
                        trigger: 'change'
                    }],
                    keyWord: [{
                        required: true,
                        message: '请输入标题',
                        trigger: 'blur'
                    }],
                    title: [{
                        required: true,
                        message: '请输入标题',
                        trigger: 'blur'
                    }],
                    author: [{
                        required: true,
                        message: '请输入作者',
                        trigger: 'blur'
                    }],
                    source: [{
                        required: true,
                        message: '请输入来源',
                        trigger: 'blur'
                    }],
                    sourceUrl: [{
                        required: true,
                        message: '请输入来源URL',
                        trigger: 'blur'
                    }],
                    shortContent: [{
                        required: true,
                        message: '请输入摘要',
                        trigger: 'blur'
                    }],
                    sortIndex: [{
                        required: true,
                        message: '请输入排序',
                        trigger: 'blur',
                        type: 'number'
                    }],
                    status: [{
                        required: true,
                        message: '请选择状态',
                        trigger: 'change'
                    }],
                    coverImg: [{
                        required: true,
                        message: '请上传封面',
                        trigger: 'blur'
                    }, {
                        validator: (rule, value, callback) => {
                            if (value != '') {
                                callback();
                            }
                        }
                    }],
                }
            }
        },
        computed: {
            id() {
                return this.$route.params.id
            },
            types() {
                return this.$route.params.type
            }
        },
        methods: {
            getTypeList() {
                this.$http.post(this.api.articleCategoryList).then(res => {
                    if (res.code === 1000) {
                        this.typeList = res.data;
                    }
                })
            },
            getUEContent() {
                let content = this.$refs.ue.getUEContent();
            },
            //  保存 发布
            save(status) {
                let ueContent = this.$refs.ue.getUEContent()
                if (ueContent != '') {
                    this.itemApi.content = ueContent
                }
                this.$refs[this.ref].validate((valid) => {
                    if (valid) {
                        this.$Modal.confirm({
                            title: '保存提示',
                            content: '确认发布新闻？',
                            onOk: () => {
                                let params = JSON.parse(JSON.stringify(this.itemApi))
                                params.content = ueContent;
                                this.$http.post(this.api.articleSave, params).then(res => {
                                    if (res.code === 1000) {
                                        this.$Message.success(status === 1 ? '发布成功' : '保存成功');
                                        if (status === 1) {
                                            this.$router.push('../../nlist/publish')
                                        } else {
                                            this.$router.push('../../nlist/drafts')
                                        }
                                    }
                                })
                            }
                        })
                    } else {
                        this.$Message.error('请完善信息')
                    }
                })
    
            },
            // 编辑、查看获取数据
            getInfoPage() {
                if (this.types == 'detail' || this.types == 'edit') {
                    let params = {
                        id: this.id
                    }
                    this.$http.post(this.api.articlefindOne, params).then(res => {
                        if (res.code === 1000) {
                            this.defaultMsg = res.data.content;
                            this.itemApi.id = res.data.id;
                            this.itemApi.shortContent = res.data.shortContent;
                            this.itemApi.content = res.data.content;
                            this.itemApi.category = res.data.category;
                            this.itemApi.status = res.data.status.toString();
                            this.itemApi.coverImg = res.data.coverImg;
                            this.itemApi.title = res.data.title;
                            this.itemApi.keyWord = res.data.keyWord;
                            this.itemApi.author = res.data.author;
                            this.itemApi.source = res.data.source;
                            this.itemApi.sourceUrl = res.data.sourceUrl;
                            this.sortIndex = res.data.sortIndex;
                        }
                    })
                }
    
            }
    
        },
        created() {
            this.getTypeList();
            this.getInfoPage();
        }
    }
</script>

<style lang='less' scoped>
    .publish {
        max-width: 800px;
    }
    
    .cover {
        padding: 20px 0;
        max-width: 450px;
    }
    
    .cover img {
        max-width: 100%;
    }
    
    .publish-btn {
        padding: 30px 0 30px 100px;
    }
    
    .publish-btn button {
        margin-right: 20px;
    }
</style>