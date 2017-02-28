'use strict';
const assert = require('assert');   // Node's assert library
const rewire = require('rewire');

describe('upver', () => {
  let module;

  describe('getPackageData()', () => {
    beforeEach(() => {
      module = require('../src/index');
    });

    it('should return the package data inside package.json ', () => {
      let result = module.getPackageData();

      assert.equal(result.name, 'upver');
      assert.equal(result.main, 'src/index.js');
    });
  });


  describe('getVersionNumber()', () => {
    beforeEach(() => {
      module = rewire('../src/index');
      module.__set__({
        getPackageData: () => ({version: '1.2.3'}),
      });
    });

    it('should return the version number passed as an argument', () => {
      let result = module.getVersionNumber('9.0.0');

      assert.equal(result, '9.0.0');
    });

    it('should return the version number in package.json if the argument is not valid', () => {
      let result = module.getVersionNumber('foo');

      assert.equal(result, '1.2.3');
    });


    it('should throw an error if the version number in package.json and the argument is not valid', () => {
      module.__set__({
        getPackageData: () => ({}),
      });

      assert.throws(() => module.getVersionNumber('foo'), /Error: A version number was not supplied and is not present in package\.json\./);
    });
  });


  describe('getConfigFileName()', () => {
    beforeEach(() => {
      module = rewire('../src/index');
    });

    it('should return the value of the package.json config.upver value', () => {
      module.__set__({
        getPackageData: () => ({config: {upver: 'random-string'}}),
      });

      assert.equal(module.getVersionConfigFileName(), 'random-string');
    });

    it('should throw an error when config.upver does not exist', () => {
      module.__set__({
        getPackageData: () => ({config: {}}),
      });

      assert.throws(() => module.getVersionConfigFileName(), /Reference to upver config file \(specified in package\.json under config\.upver property\) not found\./);
    });
  });


  describe('getConfigFileData()', () => {
    beforeEach(() => {
      module = rewire('../src/index');
    });

    it('should return the data in the config file when the config file is valid', () => {
      let config = module.getConfigFileData('test/fixtures/valid-config.yml');

      assert.equal(config.length, 2);
    });

    it('should throw an error when the config file does not exist', () => {
      assert.throws(() => module.getConfigFileData('test/nonexistent.file'), /Error: ENOENT: no such file or directory/);
    });

    it('should throw an error when the config file is not a valid YAML file', () => {
      assert.throws(() => module.getConfigFileData('test/fixtures/invalid-config.yml'), /YAMLException/);
    });
  });


  describe('updateFiles()', () => {
    beforeEach(() => {
      module = rewire('../src/index');
      module.__set__({
        getPackageData: () => ({name: 'test-upver'}),
      });
    });

    it('should update the files correctly', () => {
      const MOCK_VERSION = '4.7.0';
      const writeChanges = false;
      const configData = module.getConfigFileData('test/fixtures/valid-config.yml');
      const stdout = require('test-console').stdout;

      let output = stdout.inspectSync(() => {
        module.updateFiles(configData, MOCK_VERSION, writeChanges);
      });

      assert.equal(output[0], '[upver]: Latest version of test-upver: 4.7.0\n');
      assert.equal(output[1], '[upver]: Updated version in test/fixtures/a.txt:\n');
      assert.equal(output[2], 'Blah\nFooo\nBar VERSION = 4.7.0;\nCar\n\n');
      assert.equal(output[3], '---------------\n');
      assert.equal(output[4], '[upver]: Updated version in test/fixtures/b.json:\n');
      assert.equal(output[5], '{\n  "foo": "bar",\n  "version": "4.7.0",\n  "bar": "car"\n}\n\n');
      assert.equal(output[6], '---------------\n');
    });
  });
});
