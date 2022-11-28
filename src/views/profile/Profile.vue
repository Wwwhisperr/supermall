<template>
  <div>
    <scroll class="content">
      <ul>
    
      </ul>

    </scroll>
  </div>
</template>

<script>
import Scroll from '@/components/common/scroll/Scroll.vue'
export default {
  name: "Profile",
  data() {
    return {};
  },
  components: {
    Scroll,
  },
  methods: {},
  mounted() {}
};
</script>

<style scoped>
  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }</style>
