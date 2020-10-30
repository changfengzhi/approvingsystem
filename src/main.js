import Vue from 'vue'
import App from './App.vue'
import router from './router' //引入路由  
import VueRouter from 'vue-router'//使用路由
import ElementUI from 'element-ui'//引入ui
import 'element-ui/lib/theme-chalk/index.css'; //ui样式
import '../dist/static/iconfont.css'
import esri from "esri-loader"
// import LButton from './components/LButton'
// Vue.use(LButton) //全局组件


Vue.use(VueRouter)
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.options={
  url:'https://js.arcgis.com/4.17/',
  css:'https://js.arcgis.com/4.17/esri/themes/light/main.css'
}
Vue.prototype.$esri = esri
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
