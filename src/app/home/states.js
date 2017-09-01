"use strict";

angular.module("app.home.routes", [
    "ui.router"
])

.config(function config($stateProvider) {
    $stateProvider
        .state("jobs", {
            url: "/",
            views: {
                "main@":{
                    templateUrl: "home/tpls/jobs.tpl.html",
                    controller: "app.jobslist.controller",
                    controllerAs: "$ctrl"
                }
            }
        })
        .state("addJob", {
            url: "/new-job",
            views: {
                "main@":{
                    templateUrl: "home/tpls/create.tpl.html",
                    controller: "app.jobcreate.controller",
                    controllerAs: "$ctrl"
                }
            }
        });
});
