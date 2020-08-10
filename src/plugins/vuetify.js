import Vue from 'vue';
import Vuetify from 'vuetify';
import VuetifyDialogPromise from "vuetify-dialog-promise";
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify);

Vue.use( VuetifyDialogPromise, {
  locale : "fi",
  snackbarX : "left",
  snackbarY : "bottom"
} );

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#1697F6',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      },
    },
  },
  icons: {
    iconfont: 'md', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
  },
});
