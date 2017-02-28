<!--[RM_HEADING]-->
# upver

<!--[]-->
> Updates the version number inside a list of files with a supplied version number.

This module can be used with [corp-semantic-release](https://github.com/leonardoanalista/corp-semantic-release) to 
update the version number in a list of files when the package's version number is changed. See [Usage](#usage)


<!--[RM_BADGES]-->
[![NPM Version](https://img.shields.io/npm/v/upver.svg?style=flat-square)](http://npm.im/upver)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Coverage Status](https://coveralls.io/repos/github/uglow/upver/badge.svg?branch=master)](https://coveralls.io/github/uglow/upver?branch=master)
[![Dependencies status](https://david-dm.org/uglow/upver/status.svg?theme=shields.io)](https://david-dm.org/uglow/upver#info=dependencies)
[![Dev-dependencies status](https://david-dm.org/uglow/upver/dev-status.svg?theme=shields.io)](https://david-dm.org/uglow/upver#info=devDependencies)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)


<!--[]-->

<!--[RM_INSTALL]-->
## Install

1. `npm install upver`
2. Create a YAML configuration file with this format (note the use of `<@VERSION@>` to act as the new version placeholder):
  ```yaml
  - file: path/to/file/relative/to/project/root.yml
    search: Regex search for, e.g.: '"version": (".+")'
    replacement: The tet to replace the search string. E.g. '"version": "<@VERSION@>"'
  - file: ...
    search: ...
    replacement: ...
  ```
  
3. Configure `package.json` to point to the location of the above configuration file:
  ```
    "config": {
      "upver": "path/to/upver/config.file.yml"
    }
  ```

<!--[]-->

## Usage

This module gets the version number as an argument to the module, or from `package.json`.
 
There are two ways you would normally use `upver`:

<details>
<summary>Option 1 - Use with an NPM hook</summary>
You can use NPM's built-in `(pre|post)version` [script-hook](https://docs.npmjs.com/cli/version) to run code before/just-after/after the version in `package.json` has been changed.

In the following example, `upver` does *NOT* receive the version as an argument but queries `package.json` to get the bumped version.
```json

"scripts": {
  "version": "upver"
}

```
</details>


<details>
<summary>Option 2 - Use with corp-semantic-release</summary>
`corp-semantic-release` provides a `--pre-commit <NPM script>` option. `upver` is passed the version 
number as an argument to the script.

```json

"scripts": {
  "corp-release": "corp-semantic-release --pre-commit updateFiles",
  "updateFiles": "upver"
}

```
</details>



<!--[RM_CONTRIBUTING]-->
## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).


<!--[]-->

<!--[RM_NEXT_STEPS]-->
## *Next Steps to Setup your Project*

    Remove this section once you are comfortable updating your project.

- [ ] Update [package.json](package.json) with a nice description, then run `yo confit --skip-install --skip-run` and see the README.md file is updated
- [ ] Add a new **dependency** to your project:
  - For a **source-code** dependency:
    1. `npm i {nodeModule} --save`
  - For a **development** dependency:
    1. `npm i {nodeModule} --save-dev`
  - For a **test** dependency:
    1. `npm i {nodeModule} --save`
- [ ] Complete the installation of the **semantic release** tool:
  1. Make sure you have:
    - a GitHub login
    - an NPM login
    - a TravisCI login (though you can still proceed if you use a different CI tool)
  1. Run `semantic-release-cli setup` to complete the installation
- [ ] Install code coverage:
  1. Make sure you have:
    - a TravisCI login (though you can still proceed if you use a different CI tool)
    - a [Coveralls](https://coveralls.io) account
  1. Push your code to GitHub.
  1. Login to [Coveralls](https://coveralls.io/).
  1. Press Add Repo. You may need to Sync your GitHub repos to see your new repo in the list.
  1. Select the repo and you will see a "Set Up Coveralls" page. Note the `repo_token` value.
  1. Login to [Travis CI](https://travis-ci.org/).
  1. Edit the settings for this repo (More Settings > Settings).
  1. In the Environment Variables section, create a new envrionment variable called `COVERALLS_REPO_TOKEN` and set its value to the *repo_token* value shown on the "Set Up Coveralls" page, and press "Add".
  1. Push another commit to GitHub and you should get a coverage report now!
- [ ] Run `npm test` to execute the tests and see the test coverage
- [ ] Run `git cz` to commit changes with a conventional commit message


<!--[]-->

<!--[RM_LICENSE]-->
## License

This software is licensed under the MIT Licence. See [LICENSE](LICENSE).

<!--[]-->

