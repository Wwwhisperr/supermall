<!-- home.vue只放主要的逻辑，相对于大管家 -->
<template>
  <div id="home">
    <!-- 导航栏 -->
    <nav-bar class="home-nav">
      <!-- <div slot="left">111</div> -->
      <div slot="center">购物街</div>
      <!-- <div slot="right">111</div> -->
    </nav-bar>
    <!-- 滚动效果覆盖的地方 -->
    <scroll class="content" ref="scroll">
      <!-- 轮播图 -->
      <home-swiper :banners="banners" />
      <!-- 推荐列表 -->
      <recommend-view :recommends="recommends" />
      <!-- 本周流行 -->
      <feature-view />
      <!-- 小导航栏:吸顶效果 -->
      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
      />
      <!-- 商品页 -->
      <good-list :goods="showGoods" />
    </scroll>
    <!-- 回到顶部 组件是不能监听点击的 .native---监听组件根元素的原生事件-->
    <back-top @click.native="backClick"/>
  </div>
</template>

<script>
// 导入分组分类，方便管理代码
// Home子组件
import HomeSwiper from "./childSwpier/HomeSwiper.vue";
import RecommendView from "./childSwpier/RecommendView.vue";
import FeatureView from "./childSwpier/FeatureView.vue";
// 公共组件component
import NavBar from "@/components/common/navbar/NavBar.vue";
import TabControl from "@/components/content/tabControl/TabControl.vue";
import GoodList from "@/components/content/goods/GoodList.vue";
import Scroll from "@/components/common/scroll/Scroll.vue";
import BackTop from "@/components/content/backTop/BackTop.vue";

// 导入方法
import { getHomeMultidate, getHomeGoods } from "@/network/home";

// import BScroll from "better-scroll";

export default {
  name: "Home",
  components: {
    // 这里顺序和import顺序一致
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      // result这个变量被组件永远引用，所以不会被回收
      // result:null
      banners: [],
      recommends: [],
      goods: {
        // 上拉加载更多
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    //生命周期函数，发送网络请求
    // 1、请求多个数据
    // 轮播图数据
    this.getHomeMultidate();
    //首页小导航的三个区块商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
    /**
     * 事件监听相关方法
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    backClick() {
      
      // scrollTo(0,0,500)
      // 拿到这个组件对象
      this.$refs.scroll.scroll.scrollTo(0,0,500)

      console.log(this.$refs.scroll);
    },
    /**
     * 网络请求相关方法
     */
    getHomeMultidate() {
      getHomeMultidate().then((res) => {
        // res需要放进data存着，因为这个函数调用完之后，函数里面定义的变量会被内存回收掉
        // 函数调用 ->压入函数栈（保存函数调用过程中所有变量）
        // 函数调用结束后-弹出函数栈（释放函数所有的变量）
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
        // this.banners=res.data.banners
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      });
    },
  },
  // mounted() {},
};
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
    /* position: relative; */
  }
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}
.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}
/* 奇奇怪怪的bug */
  /* .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  } */
.content {
  height: calc(100%-93px);
  padding-bottom: 49px;
  overflow: hidden;
}
</style>
