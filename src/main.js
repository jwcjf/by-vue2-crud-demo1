
import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import App from './App';

import Table from './views/table/table';

import 'font-awesome/css/font-awesome.min.css';
 import Mock from './mock/mock';

import '../static/UE/ueditor.config.js'
import '../static/UE/ueditor.all.min.js'
import '../static/UE/lang/zh-cn/zh-cn.js'
import '../static/UE/ueditor.parse.min.js'

 Mock.mockData();
Vue.use(VueRouter);// 安装路由功能
/* eslint-disable no-new */
Vue.use(VueRouter);
Vue.prototype.$http = axios;
Vue.use(ElementUI);



let routes = [
  {
    path: '/',
    component: App,
    children: [
    
      {path: '/table', component: Table, name: '合作伙伴', class: 'fa-table'}
     
    ]
  }
];
let router = new VueRouter({
 
  'linkActiveClass': 'active',
  routes
});
let app = new Vue({
  router
}).$mount('#app');
export default app;
