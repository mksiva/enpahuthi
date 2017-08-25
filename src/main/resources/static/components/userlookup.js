var app = angular.module('app');

app.directive('userLookup', function () {
    return {
        restrict: 'E',
        templateUrl: 'app/common/userLookup.html',
        scope: {
            users: '=' ,
            title: '='
        },
        //replace: true        // replace original markup with template
        //transclude: false,    // do not copy original HTML content 
        controller: ["$scope", "$rootScope", "User", "$q", "$timeout", function ($scope, $rootScope, User, $q, $timeout) {
                var usedKeys = {};
                var suggests;
                $scope.selectedItem = null;
                $scope.searchText = null;
                $scope.querySearch = querySearch;
                $scope.selectedUser = {};
                $scope.allUsers = [];
                $scope.users = [];
                $scope.user = {};
                //$scope.title = {};                
                $scope.preFetchUsers = function () {
                    User.findByOwner({
         				where : {
        					owner : $rootScope.currentUser.email
        				}
        			}).$promise
                            .then(function (result) {
                                $scope.allUsers = result;
                            });
                };

                $scope.preFetchUsers();

                function fetchUsers(query) {
                    var users = loadUsers();
                    var defer = $q.defer();
                    $timeout(function () {
                        suggests = users;
                        defer.resolve(users);
                    }, Math.random() * 1000, false);
                    return defer.promise;
                }

                function querySearch(query) {
                    if (suggests) {
                        return suggests.filter(createFilterFor(query));
                    } else {
                        return fetchUsers(query).then(function (suggests) {
                            return suggests.filter(createFilterFor(query));
                        });
                    }
                }

                function createFilterFor(query) {
                    var lowercaseQuery = angular.lowercase(query);
                    return function filterFn(user) {
                        if (usedKeys[user.email]) {
                            return false;
                        }
                        if (!user._lowername)
                            user._lowername = '';
                        if (!user._loweremail)
                            user._loweremail = '';
                        if (lowercaseQuery) {
                            return (user._loweremail.indexOf(lowercaseQuery) === 0) || (user._lowername.indexOf(lowercaseQuery, 0) === 0);
                        }
                        return true;
                    };
                }

                function loadUsers() {
                    return $scope.allUsers.map(function (user) {
                        if (user.name)
                            user._lowername = user.name.toLowerCase();
                        if (user.email)
                            user._loweremail = user.email.toLowerCase();
                        return user;
                    });
                }

                Array.prototype.contains = function(obj) {
                    var i = this.length;
                    while (i--) {
                        if (this[i].email === obj.email) {
                            return true;
                        }
                    }
                    return false;
                }
                
                $scope.selectedUserChange = selectedUserChange;
                function selectedUserChange(user) {
                    if (user != null) {
                        //$scope.selectedUser = user;
                        //$scope.user = user;
                        if($scope.users){
                        	if(!$scope.users.contains(user)){
                            	$scope.users.push(user);
                            }
                        } else{
                        	$scope.users.push(user);
                        }
                        
                    }
                    $scope.searchText = undefined;
                }
                $scope.removeUser = function (ev, user) {
                	var index = $scope.users.indexOf(user);
                	$scope.users.splice(index, 1);                	
                }
            }], // controller ends

    }; // return

})
