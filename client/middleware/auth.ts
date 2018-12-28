import { NuxtContext } from 'nuxt';

export default ({ app, redirect }: NuxtContext) => {
  const token = app.$cookies.get('access-token');
  if (!token) {
    redirect('/sign-in');
  }
};
