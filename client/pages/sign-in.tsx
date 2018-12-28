import { SignInMutation } from '@/graphql/mutations';
import { SignIn } from '@/graphql/types';
import Vue, { VNode } from 'vue';
import { component } from 'vue-tsx-support';
import { VBtn, VCard, VCardActions, VCardText, VTextField } from 'vuetify-tsx';

export default component({
  name: 'SignIn',
  layout: 'auth',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    updateUsername(username: string) {
      this.username = username;
    },
    updatePassword(password: string) {
      this.password = password;
    },
    async submit(e: Event) {
      e.preventDefault();

      if (!(await this.$validator.validateAll())) {
        return;
      }

      const {
        data: {
          signIn: { token },
        },
      } = await this.$apollo.mutate<SignIn.Mutation>({
        mutation: SignInMutation,
        variables: {
          emailOrUsername: this.username,
          password: this.password,
        } as SignIn.Variables,
      });

      await this.$apolloHelpers.onLogin(token);

      this.$router.push('/');
    },
  },
  render(): VNode {
    return (
      <form onSubmit={this.submit}>
        <VCard>
          <VCardText>
            <VTextField
              box
              label="Username"
              name="username"
              errorMessages={this.errors.collect('username')}
              value={this.username}
              onInput={this.updateUsername}
              v-validate={{ required: true }}
            />
            <VTextField
              box
              label="Password"
              name="password"
              type="password"
              errorMessages={this.errors.collect('password')}
              value={this.password}
              onInput={this.updatePassword}
              v-validate={{ required: true }}
            />
          </VCardText>
          <VCardActions class="px-3 pt-0 pb-3">
            <VBtn
              loading={this.$apollo.loading}
              block
              color="primary"
              type="submit"
            >
              Sign In
            </VBtn>
          </VCardActions>
        </VCard>
      </form>
    );
  },
});
