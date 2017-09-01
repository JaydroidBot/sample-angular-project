(function() {
    "use strict";

    angular.module("app.home.factory", [])

    .factory("indexedDBService", function ($window, $q) {
        var indexedDB = $window.indexedDB;
        var db = null;
        var lastIndex = 0;

        var open = function () {
            var deferred = $q.defer();
            var version = 1;
            var request = indexedDB.open("jobs", version);

            request.onupgradeneeded = function (e) {
                db = e.target.result;

                e.target.transaction.onerror = indexedDB.onerror;

                if (db.objectStoreNames.contains("jobs")) {
                    db.deleteObjectStore("jobs");
                }

                var store = db.createObjectStore("jobs", {
                    keyPath: "id"
                });
            };

            request.onsuccess = function (e) {
                db = e.target.result;
                deferred.resolve();
            };

            request.onerror = function () {
                deferred.reject();
            };

            return deferred.promise;
        };

        var get = function () {
            var deferred = $q.defer();

            if (db === null) {
                deferred.reject("IndexDB is not opened yet!");
            }
            else {
                var trans = db.transaction(["jobs"], "readwrite");
                var store = trans.objectStore("jobs");
                var jobs = [];

                // Get everything in the store;
                var keyRange = $window.IDBKeyRange.lowerBound(0);
                var cursorRequest = store.openCursor(keyRange);

                cursorRequest.onsuccess = function (e) {
                    var result = e.target.result;
                    if (result === null || result === undefined) {
                        deferred.resolve(jobs);
                    }
                    else {
                        jobs.push(result.value);
                        if (result.value.id > lastIndex) {
                            lastIndex = result.value.id;
                        }
                        result.continue();
                    }
                };

                cursorRequest.onerror = function (e) {
                    deferred.reject("Something went wrong!!!");
                };
            }

            return deferred.promise;
        };

        var add = function (payload) {
            var deferred = $q.defer();

            if (db === null) {
                deferred.reject("IndexDB is not opened yet!");
            }
            else {
                var trans = db.transaction(["jobs"], "readwrite");
                var store = trans.objectStore("jobs");
                lastIndex++;

                var data = Object.assign({}, payload, {
                    "id": lastIndex,
                });

                var request = store.put(data);

                request.onsuccess = function (e) {
                    deferred.resolve();
                };

                request.onerror = function (e) {
                    deferred.reject("New record could not be added!");
                };
            }
            return deferred.promise;
        };

        return {
            open: open,
            get: get,
            add: add
        };

    });
})(angular);
