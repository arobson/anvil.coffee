/*
	anvil.coffee - CoffeeScript compiler extension for anvil.js
	version:	0.1.1
	author:		Alex Robson <alex@sharplearningcurve.com> (http://sharplearningcurve.com)
	copyright:	2011 - 2012
	license:	Dual licensed
				MIT (http://www.opensource.org/licenses/mit-license)
				GPL (http://www.opensource.org/licenses/gpl-license)
*/
var coffeeScript;

module.exports = function( _, anvil ) {
	anvil.plugin( {
		name: "anvil.coffee",
		configure: function( config, command, done ) {
			anvil.addCompiler( ".coffee", this, "application/javascript" );
			anvil.config[ "anvil.combiner" ].patterns.push( {
				extensions: [ ".coffee" ],
				find: "/[#]{3}.?import.?[(]?.?[\"'].*[\"'].?[)]?.?[#]{3}/g",
				replace: "/([ \t]*)[#]{3}.?import.?[(]?.?[\"']replace[\"'].?[)]?.?[#]{3}/g"
			} );
			done();
		},
		compile: function( content, done ) {
			if( !coffeeScript ) {
				coffeeScript = require( "coffee-script" );
			}
			try {
				var js = coffeeScript.compile( content, { bare: true } );
				done( js );
			} catch ( error ) {
				done( "", error );
			}
		},
		rename: function( name ) {
			return name.replace( ".coffee", ".js" );
		}
	} );
};