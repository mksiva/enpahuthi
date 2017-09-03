(function () {
    'use strict';
    angular.module('app')
            .directive('menuLink', function () {
                return {
                    scope: {
                        section: '='
                    },
                    templateUrl: 'app/common/partials/menu-link.tmpl.html',
                    link: function ($scope, $element) {
                        var controller = $element.parent().controller();
                        $scope.isSectionSelected = function (section) {
                            return controller.isSectionSelected(section);
                        };
                        $scope.focusSection = function () {
                            // set flag to be used later when
                            // $locationChangeSuccess calls openPage()
                            controller.togg();
                            controller.autoFocusContent = true;
                        };
                    }
                };
            })
})();