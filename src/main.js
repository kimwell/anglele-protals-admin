import Vue from 'vue'
import App from './App'
import router from './router'
import * as api from './api'
import iView from 'iview'
import '../static/css/reset.css'
import '../static/css/iview.css'
import '../static/css/animate.css'
import axios from './http'
import store from './store/store'
import * as filters from '@/utils/filters' //过滤器
import clickoutside from './directives/clickoutside'
import tools from '@/utils/tools' //全局方法
import _ from 'lodash'
import loadingIcon from './components/basics/loadingIcon.vue'


Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
Vue.directive('clickoutside', clickoutside);

Vue.use(tools);

Vue.use(iView)

Vue.component('loading-icon', loadingIcon);
Vue.prototype.$clearData = (data) => {
    return JSON.parse(JSON.stringify(data))
}
Vue.prototype.api = api; //所有接口列表挂载
Vue.prototype.$http = axios;
Vue.config.productionTip = false
Vue.config.debug = false;
// Vue.directive('clickoutside', clickoutside)

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})