import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
/**
 * 创建 SSR 应用实例（uni-app VUE3 约定入口）。
 * @returns {{ app: import('vue').App }} 返回挂载好 App 组件的应用实例
 */
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif