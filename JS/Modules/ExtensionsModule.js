/*		HelperFunctions JavaScript Module
 *		Author: Daniel Beus
 *		Date: 10/18/2012
 */

(function()
{
	var Types = {
		Function: typeof function() {},
		Object: typeof {},
		String: typeof "",
		Number: typeof 1,
		Boolean: typeof false,
		Undefined: typeof undefined
	};

	(function(factory)
	{
		// Support three module loading scenarios
		// Taken from Knockout.js library
		if(typeof require === Types.Function && typeof exports === Types.Object && typeof model === Types.Object)
		{
			// [1] CommonJS/Node.js
			var target = module['exports'] || exports;
			var shim = require('shim');
			var sham = require('sham');
			factory(target, shim, sham);
		}
		else if(typeof define === Types.Function && define['amd'])
		{
			// [2] AMD anonymous module
			define(['exports', 'shim', 'sham'], factory);
		}
		else
		{
			// [3] No module loader (plain <script> tag) - put directly in global namespace
			factory(window['Extensions'] = {},
				window['es5-shim'],
				window['es5-sham']);
		}
	})(function(HelperFunctionsExports, shim, sham)
	{
		var HelperFunctions = typeof HelperFunctionsExports !== Types.Undefined ? HelperFunctionsExports : {};

		if(!String.prototype['IsNullOrWhitespace'])
		{
			function IsNullOrWhitespace(str)
			{
				if(str == undefined || str == null)
					str = this;

				if(str == undefined || str == null)
					return true;

				if(!(str instanceof String))
					throw new TypeError("Not a string");

				var trimmed = str.trim();

				return trimmed.length <= 0;
			}

			Object.defineProperty(String.prototype, 'IsNullOrWhitespace',{
				get: function()
				{
					return IsNullOrWhitespace.call(this);
				},
				enumerable: false,
				configurable: false
			});
		}

		var Clone = function(obj)
		{
			var rtObj;

			if(obj == undefined || obj == null)
				obj = this;

			if(obj instanceof Array)
				rtObj = [];
			else
				rtObj = {}

			for(var key in obj)
			{
				var data = obj[key],
					dataType = typeof data;

				if(dataType === Types.Function && data === Clone)
					continue;

				if(dataType === Types.Object)
				{
					rtObj[key] = data.Clone();
				}
				else
				{
					rtObj[key] = data;
				}
			}

			return rtObj;
		}

		if(!Object.prototype['Clone'])
		{
			Object.defineProperty(Object.prototype, 'Clone', {
				enumerable: false,
				writable: false,
				configurable: false,
				value: Clone
			});
		}

		if(!Array.prototype['Clone'])
		{
			Object.defineProperty(Array.prototype, 'Clone', {
				enumerable: false,
				writable: false,
				configurable: false,
				value: Clone
			});
		}

		if(!window['console'])
		{
			var Console = {
				log: function()
				{

				},
				debug: function()
				{

				},
				error: function()
				{

				},
				warn: function()
				{

				},
				trace: function()
				{

				}
			}

			window['console'] = Console;
		}

		if(!String.prototype['Capitalize'])
		{
			Object.defineProperty(String.prototype, 'Capitalize', {
				enumerable: false,
				writable: false,
				configurable: false,
				value: function(str)
				{
					if(str == undefined || str == null)
						str = this;

					if(!(str instanceof String))
						throw new TypeError("Not a string");

					if(str == null || str == undefined || str.IsNullOrWhitespace)
						return str + "";

					return str.substring(0, 1).toUpperCase() + this.substring(1);
				}
			});
		}

		if(!String.prototype['CapitalizeAll'])
		{
			Object.defineProperty(String.prototype, 'CapitalizeAll', {
				enumerable: false,
				writable: false,
				configurable: false,
				value: function(str)
				{
					if(str == undefined || str == null)
						str = this;

					if(str == null || str == undefined || str.IsNullOrWhitespace)
						return str;

					var strArr = str.split(" ");
					var rtStr = "",
						counter = 0;
					strArr.forEach(function(item)
					{
						rtStr += item.Capitalize();
						counter++;

						if(counter < strArr.length)
							rtStr += " ";
					});

					return rtStr;
				}
			});
		}

		function Stringify(obj)
		{
			if(obj == undefined || obj == null)
				obj = this;

			if(obj == undefined || obj == null)
				return "";

			var rtStr = "",
				isArray = Array.isArray(obj),
				counter = 0;

			if(isArray)
				rtStr += "[ ";
			else
				rtStr += "{ ";

			for(var key in obj)
			{
				var data = obj[key],
					dataType = typeof data;
				rtStr += '"' + key + '": ';
				if(dataType === Types.Object)
				{
					rtStr += Stringify(data);
				}
				else if(dataType === Types.String)
				{
					rtStr += '"' + data + '"';
				}
				else
					rtStr += data;

				rtStr += ", ";
			}

			rtStr = rtStr.substring(0, rtStr.length - 2);

			if(isArray)
				rtStr += " ]";
			else
				rtStr += " }";

			return rtStr;
		}

		if(!Object.prototype['Stringify'])
		{
			Object.defineProperty(Object.prototype, 'Stringify', {
				enumerable: false,
				writable: false,
				configurable: false,
				value: Stringify
			})
		}

		if(!Array.prototype['Stringify'])
		{
			Object.defineProperty(Array.prototype, 'Strinfify', {
				enumerable: false,
				writable: false,
				configurable: false,
				value: Stringify
			})
		}

		if(!Object.prototype['Count'])
		{
			Object.defineProperty(Object.prototype, 'Count', {
				enumerable: false,
				configurable: false,
				get: function()
				{
					if(typeof this !== Types.Object || !(this instanceof Object))
						throw new TypeError("Count property could not be found on " + typeof this);
					
					var count = 0;
					for(var key in this)
						count++;
					return count;
				}
			});
		}

		return HelperFunctions;
	});
})();