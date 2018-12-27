const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');

module.exports = {
  head: {
    title: 'fullstack',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui',
      },
      {
        hid: 'description',
        name: 'description',
        content: '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }],
  },
  css: ['@/assets/styles/app.styl'],
  /**
   * Define the dist directory.
   */
  buildDir: 'dist/client',
  /**
   * Define the source directory.
   */
  srcDir: 'client',
  /**
   * Customize the webpack configuration.
   */
  build: {
    /**
     * Set `typescript` property to true to enable typescript support.
     */
    typescript: true,
    /**
     * Use the `extend` function to customize webpack configuration.
     */
    extend(config, context) {},
    /**
     * `VuetifyLoaderPlugin` will automatically import all the vuetify components
     * you use, where you use them.
     *
     * This will also make code-splitting more effective, as webpack will
     * only load the components required for that chunk to be displayed.
     */
    plugins: [new VuetifyLoaderPlugin()],
    /**
     * The `transpile` property allows dependencies to be transpiled by Babel.
     */
    transpile: [/^vuetify/],
  },
  /**
   * The `plugins` property lets you add vue.js plugins easily to your main application.
   */
  plugins: ['@/plugins/vee-validate', '@/plugins/vuetify'],
  /**
   * The `modules` property lets you add additional Nuxt.js modules
   * which can extend it's core functionality and add endless integrations.
   */
  modules: [
    '@nuxtjs/apollo',
    '@nuxtjs/style-resources',
    'cookie-universal-nuxt',
  ],
  apollo: {
    clientConfigs: {
      default: '@/plugins/vue-apollo',
    },
  },
  styleResources: {
    stylus: ['@/assets/styles/variables.styl', '@/assets/styles/mixins.styl'],
  },
};
