angular
.module('app')
.controller('MyprofileController', ['$scope','$state','User','$rootScope','$location','AuthService',
    function ($scope, $state, User, $rootScope, $location, AuthService) {
		//console.log("success......")
		$scope.user = {};
		$scope.roles = AuthService.getRoles();
		$scope.selectedRoles = [];
		
		User.findByUsername({
					userName : $rootScope.currentUser.currentUserId
		})	.$promise
			.then(function(result) {
				$scope.user = result;
				$scope.selectedRoles = $scope.user.roles;
		/*		$rootScope.currentUser.email = result.email;
				$rootScope.currentUser.fullName = result.fullName;
				$rootScope.currentUser.phone = result.phone;*/		
		});
		
		/*
		$scope.selected = [1];
		
		$scope.isChecked = function() {
		    return $scope.selected.length === $scope.user.roles.length;
		};
		
		$scope.toggle = function (item, list) {
		    var idx = list.indexOf(item);
		    if (idx > -1) {
		      list.splice(idx, 1);
		    }
		    else {
		      list.push(item);
		    }
		  };
		  
		  $scope.exists = function (item, list) {
			    return list.indexOf(item) > -1;
			  };
			  
		  $scope.isIndeterminate = function() {
		    return ($scope.selected.length !== 0 && $scope.selected.length !== $scope.user.roles.length);
		  };
	  
		  $scope.toggleAll = function() {
			    if ($scope.selected.length === $scope.user.roles.length) {
			      $scope.selected = [];
			    } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
			      $scope.selected = $scope.user.roles.slice(0);
			    }
		  };
		*/
		
		$scope.addOrUpdateUser = function() {
			console.log('updating user...')
			
			$scope.user.roles = $scope.selectedRoles;
			
			User.updateOrCreate({
				userName : $rootScope.currentUser.currentUserId				
				
			}, $scope.user)
				.$promise
				.then(function(user) {
					console.log('updated user...')
					$rootScope.currentUser.email = user.email;
					$rootScope.currentUser.fullName = user.fullName;
					$rootScope.currentUser.phone = user.phone;
					$scope.user = '';
					$location.path('/dashboard');
			});
		};
		
    }]);