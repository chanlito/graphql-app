<template>
  <v-container fill-height>
    <v-layout
      align-center
      justify-center>
      <v-flex
        xs12
        sm10
        md8
        lg6>
        <h1 class="display-1 font-weight-bold text-xs-center mb-5">Create your account</h1>
        <v-card>
          <form @submit.prevent="submit">
            <v-card-text>
              <v-text-field
                v-model.trim="username"
                v-validate="'required|alpha_num'"
                box
                label="Username"
                name="username"
                :error-messages="errors.collect('username')" />
              <v-text-field
                v-model="password"
                v-validate="'required'"
                box
                label="Password"
                name="password"
                type="password"
                :error-messages="errors.collect('password')" />
            </v-card-text>
            <v-card-actions class="px-3 pt-0 pb-3">
              <v-btn
                block
                color="primary"
                type="submit">
                Submit
              </v-btn>
            </v-card-actions>
          </form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  layout: 'blank',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    submit() {
      console.log('Submit...', { ...this.$data });
    },
  },
});
</script>
