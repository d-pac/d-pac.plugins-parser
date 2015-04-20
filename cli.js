#!/usr/bin/env node
"use strict";
var meow = require( "meow" );
var parser = require( "./lib/pluginsParser" );

var cli = meow( {
  help : [
    "Usage",
    "  d-pac-plugins <directory> --manifest=<file>",
    "",
    "Example (1)",
    "  $ d-pac-plugins",
    "Example (2)",
    "  $ d-pac-plugins ./foo",
    "Example (3)",
    "  $ d-pac-plugins --manifest=dependencies.json"
  ].join( "\n" )
} );

parser( {
  manifest : cli.flags.manifest,
  dir      : cli.input[ 0 ],
  verbose  : cli.flags.verbose,
  cli      : true
} );
