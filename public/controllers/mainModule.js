(function(){
angular.module('mainModule', [])

.config([function () {
}])

.run([function () {
}])

.controller('MainCtrl', ['$scope','$http', function ($scope,$http) {
    $scope.dweetPost = {};
    $scope.dweetGet = {};
    $scope.dweetsGet = {};

    // For the toggling of the method bodys
    $scope.mainHelper = [];
    $scope.mainHelper.postDweet = true;
    $scope.mainHelper.postDweetRes = true;
    $scope.mainHelper.getDweet = true;
    $scope.mainHelper.getDweetRes = true;
    $scope.mainHelper.getDweets = true;
    $scope.mainHelper.getDweetsRes = true;


    $scope.postDweet = function(dweet) {
        $http.post('/dweet/for/' + dweet.thing, dweet.content).success(function(data, status, headers, config) {
            $scope.mainHelper.postDweetRes = false;

            $scope.dweetPost.body = data;
            $scope.dweetPost.code = status;
            $scope.dweetPost.headers = headers();
            $scope.dweetPost.url = config.url;
        });
    };

    $scope.getDweets = function(dweet) {
        $http.get('/get/dweets/for/' + dweet.thing).success(function(data, status, headers, config) {
            $scope.mainHelper.getDweetsRes = false;

            $scope.dweetsGet.body = data;
            $scope.dweetsGet.code = status;
            $scope.dweetsGet.headers = headers();
            $scope.dweetsGet.url = config.url;
        });
    }

    $scope.getDweet = function(dweet) {
        $http.get('/get/latest/dweet/for/' + dweet.thing).success(function(data, status, headers, config) {
            $scope.mainHelper.getDweetRes = false;

            $scope.dweetGet.body = data;
            $scope.dweetGet.code = status;
            $scope.dweetGet.headers = headers();
            $scope.dweetGet.url = config.url;
        });
    }
}])


})();