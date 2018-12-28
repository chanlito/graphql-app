import { component } from 'vue-tsx-support';
import { VContainer } from 'vuetify-tsx';

export default component({
  name: 'Index',
  middleware: ['auth'],
  render() {
    return <VContainer>Home!!!</VContainer>;
  },
});
