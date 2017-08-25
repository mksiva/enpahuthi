(function () {
    'use strict';
    angular.module('app')
            .factory('dmenu', [
                '$location',
                '$rootScope',
                function ($location) {
                    var self;
                    return self = {
                        toggleSelectSection: function (section) {
                            self.openedSection = (self.openedSection === section ? null : section);
                        },
                        isSectionSelected: function (section) {
                            return self.openedSection === section;
                        },
                        selectPage: function (section, page) {
                            page && page.url && $location.path(page.url);
                            self.currentSection = section;
                            self.currentPage = page;
                        }
                    };

                    function sortByHumanName(a, b) {
                        return (a.humanName < b.humanName) ? -1 :
                                (a.humanName > b.humanName) ? 1 : 0;
                    }
                }])

})();