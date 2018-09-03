<template>
    <div class="panel">
        <Card :bordered="false" class="card">
            <p slot="title">新闻中心发布</p>
            <div class="card-contnet">
                <div class="publish">
                    <Form :label-width="100" :ref="ref" :model="itemApi" :rules="rules">
                        <FormItem label="分类" class="ivu-form-item-required">
                            <Select v-model="type" style="width:200px;">
                                <Option v-for="item in typeList" :value="item.name+'-'+item.id" :key="item.id">{{ item.name }}</Option>
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
                        <FormItem label="来源URL" prop="sourceURL">
                            <Input type="text" v-model="itemApi.sourceURL" placeholder="请输入来源URL" style="width:450px;"></Input>
                        </FormItem>
                        <FormItem label="摘要内容" prop="paper">
                            <Input type="text" v-model="itemApi.paper" :maxlength="80" placeholder="请输入摘要内容" style="width:450px;"></Input>
                        </FormItem>
                        <FormItem class="ivu-form-item-required" label="正文">
                            <UE :defaultMsg="defaultMsg" :config="config" ref="ue"></UE>
                        </FormItem>
                        <FormItem label="封面" class="ivu-form-item-required">
                            <Upload :action="api.uploadApi" :headers="uplaodHeader" :before-upload="beforeUpload" :max-size="2048" :format="['png','jpg','jpeg']" :show-upload-list="false" :on-exceeded-size="handleMaxSize" :on-success="handleSuccess" :on-format-error="handleFormatError"
                                style="display:inline-block;width: 100px;">
                                <Button v-if="!showUpload" type="primary"> 上传封面</Button>
                                <Button v-else type="primary" disabled loading>正在上传...</Button>
                            </Upload>
                            <div class="cover" v-if="itemApi.coverImage != ''">
                                <img :src="itemApi.coverImage" />
                            </div>
                        </FormItem>
                        <FormItem class="ivu-form-item-required" label="置顶排序参数">
                            <Input type="text" value="0" v-model="itemApi.flag" placeholder="请输入摘要内容" style="width:450px;"></Input>
                        </FormItem>
                    </Form>
                    <div class="publish-btn">
                        <Button type="primary" v-if="types != 'detail'" @click="save(1)" size="large">发布</Button>
                        <Button type="ghost" v-if="types != 'detail'" @click="save(0)" size="large">保存</Button>
                        <!-- <Button type="ghost" @click="getUEContent()" size="large">取消</Button> -->
                    </div>
                </div>
            </div>
        </Card>
    </div>
</template>

<script>
    import UE from '@/components/basics/UE';
    export default {
        components: {
            UE
        },
        data() {
            return {
                ref: 'form' + new Date().getTime(),
                itemApi: {
                    id: '',
                    typeName: '',
                    typeId: '',
                    title: '',
                    author: '',
                    source: '',
                    sourceURL: '',
                    paper: '',
                    coverImage: '',
                    article: '',
                    flag: 0,
                    status: ''
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
                    sourceURL: [{
                        required: true,
                        message: '请输入来源URL',
                        trigger: 'blur'
                    }],
                    paper: [{
                        required: true,
                        message: '请输入摘要',
                        trigger: 'blur'
                    }]
                }
            }
        },
        computed: {
            //  设置文件上传headers
            uplaodHeader() {
                return {
                    authorization: this.$store.state.authorization,
                    loginId: this.$store.state.loginId
                }
            },
            id() {
                return this.$route.params.id
            },
            types () {
                return this.$route.params.type
            }
        },
        methods: {
            getTypeList() {
                this.$http.post(this.api.findAllArticleType).then(res => {
                    if (res.code === 1000) {
                        this.typeList = res.data
                    }
                })
            },
            beforeUpload(res) {
                this.showUpload = true;
            },
            //  文件上传处理
            handleSuccess(res) {
                this.showUpload = false;
                let pres = JSON.parse(res);
                let path = 'http://tbxoss.oss-cn-hangzhou.aliyuncs.com'
                this.itemApi.coverImage = path + pres[0].url;
            },
            //  文件格式
            handleFormatError(file) {
                this.$Message.error('文件格式不正确');
                return false;
            },
            //  上传文件过大提示
            handleMaxSize(file) {
                this.$Message.error('文件最大不超过1M');
                return false;
            },
            getUEContent() {
                let content = this.$refs.ue.getUEContent();
            },
            //  保存 发布
            save(status) {
                let content = this.$refs.ue.getUEContent()
                if(this.type != ''){
                    let ty = this.type.split('-');
                    this.itemApi.typeId = ty[1];
                    this.itemApi.typeName = ty[0];
                }
                if(content != ''){
                    this.itemApi.article = content
                }
                this.$refs[this.ref].validate((valid) => {
                    if (valid) {
                        if (this.type !='' || this.itemApi.typeName != '' || this.itemApi.article != '' || this.itemApi.coverImage != '') {
                            this.$Modal.confirm({
                                title: '保存提示',
                                content: '确认发布新闻？',
                                onOk: () => {
                                    let params = JSON.parse(JSON.stringify(this.itemApi))
                                    params.status = status;
                                    params.article = content;
                                    this.$http.post(this.api.saveAndUpdateIndustryNew, params).then(res => {
                                        if (res.code === 1000) {
                                            this.$Message.success(status == "1" ? '发布成功' : '保存成功');
                                            if(status == '1'){
                                                this.$router.push('../../nlist/publish')
                                            }else{
                                                this.$router.push('../../nlist/drafts')
                                            }
                                        }
                                    })
                                }
                            })
                        }else{
                            this.$Message.error('请完善信息')
                        }
                    }
                })
    
            },
            // 编辑、查看获取数据
            getInfoPage() {
                if(this.types == 'detail' || this.types  ==  'edit'){
                    let params = {
                        id: this.id
                    }
                    this.$http.post(this.api.findArticleInfo,params).then(res => {
                        if(res.code === 1000) {
                            this.defaultMsg = res.data.article
                            this.itemApi.id = res.data.section.id
                            this.itemApi.typeName = res.data.section.typeName,
                            this.itemApi.typeId= res.data.section.typeId,
                            this.itemApi.title = res.data.section.title,
                            this.itemApi.author = res.data.section.author,
                            this.itemApi.source = res.data.section.source,
                            this.itemApi.sourceURL = res.data.section.sourceURL,
                            this.itemApi.paper = res.data.section.paper,
                            this.itemApi.coverImage = res.data.section.coverImage,
                            this.itemApi.flag = res.data.section.flag,
                            this.itemApi.article = res.data.article,
                            this.type = res.data.section.typeName  +'-'+ res.data.section.typeId
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