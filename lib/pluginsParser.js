"use strict";

var findup = require( "findup-sync" );
var _ = require( "lodash" );
var path = require( "path" );
var chalk = require( 'chalk' );
var verifyPluginConfig = require( "./verifyPluginConfig" );
var log = require( 'debug-logger' )( 'd-pac.plugins-parser' );

module.exports = function( opts ){
  opts = _.defaults( {}, opts, {
    cli: false,
    verbose: false,
    dir: process.cwd(),
    manifest: "package.json"
  } );
  log.info( "Searching plugins..." );
  log.debug( "Options: ", opts );
  var file = findup( opts.manifest, {
    cwd: opts.dir
  } );

  if( file ){
    log.debug( "Found:", file );
    var pkg = require( file );
    log.info( "Parsing", _.keys( pkg.dependencies ).length, "dependencies in:", pkg.name );
    var plugins = _.reduce( pkg.dependencies, function( result,
                                                        version,
                                                        name ){
      var pkgPath = path.resolve( path.join( opts.dir, "node_modules", name, "package.json" ) );
      var modulePkg = require( pkgPath );
      log.debug( "Parsed dependency:", name );
      var pluginConfigs = modulePkg[ "d-pac" ];

      if( pluginConfigs ){
        if( !_.isArray( pluginConfigs ) ){
          pluginConfigs = [ pluginConfigs ];
        }
        pluginConfigs = _.reduce( pluginConfigs, function( memo,
                                                           pluginConfig ){
          if( verifyPluginConfig( pluginConfig, pkg ) ){
            log.debug( "Compatible plugin found:", pluginConfig.name );
            memo.push( pluginConfig );
          }
          return memo;
        }, [] );
        result = result.concat( pluginConfigs );
      }
      return result;
    }, [] );

    if( 0 >= plugins.length ){
      log.warn( chalk.yellow("No plugins found, have they been added as a dependency to", pkg.name, "?") );
    } else {
      log.info( "Plugin(s) found:", _.pluck( plugins, "name" ) );
    }

    return plugins;
  } else {
    log.error( chalk.red( "No files matched filename pattern '" + opts.manifest + "'" ) );
  }

  return [];
};
