var app = angular.module('single-page-app', ['ngRoute']);

app.service('URL', function () {
    /**
     * @return {string}
     */
    this.ApiURL = function () {
        return "https://navigator-import-api.herokuapp.com";
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

app.controller('PushingGPXCtr', ['URL', '$scope', '$http', function (URLProvider, $scope, $http) {
    $scope.text = '';
    $scope.submit = function () {
        if ($scope.text) {
            var url = URLProvider.ApiURL() + '/api/gpx';
            console.log(url);
            $http.post(url, {msg: $scope.text}).
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
}]);
