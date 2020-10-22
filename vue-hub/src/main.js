import Vue from 'vue'
import router from '@/config/router'
import store from '@/config/store'


import App from './App.vue'
import babelPolyfill from 'babel-polyfill'
import babelPluginTransformRuntime from 'babel-plugin-transform-runtime'

import {message, Modal} from "ant-design-vue";
Vue.config.productionTip = false;
Vue.prototype.$message = message;
Vue.prototype.$info = Modal.info;
Vue.prototype.$success = Modal.success;
Vue.prototype.$error = Modal.error;
Vue.prototype.$warning = Modal.warning;


new Vue({
  router,
  store,
  babelPolyfill,
  babelPluginTransformRuntime,
  ...App,
}).$mount('#app');
