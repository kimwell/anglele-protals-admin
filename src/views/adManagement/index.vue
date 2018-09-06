<template>
  <div>
    <Card title="广告位管理">
      <Button slot="extra" type="success" @click="openModel(false)">新增广告位</Button>
      <Form :mode="pageApi" :label-width="90" inline>
        <FormItem label="标题：">
          <Input type="text" v-model="pageApi.title" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="广告位代码：">
          <Input type="text" v-model="pageApi.placeCode" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="最近更新人：">
          <Input type="text" v-model="pageApi.updateUser" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="状态：">
          <Select v-model="pageApi.status" style="width: 100px;">
            <Option v-for="item in statusData" :value="item.value" :key="item.value">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="更新时间：">
          <DatePicker type="daterange" placement="bottom-end" v-model="dateValue" placeholder="选择日期" style="width: 200px"></DatePicker>
        </FormItem>
        <FormItem>
          <Button type="warning" @click.native="resetFilter">清除</Button>
        </FormItem>
      </Form>
      <div class="card-contnet">
        <div class="table-contnet">
          <Row class-name="head">
            <Col class-name="col" span="5">图片</Col>
            <Col class-name="col" span="4">标题</Col>
            <Col class-name="col" span="2">排序</Col>
            <Col class-name="col" span="3">状态</Col>
            <Col class-name="col" span="2">最近更新人</Col>
            <Col class-name="col" span="4">最近更新时间</Col>
            <Col class-name="col" span="4">操作</Col>
          </Row>
          <Row v-for="(item,index) in list" :key="index">
            <Row class-name="head">
              <Col class-name="col" span="24" style="text-align: left;">广告位代码：{{item.placeCode}}</Col>
            </Row>
            <Row v-for="(sub,i) in item.ads" :key="i" class="body">
              <Col class-name="col" span="5">
              <img class="ad-img" :src="sub.src">
              </Col>
              <Col class-name="col" span="4">{{sub.title}}</Col>
              <Col class-name="col" span="2">{{sub.sortIndex}}</Col>
              <Col class-name="col" span="3">
              <Button type="text" @click="statusHandle(sub)">{{sub.status === 1 ? '启用':'禁用'}}</Button>
              </Col>
              <Col class-name="col" span="2">{{sub.updateUser}}</Col>
              <Col class-name="col" span="4">{{sub.updateTime | dateformat('yyyy-MM-dd hh:mm')}}</Col>
              <Col class-name="col" span="4">
              <Button @click="openModel(true,sub)">编辑</Button>
              <Button @click="del(sub)">删除</Button>
              </Col>
            </Row>
          </Row>
        </div>
      </div>
    </Card>
    <Modal v-model="show" :title="isEdit?`编辑广告位`:`添加广告位`" :closable="false" :mask-closable="false">
      <Form :label-width="95" :ref="ref" :model="dataApi" :rules="rules">
        <FormItem label="标题：">
          <Input type="text" v-model="dataApi.title" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="广告位代码：" prop="placeCode">
          <Input type="text" v-model="dataApi.placeCode" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="宽：">
          <Input type="text" v-model="dataApi.width" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="高：">
          <Input type="text" v-model="dataApi.height" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="状态">
          <RadioGroup v-model="dataApi.status">
            <Radio v-for="(item,index) in  statusData" :key="index" :label="item.value">
              <span>{{item.name}}</span>
            </Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="图片：" prop="src">
          <uploadFiles single :showPreview="false" v-model="dataApi.src"></uploadFiles>
        </FormItem>
        <FormItem label="排序：" prop="sortIndex">
          <Input type="text" v-model="dataApi.sortIndex" placeholder="请输入..."></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="close">取消</Button>
        <Button type="primary" @click="handleSubmit" :loading="loading">{{ isEdit ? '编辑' : '添加' }}</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import uploadFiles from '@/components/basics/uploadBtn'
  export default {
    components: {
      uploadFiles
    },
    data() {
      return {
        ref: 'form' + new Date().getTime(),
        loading: false,
        pageApi: {
          placeCode: "",
          title: "",
          status: "",
          updateUser: "",
          startTime: "",
          endTime: ""
        },
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
        list: [],
        dateValue: ["", ""],
        isEdit: false,
        show: false,
        statusData: [{
          name: '启用',
          value: "1"
        }, {
          name: '禁用',
          value: "2"
        }],
        dataApi: {
          title: '',
          src: '',
          placeCode: '',
          sortIndex: '',
          width: '',
          height: '',
          status: '1'
        },
        editItem: {},
        rules: {
          placeCode: [{
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }],
          src: [{
            required: true,
            message: '请上传图片',
            trigger: 'blur'
          }, {
            validator: (rule, value, callback) => {
              if (value != '') {
                callback();
              }
            }
          }],
          sortIndex: [{
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }]
        },
      };
    },
    computed: {
      handleFilter() {
        return {
          placeCode: this.pageApi.placeCode,
          title: this.pageApi.title,
          status: this.pageApi.status,
          updateUser: this.pageApi.updateUser,
          startTime: this.dateValue[0] != '' ? new Date(this.dateValue[0]).getTime() : '',
          endTime: this.dateValue[1] != '' ? new Date(this.dateValue[1]).getTime() : '',
        };
      }
    },
    watch: {
      'handleFilter': {
        handler: _.debounce(function(val, oldVal) {
          // 是否是翻页操作
          if (val.currentPage == oldVal.currentPage)
            this.pageApi.currentPage = 1;
          this.getList(this.handleFilter);
        }, 200),
        deep: true
      }
    },
    methods: {
      getList(params) {
        this.$http.post(this.api.findAdverList, params).then(res => {
          if (res.code === 1000) {
            this.list = res.data;
          }
        });
      },
      //  清除筛选
      resetFilter() {
        this.dateValue = ['', ''];
        this.pageApi = {
          placeCode: "",
          title: "",
          status: "",
          updateUser: "",
          startTime: "",
          endTime: ""
        }
      },
      openModel(isEdit, item) {
        this.isEdit = isEdit;
        if (isEdit = isEdit) {
          this.editItem = item || {};
          this.dataApi = {
            title: item.title,
            src: item.src,
            placeCode: item.placeCode,
            sortIndex: item.sortIndex.toString(),
            width: item.width,
            height: item.height,
            status: item.status.toString()
          }
        } else {
          this.itemApi = {
            title: '',
            src: '',
            placeCode: '',
            sortIndex: '',
            width: '',
            height: '',
            status: '1'
          }
        }
        this.show = true;
      },
      resetData() {
        Object.keys(this.dataApi).forEach(key => {
          this.dataApi[key] = '';
        })
        this.dataApi.status = '1';
        this.$refs[this.ref].resetFields();
      },
      close() {
        this.show = false;
        this.resetData();
      },
      //  编辑、保存
      handleSubmit() {
        this.$refs[this.ref].validate((valid) => {
          if (valid) {
            const apis = this.isEdit ? this.api.updateAdver : this.api.saveAdver;
            let params = this.$clearData(this.dataApi);
            if (this.isEdit) {
              params.id = this.editItem.id;
            }
            this.$http.post(apis, params).then(res => {
              if (res.code === 1000) {
                this.getList(this.handleFilter);
                this.$Message.success(this.isEdit ? '编辑成功' : '保存成功');
                this.show = false;
                this.resetData();
              }
            })
          } else {
            this.$Message.error('表单验证失败')
          }
        })
      },
      //  删除
      del(item) {
        this.$Modal.confirm({
          title: '删除提示！',
          content: '删除后无法撤销，是否继续？',
          onOk: () => {
            let params = {
              id: item.id
            }
            this.$http.post(this.api.delAdver, params).then(res => {
              if (res.code === 1000) {
                this.getList(this.handleFilter);
                this.$Message.success('删除成功')
              } else {
                this.$message.error(res.message)
              }
            })
          }
        })
      },
      //  启用、禁用
      statusHandle(item) {
        this.$Modal.confirm({
          title: item.status === 1 ? '禁用广告位' : '启用广告位',
          content: `是否确定${item.status === 1 ? '禁用':'启用'}广告位？`,
          onOk: () => {
            let params = {
              id: item.id
            }
            this.$http.post(this.api.forbidAdver, params).then(res => {
              if (res.code === 1000) {
                this.getList(this.handleFilter);
                this.$Message.success(`${item.status === 1 ? '禁用':'启用'}成功`)
              } else {
                this.$message.error(res.message)
              }
            })
          }
        })
      }
    },
    created() {
      this.getList(this.handleFilter);
    }
  };
</script>

<style lang='less' scoped>
  .card-contnet {
    position: relative;
    padding-bottom: 40px;
  }
  
  .table-contnet {
    text-align: center;
    border-top: 1px solid #d0d0d0;
    border-left: 1px solid #d0d0d0;
    .head {
      background-color: #ddd;
      line-height: 40px;
    }
    .col {
      padding: 0 5px;
      border-right: 1px solid #d0d0d0;
      border-bottom: 1px solid #d0d0d0;
    }
    .body {
      .col {
        height: 120px;
        line-height: 120px;
        overflow: hidden;
        padding: 10px;
        img {
          max-height: 100px;
        }
      }
    }
    .ad-img {
      max-width: 100%;
    }
  }
</style>