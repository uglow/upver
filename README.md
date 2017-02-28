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

<!--[RM_LICENSE]-->
## License

This software is licensed under the MIT Licence. See [LICENSE](LICENSE).

<!--[]-->

