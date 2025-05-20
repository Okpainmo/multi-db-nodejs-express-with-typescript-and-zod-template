const commitTypes = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'init',
        'config',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'bulk',
        'delete',
        'assets',
        'progress'
      ]
    ]
  }
};

export default commitTypes;
