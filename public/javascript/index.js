require('./home.js');
require('./test.js');
require('./index.js');

var a = 'Hello world';
console.log(a);
var ngModule = angular.module;
ngModule('hrApp', [
	'home',
	'about'
]);

ngModule('home', [])
	.directive('homePage', function () {
	        return {
	            restrict: 'E',
	            bindToController: true,
	            controller: 'homePageController',
	            controllerAs: 'homePageCtrl',
	            template: '<div><p>{{homePageCtrl.name}}</p></div>',
	            replace: true,
	            scope: {

	            }
	        }
	})
	.controller('homePageController', [
	    '$scope',
	    function ($scope) {
	        console.log($scope, 'scope');
	        var self = this;
	        self.name = 'ragefukingshit';
	    }
	]);

ngModule('about', [])
	.directive('aboutPage', function () {
		return {
			restrict: 'E',
            bindToController: true,
            controller: 'aboutPageController',
            controllerAs: 'aboutPageCtrl',
            template: '<div><p>{{aboutPageCtrl.title}}</p></div>',
            replace: true,
            scope: {

            }
		}
	})
	.controller('aboutPageController', [
		'$scope',
		function ($scope) {
			var self = this;
			self.title = 'yay wtf';
			console.log('about page scope');
		}]);

// bootstrapping the application this way avoids clutting up the
// home page with 'ngapp=hrapp'	
angular.element(document).ready(function () {
	angular.bootstrap(document, ['hrApp']);
});
