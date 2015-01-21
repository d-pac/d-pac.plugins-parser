#  [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-url]][daviddm-image]

> Plugin parser module for d-pac platform

## Options

All options are optional, both in the CLI tool and the node module.

* `verbose`  : default=`false`, whether to log verbose output or not
* `dir`      : default=`process.cwd()`, what directory should be used as a starting point
* `manifest` : default=`"package.json"`, which file contains the dependencies declaration

## Command-line tool

## Install

```sh
$ npm install -g d-pac.plugins-parser
```

## Usage

```sh
$ d-pac-plugins <dir> --manifest=<manifest> --verbose
```

## Example

```sh
$ d-pac-plugins ../ --manifest=dependencies.json --verbose
```

#### Output:

## Node module

### Install

```sh
$ npm install -S d-pac.plugins-parser
```

### Usage

```js
var parser = require('d-pac.plugins-parser');

parser();
```

Will search in the `process.cwd()` or nearest ancestor directory for a `package.json`. Once found it will parse its `dependencies` and check them one by one for a `d-pac` entry (in their respective `package.json`) and output any plugin configurations it finds.
See [d-pac.plugin specifications for more information](https://github.com/d-pac/d-pac.docs/blob/master/analysis/plugin%20specification.md)


### Example

```js
var parser = require('d-pac.plugins-parser');

parser({
    verbose : false,
    dir : "../",
    manifest : "dependencies.json"
});
```

#### Output:

## License

MIT © [d-pac](http://www.d-pac.be)


[npm-url]: https://npmjs.org/package/d-pac.plugins-parser
[npm-image]: https://badge.fury.io/js/d-pac.plugins-parser.svg
[travis-url]: https://travis-ci.org/d-pac/d-pac.plugins-parser
[travis-image]: https://travis-ci.org/d-pac/d-pac.plugins-parser.svg?branch=master
[daviddm-url]: https://david-dm.org/d-pac/d-pac.plugins-parser.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/d-pac/d-pac.plugins-parser
