const common = [
  '--require-module ts-node/register' // Load TypeScript module
];

const api = [
  ...common,
  'tests/api/features/**/*.feature',
  '--require tests/api/features/step_definitions/*.steps.ts'
].join(' ');

module.exports = {
  api,
};
