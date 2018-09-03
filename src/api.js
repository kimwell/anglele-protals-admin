export const excelBaseUrl = 'http://tbxoss.oss-cn-hangzhou.aliyuncs.com/';

// WebSocket链接
let host = window.location.host;

export let ws = '';
let commHost = ''
export let exportExcel = ''
if (process.env.NODE_ENV == 'development') {
  ws = 'ws://192.168.0.251/websocket';
  commHost = 'http://192.168.0.251:90'
  exportExcel = 'http://192.168.0.164:8080/export.jsp'
} else {
  ws = 'wss://' + host + '/websocket';
  exportExcel = 'http://' + host + ':8080/export.jsp'
}

export const uploadApi = commHost + '/common/fileUpload/images';

// export const exportExcel ='http://'+ host + ':8080/export.jsp'
// export const exportExcel = commHost + '/export.jsp'


/**
 * 登录
 * path: /login/userLogin
 * method: POST
 * params: {
 *      mobile: String
 *      password: String
 * }
 */
export const login = '/login/userLogin';

/**
 * 获取用户信息
 */
export const getUser = '/api/user/findCurrentUser';

/**
 * 地址选择省，市，区
 */
export const findAdress = ''

export const findProvince = '/api/query/findProvince'

export const findCity = '/api/query/findCity'

export const findArea = '/api/query/findArea'

export const findDistrict = '/api/query/findDistrict'

// ****************************系统配置***************************************

/** 
 * 求购报价参数配置
 */
export const findByPage = '/sys/ironTimeConfig/findByPage'

/** 
 * 保存有效时间参数
 */
export const saveConfigTime = '/sys/ironTimeConfig/saveTime'

/**
 * 分页查询数据字典
 * 
 */

export const findDataDictionaryPage = '/sys/dataDictionary/findDataDictionaryPage'

/**
 * 分页查询数据字典
 * 
 */

export const deleteDataDictionary = '/sys/dataDictionary/deleteDataDictionary'


/**
 * 新增更新数据字典
 * 
 */

export const saveUpdateDataDictionary = '/sys/dataDictionary/saveUpdateDataDictionary'



/**
 * 新增更新保证金等级
 * 
 */
export const saveAndUpdateMarginLevel = '/sys/marginLevel/saveAndUpdateMarginLevel'

/**
 * 移除单条保证金等级
 * 
 */
export const removeMarginLevel = '/sys/marginLevel/removeMarginLevel'

/**
 * 分页查询所有保证金等级
 * 
 */
export const findMarginLevelPage = '/sys/marginLevel/findMarginLevelPage'

/**
 * 分页查询全部限购等级
 * 
 */
export const findPurchaseLevelPage = '/sys/purchaseLevel/findPurchaseLevelPage'

/**
 * 保存更新限购等级名称
 * 
 */
export const saveAndUpdatePurchaseLevel = '/sys/purchaseLevel/saveAndUpdatePurchaseLevel'

/**
 * 移除单条限购等级
 * 
 */
export const removePurchaseLevel = '/sys/purchaseLevel/removePurchaseLevel'

/**
 * 查询全部求购等级
 * 
 */
export const findAllPurchaseLevel = '/api/query/findAllPurchaseLevel'

/**
 * 查询全部保证金等级
 * 
 */
export const findAllMarginLevel = '/api/query/findAllMarginLevel'


//-----------------时间开关----------------------------------
// 分页查询时间开关
export const selectStoreTimePage = '/sys/storetime/selectStoreTimePage'

export const updateStoreTime = '/sys/storetime/updateStoreTime'

//  设为无限制                  
export const updateStoreTimeParamById = '/sys/storetime/updateStoreTimeParamById'


/// 更改开关状态                
export const updateStoreTimeStatusById = '/sys/storetime/updateStoreTimeStatusById'

// *********************************权限管理*********************************
/**
 * 查询权限列表
 * path: /sys/auth/role/findAll
 * method: POST
 * params: 
 */
export const getAllRoles = '/sys/auth/role/findAll'

/**
 * 添加角色
 * path: /sys/auth/role/save
 * method: POST
 * params: {
 *      name: 角色名称,
 *      id:  角色编号
 * }
 */
export const addRole = '/sys/auth/role/save'

/**
 * 编辑角色
 * path: /sys/auth/role/update
 * method: POST
 * params: {
 *      name: 角色名称,
 *      id:  角色编号
 * }
 */
export const editRole = '/sys/auth/role/update'

/**
 * 按角色编号查询子角色
 * path: /sys/auth/role/findById
 * method: POST
 * params: {
 *      roleId:   角色编号
 * }
 */
export const getRolesById = '/sys/auth/role/findById'

/**
 * 角色接口查询
 * path: /sys/auth/interface/findRoleInterfaceByid
 * method: POST
 * params: {
 *      roleId:   角色编号
 * }
 */
export const getInterfaceById = '/sys/auth/interface/findRoleInterfaceByid'

/**
 * 角色绑定接口
 * path: /sys/auth/interface/saveRoleInterface
 * method: POST
 * params: {
 *      jsonObject: 包含roleId:角色编号，interfaceGroupList:分组接口列表
 * }
 */
export const roleBlindInterface = '/sys/auth/interface/saveRoleInterface'


// *********************************接口管理*********************************
/**
 * 添加单个接口
 * path: /sys/auth/interface/save
 * method: POST
 * params: {
 *      name:  名称
 *      url:    接口地址
 *      methodType: 接口类型 0,1,2,3,4
 * }
 */
export const addInterface = '/sys/auth/interface/save'

/**
 * 删除单个接口
 * path: /sys/auth/interface/delInterface
 * method: POST
 * params: {
 *      id:  接口id
 * }
 */
export const delInterface = '/sys/auth/interface/delInterface'

/**
 * 获取接口列表
 * path: /sys/auth/interface/findGroupAll
 * method: POST
 * params: null
 */
export const getInterfaceList = '/sys/auth/interface/findGroupAll'

/**
 * 添加、修改接口分组信息
 * path: /sys/auth/group/save
 * method: POST
 * parmas: {
 *      name: 分组名
 *      id:   修改时传入
 * }
 */
export const addInterfaceGroup = '/sys/auth/group/save'

/**
 * 删除接口分组
 * path: 
 * method: POST
 * params: {
 *      groupId : 分组ID
 * }
 */
export const delInterfaceGroup = '/sys/auth/group/delGroup'

/**
 * 接口绑定分组
 * path: /sys/auth/interface/saveGroup
 * method: POST
 * params: {
 *      jsonObject :  分组列表字符串
 * }
 */
export const interfaceBlindGroup = '/sys/auth/interface/saveGroup'



// *********************************应用管理*********************************
/**
 * 添加基础计量单位
 * path: /sys/unit/saveUnit
 * method: POST
 * params: {
 *      type:   
 *      cName: 
 *      eName:
 * }
 */
export const addUnit = '/sys/unit/saveUnit'

/**
 * 更新计量单位，用于修改，删除
 * path: /sys/unit/updateUnit
 * method: POST
 * params{
 *      id:
 *      type:   
 *      cName: 
 *      eName:
 *      status:  
 * }
 */
export const updateUnit = '/sys/unit/updateUnit'

/**
 * 查询基础计量单位列表
 * path: /sys/unit/queryUnitPage
 * method: POST
 * params: {
 *      currentPage,
 *      pageSize
 * }
 */
export const getAllUnits = '/sys/unit/queryUnitPage'

export const G_getAllUnits = '/api/query/queryUnitList'

/**
 * 查询品类计量单位信息
 * path: /sys/ironAndUnit/fingIronAndUnitPage
 * method: POST
 * params: {
 *      currentPage,
 *      pageSize   
 * }
 */
export const getAllIronUnit = '/sys/ironAndUnit/findIronAndUnitPage'

/**
 * 更新计量单位品类信息
 * path: /sys/ironAndUnit/updateIronAndUnit
 * method: POST
 * params: {
 *      id: 
 *      ironId: 
 *      ironName:  
 * }
 */
export const updateIronUnit = '/sys/ironAndUnit/updateIronAndUnit'

// -----------------------------------品类---------------------------------

/**
 * 添加品类信息
 * path: /sys/ironTypes/saveIronTypes
 * method: POST
 * params: {
 *      name:
 *      notice:
 * }
 */
export const addType = '/sys/ironTypes/saveIronTypes'

/**
 * 更新品类信息
 * path: /sys/ironTypes/updateIronTypes
 * method: POST
 * params: {
 *      id:
 *      name:
 *      notice:
 *      status:
 * }
 */
export const updateType = '/sys/ironTypes/updateIronTypes'


/**
 * 查询品类信息
 * path: /sys/ironTypes/findIronTypesPage
 * method: POST
 * params: {
 *      currentPage
 *      pageSize
 * }
 */
export const getTypes = '/sys/ironTypes/findIronTypesPage'

export const G_getTypes = '/api/query/findIronTypes'

// -----------------------------------表面---------------------------------
/**
 * 添加表面信息
 * path: /sys/surface/saveSurface
 * method: POST
 * params: {
 *      name:
 *      notice:
 * }
 */
export const addSurface = '/sys/surface/saveSurface'

/**
 * 更新表面信息
 * path: /sys/surface/updateSurFace
 * method: POST
 * params: {
 *      id:
 *      name:
 *      notice:
 *      status:
 * }
 */
export const updateSurFace = '/sys/surface/updateSurFace'


/**
 * 查询表面信息
 * path: /sys/surface/findSurfacePage
 * method: POST
 * params: {
 *      currentPage
 *      pageSize
 * }
 */
export const getSurFaces = '/sys/surface/findSurfacePage'

export const G_getSurFaces = '/api/query/findSurFace'

// -----------------------------------材质---------------------------------
/**
 * 添加材质信息
 * path: /sys/materials/saveMaterials
 * method: POST
 * params: {
 *      name:
 *      notice:
 * }
 */
export const addMaterials = '/sys/materials/saveMaterials'

/**
 * 更新材质信息
 * path: /sys/materials/updateMaterials
 * method: POST
 * params: {
 *      id:
 *      name:
 *      notice:
 *      status:
 * }
 */
export const updateMaterials = '/sys/materials/updateMaterials'


/**
 * 查询材质信息
 * path: /sys/materials//findMaterialsPage
 * method: POST
 * params: {
 *      currentPage
 *      pageSize
 * }
 */
export const getMaterials = '/sys/materials/findMaterialsPage'

// -----------------------------------产地---------------------------------
/**
 * 添加产地信息
 * path: /sys/proPlaces/saveProPlaces
 * method: POST
 * params: {
 *      name:
 *      notice:
 * }
 */
export const addProPlaces = '/sys/proPlaces/saveProPlaces'

/**
 * 更新产地信息
 * path: /sys/proPlaces/updateProPlaces
 * method: POST
 * params: {
 *      id:
 *      name:
 *      notice:
 *      status:
 * }
 */
export const updateProPlaces = '/sys/proPlaces/updateProPlaces'


/**
 * 查询产地信息
 * path: /sys/proPlaces/findProPlacesPage
 * method: POST
 * params: {
 *      currentPage
 *      pageSize
 * }
 */
export const getProPlaces = '/sys/proPlaces/findProPlacesPage'



// -----------------------------------关联数据---------------------------------
/**
 * 保存关联分组（品类、表面）
 * path: /sys/ironAndSurfaceAndSpecification/saveIronAndSurface
 * method: POST
 * params : {
 *          ironTypeId,ironTypeName,surfaceId,surfaceName
 * }
 */
export const saveIronAndSurface = '/sys/ironAndSurfaceAndSpecification/saveIronAndSurface'

/**
 * 删除分组
 */
export const delIronAndSurface = '/sys/ironAndSurfaceAndSpecification/deleteIronAndSurface'

/**
 * 关联数据分组查询
 */
export const getIronAndSurface = '/api/query/findIronAndSurface'


/**
 * 根据分组查询规格
 * path: /sys/ironAndSurfaceAndSpecification/findIronAndSurface
 * params : { surface,ironType }
 */
export const getGGlist = '/sys/ironAndSurfaceAndSpecification/findIronAndSurface'


/**
 * 保存表面品类规格信息
 * path:/sys/ironAndSurfaceAndSpecification/saveIronAndSurfaceAndSpecification
 * params{ironType,surface,height,width,length}
 */
export const addGG = '/sys/ironAndSurfaceAndSpecification/saveIronAndSurfaceAndSpecification'

/**
 * 删除0,修改1表面品类规格信息
 */
export const delGG = '/sys/ironAndSurfaceAndSpecification/updateIronAndSurfaceAndSpecification'

// -----------------------------------仓库---------------------------------
/**
 * 添加产地信息
 * path: /sys/storeHouse/saveStoreHouse
 * method: POST
 * params: {
 *      name:
 *      notice:
 * }
 */
export const saveStoreHouse = '/sys/storeHouse/saveStoreHouse'

/**
 * 更新擦库信息
 * path: /sys/storeHouse/updateStoreHouse
 * method: POST
 * params: {
 *      id:
 *      name:
 *      notice:
 *      status:
 * }
 */
export const updateStoreHouse = '/sys/storeHouse/updateStoreHouse'

/**
 * 删除仓库信息
 * path: /sys/storeHouse/updateStoreHouse
 * method: POST
 * params: {
 *      id:
 *      name:
 *      notice:
 *      status:
 * }
 */

export const deleteStoreHouse = '/sys/storeHouse/deleteStoreHouse'


/**
 * 查询仓库信息
 * path: /sys/storeHouse/findStoreHousePage
 * method: POST
 * params: {
 *      currentPage
 *      pageSize
 * }
 */
export const getHouse = '/sys/storeHouse/findStoreHousePage'

/**
 * 查询所有仓库信息
 * path: /api/query/findStoreHouse
 * method: POST
 */
export const getStroeHouse = '/api/query/findStoreHouse'



// -----------------------------------优惠信息---------------------------------
export const findProInfoPage = '/sys/proInfoModel/findProInfoPage'
export const saveProInfoModel = '/sys/proInfoModel/saveProInfoModel'
export const updateProInfoModel = '/sys/proInfoModel/updateProInfoModel'
export const deleteProInfoModel = '/sys/proInfoModel/deleteProInfoModel'


// -----------------------------------资源类型管理---------------------------------
//  新增
export const saveQualiticationType = '/sys/qualiticationtype/saveQualiticationType'

//  更新
export const updateQualiticationType = '/sys/qualiticationtype/updateQualiticationType'

//  查询
export const queryQualiticationtypePage = '/sys/qualiticationtype/queryQualiticationtypePage'

//  删除
export const deleteQualiticationType = '/sys/qualiticationtype/deleteQualiticationType'

// *********************************用户管理*********************************
/**
 * 添加、编辑用户
 * path: /sys/auth/user/bindUserRole
 * method: POST
 * params: {
 *      jsonObject: {
 *          id: '',//编辑用
 *          name
 *          password
 *          mobile
 *          realName
 *          roleList: [{
 *              roleId
 *              flag
 *          }]
 *      }//json字符串
 * }
 */
export const createUser = '/sys/auth/user/bindUserRoles'

/**
 * 获取用户列表
 * path: /sys/auth/user/findRoleList
 * method: POST
 * params: {
 *      currentPage,
 *      pageSize 
 * }
 */
export const userList = '/sys/auth/user/findRoleList'

/**
 * 查询用户信息
 * path: /sys/auth/user/findRole
 * method: POST
 * params: {
 *      id: 不传为所有角色
 * }
 */
export const getUserInfo = '/sys/auth/user/findRole'

/**
 * 获取角色列表
 * path: /sys/auth/user/findRole
 * method: POST
 * params: {
 *      id:  不传为所有角色
 * }
 */
export const getRoleList = '/sys/auth/user/findRole'


/*
 * 专员管理查询
 * path:/sys/saleman/findSalemanBind
 */
export const getSalemanBind = '/sys/saleman/findSalemanBind'

/*
 * 超管查询专员信息
 * path:/sys/saleman/findSalemanBind
 */
export const findSalemanInfos = '/sys/saleman/findSalemanInfo'

/*
 * 专员信息统计
 * 
 */

export const salesManData = '/sys/dataStatics/salesManData'



/*
 * 超管查询绑定管理
 * /sys/saleman/findCompangWithSaleman
 */
export const findCompangWithSaleman = '/sys/saleman/findCompangWithSaleman'

/*
 * 超管进行商户绑定
 * /sys/saleman/findCompangWithSaleman
 */
export const updateSalemanInfo = '/sys/saleman/updateSalemanInfo'

/**
 * 获取商家用户列表
 * path: /sys/buserInfo/findBuserInfoPage
 * method: POST
 * params:
 */
export const getBusiness = '/sys/buserInfo/findBuserInfoPage'

/**
 * 查询商家详情
 * path: /sys/buserInfo/findBuserInfoById
 * params: bUserId
 */
export const getBusinessInfo = '/sys/buserInfo/findBuserInfoById'

/**
 * 修改商家信息
 * path: /sys/buserInfo/updateBuserInfo
 */
export const eidtBusiness = '/sys/buserInfo/updateBuserInfo'

/**
 * 超管查询用户经营范围
 * path: /sys/ironBuy/queryBussinessScopeByUserId
 */
export const scopeByUserId = '/sys/businessScope/findBusinessScope'

/**
 * 超管保存用户经营范围
 * path: /sys/ironBuy/saveBussinessScopeByUserId
 */
export const saveScopeByUserId = '/sys/businessScope/saveBusinessScope'


/**
 * 超管分页查询公司子账号列表
 * path: /common/subaccountManagement/findSubaccountManagementPage
 */

export const findSubaccountManagementPage = '/common/subaccountManagement/findSubaccountManagementPage'


/**
 * 更新公司主账号手机号
 * path: /sys/buserInfo/updateMainAccountMobile
 */

export const updateMainAccountMobile = '/sys/buserInfo/updateMainAccountMobile'

/**
 * 超管删除公司子账号列表
 * path: /common/subaccountManagement/deleteSubaccountManagement
 */

export const deleteSubaccountManagement = '/common/subaccountManagement/deleteSubaccountManagement'

/**
 * 超管重置公司子账号密码
 * path: /common/subaccountManagement/resetPassword
 */
export const resetPassword = '/common/subaccountManagement/resetPassword'

/**
 * 超管保存子账号信息
 * path: /common/subaccountManagement/saveSubaccountManagement
 */
export const saveSubaccountManagement = '/common/subaccountManagement/saveSubaccountManagement'


/**
 * 超管更新子账号信息
 * path: /common/subaccountManagement/updateSubaccountType
 */
export const updateSubaccountType = '/common/subaccountManagement/updateSubaccountType'


/**
 * 模糊匹配查询商户信息
 * path: /common/subaccountManagement/findCompanyInfo
 */
export const findCompanyInfo = '/common/subaccountManagement/findCompanyInfo'

/**
 * 根据公司编号查询公司业务员
 * 
 */
export const findSalesmanByCompanyId = '/sys/buserInfo/findSalesmanByCompanyId'


/**
 * 超管分页查询客户信息
 * 
 */
export const findClientManagementPage = '/common/clientManagement/findClientManagementPage'


/**
 * 超管批量更新公司客户业务员
 * 
 */
export const updateClientManagement = '/common/clientManagement/updateClientManagement'


// *********************************广告位管理*********************************
/**
 * 查询所有广告
 * path: /sys/ad/findAll
 * method: POST
 * params: 
 */
export const allAd = '/sys/ad/findAll';

/**
 * 添加广告位分组
 * path: /sys/ad/saveAdGroup
 * method: POST
 * params: {
 *      groupName: String 分组名
 *      adNums: Number  初始广告位个数  
 *      width: Number   初始广告位宽度
 *      height: Number   初始广告位高度
 *      previewImg:  String   效果图
 *      defaultImg:  String   默认背景图    
 * }
 */
export const addAdGroup = '/sys/ad/saveAdGroup';

/**
 * 删除广告分组
 * path: /sys/ad/delAdGroup
 * method: POST
 * params: {
 *      groupId: 分组ID
 * }
 */
export const delAdGroup = '/sys/ad/delAdGroup';

/**
 * 获取单个广告分组信息
 * path: /sys/ad/findAdByGroupId
 * method: POST
 * params: {
 *      groupId: 分组ID
 * }
 */
export const getAdGroup = '/sys/ad/findAdByGroupId';


/**
 * 更新广告位分组
 * path: /sys/ad/updateAdGroup
 * method: POST
 * params: jsonObject String
 */
export const updateGroup = '/sys/ad/updateAdGroup';
/**
 * 编辑广告分组信息
 * method: POST
 * params: {
 *      id:  groupId     分组id
 *      groupName: String 分组名
 *      adNums: Number  初始广告位个数  
 *      width: Number   初始广告位宽度
 *      height: Number   初始广告位高度
 *      previewImg:  String   效果图
 *      defaultImg:  String   默认背景图    
 * }
 */
export const editGroup = '/sys/ad/editAdGroup';

/**
 * 单个广告位数据获取
 * path:/sys/ad/findAdByGroupId
 * method:POST
 * params:groupId
 */
export const adList = '/sys/ad/findAdByGroupId';

/**
 * 删除单个广告位
 * path: /sys/ad/delAdInfo
 * method: POST
 * params: {
 *      id: 广告位id
 *      groupId:  分组ID 
 * }
 */
export const removeAd = '/sys/ad/delAdInfo';

/**
 * 添加单个广告位
 * path: /sys/ad/saveAd
 * method: POST
 * params: {
 *      groupId: 分组ID
 * }
 */
export const addAd = '/sys/ad/saveAd';



// -----------------------------------新的数据统计---------------------------------
//平台数据分析

export const jd_platFormData = '/sys/dataStatics/platFormData'

export const jd_buyData = '/sys/dataStatics/buyData'

export const jd_sellData = '/sys/dataStatics/sellData'

export const jd_locationData = '/sys/dataStatics/locationData'

export const jd_typeData = '/sys/dataStatics/typeData'


//订单统计数据
export const totalOrderData = '/sys/orderData/totalOrderData'

//  订单买家前十(买家大客户分析)
export const orderBuyerTopTen = '/sys/orderData/orderBuyerTopTen'

//  订单卖家前十(卖家大客户分析)
export const orderSellerTopTen = '/sys/orderData/orderSellerTopTen'

//  订单四维分析(货品数据分析)
export const fourDAnalysis = '/sys/orderData/fourDAnalysis'

//  订单地区前五(地区分析)
export const orderAreaTopFive = '/sys/orderData/orderAreaTopFive'


// -----------------------------------新闻管理---------------------------------
/**
 * 查询所有文章类型
 */
export const findAllArticleType = '/api/query/findAllArticleType'

/**
 * 分页查询文章类型
 */
export const findArticleTypePage = '/sys/articleType/findArticleTypePage'

/**
 * 删除文章类型
 */
export const removeArticleType = '/sys/articleType/removeArticleType'

/**
 * 保存更新文章类型
 */
export const saveAndUpadteArticleType = '/sys/articleType/saveAndUpadteArticleType'

/**
 * 新闻保存修改
 */
export const saveAndUpdateIndustryNew = '/sys/indutryNew/saveAndUpdateIndustryNew'

/**
 * 新闻超管查询列表
 */
export const findArticleList = '/sys/indutryNew/findArticleList'

/**
 * 新闻超管删除
 */
export const articleRemove = '/sys/indutryNew/articleRemove'

/**
 * 新闻超管查询详细信息
 */
export const findArticleInfo = '/sys/indutryNew/findArticleInfo'

/**
 * 新闻超管取消置顶
 */
export const articleZero = '/sys/indutryNew/articleZero'

/**
 * 新闻超管置顶
 */
export const articleRise = '/sys/indutryNew/articleRise'


// -----------------------------------品类，材质，表面，产地查询---------------------------------
export const queryPlaces = '/api/query/findProPlaces'

export const queryIronTypes = '/api/query/findIronTypes'

export const queryMaterials = '/api/query/findMaterials'

export const querySurFaces = '/api/query/findSurFace'


// -----------------------------------调度中心---------------------------------------------------

/**
 * 超管查看待处理处理的订单
 * path /sys/ironSellSelect/findUnDealIronBuy
 * params {
 *  currentPage
 *  pageSize
 * }
 **/

export const findUnDealIronBuy = '/sys/ironSellSelect/findUnDealIronBuy'

/**
 * 超管选择无货
 * path /sys/ironSellSelect/ironNotHave
 **/

export const ironNotHave = '/sys/ironSellSelect/ironNotHave'

/**
 * 超管查询报价信息
 * path /sys/ironSellSelect/findSellBuser
 **/

export const findSellBuser = '/sys/ironSellSelect/findSellBuser'

/**
 * 超管查询当前求购尚未报价的商户信息
 * path /sys/ironSellSelect/findNotSellBuser
 **/

export const findNotSellBuser = '/sys/ironSellSelect/findNotSellBuser'


/**
 * 超管选择推荐报价
 * path /sys/ironSellSelect/saveIronSellSelect
 **/

export const saveIronSellSelect = '/sys/ironSellSelect/saveIronSellSelect'

/**
 * 超管一键推荐报价
 * path /sys/ironSellSelect/saveIronSellSelect/auto
 **/

export const saveIronSellSelectAuto = '/sys/ironSellSelect/saveIronSellSelect/auto'

/**
 * 超管查询已处理订单
 * path /sys/ironSellSelect/findDealIronBuy
 **/

export const findDealIronBuy = '/sys/ironSellSelect/findDealIronBuy'


/**
 * 查询已处理的订单报价
 * path /sys/ironSellSelect/findDealSell
 **/

export const findDealSell = '/sys/ironSellSelect/findDealSell'


// ---------------------------------现货求购----------------------------------------

/**
 * 超管查看待处理处理的订单
 * path /sys/ironBuy/queryIronBuy
 * 
 **/
export const queryIronBuy = '/sys/ironBuy/queryIronBuy'



/**
 * 查询求购信息详情
 * path /sys/ironBuy/queryIronBuyInfo
 * 
 **/
export const queryIronBuyInfo = '/sys/ironBuy/queryIronBuyInfo'

/**
 * 超管删除求购
 * path /sys/ironBuy/deleteIronBuyInfo
 * 
 **/

export const deleteIronBuyInfo = '/sys/ironBuy/deleteIronBuyInfo'


// -----------------------------------商家审核管理---------------------------------
/** 
 * 超管审核未通过商户列表
 */
export const findNotBuserInfoPage = '/sys/buserInfo/findNotBuserInfoPage'

/** 
 * 超管更新商户审核状态
 */
export const updateBuserInfoById = '/sys/buserInfo/updateBuserInfoById'


/** 
 * 根据用户编号来查询商户信息
 */
export const getBuserInfoByUserId = '/sys/buserInfo/getBuserInfoByUserId'

/** 
 * 查询专员
 */
export const findSalemanInfo = '/api/bregist/findSalemanInfo'


export const buserData = '/sys/dataStatics/buserData'
/**
 * 查询关联规格
 * @params surface ironType
 */
export const G_queryGG = '/api/query/findIronAndSurfaceAndSpecificationlist'

/**
 * 查询关联宽长
 * @params surface ironType
 */
export const G_queryWL = '/api/query/findIronAndSurfaceAndSpecificationHeightAndLength'

/**
 * 查询品类计量单位信息
 * @params ironId
 */
export const findUnitById = '/api/query/findIronAndUnitByIronId'

/**
 * 超管查询商户信息（超管代法求购）
 */
export const isShop = '/sys/ironBuySubstitute/findUserByLogin'

/**
 * 发布多条
 */
export const superPublishAll = '/sys/ironBuySubstitute/ironBuySaveList'

export const publishHistory = '/sys/ironBuySubstitute/ironBuyHistory'



// -----------------------------------订单管理---------------------------------

export const findDateDictionary = '/api/query/findDateDictionary'
/** 
 * 
 * 超管查询订单 
 */

export const findStoreOrder = '/sys/storeOrder/findStoreOrder'

/** 
 * 
 * 超管取消订单 
 */
export const cancelStoreOrder = '/sys/storeOrder/cancelStoreOrder'

/** 
 * 超管作废订单 
 */
export const invalidStoreOrder = '/sys/storeOrder/invalidStoreOrder'

/** 
 * 
 * 超管删除订单
 */
export const deleteStoreOrder = '/sys/storeOrder/deleteStoreOrder'

/** 
 * 
 * 超管查询订单详情
 */
export const findStoreOrderInfo = '/sys/storeOrder/findStoreOrderInfo'
