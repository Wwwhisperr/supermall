import Vue from "vue";
import VueRouter from "vue-router";
// import HomeView from "../views/HomeView.vue";
// import App from './App.vue'
Vue.use(VueRouter);

Vue.config.productionTip=false

// 路由懒加载
const Home=()=>import('@/views/home/Home')
const Category=()=>import('@/views/category/Category')
const Cart=()=>import('@/views/cart/Cart')
const Profile=()=>import('@/views/profile/Profile')
const Detail=()=>import('@/views/detail/Detail')

const routes = [
  {
    path: '/',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/category',
    component:Category
  },
  {
    path:'/cart',
    component:Cart
  },
  {
    path:'/profile',
    component:Profile
  },
  {
    path:'/detail/:id',
    component:Detail
  },
];

const router = new VueRouter({
  mode: "history",
  // base: process.env.BASE_URL,
  routes,
});

export default router;
