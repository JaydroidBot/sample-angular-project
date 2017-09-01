(function() {
    "use strict";

    /**
     * @ngdoc overview
     * @name app.home.factory
     *
     * @description
     * Emulates a promise based backend to power application
     * This supports blob value storage
     * use $q to promisify requests.
     */

    angular.module("app.home.factory", [])

    .factory("indexedDBService", function ($window, $q) {
        var indexedDB = $window.indexedDB;
        var db = null;
        var lastIndex = 0;

        var open = function () {
            var deferred = $q.defer();
            var version = 1;
            var request = indexedDB.open("jobs", version);
            /**
             * @ngdoc method
             * @methodOf request.onupgradeneeded
             * @name onupgradeneeded
             *
             * @description
             * Checks if update is available
             *
             */
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

            /**
             * @ngdoc method
             * @methodOf request.onsuccess
             * @name onsuccess
             *
             * @description
             * on success handler of db operation.
             * Use $q to promisify
             *
             */

            request.onsuccess = function (e) {
                db = e.target.result;
                deferred.resolve();
            };

            /**
             * @ngdoc method
             * @methodOf request.onerror
             * @name onerror
             *
             * @description
             * on error handler of db operation.
             * Use $q to promisify
             *
             */

            request.onerror = function () {
                deferred.reject();
            };

            return deferred.promise;
        };

        /**
         * @ngdoc method
         * @name get
         *
         * @description
         * get all records from store.
         * Use $q to promisify
         *
         */

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


        /**
         * @ngdoc method
         * @name add
         *
         * @description
         * add a new record to store.
         *
         */

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
