<template>
  <div class="detail-swiper">
    <swiper class="swiperr">
      <swiper-item  v-for="item in topImages">
        <img :src="item" alt="" />
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "@/components/common/swiper";

export default {
  name: "DetailSwiper",
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  components: {
    Swiper,
    SwiperItem,
  },
  methods: {},
};
</script>

<style scoped>

.swiperr {
  height: 300px;
  overflow: hidden;
}
</style>
