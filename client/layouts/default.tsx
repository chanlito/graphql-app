import { component } from 'vue-tsx-support';
import { VApp, VContent } from 'vuetify-tsx';

export default component({
  name: 'Default',
  render() {
    return (
      <VApp>
        <VContent>
          <nuxt />
        </VContent>
      </VApp>
    );
  },
});
