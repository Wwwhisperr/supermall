import Vue from "vue";
import Vuex from "vuex";
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
// 1\安装插件
Vue.use(Vuex);
// 2、创建store对象
export default new Vuex.Store({
  state: {
    cartList: [],
  },
  getters,
   // mutations唯一的目的就是修改state中状态
    // mutations中的每个方法尽可能完成的事件比较单一，一个方法做一件事
  mutations,
  // 复杂逻辑或者异步操作放进actions
  actions,
  modules: {},
});
