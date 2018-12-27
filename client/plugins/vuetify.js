import Vue from 'vue';
import Vuetify, { colors, directives } from 'vuetify/lib';

/** @type {import('vuetify').VuetifyUseOptions} */
const options = {
  directives,
  theme: {
    primary: colors.blue.base,
  },
};

Vue.use(Vuetify, options);
