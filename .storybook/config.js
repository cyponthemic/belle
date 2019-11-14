// import '~/assets/main.scss'
import '@/assets/css/tailwind.css'
import { configure } from '@storybook/vue';
import Vue from 'vue'
import Vuex from 'vuex'

import List from '../components/test/List.vue'


Vue.use(Vuex)
Vue.component('List', List)

function loadStories() {
  const req = require.context('../components', true, /\.stories\.js$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
