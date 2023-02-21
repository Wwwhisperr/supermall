import { ADD_COUNTER, ADD_TO_CART } from "./mutation-types";

export default {
  // 数量+1
  //这样数量+1可以跟踪,项目比较大的时候可以调试
  [ADD_COUNTER](state, payload) {
    payload.count++;
  },
  [ADD_TO_CART](state, payload) {
    state.cartList.push(payload);
    // payload.checked=false
  },
};
