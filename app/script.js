var app = angular.module('single-page-app', ['ngRoute']);


app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/home.html'
        });
    //.when('/about', {
    //    templateUrl: 'about.html'
    //});
});

app.controller('PushingGPXCtr', function ($scope, $http) {
    $scope.text = '';
    $scope.submit = function () {
        if ($scope.text) {
            $http.post('/someUrl', {msg: $scope.text}).
                success(function (data, status, headers, config) {
                    console.log("success data: " + data);
                    console.log("success status: " + status);
                    console.log("success headers: " + headers);
                    console.log("success config: " + config);
                    alert("success of pushing code")
                }).
                error(function (data, status, headers, config) {
                    console.log("failure: data: " + data);
                    console.log("failure: status: " + status);
                    console.log("failure: headers: " + headers);
                    console.log("failure: config: " + config);
                    alert("failure of pushing code")
                });
            $scope.text = '';
        }
    };
});
