
// import type { CodegenConfig } from '@graphql-codegen/cli';

const config = {
  overwrite: true,
  schema: "./graphql/schema.graphql",
  generates: {
    "./src/generated/graphql.ts": {
      config: {
        useIndexSignature: true
      },
      plugins: ["typescript", "typescript-resolvers", "typescript-mongodb"]
    }
  }
};

// export default config;
module.exports = config;
