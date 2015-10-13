"use strict";
var _ = require( "lodash" );
var chalk = require('chalk');
var log = require('debug-logger')("d-pac.plugins-parser");

var semver = require( "semver" );
var required = [ "name", "description", "type" ];

function satisfiesVersion( subject,
                           versions ){
  if( _.isString( versions ) ){
    versions = [ versions ];
  }
  return _.some( versions, function( version ){
    log.assert( semver.validRange( version ), "Not a valid semver version!" );
    return semver.satisfies( subject, version );
  } );
}

/**
 *
 * @param {{}} pluginConfig
 * @param {string} pluginConfig.name
 * @param {string} pluginConfig.description
 * @param {string} pluginConfig.type
 * @param {string} [pluginConfig.entry]
 * @param {string|string[]} pluginConfig.satisfies
 * @param {string|string[]} [pluginConfig.compatibility] deprecated
 * @param {string} [frameworkVersion]
 */
module.exports = function verifyPluginConfig( pluginConfig,
                                              manifest ){
  _.each( required, function( field ){
    log.assert( pluginConfig[ field ], "'" + field + "' is required" );
  } );

  if( pluginConfig.satisfies ){ // favor v0.3.1 style compatibility checking
    return satisfiesVersion( _.get(manifest, "d-pac.plugins"), pluginConfig.satisfies );
  }

  if( pluginConfig.compatibility ){
    log.warn( chalk.yellow('"compatibility" field deprecated and replaced by "satisfies", ' +
      'see http://d-pac.github.io/d-pac.docs/developer/plugin%20specification.html' ) );
    return satisfiesVersion( manifest.version, pluginConfig.compatibility );
  }

  return true;
};
