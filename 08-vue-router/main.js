import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
import routes from './routes';
import App from './Router';

const app = new Vue({
    el: '#root',
    router: routes,
    render: h => h(App),
})