#!/usr/bin/env node
"use strict";
var meow = require( "meow" );
var dPacpluginParser = require( "./" );

var cli = meow( {
  help : [
    "Usage",
    "  d-pacplugin-parser <input>",
    "",
    "Example",
    "  d-pacplugin-parser Unicorn"
  ].join( "\n" )
} );

dPacpluginParser( cli.input[ 0 ] );
