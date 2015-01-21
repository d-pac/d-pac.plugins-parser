"use strict";

var findup = require( "findup-sync" );
var chalk = require( "chalk" );
var _ = require( "lodash" );
var path = require( "path" );
var debug = require( "debug" )( "d-pac.plugins-parser" );

module.exports = function( opts ){
  opts = _.defaults( {}, opts, {
    cli      : false,
    verbose  : false,
    dir      : process.cwd(),
    manifest : "package.json"
  } );
  var log = ( !opts.cli )
    ? debug
    : console.log;
  log( chalk.cyan( "[D-PAC] searching plugins..." ) );
  opts.verbose && log( chalk.cyan( "Options: " ), JSON.stringify( opts, null, 4 ) );
  var file = findup( opts.manifest, {
    cwd : opts.dir
  } );

  if( file ){
    opts.verbose && log( chalk.green( "Found:" ), file );
    var pkg = require( file );
    log( chalk.cyan( "Parsing", _.keys( pkg.dependencies ).length, "dependencies in:" ), pkg.name );
    var plugins = _.reduce( pkg.dependencies, function( result,
                                                        version,
                                                        name ){
      var pkgPath = path.resolve( path.join( opts.dir, "node_modules", name, "package.json" ) );
      var modulePkg = require( pkgPath );
      opts.verbose && log( chalk.cyan( "Parsed dependency:" ), name );
      var pluginConfig = modulePkg[ "d-pac" ];

      if( pluginConfig ){
        opts.verbose && log( chalk.green( "Plugin(s) identified:" ), _.pluck( pluginConfig, "name" ) );
        return result.concat( pluginConfig );
      }
      return result;
    }, [] );

    if( 0 >= plugins.length ){
      log( chalk.red( "No plugins found, have they been added as a dependency to", pkg.name, "?" ) );
    } else {
      log( chalk.green( "Plugin(s) found:" ), _.pluck( plugins, "name" ) );
    }

    return plugins;
  } else {
    log( chalk.red( "No files matched filename pattern '" + opts.manifest + "'" ) );
  }

  return [];
};
