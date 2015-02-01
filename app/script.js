var app = angular.module('single-page-app', ['ngRoute']);

app.service('URL', function () {
    /**
     * @return {string}
     */
    this.ApiURL = function () {
        return "https://navigator-import-api.herokuapp.com";
        //return "http://localhost:8000";
    }
});

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'home.html'
        });
    //.when('/about', {
    //    templateUrl: 'about.html'
    //});
});

app.controller('PushingGPXCtr', ['URL', '$scope', '$http', '$timeout', function (URLProvider, $scope, $http, $timeout) {
    $scope.isImage = function () {
        //console.log("isimage " + $scope.someImage);
        return $scope.someImage !== undefined;
    };
    $scope.someImage = undefined;
    $scope.text = '';
    $scope.submitGpx = function () {
        if ($scope.text) {
            var url = URLProvider.ApiURL() + '/api/gpx';
            console.log(url);
            $http.post(url, $scope.text).
                success(function (data, status, headers, config) {
                    console.log("gpx success data: " + data);
                    console.log("gpx success status: " + status);
                    console.log("gpx success headers: " + headers);
                    console.log("gpx success config: " + config);
                    $timeout(function () {
                        //console.log("timeout");
                        $scope.$apply(function () {
                            $scope.$parent.someImage = data.image;
                            //console.log("setted image " + $scope.$parent.someImage);
                        });
                    }, 50);
                    //alert("success of pushing code")
                    //$scope.someImage = data;

                }).
                error(function (data, status, headers, config) {
                    console.log("gpx failure: data: " + data);
                    console.log("gpx failure: status: " + status);
                    console.log("gpx failure: headers: " + headers);
                    console.log("gpx failure: config: " + config);
                    alert("gpx error during pushing:\n" + data.error)
                });
            $scope.text = '';
        }
    };
    $scope.submitGoogle = function () {
        if ($scope.text) {
            var url = URLProvider.ApiURL() + '/api/google';
            console.log(url);
            $http.post(url, $scope.text).
                success(function (data, status, headers, config) {
                    console.log("google success data: " + data);
                    console.log("google success status: " + status);
                    console.log("google success headers: " + headers);
                    console.log("google success config: " + config);
                    $timeout(function () {
                        //console.log("timeout");
                        $scope.$apply(function () {
                            $scope.$parent.someImage = data.image;
                            //console.log("setted image " + $scope.$parent.someImage);
                        });
                    }, 50);
                    //alert("success of pushing code")
                    //$scope.someImage = data;

                }).
                error(function (data, status, headers, config) {
                    console.log("google failure: data: " + data);
                    console.log("google failure: status: " + status);
                    console.log("google failure: headers: " + headers);
                    console.log("google failure: config: " + config);
                    alert("google error during pushing:\n" + data.error)
                });
            $scope.text = '';
        }
    };
}]);
