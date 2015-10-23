var a = 'Hello world';
console.log(a);

var ngModule = angular.module;
ngModule('hrApp', [
	'home',
	'about',
	'globalNav'
]);

ngModule('globalNav', [])
	.directive('globalNav', function () {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'views/global-nav.html'
		}
	});

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
	        var self = this;
	        self.name = 'Home Page View';
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
			self.title = 'yay About Page View';
			console.log('about page scope');
		}]);
// html 5 mode on
// ngModule.config([
//     '$locationProvider',
//     function ($locationProvider) {
//         $locationProvider.html5Mode(true);
//     }
// ]);
// bootstrapping the application this way avoids clutting up the
// home page with 'ngapp=hrapp'
angular.element(document).ready(function () {
	angular.bootstrap(document, ['hrApp']);
});
