<template>
  <form @submit.prevent="submit">
    <v-card>
      <v-card-text>
        <v-text-field
          v-model="username"
          v-validate="'required'"
          box
          label="Username"
          name="username"
          :error-messages="errors.collect('username')"
        />
        <v-text-field
          v-model="password"
          v-validate="'required'"
          box
          label="Password"
          name="password"
          type="password"
          :error-messages="errors.collect('password')"
        />
      </v-card-text>
      <v-card-actions class="px-3 pt-0 pb-3">
        <v-btn block color="primary" type="submit">
          Sign In
        </v-btn>
      </v-card-actions>
    </v-card>
  </form>
</template>

<script lang="ts">
import Vue from 'vue';
import gql from 'graphql-tag';

export default Vue.extend({
  layout: 'auth',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async submit() {
      if (!(await this.$validator.validateAll())) return;
      console.log('Submiting... Sign In');

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
});
</script>
