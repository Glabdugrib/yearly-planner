import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

// IMPORT DayJs

import Dayjs from 'vue-dayjs';

Vue.use(Dayjs, {
   
   lang: 'en',
   filters: {
      ago: 'ago',
   },

   directives: {
         countdown: 'countdown',
   }
});