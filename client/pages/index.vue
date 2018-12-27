<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-card color="primary">
        <v-card-text>
          <div>{{ message }}</div>
          <div>Connected: {{ connected }}</div>
        </v-card-text>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import gql from 'graphql-tag';
import Vue from 'vue';

export default Vue.extend({
  apollo: {
    connected: {
      query: gql`
        query {
          connected @client
        }
      `,
    },
  },
  async asyncData({ app }) {
    await app.apolloProvider.defaultClient.mutate({
      mutation: gql`
        mutation($value: String!) {
          setConnected(value: $value) @client
        }
      `,
      variables: {
        value: '1',
      },
    });
    app.$cookies.set('connected', '1');
  },
  data() {
    return { message: 'Hello World!!' as string };
  },
});
</script>
