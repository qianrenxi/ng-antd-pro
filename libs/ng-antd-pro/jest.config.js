module.exports = {
  name: 'ng-antd-pro',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/ng-antd-pro',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
