import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './plugins/element.js'
import VueI18n from 'vue-i18n';
import { messages } from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';
import axios from 'axios'
import global from './Global'
import store from './store'
Vue.prototype.$http = axios
axios.defaults.withCredentials =true
axios.defaults.baseURL='/api'
Vue.config.productionTip = false;
Vue.prototype.global = global;
Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: 'zh',
    messages
});

//异步请求前在header里加入sessionKey
axios.interceptors.request.use(
    config => {
      if(config.url==='/admin/login'||config.url==='/admin/login'){  //如果是登录和注册操作，则不需要携带header里面的sessionKey
      }else{
        if (localStorage.getItem('sessionKey')) {
          config.headers.sessionKey = localStorage.getItem('sessionKey');
        }
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    });
  //异步请求后，判断sessionKey是否过期
  axios.interceptors.response.use(
    response =>{
      if(response.data.code===401){
        localStorage.clear()
        return router.replace('/login');
      }
      return response;
    },
    error => {
      if(error.response){
        switch (error.response.status) {
          case 401:
            localStorage.removeItem('sessionKey');
            localStorage.removeItem('userName');
            this.$router.push('/');
        }
      }
    }
  )
  //异步请求前判断请求的连接是否需要sessionKey
  router.beforeEach((to, from, next) => {
    if (to.path === '/') {
      next();
    } else {
      let sessionKey = localStorage.getItem('sessionKey');
      console.log("我是浏览器本地缓存的sessionKey: "+sessionKey);
      if (sessionKey === 'null' || sessionKey === '') {
        next('/');
      } else {
        next();
      }
    }
  });

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title}`;
    const role = localStorage.getItem('sessionKey');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
});

new Vue({
    router,
    i18n,
    store,
    render: h => h(App)
}).$mount('#app');
