<!-- home.vue只放主要的逻辑，相对于大管家 -->
<template>
  <div id="home">
    <!-- 导航栏 -->
    <nav-bar class="home-nav">
      <!-- <div slot="left">111</div> -->
      <div slot="center">购物街</div>
      <!-- <div slot="right">111</div> -->
    </nav-bar>
    <!-- 为了吸顶效果不被better-scroll影响 -->
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    />
    <!-- 滚动效果覆盖的地方 -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scrollposition="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <!-- 轮播图 -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <!-- 推荐列表 -->
      <recommend-view :recommends="recommends" />
      <!-- 本周流行 -->
      <feature-view />
      <!-- 小导航栏:吸顶效果 -->
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      />
      <!-- 商品列表 -->
      <good-list :goods="showGoods" />
    </scroll>
    <!-- 回到顶部 组件是不能监听点击的 .native---监听组件根元素的原生事件-->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
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
// import BackTop from "@/components/content/backTop/BackTop.vue";//混入取代

// 导入方法
import { getHomeMultidate, getHomeGoods } from "@/network/home";
import { backTopMixin } from "@/common/mixin";
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
    // BackTop,//混入取代
  },
  mixins: [backTopMixin],
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
      // isShowBackTop: true,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      itemImgListener: null,
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
    //2、请求商品数据，首页小导航的三个区块商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  activated() {
    console.log("activated", this.saveY);
    this.$refs.scroll.scrollTo(0, this.saveY);
    this.$refs.scroll.refresh(); //刷新一下避免奇怪的bug
  },
  deactivated() {
    // 1、保存Y值
    this.saveY = this.$refs.scroll.getScrollY();
    console.log("deactivated", this.saveY);
    // 2、取消全局事件的监听
    // this.$bus.$off('itemImgLoad',this.itemImgListener)
  },
  methods: {
    /**
     * 事件监听相关方法
     */
    // 防抖函数（需要防抖的函数，等待时间）
    debounce(func, delay) {
      let timer = null;

      return function (...args) {
        if (timer) clearTimeout(timer);

        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },
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
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // backClick() { //混入取代
    //   // scrollTo(0,0,500)
    //   // 拿到这个组件对象
    //   // this.$refs.scroll.scroll.scrollTo(0,0,500)
    //   this.$refs.scroll.scrollTo(0, 0, 500);
    // },
    contentScroll(position) {
      // console.log(position.y);
      // 1、判断BackTop是否显示
      this.isShowBackTopFun(position)

      // 2、决定tabControl是否吸顶（position：fixed）
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      console.log("加载更多");
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.scroll.refresh();
    },
    swiperImageLoad() {
      // 2、获取tabControl的offsetTop
      // 所有组件都有一个属性$el -->用于获取组件中的元素
      // 要等图片加载完再拿offsetTop值才会正常，否则没有图片撑起来这个值会很小
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
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

        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    },
  },
  mounted() {
    // 图片加载完成的事件监听
    const refresh = this.debounce(this.$refs.scroll.refresh, 500);
    // 对监听事件进行保存
    this.itemImgListener = () => {
      refresh();
      // this.$refs.scroll.refresh();
    };
    // 1、监听goodsitem种图片加载完成
    this.$bus.$on("itemImageLoad", this.itemImgListener);

    // 2、获取tabControl的offsetTop
    // 所有组件都有一个属性$el -->用于获取组件中的元素
    // 要等图片加载完再拿offsetTop值才会正常，否则没有图片撑起来这个值会很小
    // this.$refs.TabControl.$el.offsetTop
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* ↓在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9; */
}
/* .tab-control { */
/* position: sticky; 完成上拉加载更多后这个属性不起作用*/
/* top: 44px;
  z-index: 9; */
/* } */
/* 奇奇怪怪的bug */
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
/* .content {
  height: calc(100%-93px);
  padding-bottom: 49px;
  overflow: hidden;
} */
.tab-control {
  position: relative;
  z-index: 9;
}
/* .fixed {
  position: fixed;
  left:0;
  right: 0;
  top:44px;
} */
</style>
