<template>
  <div>
    <swiper>
      <swiper-item v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad" />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
// swiper没有index.js的文件
// import Swiper from '@/components/common/swiper/Swiper.vue'
// import SwiperItem from '@/components/common/swiper/SwiperItem.vue'
// swiper有index.js的文件
import { Swiper, SwiperItem } from "@/components/common/swiper";
export default {
  name: "HomeSwiper",
  data() {
    return {
      isLoad: false,
    };
  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    Swiper,
    SwiperItem,
  },
  methods: {
    imageLoad() {//图片经常会影响offsetTop，所以需要图片加载完再获取offsetTop
      if (!this.isLoad) {//让事件只发生一次
        this.$emit("swiperImageLoad");
        this.isLoad = true;
      }
    },
  },
  mounted() {},
};
</script>

<style scoped></style>
