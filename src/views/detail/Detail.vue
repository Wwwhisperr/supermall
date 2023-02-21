<template>
  <div id="detail">
    <!-- 导航栏 -->
    <!-- @titleClick子组件那里发出什么事件，父组件怎么写就行 -->
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scrollposition="contentScroll"
    >
      <!-- 属性：topImage 传入值：top-images -->
      <!-- 因为html不区分大小写，到时候可能不是给topImage而是topimages传值，而你没有这个属性 -->
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />

      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info :param-info="paramInfo" ref="params" />
      <detail-comment-info :comment-info="commentInfo" ref="comment" />
      <good-list :goods="recommends" ref="recommend" />
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <detail-bottom-bar @addToCart="addToCart" />
    <toast :message="message" :isShow="isShow"/>
  </div>
</template>

<script>
import DetailNavBar from "./childComponents/DetailNavBar.vue";
import DetailSwiper from "./childComponents/DetailSwiper.vue";
import DetailShopInfo from "./childComponents/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComponents/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComponents/DetailParamInfo.vue";
import DetailCommentInfo from "./childComponents/DetailCommentInfo.vue";
import DetailBaseInfo from "./childComponents/DetailBaseInfo.vue";
import DetailBottomBar from "./childComponents/DetailBottomBar.vue";

import Scroll from "@/components/common/scroll/Scroll.vue";
import GoodList from "@/components/content/goods/GoodList.vue";

import { backTopMixin,toastMixin } from "@/common/mixin";
import {mapActions} from 'vuex'

import Toast from '@/components/common/toast/Toast.vue'

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "@/network/detail";

// import {debouce} from '@/common/utils';

export default {
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodList,
    DetailBottomBar,
    Toast,
  },

  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      isShow:false,
      message:'',
    };
  },
  mixins: [backTopMixin,toastMixin],
  created() {
    // 1、获取并保存传入的id（即iid
    this.iid = this.$route.params.id;

    // 2、根据iid请求详情数据(新封装个detail的网络请求，面向这个进行网络请求)
    getDetail(this.iid).then((res) => {
      // console.log(res);
      //1、分离数据，获取数据
      const data = res.result;
      // console.log(data);
      // 2、获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages;
      // 3、获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 4、获取店铺信息
      this.shop = new Shop(data.shopInfo);
      // 5、获取商品详细信息
      this.detailInfo = data.detailInfo;
      // 6、保存参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 7、取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
      // create拿到的数据不一定里面渲染完毕
      // $nextTick是等渲染完后再回调的函数
      this.$nextTick(() => {
        // 根据最新的数据，对应的Dom是已经被渲染出来了
        // 但是图片依然是没有加载完（目前获取到offsetTop不包含其中的图片）
        // offsetTop值不对的时候都是因为图片问题
      });
    });
    // 3、请求推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.list;
    });
    // 对getThemeTopY作防抖操作
    this.getThemeTopY = this.debounce(() => {
      this.themeTopYs.push(0);
      this.themeTopYs.push(-this.$refs.params.$el.offsetTop + 44);
      this.themeTopYs.push(-this.$refs.comment.$el.offsetTop + 44);
      this.themeTopYs.push(-this.$refs.recommend.$el.offsetTop + 44);
      // this.themeTopYs.push(Number.MAX_VALUE);
      // console.log(this.themeTopYs);
    }, 100);
  },

  methods: {
    ...mapActions(['addCart']),
    imageLoad() {
      this.$refs.scroll.refresh();
      // 图片加载完再回调
      this.getThemeTopY();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, this.themeTopYs[index], 100);
    },
    debounce(func, delay) {
      let timer = null;

      return function (...args) {
        if (timer) clearTimeout(timer);

        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },
    contentScroll(position) {
      // 1、判断BackTop是否显示
      this.isShowBackTopFun(position);

      // 1\获取y值
      const positionY = position.y;
      // 2\positionY和主题中的值进行对比
      for (let i = 0; i < this.themeTopYs.length; i++) {
        // for (let i = 0; i < this.themeTopYs.length -1; i++) {
        if (
          this.currentIndex !== i &&
          ((i < this.themeTopYs.length - 1 &&
            positionY <= this.themeTopYs[i] &&
            positionY >= this.themeTopYs[i + 1]) ||
            (i === this.themeTopYs.length - 1 &&
              positionY < this.themeTopYs[i]))
        ) {
          // if ( //空间换时间
          //   this.currentIndex !== i &&
          //   (positionY <= this.themeTopYs[i] &&
          //   positionY >= this.themeTopYs[i + 1])
          // )
          this.currentIndex = i;
          // console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
    },
    addToCart() {
      // 1、获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      console.log(product);
      // 2\将商品加入到购物车
      // this.$store.cartList.push(product)
      // this.$store.commit('addCart',product)//给store的mutations
      // 给store的actions

      // this.$store.dispatch("addCart", product).then(res=>{
      //   console.log(res);
      // })
      this.addCart(product).then(res=>{
        // this.show=true,
        // this.message=res;
        this.show(res,1000)
        // setTimeout(()=>{
        //   this.show=false;
        //   this.message=''
        // },1500)
        // this.$toast.show(res,2000)
      })

      // 3、添加到购物车成功（根据上面dispatch返回的promise判断成功，
      // 即vuex-action返回的Promise-mapActions）
    },
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 10;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 10;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px - 49px);
}
</style>
