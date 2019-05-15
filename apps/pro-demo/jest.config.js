module.exports = {
  name: 'pro-demo',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/pro-demo/',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
