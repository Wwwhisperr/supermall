<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    // 1、创建better-scroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });
    // 2、监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", (position) => {
        this.$emit("scrollposition", position);
      });
    }
    // 3、监听scroll滚动到底部，上拉加载更多
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        // 传出去给首页做
        console.log("底部");
        this.$emit("pullingUp");
      });
    }
  },
  updated() {
    this.scroll.refresh();
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    getScrollY(){
      return this.scroll ? this.scroll.y : 0
    },
  },
};
</script>

<style scoped></style>
