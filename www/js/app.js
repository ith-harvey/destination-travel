// Ionic Starter App

// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])
  .constant('BASE_URL', 'https://mighty-meadow-57002.herokuapp.com')
  // .constant('BASE_URL', 'http://localhost:3000')

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
        cordova.plugins.Keyboard.disableScroll(true);
      }

      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function($stateProvider, $urlRouterProvider, $httpProvider) {

    $stateProvider
      .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })

    .state('login', {
      url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
    })

    .state('signUp', {
      url: '/signUp',
        templateUrl: 'templates/signup.html',
        controller: 'signUpCtrl'
    })

    .state('app.search', {
      url: '/search',
      views: {
        'menuContent': {
          templateUrl: 'templates/search.html'
        }
      },
      requiresLogin: true
    })

    .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'home'
        }
      },
      requiresLogin: true
    })

    .state('app.markerMap', {
      url: '/markermap',
      params: { city: null },
      views: {
        'menuContent': {
          templateUrl: 'templates/markerMap.html',
          controller: 'markerMapCtrl'
        }
      },
      requiresLogin: true
    })

    .state('app.trips', {
      url: '/trips',
      views: {
        'menuContent': {
          templateUrl: 'templates/trips.html',
          controller: 'TripsCtrl'
        }
      },
      requiresLogin: true
    })

    .state('app.addtrips', {
      url: '/addtrips',
      views: {
        'menuContent': {
          templateUrl: 'templates/add-trip.html',
          controller: 'AddTripsCtrl'
        }
      },
      requiresLogin: true
    })

    .state('app.fbfriendscities', {
      url: '/fbFriendsCities',
      views: {
        'menuContent': {
          templateUrl: 'templates/fb-friends-cities.html',
          controller: 'fbFriendsCitiesCtrl'
        }
      },
      requiresLogin: true
    })

    .state('app.cities', {
      url: '/trip/:id/cities',
      params: { city: null },
      views: {
        'menuContent': {
          templateUrl: 'templates/cities.html',
          controller: 'CitiesCtrl'
        }
      },
      requiresLogin: true
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
  });
