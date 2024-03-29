import Toast from './Toast'
const obj={}

obj.install=function(Vue){
  // console.log('执行了obj的install函数');
  // 1、创建组件构造器
  const toastConstructor=Vue.extend(Toast)
  // 2、new的方式，根据组件构造器，可以创建出来一个组件对象
  const toast =new toastConstructor()
  // 3、将组件对象，手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))
  // 4、toast.$el对应的就是div
  document.body.appendChild(toast.$el)//此时才真正地将这个东西加到我们界面上去
  // vue.prototype.$toast=Toast; 
}

export default obj