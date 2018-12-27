declare module 'nuxt' {
  import { ApolloClient } from 'apollo-client';
  import { NuxtCookies } from 'cookie-universal-nuxt';
  import { Route } from 'vue-router';
  import {
    VueApolloOptions,
    ErrorHandler,
    WatchLoading,
  } from 'vue-apollo/types/options';
  import { Store } from 'vuex';

  export class Builder {
    constructor(nuxt: Nuxt);
    build(): void;
  }

  export class Nuxt {
    constructor(config?: NuxtConfig);
    render(): void;
  }

  export interface NuxtApp {
    apolloProvider: {
      defaultClient: ApolloClient<any>;
      defaultOptions?: VueApolloOptions<any>;
      clients?: { [key: string]: ApolloClient<any> };
      watchLoading?: WatchLoading<any>;
      errorHandler?: ErrorHandler<any>;
      prefetchQueries: any[];
    };
    $cookies: NuxtCookies;
  }

  export interface NuxtConfig {
    dev: boolean;
    [key: string]: any;
  }

  export interface NuxtContext<S = any> {
    app: NuxtApp;
    /** @deprecated use process.client instead. */
    isClient: boolean;
    /** @deprecated use process.server instead. */
    isServer: boolean;
    isStatic: boolean;
    isDev: boolean;
    isHMR: boolean;
    route: Route;
    req: any;
    res: any;
    store: Store<S>;
    env: any;
    params: any;
    query: any;
    redirect(path: string): void;
    error(params: { statusCode: number; message: string }): void;
    nuxtState: any;
    beforeNuxtRender(fn: Function): any;
  }
}
