#!/usr/bin/env node
'use strict';

// The packages that use 'let' instead of 'const' are stubbed in the unit tests using rewire()
let fs = require('fs');
const appRoot = process.cwd();
const path = require('path');
const readYaml = require('read-yaml');
let execSync = require('child_process').execSync;

const verRegEx = /^\d+\.\d+\.\d+.*$/;
const REPLACE_TOKEN = '<@VERSION@>';

module.exports = {
  getPackageData,
  getVersionNumber,
  getVersionConfigFileName,
  getConfigFileData,
  updateFiles,
};


let pkgCache;

function getPackageData() {
  if (!pkgCache) {
    pkgCache = require(`${appRoot}/package.json`);   // Find the root package
  }
  return pkgCache;
}


function getVersionNumber(version) {
  let versions = [version, getPackageData().version].filter((verNum) => verRegEx.test(verNum));

  if (versions.length === 0) {
    throw new Error('A version number was not supplied and is not present in package.json.');
  }

  return versions[0];
}


function getVersionConfigFileName() {
  let pkg = getPackageData();
  if (!pkg.config || !pkg.config.upver) {
    throw new Error('Reference to upver config file (specified in package.json under config.upver property) not found. ');
  }

  return pkg.config.upver;
}


function getConfigFileData(fileName) {
  return readYaml.sync(fileName);
}


function updateFiles(configData, version, writeChanges) {
  console.log(`[upver]: Latest version of ${getPackageData().name}: ${version}`);

  // Patch the files
  configData.forEach((config) => {
    let fileName = path.join(appRoot, config.file);
    let text = fs.readFileSync(fileName, 'utf8');
    let regEx = new RegExp(config.search, 'gm');

    text = text.replace(regEx, config.replacement.replace(REPLACE_TOKEN, version));

    if (writeChanges) {
      fs.writeFileSync(fileName, text, 'utf8');
      execSync(`git add ${config.file}`);
      console.log(`[upver]: Updated version in ${config.file}`);
    } else {
      console.info(`[upver]: Updated version in ${config.file}:`);
      console.info(text);
      console.info('---------------');
    }
  });
}


// If we're not in a test mode, execute the command
if (process.env.NODE_ENV !== 'test') {
  let version = getVersionNumber(process.argv[2]);
  let configData = getConfigFileData(getVersionConfigFileName());

  updateFiles(configData, version, true);
}
