'use strict';
var a = 'Hello world';
console.log(a);

var location_info = {
    lat: 0,
    lon: 0
};

var ngModule = angular.module;
var app = ngModule('hrApp', [
    'home',
    'about',
    'donate',
    'events',
    'globalNav',
    'ui.router',
    'geolocation',
    'createEvent',
    'register'
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

        }
    ]);

// THIS IS A SERVICE. RETURN THINGS HERE
app.service('eventsService', [
    '$http', 'geolocation', function ($http, geoLocation) {
        'use strict';
        var service = this;

        service.$get = function (options) {
            options.params.lat = location_info.lat;
            options.params.lon = location_info.lon;
            return $http.get('/api/events/location', options)
                .then(function (response) {
                    return response;
                });
        };


        service.searchCall = function (text) {
            var requestOptions = {
                params: {}
            };
            if (text && text.length > 0) {
                requestOptions.params.search = text;
            }
            if (location_info.lat === 0) {
                return geoLocation.getLocation()
                    .then(function (data) {
                        location_info.lat = data.coords.latitude;
                        location_info.lon = data.coords.longitude;
                    })
                    .then(function () {
                        return service.$get(requestOptions);
                    });
            } else {
                return service.$get(requestOptions);
            }
        };

        service.get = function get (id) {
            // console.log(id);
            return $http.get('/api/events/id/' + id)
                .then(function (response) {
                    // console.log('singleEvent:', response);
                    return response;
                }, function (error) {
                    // console.log(error);
                });
        };

        service.signUp = function signUp(id, payload) {
            return $http.post('/api/events/signup/' + id, payload);
        }
    }
]);

app.service('createEventService', [
    '$http', function ($http) {
        'use strict';
        var service = this;

        service.createEvent = function (event) {
            event.volunteers_needed = {
                min: event.volunteers_min,
                max: event.volunteers_max
            }
            $http.post('/api/events/', event).then(function (resp) {
                //console.log(resp);
            });
            // console.log('Inside createEvent in Service', event);
        };
    }
]);

// THIS IS A SERVICE. RETURN THINGS HERE
app.service('donationService', [
    '$http', 'geolocation', function ($http, geoLocation) {
        'use strict';
        var service = this;

        service.$get = function (options) {
            options.params.lat = location_info.lat;
            options.params.lon = location_info.lon;
            return $http.get('/api/donations/location', options)
                .then(function (response) {
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
            if (location_info.lat === 0) {
                return geoLocation.getLocation()
                    .then(function (data) {
                        location_info.lat = data.coords.latitude;
                        location_info.lon = data.coords.longitude;
                    })
                    .then(function () {
                        return service.$get(requestOptions);
                    });
            } else {
                console.log('skipped lat/lon');
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

ngModule('register', [])
    .controller('registerPageController', function () {
       var self = this;
    });

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
                    console.log('set timeout for digest', new Date().getTime());
                }
            });

            $scope.runSearch = function (text) {
                console.log('yay text');
                eventsService.searchCall(text).then(function (data) {
                    console.log('received from api', new Date().getTime());
                    self.events = data.data;
                });
            };

            eventsService.searchCall().then(function (data) {
                self.events = data.data;
                console.log('received from api', new Date().getTime());
            });
            self.events = {result: [{description: 'test'}], status: 0};
            $scope.events = self.events;
            console.log('in controller', new Date().getTime());
        }
    ])
    .controller('eventDetailPageController', [
        '$scope', 'eventsService', '$stateParams',
        function ($scope, eventsService, $stateParams) {
            'use strict';
            var self = this;

            $scope.$watch(function () {
                return self.event;
            }, function (data) {
                console.log(data);
                if (data) {
                    $scope.event = data.resp;
                    setTimeout($scope.$digest, 0);
                    console.log('set timeout for digest', new Date().getTime());
                }
            });
            eventsService.get($stateParams.id).then(function (data) {
                self.event = data.data;
                console.log('received from api', new Date().getTime());
            });
            self.event = undefined;
            $scope.event = self.event;

            $scope.input = {
                name: '',
                email: '',
                phone: ''
            };

            $scope.signUp = function signUp(id, userData) {
                console.log('signUp', id);
                eventsService.signUp(id, userData).then(function () {
                    alert('Thanks for signing up');
                });
            }
            console.log('loaded controller', new Date().getTime());
        }
    ]);

ngModule('donate', [])
    .directive('donatePage', function () {
        return {
            restrict: 'E',
            bindToController: true,
            controller: 'donatePageController',
            controllerAs: 'donatePageCtrl',
            replace: true,
            scope: {}

        }
    })
    .controller('donateCategoryPageController', [
        '$scope',
        '$stateParams',
        'donationService',
        function ($scope, $stateParams, donationService) {
            console.log($stateParams);

            var self = this;
                self.category = $stateParams.category;
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

ngModule('createEvent', [])
    .directive('create-page', function () {
        return {
            restrict: 'E',
            bindToController: true,
            controller: 'createController',
            controllerAs: 'createController',
            replace: true,
            scope: {}
        }
    })
    .controller('createController', [
        '$scope',
        'createEventService',
        function ($scope, createService) {
            $scope.event = {
                name: '',
                website: '',
                description: '',
                address: '',
                city: '',
                state: '',
                zip:'',
                contact_name: '',
                contact_phone: '',
                contact_email: '',
                volunteers_min: '',
                volunteers_max: '',
                img: '',
                start_date: '',
                end_date: ''
            };
            $scope.createEvent = function (event) {
                console.log('createEvent in controller');
                console.log('passedIn event:', event);
                var event = {
                    name: event.name,
                    website: event.website,
                    description: event.description,
                    address: event.address,
                    city: event.city,
                    state: event.state,
                    zip: event.zip,
                    contact_name: event.contact_name,
                    contact_phone: event.contact_phone,
                    contact_email: event.contact_email,
                    volunteers_min: event.volunteers_min,
                    volunteers_max: event.volunteers_max,
                    img: event.img,
                    start_date: event.start_date,
                    end_date: event.end_date
                };
                createService.createEvent(event);
            }
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
        .state('my-account', {
            url: '/my-account',
            templateUrl: '/views/my-account.html',
            controller: 'myAccountPageController'
        })
        .state('register',  {
            url: '/register',
            templateUrl: '/views/register.html',
            controller: 'registerPageController'
        })
        .state('createEvent', {
            url: '/create/event',
            templateUrl: '/views/create-event.html',
            controller: 'createController'
        });
});

// bootstrapping the application this way avoids clutting up the
// home page with 'ngapp=hrapp'
angular.element(document).ready(function () {
    angular.bootstrap(document, ['hrApp']);
});
