<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        class="check-button"
        :isChecked="isAllChecked"
        @click.native="allChecked"
      />
      <span>全选</span>
    </div>

    <div class="price">合计：{{ totalPrice }}</div>
    <div class="calculate" @click="calcClick">去计算({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton.vue";
import { mapGetters } from "vuex";
export default {
  name: "CartBottomBar",
  data() {
    return {
      isAllChecked: false,
    };
  },
  components: {
    CheckButton,
  },
  updated(){
    this.isAllChecked=!this.cartList.some((Array)=>{
      return Array.checked==false
    })
  },
  methods: {
    allChecked() {
      this.isAllChecked = !this.isAllChecked;
      for (let i=0; i < this.cartList.length; i++) {
        this.cartList[i].checked = this.isAllChecked;
      }
    },
    calcClick(){
      if(this.checkLength==0){
        this.$emit('calcClick')
      }
    }
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.cartList.filter((item) => item.checked).length;
    },
    // isAllChecked(){
    //   return !this.cartList.find(item=>!item.checked)
    // }
  },
};
</script>

<style scoped>
.bottom-bar {
  position: relative;
  display: flex;

  height: 40px;
  line-height: 40px;

  background: #eee;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 80px;
}
.check-button {
  width: 21px;
  height: 21px;
  line-height: 21px;
  margin: 0 5px;
}
.price {
  flex: 1;
}
.calculate {
  width: 100px;
  background: red;
  color: #fff;
  text-align: center;
}
</style>
