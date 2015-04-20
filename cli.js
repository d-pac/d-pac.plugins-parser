#!/usr/bin/env node
"use strict";
var meow = require( "meow" );
var _ = require( "lodash" );
var parser = require( "./lib/pluginsParser" );

var cli = meow( {
  help : [
    "Usage",
    "  d-pac-plugins [<directory>] [--manifest=<file>] [--framework=<semver>] [--verbose] [--version]",
    "",
    "Example (1)",
    "  $ d-pac-plugins",
    "Example (2)",
    "  $ d-pac-plugins ./foo",
    "Example (3)",
    "  $ d-pac-plugins --manifest=dependencies.json"
  ].join( "\n" )
}, {
  alias : {
    "v" : "verbose",
    "m" : "manifest",
    "f" : "framework",
    "d" : "dir"
  }
} );

var opts = _.defaults( {
  cli : true,
  dir : cli.input[ 0 ]
}, cli.flags );

parser(opts);
