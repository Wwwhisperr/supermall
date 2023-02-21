
import { ADD_COUNTER, ADD_TO_CART } from "./mutation-types";
export default {
  // addCart({state,commit}//对象的解构, payload)
  addCart(context, payload) {
    // 1、查找之前数组中是否有该商品
    // 如果find函数找到了（为true），就会将item返回作为oldProduct的值
    // find里的item是数组里的每一项

    // let oldProduct =state.cartList.find(function(item){
    //   return item.iid===payload.iid
    // })
    return new Promise((resolve,reject)=>{
      let oldProduct = context.state.cartList.find(
        (item) => item.iid === payload.iid
      );
      // 2\判断oldProduct
      if (oldProduct) {
        //找到了有值就是true，找不到就是null
        // oldProduct.count += 1;
        context.commit(ADD_COUNTER, oldProduct);
        resolve('当前商品数量+1')
      } else {
        payload.count = 1;
        payload.checked=false
        // state.cartList.push(payload);
        context.commit(ADD_TO_CART, payload);
        resolve('添加新的商品')
      }
    })
  },
};
