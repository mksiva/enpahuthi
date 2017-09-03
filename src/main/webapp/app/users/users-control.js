(function() {

	angular.module('app').controller(
			'UsersController',
			[ '$scope', 'User', '$mdDialog', '$mdSidenav', '$mdBottomSheet',
					'$log', '$q', '$timeout', '$location', '$rootScope',
					UsersController ]);
	
	angular.module('app').controller(
			'UserDetailController',
			[ '$scope','$state','User','$rootScope','$location','$stateParams','AuthService',
					UserDetailController ]);

	function UserDetailController($scope, $state, User, $rootScope, $location, $stateParams, AuthService) {
		
		$scope.user = {};
		$scope.user.roles = [];
		$scope.newuser = false;
		
		$scope.roles = AuthService.getRoles();
		
		$scope.selectedRoles = [];
		
		$scope.load = function(id) {
			User.findByUsername({
				userName : id
			}).$promise.then(function(result) {
				$scope.user = result;
				$scope.selectedRoles = $scope.user.roles;
			});
		};
		
		if ('add' == $stateParams.operation) {
			$scope.user = {};
			$scope.newuser = true;
		} else {
			$scope.newuser = false;
			$scope.load($stateParams.id);
		}
				
		$scope.addOrUpdateUser = function() {
			
			$scope.user.roles = $scope.selectedRoles;
			
			if($scope.newuser){
				console.log('creating user...');
				$scope.user.active = true;
				User.create($scope.user)
					.$promise
					.then(
						 function (user) {
							console.log('created the user...');						
							$scope.user = '';
							$location.path('/users');
	                     }, function (error) {
	                    	 $scope.errmsg = 'User already exists,Try another username.';
	                    	 $state.go('/userDetail/add');
	                     }
					);
			} else{
				console.log('updating user...');
				User.updateOrCreate({
					userName : $scope.user.userName
				}, $scope.user)
					.$promise
					.then(
					 function (user) {
							console.log('updated the user...');						
							$scope.user = '';
							$location.path('/users');
	                     }, function (error) {
	                    	 $scope.errmsg = 'User already exists,Try another username.';
	                    	 $state.go('/userDetail/' + $scope.user.userName + '/false');
	                     }
					);
				
			}
			
		};
	}

	function UsersController($scope, User, $mdDialog, $mdSidenav,
			$mdBottomSheet, $log, $q, $timeout, $location, $rootScope) {
		// var self = this;
		$scope.title = 'Users';
		$scope.total = 0;
		$scope.itemsPerPage = 10;
		$scope.currentPage = 0;
		$scope.pagedUsers = [];
		$scope.loading = true;

		$scope.selected = [];
		$scope.limitOptions = [ 5, 10, 15 ];

		getUsers($scope.itemsPerPage, $scope.currentPage);
		getUserCount();

		$scope.options = {
			rowSelection : true,
			multiSelect : true,
			autoSelect : true,
			decapitate : false,
			largeEditDialog : false,
			boundaryLinks : false,
			limitSelect : true,
			pageSelect : true
		};

		$scope.query = {
			order : '-fullName',
			limit : 10,
			page : 1
		};

		$scope.toggleLimitOptions = function() {
			$scope.limitOptions = $scope.limitOptions ? undefined
					: [ 5, 10, 15 ];
		};

		$scope.loadMore = function() {
			$scope.currentPage++;
			getUsers($scope.itemsPerPage,
					($scope.currentPage * $scope.itemsPerPage));
			$scope.promise = $timeout(function() {
			}, 200);
		}

		$scope.logItem = function(item) {
			// console.log(item.title, 'was selected');
		};

		$scope.logOrder = function(order) {
			// console.log('order: ', order);
		};

		$scope.logPagination = function(page, limit) {
			// console.log('page: ', page);
			// console.log('limit: ', limit);
		}

		$scope.nextPageDisabledClass = function() {
			return $scope.currentPage === (Math.ceil($scope.total
					/ $scope.itemsPerPage)) - 1 ? "disabled" : "";
		};

		$scope.pageCount = function() {
			return Math.ceil($scope.total / $scope.itemsPerPage);
		};

		$scope.deleteSelected = function(ev) {
			var confirm = $mdDialog.confirm().title(
					'Would you like to delete the selected Users?').content(
					'You cannot revert this action.!.').ariaLabel('Remove')
					.targetEvent(ev).ok('Ok').cancel('Cancel');
			$mdDialog.show(confirm).then(function() {
				var cnt = 0;
				var len = $scope.selected.length;

				$scope.selected.forEach(function(user) {
					User.deleteByUserName({userName : user.userName}).$promise.then(function(err, result) {
						if (err)
							console.log(err);

						// console.log('deleted');
					});
					if (cnt == len - 1) {
						$scope.pagedUsers = [];
						$scope.currentPage = 0;
						$scope.selected = [];
						getUserCount();
						getUsers($scope.itemsPerPage, 0);
					}
					cnt++;
				});

			});
		}

		$scope.deleteConfirm = function(ev, user) {
			var confirm = $mdDialog.confirm().title(
					'Would you like to delete the User [' + user.userName
							+ ']?').content('You cannot revert this action.!.')
					.ariaLabel('Remove').targetEvent(ev).ok('Ok').cancel(
							'Cancel');
			$mdDialog.show(confirm).then(function() {
				User.deleteByUserName({userName : user.userName})
					.$promise
					.then(function(result) {
						$scope.pagedUsers = [];
						$scope.currentPage = 0;
						$scope.selected = [];
						getUserCount();
						getUsers($scope.itemsPerPage, 0);
				});
			});
		};

		// *********************************
		// Internal methods
		// *********************************
		function getUserCount() {
			User.count()
				.$promise
				.then(function(result) {
				$scope.total = result.count;
			});
		}

		function getUsers(offsetLimit, skipLimit) {
			User.find()
				.$promise
				.then(function(result) {
					//console.log(result);
					var newItems = result.data;
					$scope.pagedUsers = $scope.pagedUsers.concat(newItems);
					$scope.loading = false;
			});
		}
	}
})();