(function () {
    'use strict';
    angular.module('app')
            .directive('menuToggle', ['$timeout', function ($timeout) {
                    return {
                        scope: {
                            section: '='
                        },
                        templateUrl: 'app/common/partials/menu-toggle.tmpl.html',
                        link: function (scope, element) {
                            var controller = element.parent().controller();
                            scope.isOpen = function () {
                                return controller.isOpen(scope.section);
                            };
                            scope.toggle = function () {
                                controller.toggleOpen(scope.section);
                            };
                        }
                    };
                }])
})();