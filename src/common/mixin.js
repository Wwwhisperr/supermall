import {BACKTOP_DISTANCE}from "@/common/const"
import BackTop from "@/components/content/backTop/BackTop.vue";
import toast from '@/components/common/toast/Toast.vue'
// 回到顶部
export const backTopMixin={
  components:{
    BackTop,
  },
  data(){
    return{
      isShowBackTop:false
    }
  },
  methods:{
    backClick() {
      // scrollTo(0,0,500)
      // 拿到这个组件对象
      // this.$refs.scroll.scroll.scrollTo(0,0,500)
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    isShowBackTopFun(position){
      this.isShowBackTop = position.y < BACKTOP_DISTANCE;
    }
    
  }
}
// 吐司
export const toastMixin={
  components:{
    toast,
  },
  data(){
    return{
      message:'',
      isShow:false
    }
  },
  methods:{
    show(message,duratuon){
      this.isShow=true;
      this.message=message

      setTimeout(()=>{
        this.isShow=false;
        this.message=''
      },duratuon)
    }
    
  }
}