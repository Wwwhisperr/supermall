<template>
  <div class="goods">
    <good-list-item v-for="item in goods" :goods-item="item" />
  </div>
</template>

<script>
// 需要遍历item
import GoodListItem from "./GoodListItem.vue";

export default {
  name: "GoodList",
  data() {
    return {};
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    GoodListItem,
  },
  methods: {},
  mounted() {},
};
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 5px;
}

</style>
