import 'reflect-metadata';

import createHttpServer from './lib/core/server';

const { PORT = '4000' } = process.env;

(async function main() {
  const server = await createHttpServer();

  server.listen(PORT, () =>
    console.log(`🚀 Server ready at http://localhost:${PORT}`),
  );
})().catch(err => {
  console.error(err);
  process.exit(1);
});
