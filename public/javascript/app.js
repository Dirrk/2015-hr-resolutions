'use strict';
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
    'geolocation',
    'create'
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

        service.get = function get (id) {
            console.log(id);
            return $http.get('/api/events/id/' + id)
                .then(function (response) {
                    console.log('singleEvent:', response);
                    return response;
                }, function (error) {
                    console.log(error);
                });
        };
    }
]);

// THIS IS A SERVICE. RETURN THINGS HERE
app.service('donationService', [
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
            return $http.get('/api/donations/location', options)
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

        service.get = function get (id) {
            return $http.get('/api/donations/' + id)
                .then(function (response) {
                    console.log('singleDonation:', response);
                    return response;
                }, function (error) {
                    console.log(error);
                });
        };
    }
]);

// END THE SERVICE

ngModule('home', [])
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

ngModule('register', [])
    .controller('registerPageController', function () {
       var self = this;
    });

ngModule('about', [])
    .controller('aboutPageController', [
        '$scope',
        function ($scope) {
            var self = this;
            self.title = 'yay wtf';
            console.log('about page scope');
        }
    ]);

ngModule('events', [])
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
            self.events = {result: [{description: 'test'}], status: 0};
            $scope.events = self.events;
        }
    ])
    .controller('eventDetailPageController', [
        '$scope', 'eventsService', '$stateParams',
        function ($scope, eventsService, $stateParams) {
            'use strict';
            var self = this;

            console.log($stateParams);

            $scope.$watch(function () {
                return self.event;
            }, function (data) {
                console.log('data received', data);
                if (data) {
                    $scope.event = data.resp;
                    setTimeout($scope.$digest, 0);
                }
            });
            eventsService.get($stateParams.id).then(function (data) {
                self.event = data.data;
            });
            self.event = undefined;
            $scope.event = self.event;
        }
    ]);

ngModule('donate', [])
    .controller('donateCategoryPageController', [
        '$scope',
        '$stateParams',
        'donationService',
        function ($scope, $stateParams, donationService) {
            console.log($stateParams);

            var self = this;
                self.category = $stateParams.category;
            console.log(self.category);
            $scope.category = self.category;
            $scope.$watch(function () {
                return self.donations;
            }, function (data) {
                if (data && data.status && data.status === 200) {
                    $scope.donations = data;
                    setTimeout($scope.$digest, 0);
                }
            });
            donationService.searchCall().then(function (data) {
                self.donations = data.data;
            });
            $scope.donations = self.donations;

        }
    ])
    .controller('donatePageController', [
        '$scope', 'donationService',
        function ($scope, donationService) {
            'use strict';
            var self = this;
            $scope.$watch(function () {
                return self.donations;
            }, function (data) {
                console.log('data received', data.status);
                if (data && data.status && data.status === 200) {
                    $scope.donations = data;
                    setTimeout($scope.$digest, 0);
                }
            });
            donationService.searchCall().then(function (data) {
                self.donations = data.data;
            });
            self.donations = {result: [{name: 'test'}], status: 0};
            $scope.donations = self.donations;
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

ngModule('create', [])
    .controller('createController', [
        '$scope',
        'createService',
        function ($scope, createService) {
            var self = this;
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
        .state('register',  {
            url: '/register',
            templateUrl: '/views/register.html',
            controller: 'registerPageController'
        })
        .state('donate', {
            url: '/donate',
            templateUrl: '/views/donate.html',
            controller: 'donatePageController'
        })
        .state('donateCategory', {
            url: '/donate/:category',
            templateUrl: '/views/donate-category.html',
            controller: 'donateCategoryPageController'
        })
        .state('events', {
            url: '/events',
            templateUrl: '/views/events.html',
            controller: 'eventsPageController'
        })
        .state('eventsDetail', {
            url: '/events/:id',
            templateUrl: '/views/event-detail.html',
            controller: 'eventDetailPageController'
        })
        .state('myAccount', {
            url: '/my-account',
            templateUrl: '/views/my-account.html',
            controller: 'myAccountPageController'
        })
        .state('create', {
            url: '/create',
            templateUrl: '/views/create.html',
            controller: 'createController'
        });
});

// bootstrapping the application this way avoids clutting up the
// home page with 'ngapp=hrapp'
angular.element(document).ready(function () {
    angular.bootstrap(document, ['hrApp']);
});
