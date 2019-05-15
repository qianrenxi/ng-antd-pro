module.exports = {
  name: 'pro-site',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/pro-site/',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
