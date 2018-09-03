<template>
    <tr class="pb-item">
        <td style="width:60px">
            <checkBox class="check" v-model="isCheck"></checkBox>
        </td>
        <td style="width:86px">
            <span v-if="isSave">{{ location[location.length-1].name }}</span>
            <cityPicker v-show="!isSave" size="small" v-model="location" labelSimple placeholder="货源地"></cityPicker>
        </td>
        <td style="width:108px">
            <span v-if="isSave">{{ ironType.name }}</span>
            <ajaxPicker v-show="!isSave" v-model="ironType" size="small" :apiUrl="api.queryIronTypes" placeholder="品名"></ajaxPicker>
        </td>
        <td style="width:82px">
            <span v-if="isSave">{{ material.name }}</span>
            <ajaxPicker v-show="!isSave" v-model="material" size="small" :apiUrl="api.queryMaterials" placeholder="材质"></ajaxPicker>
        </td>
        <td style="width:86px">
            <span v-if="isSave">{{ surface.name }}</span>
            <ajaxPicker v-show="!isSave" v-model="surface" size="small" :apiUrl="api.querySurFaces" placeholder="表面"></ajaxPicker>
        </td>
        <td style="width:140px">
            <span v-if="isSave">{{ spec.specifications != '' ?  spec.specifications : `${spec.height}*${spec.width}*${spec.length}`}}</span>
            <specInput v-show="!isSave" :ironType="ironType" size="small" :surface="surface" placeholder="规格" v-model="spec"></specInput>
        </td>
        <td style="width:96px">
            <span v-if="isSave">{{ tolerance | emptyHlod }}</span>
            <Input v-show="!isSave" v-model="tolerance" size="small" :disable="toleranceDisable" placeholder="公差" />
        </td>
        <td style="width:118px">
            <span v-if="isSave">{{ numerical.weight | emptyHlod }}{{ units.weightUnitCName }}/{{ numerical.number | emptyHlod }}{{ units.numUnitCName }}</span>
            <unitInput v-show="!isSave" v-model="numerical" :unit="[units.weightUnitCName,units.numUnitCName]"></unitInput>
        </td>
        <td style="width:86px">
            <Tooltip  v-if="isSave" :content="proPlacesStrs" placement="top">
                <span>{{ proPlacesStrs | intercept(3) }}</span>
            </Tooltip>
            <ajaxPicker v-show="!isSave" multi position="right" size="small" v-model="proPlaces" :apiUrl="api.queryPlaces" placeholder="产地"></ajaxPicker>
        </td>
        <td style="width:110px">
            <span class="rk" v-if="isSave">{{ remark }}</span>
            <Input v-show="!isSave" v-model="remark" size="small" placeholder="备注" />
        </td>
        <td class="actions" style="width:60px">
            <i v-if="isSave" class="iconfont icon-more" @click.self="acShow = true"></i>
            <template v-else>
                <i class="iconfont icon-queding" @click="save"></i>
                <i class="iconfont icon-quxiao" @click="del"></i>
            </template>
            
            <div class="action-btns" v-if="acShow" v-clickoutside="ousideClick">
                <a class="btn" @click="copy">
                    <i class="iconfont icon-copy"></i>复制
                </a>
                <a class="btn" @click="edit">
                    <i class="iconfont icon-edit"></i>编辑
                </a>
                <a class="btn" @click="del">
                    <i class="iconfont icon-del"></i>删除
                </a>
            </div>
        </td>
    </tr>
</template>

<script>
    import checkBox from '@/components/basics/checkBox.vue'
    import cityPicker from '@/components/basics/cityPicker.vue'
    import ajaxPicker from '@/components/basics/ajaxPicker_v2.vue'
    import Input from '@/components/basics/Input.vue'
    import specInput from '@/components/business/specInput.vue'
    import unitInput from '@/components/business/unitInput.vue'
    export default {
        components: {
            checkBox,
            cityPicker,
            ajaxPicker,
            Input,
            specInput,
            unitInput
        },
        props: {
            checked: {
                type: Boolean,
                default: false
            },
            saved: {
                type: Boolean,
                default: false
            },
            index: {
                type: Number,
                default: 0
            },
            data: {
                tyep: Object,
                default: function() {
                    return {}
                }
            }
        },
        data() {
            return {
                acShow: false,
                isCheck: false,
                isSave: false,
                location: [],
                ironType: {
                    id: '',
                    name: ''
                },
                proPlaces: [],
                surface: {
                    id: '',
                    name: ''
                },
                material: {
                    id: '',
                    name: ''
                },
                spec: {
                    specifications: '',
                    length: '',
                    height: '',
                    width: ''
                },
                tolerance: '',
                remark: '',
                numerical: {
                    number: '',
                    weight: ''
                },
                units: {}
            }
        },
        watch: {
            ironType(val) {
                if (val.id != '')
                    this.getUnit();
            },
            isCheck(val) {
                this.$emit('on-check', {
                    index: this.index,
                    check: val
                });
            },
            checked(val) {
                this.isCheck = val
            },
            isSave(val){
                this.$emit('on-jastsave', {
                    index: this.index,
                    save: val
                });
            },
            saved(val) {
                this.isSave = val
            }
        },
        computed: {
            // 是否禁止公差
            toleranceDisable() {
                return this.ironType.name ? !this.isBJ : true
            },
            // 是否为板卷
            isBJ() {
                return this.ironType.name == '不锈钢板' || this.ironType.name == '不锈钢卷'
            },
            // 组合参数
            clectionParams() {
                let excludeArr = this.isBJ ? ['remark', 'specifications'] : ['remark', 'width', 'height', 'length', 'tolerance'],
                    params = {
                        ironTypeId: this.ironType.id,
                        ironTypeName: this.ironType.name,
                        materialId: this.material.id,
                        materialName: this.material.id,
                        surfaceId: this.surface.id,
                        surfaceName: this.surface.name,
                        proPlacesId: JSON.stringify(this.proPlaces),
                        locationId: this.location.length > 0 ? this.location[this.location.length - 1].id : '',
                        locationName: this.location.length > 0 ? this.location[this.location.length - 1].name : '',
                        remark: this.remark,
                        length: this.spec.length,
                        width: this.spec.width,
                        height: this.spec.height,
                        specifications: this.spec.specifications,
                        tolerance: this.tolerance,
                        numbers: this.numbers,
                        weights: this.weights,
                        timeLimit: '86400000',
                        numberUnitId: this.units.numUnitId,
                        numberUnit: this.units.numUnitCName,
                        weightUnitId: this.units.weightUnitId,
                        weightUnit: this.units.weightUnitCName,
                        appFlag: '1'
                    };
                excludeArr.forEach(key => {
                    delete params[key];
                })
    
                return params
            },
            //产地名
            proPlacesStrs() {
                let strs = '';
                let len = this.proPlaces.length - 1;
                this.proPlaces.forEach((item, i) => {
                    strs += i < len ? item.name + ',' : item.name
                })
                return strs
            }
        },
        methods: {
            // 实时获取对应单位
            getUnit() {
                this.$http.post(this.api.findUnitById, {
                    ironId: this.ironType.id
                }).then(res => {
                    if (res.code === 1000)
                        this.units = res.data
                })
            },
            // 检查参数是否有误
            checkOk() {
                let ok = true;
                let pr = this.$clearData(this.clectionParams);
                ['remark', 'numbers', 'weights','proPlacesId'].forEach(key => {
                    delete pr[key]
                })
                for (let key of Object.keys(pr)) {
                    if (pr[key] == '' || pr[key] == undefined) {
                        ok = false;
                        return
                    }
                }
                let unitOk = this.clectionParams.numbers != '' || this.clectionParams.weights != '';
                return ok && unitOk && this.proPlaces.length > 0
            },
            // 整理抛出参数
            paramsClecot() {
                return {
                    isCheck: this.isCheck,
                    isSave: this.isSave,
                    index: this.index,
                    data: {
                        ironTypeId: this.ironType.id,
                        ironTypeName: this.ironType.name,
                        materialId: this.material.id,
                        materialName: this.material.name,
                        surfaceId: this.surface.id,
                        surfaceName: this.surface.name,
                        proPlacesId: this.proPlaces,
                        locationId: this.location.length > 0 ? this.location[this.location.length - 1].id : '',
                        locationName: this.location.length > 0 ? this.location[this.location.length - 1].name : '',
                        remark: this.remark,
                        length: this.spec.length,
                        width: this.spec.width,
                        height: this.spec.height,
                        specifications: this.spec.specifications,
                        tolerance: this.tolerance,
                        numbers: this.numerical.number,
                        weights: this.numerical.weight,
                        timeLimit: '86400000',
                        numberUnitId: this.units.numUnitId,
                        numberUnit: this.units.numUnitCName,
                        weightUnitId: this.units.weightUnitId,
                        weightUnit: this.units.weightUnitCName,
                        appFlag: '1'
                    }
                }
            },
            // 同步传入数据
            asyncIn() {
                this.isCheck = this.checked;
                this.isSave = this.saved;
                this.tolerance = this.data.tolerance;
                this.remark = this.data.remark;
                this.numerical = {
                    number: this.data.numbers,
                    weight: this.data.weights
                };
                this.units = {
                    weightUnitCName: this.data.weightUnitId,
                    weightUnitId: this.data.weightUnit,
                    numUnitCName: this.data.numberUnit,
                    numUnitId: this.data.numberUnitId
                };
                this.location = this.data.locationId != '' ? [{
                    id: this.data.locationId,
                    name: this.data.locationName
                }] : [];
                this.ironType = {
                    id: this.data.ironTypeId,
                    name: this.data.ironTypeName
                };
                this.proPlaces = this.data.proPlacesId;
                this.surface = {
                    id: this.data.surfaceId,
                    name: this.data.surfaceName
                };
                this.material = {
                    id: this.data.materialId,
                    name: this.data.materialName
                };
                this.spec = {
                    height: this.data.height,
                    width: this.data.width,
                    length: this.data.length,
                    specifications: this.data.specifications
                }
            },
            // 保存
            save() {
                if (this.checkOk()) {
                    this.isSave = true;
                    this.$emit('on-save', this.paramsClecot());
                } else {
                    console.log('参数不完整!')
                }
            },
            ousideClick() {
                this.acShow = false;
            },
            copy() {
                this.$emit('on-copy', this.index);
                this.acShow = false;
            },
            del() {
                this.$emit('on-del', this.index);
            },
            edit() {
                this.isSave = false;
                this.acShow = false;
            }
        },
        created() {
            this.asyncIn();
        }
    }
</script>


<style lang="less">
    @import url('../../../assets/less/base.less');
    .pb-item td {
        height: 60px;
        line-height: 60px;
        padding-right: 10px;
        border-bottom: 1px solid @border_line;
        .rk {
            width: 110px;
            padding-right: 10px;
            display: inline-block;
            vertical-align: middle;
            .ellipsis;
        }
        &.actions {
            position: relative;
            text-align: center;
            .iconfont {
                cursor: pointer;
                &:hover {
                    color: @dark_blue;
                }
            }
            .icon-queding{
                color: @blue;
                font-size: 14px;
            }
            .icon-quxiao{
                color: @dark_red;
                font-size: 14px;
                &:hover{
                    color: @dark_red;
                }
            }
            .action-btns {
                position: absolute;
                width: 106px;
                height: 120px;
                right: 0;
                top: 40px;
                background-color: #fff;
                .borderRadius(6px);
                .box-shadow(0 1px 6px rgba(0, 0, 0, 0.2));
                z-index: 999;
                font-size: 12px;
                .btn {
                    display: block;
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    color: @light_gray;
                    &:hover {
                        color: @blue;
                        background-color: @men_blue;
                    }
                    .iconfont {
                        font-size: 18px;
                        margin-right: 5px;
                        vertical-align: sub;
                    }
                }
            }
        }
    }
</style>

