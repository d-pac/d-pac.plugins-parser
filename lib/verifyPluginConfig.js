"use strict";
var _ = require( "lodash" );
var assert = require( "assert" );
var semver = require( "semver" );

var required = [ "name", "description", "type" ];

function satisfiesVersion( subject,
                           versions ){
  if( _.isString( versions ) ){
    versions = [ versions ];
  }
  return _.some( versions, function( version ){
    assert( semver.validRange( version ), "Not a valid semver version!" );
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
                                              frameworkVersion ){
  _.each( required, function( field ){
    assert( pluginConfig[ field ], "'" + field + "' is required" );
  } );

  if( pluginConfig.satisfies ){ // favor v0.3.1 style compatibility checking
    return satisfiesVersion( frameworkVersion, pluginConfig.satisfies );
  }

  if( pluginConfig.compatibility ){
    console.log( 'WARNING: "compatibility" field deprecated and replaced by "satisfies", ' +
      'see http://d-pac.github.io/d-pac.docs/developer/plugin%20specification.html' );
    return satisfiesVersion( frameworkVersion, pluginConfig.compatibility );
  }

  return true;
};
