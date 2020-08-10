import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import api from './components/api'

Vue.config.productionTip = false

Vue.prototype.$http = api;
api.defaults.timeout = 10000;

api.interceptors.request.use(
  config => {
    let token = JSON.parse(localStorage.token)
    if (token) {
      config.headers.common["Authorization"] = 'Bearer '+token.access_token;
      console.log(token.access_token)
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => {
    if (response.status === 200 || response.status === 201) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
error => {
    if (error.response.status) {
      switch (error.response.status) {      
        case 401:
          alert("Sessão Expirada");
          router.replace({
            path: "/"
          });
          break;
        case 403:
          router.replace({
            path: "/",
            query: { redirect: router.currentRoute.fullPath }
          });
           break;
        case 404:
          alert('Pagina não existe');
          break;
        case 502:
         setTimeout(() => {
            router.replace({
              path: "/",
              query: {
                redirect: router.currentRoute.fullPath
              }
            });
          }, 1000);
      }
      return Promise.reject(error.response);
    }
  }
);

new Vue({
  vuetify,
  render: h => h(App),
  router
}).$mount('#app')
