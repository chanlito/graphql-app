import { GetUsersQuery } from '@/graphql/queries';
import { GetUsers } from '@/graphql/types';
import { VNode } from 'vue';
import { component } from 'vue-tsx-support';

export default component({
  apollo: {
    users: {
      query: GetUsersQuery,
      prefetch: true,
    },
  },
  data(): Data {
    return {
      users: [],
    };
  },
  render(): VNode {
    return (
      <div>
        <h1>Users Page</h1>
        <ul>
          {this.users.map(u => (
            <li key={u.id}>{u.fullName}</li>
          ))}
        </ul>
      </div>
    );
  },
});

interface Data {
  users: GetUsers.Users[];
}
