import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import FastClick from 'fastclick'
// import VueLazyload from 'vue-lazyload'
// import toast from '@/components/common/toast'

Vue.config.productionTip = false;

// 事件总线，把vue实例给$bus
Vue.prototype.$bus=new Vue()

// 结局移动端浏览器300ms的延迟
FastClick.attach(document.body)

// 懒加载vue-lazyload
// Vue.use(VueLazyload,{
//   loading:require('./assets/img/common/placeholder.png')
// })

//安装toast插件
// Vue.use(toast)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
