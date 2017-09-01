"use strict";

angular.module("app.home.controllers", [])

.controller("app.jobslist.controller", ["indexedDBService",
	function (api) {

        var vm = this;

        vm.fetchData = function () {
            api.get()
                .then(function (data) {
                    vm.jobs = data;
                })
                .catch(function() {
                    vm.jobs = [];
                });
        };

        vm.onInit = function () {
            api.open()
                .then(function () {
                    vm.fetchData();
                });
        };

        vm.onInit();

	}
])

.controller("app.jobcreate.controller", ["indexedDBService",
    function (api) {
        var vm = this;

        vm.job = {};

        vm.onInit = function () {
            api.open()
                .then(function () {
                    console.log("db open");
                });
        };

        vm.saveJob = function (form) {
            api.add(vm.job)
                .then(function (data) {
                    vm.msg = {
                        success: true,
                        message: "New job listing has been added"
                    };
                    vm.job = {};
                    form.$setPristine();
                })
                .catch(function() {
                    vm.msg = {
                        success: false,
                        message: "Oops! Something went wrong. Please Try Again"
                    };
                    vm.loading = false;
                });
        };


        vm.onInit();
    }
]);
