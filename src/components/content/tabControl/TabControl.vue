<template>
  <div class="tab-control">
    <!-- 只有文字不一样的时候没必要用插槽，插入同样的标签 -->
    <div v-for="(item,index) in titles" 
    class="tab-control-item" 
    :class="{active:index===currentIndex}"
    @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  data() { 
    return {
      currentIndex: 0
    }
  },
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{},
  methods:{
    itemClick(index){
      this.currentIndex=index
      this.$emit('tabClick',index)
    }
  },
  mounted() {},
 }
</script>

<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    font-size: 15px;
    background-color: #fff;
    
  }
  .tab-control-item {
    flex: 1;
    height: 40px;
    line-height: 40px;
  }
  .tab-control-item span{
    padding: 5px;
  }
  .active{
    color: var(--color-high-text);
    
  }
  .active span{
    border-bottom: 3px solid var(--color-tint);
  }
</style>