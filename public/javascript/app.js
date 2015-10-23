var a = 'Hello world';
console.log(a);

var ngModule = angular.module;
var app = ngModule('hrApp', [
    'home',
    'about',
    'donate',
    'events',
    'globalNav',
    'ui.router',
    'geolocation'
]);

ngModule('globalNav', [])
    .directive('globalNav', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '../views/global-nav.html',
            controller: 'globalNavController',
            controllerAs: 'globalNavCtrl',
            bindToController: {
                searchText: '@'
            },
            scope: {}

        }
    })
    .controller('globalNavController', [
        '$scope', 'eventsService', function ($scope, eventsService) {
            var self = this;
            self.runSearch = function (text) {
            console.log('yay text');
                eventsService.searchCall(text);
            }
        }
    ]);

// THIS IS A SERVICE. RETURN THINGS HERE
app.service('eventsService', [
    '$http', 'geolocation', function ($http, geoLocation) {
        'use strict';
        var service = this;

        service.location_info = {
            lat: 0,
            lon: 0
        }

        service.$get = function (options) {
            options.params.lat = service.location_info.lat;
            options.params.lon = service.location_info.lon;
            return $http.get('/api/events/location', options)
                .then(function (response) {
                    console.log(response);
                    return response;
            }, function (error) {
                console.log(error);
            });
        };


        service.searchCall = function (text) {
            var requestOptions = {
                params: {}
            };
            if (text && text.length > 0) {
                requestOptions.params.search = text;
            }
            if (service.location_info.lat === 0) {
                return geoLocation.getLocation()
                    .then(function (data) {
                        service.location_info.lat = data.coords.latitude;
                        service.location_info.lon = data.coords.longitude;
                    })
                    .then(function () {
                        return service.$get(requestOptions);
                    });
            } else {
                return service.$get(requestOptions);
            }
        };
    }
]);

// END THE SERVICE

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
    .directive('eventsPage', function () {
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
        '$scope', 'eventsService',
        function ($scope, eventsService) {
            'use strict';
            var self = this;
            $scope.$watch(function () {
                return self.events;
            }, function (data) {
                console.log('data received', data.status);
                if (data && data.status && data.status === 200) {
                    $scope.events = data;
                    setTimeout($scope.$digest, 0);
                }
            });
            eventsService.searchCall().then(function (data) {
                self.events = data.data;
            });
            self.events = { result: [{description: 'test'}], status: 0};
            $scope.events = self.events;
        }
    ])
    .controller('eventDetailPageController', [
        '$scope',
        function ($scope) {
            var self = this;

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

ngModule('myAccount', [])
    .controller('myAccountPageController', [
        '$scope',
        function ($scope) {
            var self = this;
            self.title = 'My Account';
            console.log('my account page scope');
        }
    ]);

// bootstrapping the application this way avoids clutting up the
// home page with 'ngapp=hrapp'
app.config(function ($stateProvider, $urlRouterProvider) {
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/");
    $stateProvider
        .state('root', {
            url: '/',
            templateUrl: '/views/home.html',
            controller: 'homePageController'
        })
        .state('about', {
            url: '/about',
            templateUrl: '/views/about.html',
            controller: 'aboutPageController'
        })
        .state('donate', {
            url: '/donate',
            templateUrl: '/views/donate.html',
            controller: 'donatePageController'
        })
        .state('events', {
            url: '/events',
            templateUrl: '/views/events.html',
            controller: 'eventsPageController'
        })
        .state('eventsList', {
            url: '/eventsList',
            templateUrl: '/views/event-detail.html',
            controller: 'eventDetailPageController'
        })
        .state('my-account', {
            url: '/my-account',
            templateUrl: '/views/my-account.html',
            controller: 'myAccountPageController'
        });
});

// bootstrapping the application this way avoids clutting up the
// home page with 'ngapp=hrapp'
angular.element(document).ready(function () {
    angular.bootstrap(document, ['hrApp']);
});
