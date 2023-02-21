<template>
  <div class="check-button" 
  :class="{check:isChecked}">
    <img src="@/assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name: 'CheckButton',
  data() { 
    return {}
  },
  props:{
    isChecked:{
      type:Boolean,
    }
  },
  components:{},
  methods:{},
  computed:{
  }
 }
</script>

<style scoped>
.check-button{
  background: #fff;
  border-radius: 50%;
  border: 2px solid #aaa;
  padding: 2px;
}
.check{
  background: var(--color-tint);
  border: 2px solid var(--color-tint);
}
</style>