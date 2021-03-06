/*		ContestantViewModel JavaScript Module
 *		Author: Daniel Beus
 *		Date: 10/17/2012
 */

(function()
{
	"use strict";

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
			var exceptions = module['Modules/ExceptionModule'];
			var ko = module['knockout'];
			var extensions = module['Modules/ExtensionsModule'];
			var webSocket = module['Modules/WebSocketModule'];

			factory(target, exceptions, ko, webSocket);
		}
		else if(typeof define === Types.Function && define['amd'])
		{
			// [2] AMD anonymous module
			define(['exports', 'Modules/ExceptionModule', 'knockout', 'Modules/WebSocketModule',
						'Modules/ExtensionsModule'], factory);
		}
		else
		{
			// [3] No module loader (plain <script> tag) - put directly in global namespace
			factory(window['ContestantViewModel'] = window['ContestantViewModel'] || {},
					window['ExceptionModule'],
					window['ko'],
					window['WebSocketModule']);
		}
	})(function(ContestantViewModelExports, Exceptions, ko, Socket)
	{
		var ContestantViewModel = typeof ContestantViewModelExports !== Types.Undefined ? ContestantViewModelExports : {};
		
		// Start ContestantViewModel module code here
		// Any publicly accessible methods should be attached to the "ContestantViewModel" object created above
		// Any private functions or variables can be placed anywhere
		
		var colors = [
				'black',
				'white',
				'red',
				'orange',
				'yellow',
				'green',
				'blue',
				'purple'
			];
		var MessageTypes = {
				Disconnect: 0,
				LogOn: 1,
				BuzzIn: 2,
				ClearBuzz: 3,
				QuestionReady: 4,
				NextQuestion: 5
			}

		function DisplayError(message)
		{
			console.log(message);
			alert(message);
		}

		ContestantViewModel.ContestantViewModel = function(args)
		{
			var self = this,
				connected = ko.observable(false),
				loggedIn = ko.observable(false),
				webSocket,
				userID;

			if(!(webSocket = new Socket.Socket(
				{
					server: 'ws://www.legacybass.com:1337/',
					ReceivedMessage: OnLoggedIn,
					ConnectionOpen: OnConnectionOpen,
					ConnectionError: OnConnectionError,
					ConnectionClosed: OnConnectionClose
				}))
			  )
			{
				alert("Your browser doesn't support the required features.");
				return;
			}
			
			self.SelectedColor = ko.observable(colors[Math.floor(Math.random() * colors.length)]);
			self.userName = ko.observable();
			self.Colors = colors;
			self.Connected = ko.computed(function()
				{
					return !!connected();
				});
			self.LoggedIn = ko.computed(function()
				{
					return !!loggedIn();
				});
			self.SquareBuzzer = ko.observable('false');
			self.HasAnsweredQuestion = ko.observable('false');

			function OnConnectionOpen()
			{
				connected(true);
				webSocket.Send({
					
				});
			}

			function OnLoggedIn(data)
			{
				webSocket.ReceivedMessage = OnReceiveMessage;
			}

			function OnReceiveMessage(data)
			{
				console.log(data);
			}

			function OnConnectionError(data)
			{
				console.log(data);
			}

			function OnConnectionClose()
			{
				connected(false);
				loggedIn(false);
				userID = undefined;
				self.userName(undefined);
				self.HasAnsweredQuestion(false);
			}

			self.ConnectUser = function()
			{
				var username = self.userName(),
					nameType = typeof username;
				if(nameType !== Types.String || username.IsNullOrWhitespace)
				{
					DisplayError('Username cannot be empty.');
					return;
				}

				webSocket.Send(username);
			}

			self.BuzzIn = function()
			{
				webSocket.Send(userID);
			}
		}

		return ContestantViewModel;
	});
})();