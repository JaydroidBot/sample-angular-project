(function (angular) {
    "use strict";

    angular.module("appConfig", [
        "ui.router"
    ])

    .config(["$urlRouterProvider", function($urlRouterProvider) {
        $urlRouterProvider.otherwise("/");
    }])

    .config(["$locationProvider", function ($locationProvider) {
        $locationProvider.html5Mode(true);
    }]);

})(angular);
