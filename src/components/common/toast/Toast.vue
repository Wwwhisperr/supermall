<template>
  <div class="toast" v-show="isShow" >
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  props:{
    message:{
      type:String,
      default:''
    },
    isShow:{
      type:Boolean,
      default:false
    }
  },
  // data() { 
  //   return {
  //     message:'',
  //     isShow:true
  //   }
  // },
  // components:{},
  // methods:{
  //   show(message='默认文字',duratuon=1500){
  //     this.isShow=true;
  //     this.message=message

  //     setTimeout(()=>{
  //       this.isShow=false;
  //       this.message=''
  //     },duratuon)
  //   }
  // },
  // mounted() {},
 }
</script>

<style scoped>
.toast{
  position: fixed;
  top: 50%;
  left:50%;
  transform:translate(-50%,-50%);
  padding:8px 10px;
  border-radius: 10%;

  color: #fff;
  background-color: rgba(0, 0, 0,.75);


}
/* toastanimation{
    animation-duration: 13s;
  animation-name: tran;
}
@keyframes tran{
  from{
    background-color: rgba(0, 0, 0,.75);
  }
  to{
    background-color: rgba(255, 255, 255, 0.1);
  }
} */
</style>