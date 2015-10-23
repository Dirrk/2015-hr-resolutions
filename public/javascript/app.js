var a = 'Hello world';
console.log(a);

var ngModule = angular.module;
var app = ngModule('hrApp', [
    'home',
    'about',
    'donate',
    'events',
    'globalNav',
    'ui.router'
]);

ngModule('globalNav', [])
    .directive('globalNav', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '../views/global-nav.html'
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
            scope: {}
        }
    })
    .controller('homePageController', [
        '$http',
        '$scope',
        '$q',
        function ($http, $scope, $q) {
            var self = this,
                response,
                d = $q;
            self.name = 'Home Page View';

            response = $http({
                method: 'GET',
                url: 'http://hack4hr2015.herokuapp.com/api/events/id/0e202308-779f-481e-a52f-9902db214274'
            }).then(function (response) {
               return response.data.resp.doc;
            }, function (error) {
                console.log(error);
            });

            console.log(response);
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
            scope: {}

        }
    })
    .controller('aboutPageController', [
        '$scope',
        function ($scope) {
            var self = this;
            self.title = 'yay wtf';
            console.log('about page scope');
        }
    ]);

ngModule('events', [])
    .directive('eventsPate', function () {
        return {
            restrict: 'E',
            bindToController: true,
            controller: 'eventsPageController',
            controllerAs: 'eventsPageCtrl',
            template: '<div><p>{{eventsPageCtrl.title}}</p></div>',
            replace: true,
            scope: {}

        }
    })
    .controller('eventsPageController', [
        '$scope',
        function ($scope) {
            var self = this;
            self.title = 'yay wtf';
            console.log('events page scope');
        }
    ]);

ngModule('donate', [])
    .directive('donatePage', function () {
        return {
            restrict: 'E',
            bindToController: true,
            controller: 'donatePageController',
            controllerAs: 'donatePageCtrl',
            template: '<div><p>{{donatePageCtrl.title}}</p></div>',
            replace: true,
            scope: {}

        }
    })
    .controller('donatePageController', [
        '$scope',
        function ($scope) {
            var self = this;
            self.title = 'yay wtf';
            console.log('donate page scope');
        }
    ]);

// bootstrapping the application this way avoids clutting up the
// home page with 'ngapp=hrapp'
app.config(function($stateProvider, $urlRouterProvider) {
    // For any unmatched url, redirect to /state1
    //$urlRouterProvider.otherwise("/");
    $stateProvider
        .state('root', {
            url: '/',
            templateUrl: '../views/home.html',
            controller: 'homePageController'
        })
        .state('about', {
            url: '/about',
            templateUrl: '../views/about.html',
            controller: 'aboutPageController'
        })
        .state('donate', {
            url: '/donate',
            templateUrl: '../views/donate.html',
            controller: 'donatePageController'
        })
        .state('events', {
            url: '/events',
            templateUrl: '',
            controller: ''
        });


});
angular.element(document).ready(function () {
    angular.bootstrap(document, ['hrApp']);
});
