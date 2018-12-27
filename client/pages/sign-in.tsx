import gql from 'graphql-tag';
import Vue, { VNode } from 'vue';
import { VBtn, VCard, VCardActions, VCardText, VTextField } from 'vuetify-tsx';

export default Vue.extend({
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

      const res = await this.$apollo.mutate({
        mutation: gql`
          mutation($emailOrUsername: String!, $password: String!) {
            signIn(
              input: { emailOrUsername: $emailOrUsername, password: $password }
            ) {
              token
              user {
                id
              }
            }
          }
        `,
        variables: {
          emailOrUsername: this.username,
          password: this.password,
        },
      });

      await this.$apolloHelpers.onLogin(res.data.signIn.token);

      console.log('Result', res);
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
            <VBtn block color="primary" type="submit">
              Sign In
            </VBtn>
          </VCardActions>
        </VCard>
      </form>
    );
  },
});
