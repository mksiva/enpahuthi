angular
        .module('app')
        .controller('AuthLoginController', ['$scope', 'AuthService', '$state','$rootScope',
            function ($scope, AuthService, $state, $rootScope) {
                $scope.user = {};

                $scope.login = function () {
                    AuthService.login($scope.user.userName, $scope.user.password)
                            .then(function () {                            	
                            	if($rootScope.currentUserNull && $rootScope.currentUserNull.error){           
                            		//console.log('error!, redirect to login page.')
                            		$state.go('login');
                            	} else{
                            		$state.go('dashboard');
                            	}                                
                            }
                            , function (error) {
                            	//console.log('error!, redirect to login page2.')
                                $scope.errmsg = 'Invalid Username/password, try again with valid credentials!';
                                $state.go('login');
                            });
                };
            }])
        .controller('AuthLogoutController', ['$scope', 'AuthService', '$state',
            function ($scope, AuthService, $state) {
                AuthService.logout();/*
                        .then(function () {
                            $state.go('home');
                        });*/
                $state.go('home');
                
            }])
        .controller('SignUpController', ['$scope', 'AuthService', '$state',
            function ($scope, AuthService, $state) {
                $scope.user = {
                };

                $scope.register = function () {
                    AuthService.register( $scope.user.userName, $scope.user.password, $scope.user.email, 
                    		$scope.user.fullName, $scope.user.phone, $scope.user.addressLine1, $scope.user.addressLine2,
                    		$scope.user.state, $scope.user.country, $scope.user.zip)
                            .then(
                                    function (result) {
                                        $state.transitionTo('sign-up-success');
                                    }, function (error) {
                                $scope.errmsg = 'User already exists,Try another username.';
                                $state.go('sign-up');
                            });
                };
            }]);
