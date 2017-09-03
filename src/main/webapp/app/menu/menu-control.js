(function () {
    angular.module('app')
            .controller('MenuController', [
                '$scope', '$stateParams', '$rootScope', '$mdMedia', 'Menu', '$mdDialog', '$mdSidenav', '$mdBottomSheet', '$log', '$q', '$timeout', '$location',
                MenuController
            ]);

    angular.module('app')
            .controller('MenuDetailController', [
                '$scope', '$rootScope', '$stateParams', 'Menu', '$log', '$location',
                MenuDetailController
            ]);

    function MenuController($scope, $stateParams, $rootScope, $mdMedia, Menu, $mdDialog, $mdSidenav, $mdBottomSheet, $log, $q, $timeout, $location) {
        $scope.title = 'Menus';
        $scope.total = 0;
        $scope.itemsPerPage = 15;
        $scope.currentPage = 0;
        $scope.pagedMenus = [];
        $scope.loading = true;

        //$scope.screenid = $stateParams.screenid;        
        //$scope.accessControl =  $rootScope.currentUser.permissions[$stateParams.screenid];

        $scope.selected = [];
        $scope.menus = [];
        $scope.limitOptions = [5, 10, 15];

        getMenus($scope.itemsPerPage, $scope.currentPage);
        getMenuCount();

        $scope.options = {
            rowSelection: true,
            multiSelect: true,
            autoSelect: true,
            decapitate: false,
            largeEditDialog: false,
            boundaryLinks: false,
            limitSelect: true,
            pageSelect: true
        };

        $scope.getStatuses = function () {
            return ['active', 'inactive'];
        };
        
        $scope.getTypes = function () {
            return ['link', 'toggle', 'heading'];
        };

        $scope.deleteSelected = function (ev) {
            var confirm = $mdDialog.confirm()
                    .title('Would you like to delete the selected menu?')
                    .content('You cannot revert this action.!.')
                    .ariaLabel('Remove')
                    .targetEvent(ev)
                    .ok('Ok')
                    .cancel('Cancel');
            $mdDialog.show(confirm).then(function () {
                var cnt = 0;
                var len = $scope.selected.length;

                $scope.selected.forEach(function (item) {
                    Menu.removeById(item)
                            .$promise
                            .then(function (err, result) {
                                if (err)
                                    console.log(err);
                            });
                    if (cnt == len - 1) {
                        $scope.pagedMenus = [];
                        $scope.currentPage = 0;
                        $scope.selected = [];
                        getMenuCount();
                        getMenus($scope.itemsPerPage, 0);
                    }
                    cnt++;
                });
            });
        }

        $scope.query = {
            order: 'title',
            limit: 15,
            page: 1
        };

        $scope.toggleLimitOptions = function () {
            $scope.limitOptions = $scope.limitOptions ? undefined : [5, 10, 15];
        };
        
        $scope.loadMore = function () {
            $scope.currentPage++;
            getMenus($scope.itemsPerPage, ($scope.currentPage * $scope.itemsPerPage));
            $scope.promise = $timeout(function () {
            }, 200);
        }

        $scope.logItem = function (item) {
            // console.log(item.title, 'was selected');
        };

        $scope.logOrder = function (order) {
            //console.log('order: ', order);
        };

        $scope.logPagination = function (page, limit) {
            // console.log('page: ', page);
            // console.log('limit: ', limit);
        }

        $scope.nextPageDisabledClass = function () {
            return $scope.currentPage === (Math.ceil($scope.total / $scope.itemsPerPage)) - 1 ? "disabled" : "";
        };

        $scope.pageCount = function () {
            return Math.ceil($scope.total / $scope.itemsPerPage);
        };

        $scope.deleteConfirm = function (ev, menu) {
            var confirm = $mdDialog.confirm()
                    .title('Would you like to delete the menu [' + menu.title + ']?')
                    .content('You cannot revert this action.!.')
                    .ariaLabel('Remove')
                    .targetEvent(ev)
                    .ok('Ok')
                    .cancel('Cancel');
            $mdDialog.show(confirm).then(function () {
                Menu.removeById(menu)
                        .$promise
                        .then(function (result) {
                            $scope.currentPage = 0;
                            $scope.pagedMenus = [];
                            $scope.selected = [];
                            getMenuCount();
                            getMenus($scope.itemsPerPage, 0);
                            //$location.path('/menus');
                        });
            });
        };

        // *********************************
        // Internal methods
        // *********************************
        function getMenuCount() {
            Menu.count()
                    .$promise
                    .then(function (result) {
                        $scope.total = result.count;
                    });

        }

        function getMenus(offsetLimit, skipLimit) {
            Menu
                    .find({filter: {limit: offsetLimit, skip: skipLimit}})
                    .$promise
                    .then(function (results) {
                        var newItems = results;
                        $scope.pagedMenus = $scope.pagedMenus.concat(newItems);
                        $scope.loading = false;
                    });
        }
    }

    /**
     * Menu detail Controller 
     * @param $scope
     * @param $mdSidenav
     * @param appService
     * @constructor
     */
    function MenuDetailController($scope, $rootScope, $stateParams, Menu, $log, $location) {
        $scope.menu = {};
        $scope.viewMode = $stateParams.mode;
        $scope.isUpdate = false;
        $scope.status = '';

        $scope.getTypes = function () {
            return ['link', 'toggle', 'heading'];
        };
        
        $scope.load = function (id) {
            Menu.findOne({filter: {where: {id: id}}})
                    .$promise
                    .then(function (result) {
                        $scope.menu = result;
                    });
        };

        $scope.clear = function () {
            $scope.menu = {};
            $scope.viewMode = {};
        }

        if ('add' == $stateParams.operation) {
            $scope.menu = {};
            $scope.menu.status = 'active';
            $scope.menu.forAdmin = false;
        } else {
            $scope.load($stateParams.id);
        }

        $scope.addOrUpdateMenu = function () {            
            Menu.updateOrCreate($scope.menu)
                    .$promise
                    .then(function (menu) {
                        $scope.menu = '';
                        $location.path('/menus');
                    });
        };
    }

})();

