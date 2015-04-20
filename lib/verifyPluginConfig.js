"use strict";
var _ = require( "lodash" );
var assert = require( "assert" );
var semver = require( "semver" );

var required = [ "name", "description", "type" ];

/**
 *
 * @param {{}} pluginConfig
 * @param {string} pluginConfig.name
 * @param {string} pluginConfig.description
 * @param {string} pluginConfig.type
 * @param {string} pluginConfig.entry
 * @param {string|string[]} pluginConfig.compatibleWith
 */
module.exports = function verifyPluginConfig( pluginConfig,
                                              frameworkVersion ){
  _.each( required, function( field ){
    assert( pluginConfig[ field ], "'" + field + "' is required" );
  } );

  if( pluginConfig.compatibleWith ){
    var versions = pluginConfig.compatibleWith;
    var satisfies = false;
    if( _.isString( versions ) ){
      versions = [ versions ];
    }
    assert( _.isArray( versions ), "'compatibleWith' must be a String or an Array of String" );
    _.each( versions, function( version ){
      assert( semver.validRange( version ), "'compatibleWith' must contain a semver compatible version range." );
      satisfies = satisfies || (frameworkVersion)
        ? semver.satisfies( frameworkVersion, version )
        : true;
    } );
    return satisfies;
  }

  return true;
};
