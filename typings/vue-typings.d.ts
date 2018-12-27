import { ApolloClient } from 'apollo-client';
import { NuxtCookies } from 'cookie-universal-nuxt';
import { NuxtContext } from 'nuxt';
import { ErrorBag, FieldFlagsBag } from 'vee-validate';
import Vue from 'vue';
import { VueApolloComponentOption } from 'vue-apollo/types/options';
import { VuetifyObject } from 'vuetify';

declare module 'vue/types/vue' {
  interface Vue {
    /**
     * Vue & Nuxt Apollo typings.
     */
    $apolloHelpers: {
      onLogin(
        token: string,
        apolloClient?: ApolloClient<any>,
        tokenExpires?: number,
      ): Promise<void>;
      onLogout(apolloClient?: ApolloClient<any>): Promise<void>;
      getToken(tokenName?: string): string;
    };
    /**
     * Cookie Universal typings.
     */
    $cookies: NuxtCookies;
    /**
     * Vee-validate typings.
     */
    errors: ErrorBag;
    fields: FieldFlagsBag;
    /**
     * Vuetify typings.
     */
    $vuetify: VuetifyObject;
  }

  interface VueConstructor {}
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    asyncData?: (ctx: NuxtContext) => Promise<any>;
    fetch?: (ctx: NuxtContext) => Promise<any>;
    layout?: string;
    middleware?: string | string[];
  }
}
