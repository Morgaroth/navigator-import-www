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
    $scope.submit = function () {
        if ($scope.text) {
            var url = URLProvider.ApiURL() + '/api/gpx';
            console.log(url);
            $http.post(url, $scope.text).
                success(function (data, status, headers, config) {
                    console.log("success data: " + data);
                    console.log("success status: " + status);
                    console.log("success headers: " + headers);
                    console.log("success config: " + config);
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
                    console.log("failure: data: " + data);
                    console.log("failure: status: " + status);
                    console.log("failure: headers: " + headers);
                    console.log("failure: config: " + config);
                    alert("error during pushing:\n" + data.error)
                });
            $scope.text = '';
        }
    };
}]);
