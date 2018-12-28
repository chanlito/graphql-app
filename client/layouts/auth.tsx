import { component } from 'vue-tsx-support';
import { VApp, VContainer, VContent, VFlex, VLayout } from 'vuetify-tsx';

export default component({
  name: 'Auth',
  render() {
    return (
      <VApp>
        <VContent>
          <VContainer fill-height>
            <VLayout align-center justify-center>
              <VFlex xs12 sm8 md6 lg4>
                <nuxt />
              </VFlex>
            </VLayout>
          </VContainer>
        </VContent>
      </VApp>
    );
  },
});
