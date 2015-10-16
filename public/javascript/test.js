var a = 'Hello world';
console.log(a);
var ngModule = angular.module;
ngModule('hrApp', [
	'home'
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

angular.element(document).ready(function () {
	angular.bootstrap(document, ['hrApp']);
});