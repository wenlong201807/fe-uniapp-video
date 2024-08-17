import Vue from 'vue';
import uView from 'uview-ui';
Vue.use(uView);

// 如此配置即可
// uni.$u.config.unit = 'rpx';
// 调用setConfig方法，方法内部会进行对象属性深度合并，可以放心嵌套配置
// 需要在Vue.use(uView)之后执行
uni.$u.setConfig({
  // 修改$u.config对象的属性
  config: {
    // 修改默认单位为rpx，相当于执行 uni.$u.config.unit = 'rpx'
    unit: 'rpx',
  },
  // 修改$u.props对象的属性
  props: {
    // 修改radio组件的size参数的默认值，相当于执行 uni.$u.props.radio.size = 30
    radio: {
      size: 15,
    },
    // 其他组件属性配置
    // ......
  },
});

// console.log(999, uni.$u.config.v); 2.0.37

import App from './App';

import $H from './pages/common/request.js';

Vue.prototype.$H = $H;

import store from './store/index.js';
Vue.prototype.$store = store;

Vue.prototype.authJump = (options) => {
  if (!store.state.token) {
    uni.showToast({
      title: '请先登录',
      icon: 'none',
    });
    return uni.navigateTo({
      url: '/pages/login/login',
    });
  }
  uni.navigateTo(options);
};

Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
  store,
  ...App,
});
app.$mount();
