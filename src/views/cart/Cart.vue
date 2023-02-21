<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list />
    <!-- 底部汇总 -->
    <cart-bottom-bar @calcClick="calcClick"/>
    <toast :message="message" :isShow="isShow"/>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar.vue'
import CartList from './childComps/CartList.vue'
import CartBottomBar from './childComps/CartBottomBar.vue'

import {toastMixin } from "@/common/mixin";

import {mapGetters} from 'vuex'

export default {
  name: "Cart",
  mixins:[toastMixin],
  data() {
    return {};
  },
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  },
  computed:{
    ...mapGetters(['cartLength'])
  },
  methods: {
    calcClick(){
      this.show('请选择购买的商品',1500)
    }
  },

};
</script>

<style scoped>
.cart{
  height: 100vh;
}
.nav-bar{
  background: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
</style>
