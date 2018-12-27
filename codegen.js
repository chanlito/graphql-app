const { generate } = require('graphql-code-generator');
const { resolve } = require('path');

(async function main() {
  const generatedFiles = await generate(
    {
      schema: './server/app/app.schema.ts',
      require: [
        resolve('.', 'codegen-require.js'),
        resolve('.', 'codegen-tspaths.js'),
      ],
      generates: {
        [process.cwd() + '/server/types/generated-models.ts']: {
          plugins: [
            'typescript-common',
            'typescript-server',
            'typescript-resolvers',
          ],
        },
      },
      overwrite: true,
    },
    // true,
  );
  console.log({ generatedFiles });
})();
