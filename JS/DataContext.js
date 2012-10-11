/*		DataContext JavaScript Module
 *		Author: Daniel Beus
 *		Date: 10/4/2012
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
			var exception = module['ExceptionModule'];
			var Models = module['JeopardyModels']
			factory(target, exception, Models);
		}
		else if(typeof define === Types.Function && define['amd'])
		{
			// [2] AMD anonymous module
			define(['exports', 'ExceptionModule', 'JeopardyModels'], factory);
		}
		else
		{
			// [3] No module loader (plain <script> tag) - put directly in global namespace
			factory(window['DataContext'] = window['DataContext'] || {},
					window['Exception'],
					window['JeopardyModels']);
		}
	})(function(DataContextExports, Exception, Models)
	{
		var DataContext = typeof DataContextExports !== Types.Undefined ? DataContextExports : {};

		
		// Code in case the "bind" method hasn't been implemented by the browser
		if(!Function.prototype['bind'])
		{
			Function.prototype['bind'] = function(object)
			{
				var originalFunction = this,
					args = Array.prototype.slice.call(arguments),
					object = args.shift();
				return function()
				{
					return originalFunction.apply(object, args.concat(Array.prototype.slice.call(arguments)));
				}
			}
		}
		
		// Start DataContext module code here
		// Any publicly accessible methods should be attached to the "DataContext" object created above
		// Any private functions or variables can be placed anywhere

		
		var questionIDs = [],  		// Used to store the id of questions from previous rounds
		    categoryNames = [];		// Used to store the names of previous rounds' categories

// Begin Functions

		/*	Get 5 random questions within a category
		 *	@param {Object} args contains the information for loading the question
		 *		Structure:  {
		  						category: Name
		  					}
		 * @returs {Object} A Models.Question object
		 */
		DataContext.GetQuestions = function(args)
		{
			//throw new Exception.NotImplementedException('GetQuestions not yet implemented');
			var answers = [
				't occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est labor',
				's nisi ut aliquip ex ea',
				'ipsum dolor sit amet, consectetur adipisicing elit, sed d',
				'em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullam'
			];
			return [
				new Models.JeopardyQuestionModel({
					question:	answers[Math.floor(Math.random() * 4)],
					answer:  	answers[Math.floor(Math.random() * 4)],
					value:   	200,
					category:	'Test',
					visible: 	true
				}),
				new Models.JeopardyQuestionModel({
					question:	answers[Math.floor(Math.random() * 4)],
					answer:  	answers[Math.floor(Math.random() * 4)],
					value:   	400,
					category:	'Test',
					visible: 	true
				}),
				new Models.JeopardyQuestionModel({
					question:	answers[Math.floor(Math.random() * 4)],
					answer:  	answers[Math.floor(Math.random() * 4)],
					value:   	600,
					category:	'Test',
					visible: 	true
				}),
				new Models.JeopardyQuestionModel({
					question:	answers[Math.floor(Math.random() * 4)],
					answer:  	answers[Math.floor(Math.random() * 4)],
					value:   	800,
					category:	'Test',
					visible: 	true
				}),
				new Models.JeopardyQuestionModel({
					question:	answers[Math.floor(Math.random() * 4)],
					answer:  	answers[Math.floor(Math.random() * 4)],
					value:   	1000,
					category:	'Test',
					visible: 	true
				})
			];
		}

		/*	Get 5 random questions within a category
		 *	@param {Object} args contains the information for loading the question
		 *		Structure:  {
		  						RequiredCategories: Array of categories that must exist in the round
		  					}
		 *	@return {Array} Array of Models.category objects
		 */
		DataContext.GetCategories = function(args)
		{
			// Go to data storage and get 5 categories
			// ? Then populate each question in category
			//throw new Exception.NotImplementedException('GetCategories not yet implemented');
			return [
				new Models.JeopardyCategoryModel({
					name:     	'Mythology',
					questions:	DataContext.GetQuestions({
					          	category: 'Test'
					})
				}),
				new Models.JeopardyCategoryModel({
					name:     	'Crossword clues "K"',
					questions:	DataContext.GetQuestions({
					          	category: 'Test2'
					})
				}),
				new Models.JeopardyCategoryModel({
					name:     	'How I Met Your Father',
					questions:	DataContext.GetQuestions({
					          	category: 'Test3'
					})
				}),
				new Models.JeopardyCategoryModel({
					name:     	'Stupid Answers',
					questions:	DataContext.GetQuestions({
					          	category: 'Test4'
					})
				}),
				new Models.JeopardyCategoryModel({
					name:     	'.NET and the Dependency Injection Pattern',
					questions:	DataContext.GetQuestions({
					          	category: 'Test5'
					})
				})
			];
		}

		/*	Get the final Question and Category
		 *	@param {Object} args contains the information for loading the question
		 *		Structure:  {
		  						
		  					}
		  	@returns {Object}
		  		Structure:	{
		  		          		category:	The category of the question
		  		          		question:	The question itself
		  		          		answer:  	The question answer
		  		          	}
		 */
		DataContext.GetFinalQuestion = function(args)
		{
			throw new Exception.NotImplementedException('GetFinalQuestion not yet implemented');
		}

// End Functions

		return DataContext;
	});
})();