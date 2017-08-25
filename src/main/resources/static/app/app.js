angular
		.module(
				'app',
				[ 'ui.router', 'backServices', 'ngMaterial', 'ngResource',
						'ngMdIcons', 'mdThemeColors', 'md.data.table',
						'ngAria', 'ngCordova'])
		.controller(
				'EntryController',
				[ '$scope', '$rootScope', '$mdSidenav', 'dmenu',
						function($scope, $rootScope, $mdSidenav, dmenu) {
					
							$scope.apptitle = "An App";
							
							$scope.toggleMenu = function() {
								$mdSidenav('left').toggle();
							}

							$scope.openSideNavPanel = function() {
								$mdSidenav('left').open();
							};

							$scope.closeSideNavPanel = function() {
								$mdSidenav('left').close();
							};

							var vm = this;
							vm.isOpen = isOpen;
							vm.toggleOpen = toggleOpen;
							vm.togg = togg;
							vm.isSectionSelected = isSectionSelected;

							vm.autoFocusContent = false;
							$scope.menu = dmenu;

							function isSectionSelected(section) {							
								return dmenu.isSectionSelected(section);
							}

							function isOpen(section) {
								return dmenu.isSectionSelected(section);
							}

							function togg() {
								$mdSidenav('left').toggle();
							}

							function toggleOpen(section) {
								dmenu.toggleSelectSection(section);
							}
						} ])

		.directive(
				'panelWidget',
				function() {
					return {
						restrict : 'E',
						replace : true,
						transclude : true,
						scope : {
							title : '@',
							template : '@',
							options : '@'
						},
						template : ''
								+ '<section layout-margin class="md-whiteframe-z4 panel-widget">'
								+ '  <md-toolbar md-theme="pink" class="md-hue-1 panel-widget-toolbar ">'
								+ '    <div class="md-toolbar-tools">'
								+ '      <h3 class="panel-widget-tittle">{{title}}</h3>'
								+ '      <span flex></span>'
								+ '      <md-button ng-show="options" ng-click="$showOptions = !$showOptions" class="md-icon-button" aria-label="Show options">'
								+ '        <i class="material-icons">more_vert</i>'
								+ '      </md-button>' + '    </div>'
								+ '  </md-toolbar>'
								+ '  <div ng-include="template"/>'
								+ '</section>',
						compile : function(element, attrs, linker) {
							return function(scope, element) {
								linker(scope, function(clone) {
									element.append(clone);
								});
							};
						}
					};
				})

		.config(
				function($mdThemingProvider, $mdIconProvider) {
					$mdIconProvider.defaultIconSet("svg/avatars.svg", 128)
							.icon("menu", "/img/svg/menu.svg", 24).fontSet(
									'md', 'material-icons');

					$mdThemingProvider.theme('default')
							.primaryPalette('indigo').accentPalette('orange');

					$mdThemingProvider.theme('custom').primaryPalette('green')
							.accentPalette('yellow');

					$mdThemingProvider.theme('pink').primaryPalette('pink')
							.accentPalette('yellow');
				})

		// take all whitespace out of string
		.filter('nospace', function() {
			return function(value) {
				return (!value) ? '' : value.replace(/ /g, '');
			};
		})

		// replace uppercase to regular case
		.filter('humanizeDoc', function() {
			return function(doc) {
				if (!doc)
					return;
				if (doc.type === 'directive') {
					return doc.name.replace(/([A-Z])/g, function($1) {
						return '-' + $1.toLowerCase();
					});
				}

				return doc.label || doc.name;
			};
		})

		.config(
				[		'$stateProvider',
						'$urlRouterProvider',
						function($stateProvider, $urlRouterProvider) {
							$stateProvider
									.state('home', {
										url : '/home',
										templateUrl : 'app/main/home.html'
									})
									.state('sign-up', {
										url : '/sign-up',
										templateUrl : 'app/uaa/sign-up-form.html',
										controller : 'SignUpController',
									})
									.state('sign-up-success', {
										url : '/sign-up/success',
										templateUrl : 'app/uaa/sign-up-success.html'
									})
									.state('forbidden', {
										url : '/forbidden',
										templateUrl : 'app/uaa/forbidden.html'
									})
									.state('login', {
										url : '/login',
										templateUrl : 'app/uaa/login.html',
									    controller: 'AuthLoginController'
									})
									.state('logout', {
										url : '/logout',
										controller : 'AuthLogoutController'
									})
									.state('dashboard',{
										url : '/dashboard',
										templateUrl : 'app/main/dashboard.html',
										//controller : 'DashboardController',
										authenticate : true
									})
									
									// My details
									.state('my-details', {
										url : '/my-details',
										templateUrl : 'app/uaa/myprofile/myprofile.html',
										controller : 'MyprofileController',
										authenticate : true
									})
									
									// Menu
									.state('menus', {
										url : '/menus',
										templateUrl : 'app/menu/menus.html',
										controller : 'MenuController',
									    authenticate: true
									})
									.state('menudetail', {
										url : '/menuDetail/:id/:mode',
										templateUrl : 'app/menu/menu_detail.html',
										controller : 'MenuDetailController',
										authenticate: true
									})
									.state('menudetail/op', {
										url : '/menuDetail/:operation',
										templateUrl : 'app/menu/menu_detail.html',
										controller : 'MenuDetailController',
										authenticate: true
									})
									
									//Users Management
									.state('users', {
										url : '/users',
										templateUrl : 'app/users/users.html',
										controller : 'UsersController',
									    authenticate: true
									})
									.state('userDetail',{
										url : '/userDetail/:id/:mode',
										templateUrl : 'app/users/user_detail.html',
										controller : 'UserDetailController',
										authenticate: true
									})
									.state('userDetail/op',{
										url : '/userDetail/:operation',
										templateUrl : 'app/users/user_detail.html',
										controller : 'UserDetailController',
										authenticate: true
									})

									/*.state(
											'whereamis',
											{
												url : '/whereamis',
												templateUrl : 'app/whereami/whereamis.html',
												controller : 'WhereAmIsController',
												 authenticate: true
											})
									.state(
											'whereamiDetail',
											{
												url : '/whereamiDetail/:id/:mode',
												templateUrl : 'app/whereami/whereami_detail.html',
												controller : 'WhereAmIDetailController',
												 authenticate: true
											})
									.state(
											'whereamiDetail/op',
											{
												url : '/whereamiDetail/:operation',
												templateUrl : 'app/whereami/whereami_detail.html',
												controller : 'WhereAmIDetailController',
												 authenticate: true
											})

									.state(
											'notifications',
											{
												url : '/notifications',
												templateUrl : 'app/notification/notifications.html',
												controller : 'NotificationsController'
											})
									.state(
											'notificationDetail',
											{
												url : '/notificationDetail/:id/:mode',
												templateUrl : 'app/notification/notification_detail.html',
												controller : 'NotificationDetailController'
											})
									.state(
											'notificationDetail/op',
											{
												url : '/notificationDetail/:operation',
												templateUrl : 'app/notification/notification_detail.html',
												controller : 'NotificationDetailController'
											})

									.state(
											'updateLoc',
											{
												url : '/updateLoc',
												templateUrl : 'app/whereami/whereami_websocket.html',
												controller : 'WhereAmIWebSocketController'
											})*/

							$urlRouterProvider.otherwise('home');
							                
						} ]).run( [ '$rootScope', '$state', function($rootScope, $state) {
								$rootScope.$on('$stateChangeStart', function(event, next) {
									// redirect to login page if not logged in
									if (next.authenticate && !$rootScope.currentUser) {
										event.preventDefault(); // prevent current page from loading
										$state.go('forbidden');
									}
								});
							}]);