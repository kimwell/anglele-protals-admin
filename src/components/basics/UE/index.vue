<template>
    <div class="ueditor">
        <div class="upload" v-if="uploadshow">
            <Button type="text" @click="showUploadModal" icon="ios-cloud-upload-outline">上传图片</Button>
        </div>
        <script id="editor" type="text/plain"></script>
    <Modal v-model="show" title="上传图片" :closable="false" :mask-closable="false">
        <div>
            <Upload multiple :action="api.uploadApi" :headers="uplaodHeader" :max-size="2048" :format="['png','jpg','jpeg']" :show-upload-list="false" :on-exceeded-size="handleMaxSize" :on-success="handleSuccess" :on-format-error="handleFormatError" style="display:inline-block;width: 100px;">
                <Button v-if="!showUpload" type="primary">上传图片</Button>
            </Upload>
        </div>
        <div class="uploadimglist" v-if="imageList.length != 0">
            <div class="imglist" v-for="(item,index) in imageList" :key="index" >
                <img :src="item"/>
                <span class="iconfont icon-shanchu remove" @click="removePic(index)"></span>
            </div>
        </div>
        <div slot="footer">
            <Button @click="cancel">取消</Button>
            <Button type="primary" @click="insertImg">添加</Button>
        </div>
    </Modal>
    </div>
</template>

<script>
    import '../../../../static/UE/ueditor.config.js' //  ueditor
    import '../../../../static/UE/ueditor.all.js'
    import '../../../../static/UE/lang/zh-cn/zh-cn.js'
    import '../../../../static/UE/ueditor.parse.min.js'
    export default {
        name: 'UE',
        data() {
            return {
                editor: null,
                uploadshow: false,
                show: false,
                imageList: [],
                showUpload: false
            }
        },
        props: {
            defaultMsg: {
                type: String
            },
            config: {
                type: Object
            }
        },
        mounted() {
            let _this = this;
            UE.delEditor('_editor');
            this.editor = UE.getEditor('editor', this.config); // 初始化UE
            this.editor.addListener("ready", function() {
                setTimeout(function(){
                    _this.editor.setContent(_this.defaultMsg,false); // 确保UE加载完成后，放入内容。
                },600)
                _this.uploadshow = true
            });
        },
        computed: {
            //  设置文件上传headers
            uplaodHeader() {
                return {
                    authorization: this.$store.state.authorization,
                    loginId: this.$store.state.loginId
                }
            }
        },
        methods: {
            //  文件上传处理
            handleSuccess(res,file) {
                // let pres = JSON.parse(res);
                // let path = 'http://tbxoss.oss-cn-hangzhou.aliyuncs.com'
                this.imageList.push(res.data);
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
            getUEContent() { // 获取内容方法
                return this.editor.getContent()
            },
            showUploadModal() {
                this.show = true
            },
            //  插入图片
            insertImg() {
                let insertPic='';
                _.forEach(this.imageList,el => {
                    insertPic +='<img src="' + el + '">';
                })
                this.editor.execCommand("inserthtml", insertPic);
                this.show = false;
                this.imageList = [];
            },
            // 删除已上传的某个图片
            removePic(i) {
                this.imageList.splice(i, 1);
            },
            cancel(){
                this.show = false;
                this.imageList = []
            }
        },
        destroyed() {
            let me = this
            this.editor.destroy();
            this.editor = null;
            if(!me){
                me.window.scrollTo(0,0);
            }
        }
    }
</script>

<style lang='less' scoped>
    .ueditor {
        position: relative;
    }
    
    .upload {
        position: absolute;
        right: 150px;
        top: 110px;
        z-index: 2;
    }
    .uploadimglist .imglist{
        position: relative;
        display: inline-block;
        width: 33.3333%;
        padding: 10px;
        font-size: 0;
    }
    .uploadimglist .imglist .remove{
        position: absolute;
        right: 10px;
        bottom: 10px;
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        font-size: 16px;
        color: #fff;
        background-color: rgba(0, 0, 0, .6)
    }
    .uploadimglist img{
        max-width: 100%;
    }
</style>