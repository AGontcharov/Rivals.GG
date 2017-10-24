/**
 * @namespace directives
 * @memberOf angular_module.app
 */
(function() {
	'use strict';

	angular
		.module('myApp')
		.directive('compareTo', compareTo);

	/**
	 * @class compareTo
	 * @description Compares two password fields
	 * @memberOf angular_module.app.directives
	 */
	function compareTo() {

		return {
			require: 'ngModel',
			scope: { 
				otherModelValue: '=compareTo' 
			},
			link: function(scope, element, attr, ctrl) {

				// False sets the $error property - what kind of backwards bullshit logic is this
				ctrl.$validators.compareTo = function(modelValue) {

					// Set $error.compareTo
					if (modelValue) return modelValue === scope.otherModelValue;

					// Prevent appending to $error.required message
					else return true;
				}

				// Needed to watch password input incase confirm password is typed first
				scope.$watch('otherModelValue', function() {
					ctrl.$validate();							
				});
			}
		}
	}
})();