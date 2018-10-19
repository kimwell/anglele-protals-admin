
// WebSocket链接
let host = window.location.host;

export let ws = '';
let commHost = ''
export let exportExcel = ''
if (process.env.NODE_ENV == 'development') {
  ws = 'ws://192.168.0.251/websocket';
  commHost = 'http://192.168.0.182:8080'
} else {
  ws = 'wss://' + host + '/websocket';
  exportExcel = 'http://' + host + ':8080/export.jsp'
}

export const uploadApi = commHost + '/api/file/upload';

/**
 * 登录
 * path: /login/userLogin
 * method: POST
 * params: {
 *      mobile: String
 *      password: String
 * }
 */
export const login = '/login';

/**
 * 获取用户信息
 */
export const getUser = '/api/user/findCurrentUser';


// -----------------------------------新闻管理---------------------------------

/**
 *  分页查询所有文章类型
 */
export const articleCategoryPage = '/sys/articleCategory/page'

/**
 *  查询所有文章类型
 */
export const articleCategoryList = '/sys/articleCategory/list'
/**
 * 删除所有文章类型
 */
export const deleteArticleInfoById = '/sys/articleCategory/deleteArticleInfoById'
/**
 * 保存或编辑文章分类信息
 */
export const saveArticleInfo = '/sys/articleCategory/saveArticleInfo'

/**
 * 文章列表分页
 */
export const articlePage = '/sys/article/page'

/**
 * 文章单个查询
 */
export const articlefindOne = '/sys/article/findOne'
/**
 * 文章保存
 */
export const articleSave = '/sys/article/save'

/**
 * 文章顶置
 */
export const articletoTop = '/sys/article/toTop'


/**
 * 删除文章分类信息
 */
export const changeStatus = '/sys/article/changeStatus'

// -----------------------------------广告位管理---------------------------------
/**
 * 广告位分页列表
 */
export const findAdverList = '/sys/adv/findAdverList'
/**
 * 广告位保存
 */
export const saveAdver = '/sys/adv/saveAdver'

/**
 * 广告位编辑
 */
export const updateAdver = '/sys/adv/updateAdver'

/**
 * 广告位删除
 */
export const delAdver = '/sys/adv/delAdver'


/**
 * 广告位启用禁用
 */
export const forbidAdver = '/sys/adv/forbidAdver'