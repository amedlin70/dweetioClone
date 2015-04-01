/*Angular Modules take a name, best practice is lowerCamelCase, and a list of dependancies*/
/*added the second module as a dependancy */
angular.module('app', ['mainModule','ngRoute','ui.router'])
.config(['$urlRouterProvider','$stateProvider',
  function($urlRouterProvider,$stateProvider) {

    $stateProvider
        .state("home", {
          // Use a url of "/" to set a states as the "index".
          url: "/home",
          templateUrl: 'views/home.html'
        })
        $urlRouterProvider.otherwise('/home');
        $urlRouterProvider.when('', '/home');
   
  }])

.run([function () {
	/* Run is when the app gets kicked off*/
}])