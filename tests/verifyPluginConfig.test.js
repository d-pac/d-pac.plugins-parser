"use strict";
/* global describe, it, beforeEach */
/* jshint unused:false */
var _ = require( "lodash" );
var expect = require( "must" );
var assert = require( "assert" )
var subject = require( "../lib/verifyPluginConfig" );
var fx = require( './fixtures' );

var VERSION = "0.6.9";

describe( "-- verifyPluginConfig --", function(){
  describe( "test", function(){
    it( "should run", function(){
      expect( true ).to.be.true();
    } );
  } );
  describe( "module", function(){
    it( "should expose a function", function(){
      expect( subject ).to.be.a.function();
    } );
  } );

  describe( "API", function(){
    var config;
    beforeEach( function(){
      config = _.clone( fx.validConfig );
    } );
    describe( "with a valid configuration", function(){
      describe( "having a compatible version", function(){
        it( "should return true", function(){
          var actual = subject( config, VERSION );
          expect( actual ).to.be.true();
        } );
      } );
      describe( "having an incompatible version", function(){
        it( "should return false", function(){
          config.compatibleWith = "^0.5.0";
          var actual = subject( config, VERSION );
          expect( actual ).to.be.false();
        } );
      } );
    } );
    describe( "with an invalid configuration", function(){
      describe( "missing a required field", function(){
        it( "should throw an AssertionError", function(){
          delete config.name;
          expect( function(){
            subject( config );
          } ).to.throw( assert.AssertionError, /required/i );
        } );
      } );
      describe( "having an non-semver version specification in `compatibleWith`", function(){
        it( "should throw an AssertionError", function(){
          config.compatibleWith = "not a valid semver range";
          expect( function(){
            subject( config );
          } ).to.throw( assert.AssertionError, /semver compatible/i );
        } );
      } );
    } );
  } );
} );
