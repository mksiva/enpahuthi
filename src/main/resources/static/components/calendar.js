var JThemeColors = angular.module('mdThemeColors', ['ngMaterial']).config(['$provide', '$mdThemingProvider', function ($provide, $mdThemingProvider) {
        var colorStore = {};

        //fetch the colors out of the themeing provider
        Object.keys($mdThemingProvider._PALETTES).forEach(
                // clone the pallete colors to the colorStore var
                        function (palleteName) {
                            var pallete = $mdThemingProvider._PALETTES[palleteName];
                            var colors = [];
                            colorStore[palleteName] = colors;
                            Object.keys(pallete).forEach(function (colorName) {
                                // use an regex to look for hex colors, ignore the rest
                                if (/#[0-9A-Fa-f]{6}|0-9A-Fa-f]{8}\b/.exec(pallete[colorName])) {
                                    colors[colorName] = pallete[colorName];
                                }
                            });
                        });

                /**
                 * mdThemeColors service
                 *
                 * The mdThemeColors service will provide easy, programmatic access to the themes that have been configured
                 * So that the colors can be used according to intent instead of hard coding color values.
                 *
                 *
                 * So the theme can change but the code doesn't need to.
                 */
                $provide.factory('mdThemeColors', [
                    function () {
                        var service = {};

                        var getColorFactory = function (intent) {
                            return function () {
                                var colors = $mdThemingProvider._THEMES['default'].colors[intent];
                                var name = colors.name
                                // Append the colors with links like hue-1, etc
                                colorStore[name].default = colorStore[name][colors.hues['default']]
                                colorStore[name].hue1 = colorStore[name][colors.hues['hue-1']]
                                colorStore[name].hue2 = colorStore[name][colors.hues['hue-2']]
                                colorStore[name].hue3 = colorStore[name][colors.hues['hue-3']]
                                return colorStore[name];
                            }
                        }

                        /**
                         * Define the getter methods for accessing the colors
                         */
                        Object.defineProperty(service, 'primary', {
                            get: getColorFactory('primary')
                        });

                        Object.defineProperty(service, 'accent', {
                            get: getColorFactory('accent')
                        });

                        Object.defineProperty(service, 'warn', {
                            get: getColorFactory('warn')
                        });

                        Object.defineProperty(service, 'background', {
                            get: getColorFactory('background')
                        });

                        return service;
                    }
                ]);
            }]);

var JDatePicker = angular.module('JDatePicker', ['ngMaterial', 'mdThemeColors']);
JDatePicker.factory('JDatePickerCount', function () {
    var instanceCount = 0;

    var _Increment = function () {
        instanceCount++;
    }

    var _GetCount = function () {
        return instanceCount;
    }

    return {
        GetCount: _GetCount,
        Increment: _Increment
    }
});

JDatePicker.directive('jMdDatepicker', function ($timeout, $filter, $mdDialog, $compile, mdThemeColors, $mdMedia, JDatePickerCount) {
    return {
        restrict: 'E',
        replace: false,
        require: 'ngModel',
        scope: {
            ngModel: '=',
            ngDisabled: '=',
            placeholder: '@',
            orientation: '@'
        },
        template: '<md-input-container md-no-float>\
	<label ng-attr-for="jmddpcomp-{{serial}}">{{placeholder}}</label>\
	<input type="text" ng-attr-id="jmddpcomp-{{serial}}" ng-model="SelectedDateText" ng-click="PopupDialogComponent($event, SelectedDate)" />\
</md-input-container>',
        link: function ($scope, $element, $attr, $ctrl) {
            function formatter(value) {
                if (value) {
                    return value;
                }
            }

            function parser(value) {
                if (value && angular.isDate(value))
                    return value;
                else
                    return undefined;
            }

            // Check to see if this is the first instance of the date picker on this page. If it is, we must inject appropriate styling templating to the HEAD element. If it isn't, skip this part.
            if (JDatePickerCount.GetCount() === 0) {
                // Grab a handle to the HEAD element
                var head = angular.element(document.querySelector('HEAD'));

                var style = angular.element('<style></style>');

                // Add the styling code now...
                var styleText = 'div.monthpanel .md-button.jmd-fab:hover {\
background-color : {{mdThemeColors.primary[\'400\']}} !important;\
color: #fff !important;\
}\
div.monthpanel .md-button.jmd-fab.selected {\
background-color : {{mdThemeColors.primary[\'500\']}} !important;\
color: #fff !important;\
}\
div.displaypanel div.titleheader {\
background-color : {{mdThemeColors.primary[\'700\']}};\
}\
div.displaypanel {\
background-color: {{mdThemeColors.primary[\'500\']}};\
}\
div.selectionpanel div.titleheader .md-button.navbutton div.leftarrow {\
border-right-color: {{mdThemeColors.primary[\'500\']}};\
}\
div.selectionpanel div.titleheader .md-button.navbutton div.rightarrow {\
border-left-color: {{mdThemeColors.primary[\'500\']}};\
}\
div.monthpanel .md-button.jmd-fab.today {\
color: {{mdThemeColors.primary[\'500\']}};\
}\
div.actionpanel .md-button {\
color: {{mdThemeColors.primary[\'500\']}};\
}';

                // Put the styling code into the element
                style.text(styleText);

                // Attach the style element to the head
                head.append(style);

                $compile(head.contents())($scope);
            }

            // Up the count of the datepicker instances
            JDatePickerCount.Increment();

            $ctrl.$formatters.push(formatter);
            $ctrl.$parsers.push(parser);

            $scope.SelectedDate = $scope.ngModel;
            $scope.serial = Math.floor(Math.random() * 10000000000000000);

            $scope.mdThemeColors = mdThemeColors;

            $scope.$watch('ngModel', function (newValue) {
                $scope.SelectedDate = $scope.ngModel;
            }, true);

            $scope.$watch('SelectedDate', function (newValue) {
                if (newValue != null) {
                    $scope.SelectedDateText = $filter('date')(newValue, 'M/d/yyyy');
                } else {
                    $scope.SelectedDateText = null;
                }
            }, true);

            $scope.PopupDialogComponent = function ($event, startval) {
                $event.preventDefault();

                // If currently disabled by the parent, cancel this attempt.
                if ($scope.ngDisabled)
                    return;

                var dlgCtrl = function ($scope, $mdDialog, dlgOrientation, serial) {
                    if (startval == null)
                        startval = new Date();
                    $scope.DialogSelectedDate = startval;
                    $scope.originalOrientation = dlgOrientation;
                    $scope.serial = serial;
                    $scope.currentOrientation = ($mdMedia('(max-width: 655px)') ? 'portrait' : $scope.orientation);

                    $scope.$watch(function () {
                        return $mdMedia('(max-width: 655px)');
                    }, function (isSmall) {
                        if (isSmall) {
                            // In small profile, will be portrait no matter what was originally specified
                            $scope.currentOrientation = 'portrait';
                        } else {
                            $scope.currentOrientation = $scope.originalOrientation;
                        }
                    });

                    $scope.NowClick = function ($event) {
                        $event.preventDefault();

                        $timeout(function () {
                            $scope.DialogSelectedDate = new Date();
                        });
                    };

                    $scope.CancelClick = function ($event) {
                        $event.preventDefault();

                        $mdDialog.cancel();
                    };

                    $scope.SaveClick = function ($event) {
                        $event.preventDefault();

                        $mdDialog.hide($scope.DialogSelectedDate);
                    };
                };

                var dlgOpts = {
                    template: '<md-dialog ng-class="{\'portrait\' : currentOrientation == \'portrait\'}" ng-attr-id="mddpdlg-{{serial}}">\
	<div class="popupDialogContent" style="overflow:hidden">\
		<j-md-datepicker-component2 ng-model="DialogSelectedDate" orientation="' + $scope.orientation + '" submitclick="SaveClick" cancelclick="CancelClick"></j-md-datepicker-component2>\
	</div>\
</md-dialog>',
                    controller: dlgCtrl,
                    targetEvent: $event,
                    locals: {
                        dlgOrientation: $scope.orientation,
                        serial: $scope.serial
                    },
                    onComplete: function () {
                        document.getElementById('mddpdlg-' + $scope.serial).focus();
                    }
                };

                $mdDialog.show(dlgOpts).then(function (answer) {
                    $scope.ngModel = answer;
                });
            }
        }
    }
});

JDatePicker.directive('jMdDatepickerComponent2', ['$timeout', '$compile', 'mdThemeColors', '$mdMedia', function ($timeout, $compile, mdThemeColors, $mdMedia) {
        return {
            restrict: 'E',
            replace: false,
            require: 'ngModel',
            transclude: true,
            scope: {
                ngModel: '=',
                orientation: '@',
                submitclick: '&',
                cancelclick: '&'
            },
            link: function ($scope, $element, $attr, $ctrl) {
                $scope.serial = Math.floor(Math.random() * 10000000000000000);

                $scope.CalculateMonth = function () {
                    var tempday = new Date($scope.selYear, $scope.selMonth, 1);
                    var fday = tempday.getDay();
                    var ldaynum = new Date($scope.selYear, $scope.selMonth + 1, 0).getDate();

                    $scope.selFirstDayOfMonth = fday;
                    $scope.selLastDateOfMonth = ldaynum;

                    var selbtn = document.querySelector('.jmddp-' + $scope.serial + ' [Day="' + $scope.selDay + '"]');
                    var btn = angular.element(selbtn);
                    if (!btn.hasClass('md-button'))
                        btn = btn.parent();

                    btn.addClass('selected');

                    if ($scope.selButton != null && $scope.selButton[0] != btn[0]) {
                        $scope.selButton.removeClass('selected');
                    }
                    $scope.selButton = btn;

                    // If the currently selected month and year match today's month and year, ensure that the matching day button has the 'today' class; otherwise, remove it.
                    var todaybtn = angular.element(document.querySelector('.jmddp-' + $scope.serial + ' [Day="' + $scope.todaysDate + '"]'));
                    if ($scope.todaysMonth == $scope.selMonth && $scope.todaysYear == $scope.selYear) {
                        todaybtn.addClass('today');
                    } else {
                        todaybtn.removeClass('today');
                    }
                };

                $scope.mdThemeColors = mdThemeColors;
                $scope.Today = new Date();
                $scope.todaysDate = $scope.Today.getDate();
                $scope.todaysMonth = $scope.Today.getMonth();
                $scope.todaysYear = $scope.Today.getFullYear();

                if ($scope.ngModel == null)
                    $scope.ngModel = $scope.Today;
                $scope.selDate = $scope.ngModel;
                $scope.selMonth = $scope.selDate.getMonth();
                $scope.selDay = $scope.selDate.getDate();
                $scope.selYear = $scope.selDate.getFullYear();
                $scope.selButton = null;

                $scope.CalculateMonth();

                if ($scope.orientation == null)
                    $scope.orientation = 'landscape';

                $scope.Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                $scope.ShortMonths = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

                $scope.DayClick = function ($event, day) {
                    $event.preventDefault();

                    var btn = angular.element($event.srcElement);
                    if (!btn.hasClass('md-button'))
                        btn = btn.parent();

                    btn.addClass('selected');

                    if ($scope.selButton != null) {
                        $scope.selButton.removeClass('selected');
                    }
                    $scope.selButton = btn;

                    $scope.selDate = new Date($scope.selYear, $scope.selMonth, day);
                    $scope.selYear = $scope.selDate.getFullYear();
                    $scope.selMonth = $scope.selDate.getMonth();
                    $scope.selDay = $scope.selDate.getDate();

                    $scope.ngModel = $scope.selDate;
                    //$scope.OKClick($event);
                };

                $scope.NowClick = function ($event) {
                    $event.preventDefault();

                    $scope.selDate = new Date();
                    $scope.selYear = $scope.selDate.getFullYear();
                    $scope.selMonth = $scope.selDate.getMonth();
                    $scope.selDay = $scope.selDate.getDate();

                    $scope.CalculateMonth($scope.selMonth);
                };

                $scope.OKClick = function ($event) {
                    $scope.submitclick()($event, $scope.selDate);
                };

                $scope.CancelClick = function ($event) {
                    $scope.cancelclick()($event);
                };

                $scope.$watch('ngModel', function (newValue) {
                    if (newValue == null)
                        return;
                    $scope.selDate = newValue;
                    $scope.selYear = $scope.selDate.getFullYear();
                    $scope.selMonth = $scope.selDate.getMonth();
                    $scope.selDay = $scope.selDate.getDate();

                    $timeout(function () {
                        $scope.CalculateMonth($scope.selMonth);
                    });
                });

                $scope.$watch('selMonth', function (newValue) {
                    $scope.selDate = new Date($scope.selYear, $scope.selMonth, $scope.selDay);
                    $scope.CalculateMonth($scope.selMonth);
                });

                $scope.$watch('selYear', function (newValue) {
                    $scope.selDate = new Date($scope.selYear, $scope.selMonth, $scope.selDay);

                    $scope.CalculateMonth($scope.selMonth);
                });

                $scope.currentOrientation = ($mdMedia('(max-width: 655px)') ? 'portrait' : $scope.orientation);
                $scope.firstLead = ($scope.currentOrientation == 'landscape' ? 2.9 : 2.75);
                $scope.firstEdge = ($scope.currentOrientation == 'landscape' ? 0.45 : 0.1);

                $scope.$watch(function () {
                    return $mdMedia('(max-width: 655px)');
                }, function (isSmall) {
                    if (isSmall) {
                        // In small profile, will be portrait no matter what was originally specified
                        $scope.currentOrientation = 'portrait';
                    } else {
                        $scope.currentOrientation = $scope.orientation;
                    }
                    $scope.firstLead = ($scope.currentOrientation == 'landscape' ? 2.9 : 2.75);
                    $scope.firstEdge = ($scope.currentOrientation == 'landscape' ? 0.45 : 0.1);
                });

                $scope.BackMonth = function ($event) {
                    $event.preventDefault();

                    var newm = $scope.selMonth - 1;
                    var newy = $scope.selYear;

                    if (newm < 0) {
                        newm += 12;
                        newy--;
                    }

                    $scope.selMonth = newm;
                    $scope.selYear = newy;

                    $scope.CalculateMonth($scope.selMonth);
                };

                $scope.ForwardMonth = function ($event) {
                    $event.preventDefault();

                    var newm = $scope.selMonth + 1;
                    var newy = $scope.selYear;

                    if (newm >= 12) {
                        newm %= 12;
                        newy++;
                    }

                    $scope.selMonth = newm;
                    $scope.selYear = newy;

                    $scope.CalculateMonth($scope.selMonth);
                };

                var _BuildCalendar = function () {
                    var caltext = '<div class="masterpicker jmddp-' + $scope.serial + ' {{currentOrientation}}">\
    <div class="displaypanel">\
      <div class="yearlabel">{{selYear}}</div>\
	  <div class="datelabel">{{selDate | date:\'EEE, MMM d\'}}</div>\
    </div>\
\
    <div class="selectionpanel">\
      <div class="titleheader">\
        <md-button class="navbutton" ng-click="BackMonth($event)" aria-label="Back 1 Month"><</md-button>\
        <span class="monthyear">{{Months[selMonth]}}\
          <select class="yearInc" ng-model="selMonth" ng-options="(idx*1) as month for (idx, month) in Months">\
          </select>\
          </span>\
        <input type="number" ng-model="selYear" class="yearinput" />\
        <md-button class="navbutton right" ng-click="ForwardMonth($event)" aria-label="Forward 1 Month">></md-button>\
        <md-button class="navbutton right" ng-click="CancelClick($event)" aria-label="Cancel"><ng-md-icon icon="close"></ng-md-icon></md-button>\
        </div>\
      <div class="weekdayheader">\
        <div class="weekdaylabel">S</div>\
        <div class="weekdaylabel">M</div>\
        <div class="weekdaylabel">T</div>\
        <div class="weekdaylabel">W</div>\
        <div class="weekdaylabel">T</div>\
        <div class="weekdaylabel">F</div>\
        <div class="weekdaylabel">S</div>\
      </div>\
      <div class="monthpanel">\
        <md-button class="jmd-fab firstday" ng-click="DayClick($event,1)" ng-style="{\'margin-left\': (selFirstDayOfMonth * firstLead + firstEdge) + \'rem\'}" Day="1">1</md-button>\
        <md-button class="jmd-fab" ng-click="DayClick($event,2)" Day="2">2</md-button>\
        <md-button class="jmd-fab" ng-click="DayClick($event,3)" Day="3">3</md-button>\
        <md-button class="jmd-fab" ng-click="DayClick($event,4)" Day="4">4</md-button>\
        <md-button class="jmd-fab" ng-click="DayClick($event,5)" Day="5">5</md-button>\
        <md-button class="jmd-fab" ng-click="DayClick($event,6)" Day="6">6</md-button>\
        <md-button class="jmd-fab" ng-click="DayClick($event,7)" Day="7">7</md-button>\
        <md-button class="jmd-fab" ng-click="DayClick($event,8)" Day="8">8</md-button>\
        <md-button class="jmd-fab" ng-click="DayClick($event,9)" Day="9">9</md-button>\
        <md-button class="jmd-fab" ng-click="DayClick($event,10)" Day="10">10</md-button>\
        <md-button class="jmd-fab" ng-click="DayClick($event,11)" Day="11">11</md-button>\
        <md-button class="jmd-fab" ng-click="DayClick($event,12)" Day="12">12</md-button>\
        <md-button class="jmd-fab" ng-click="DayClick($event,13)" Day="13">13</md-button>\
        <md-button class="jmd-fab" ng-click="DayClick($event,14)" Day="14">14</md-button>\
        <md-button class="jmd-fab" ng-click="DayClick($event,15)" Day="15">15</md-button>\
        <md-button class="jmd-fab" ng-click="DayClick($event,16)" Day="16">16</md-button>\
        <md-button class="jmd-fab" ng-click="DayClick($event,17)" Day="17">17</md-button>\
        <md-button class="jmd-fab" ng-click="DayClick($event,18)" Day="18">18</md-button>\
        <md-button class="jmd-fab" ng-click="DayClick($event,19)" Day="19">19</md-button>\
        <md-button class="jmd-fab" ng-click="DayClick($event,20)" Day="20">20</md-button>\
        <md-button class="jmd-fab" ng-click="DayClick($event,21)" Day="21">21</md-button>\
        <md-button class="jmd-fab" ng-click="DayClick($event,22)" Day="22">22</md-button>\
        <md-button class="jmd-fab" ng-click="DayClick($event,23)" Day="23">23</md-button>\
        <md-button class="jmd-fab" ng-click="DayClick($event,24)" Day="24">24</md-button>\
        <md-button class="jmd-fab" ng-click="DayClick($event,25)" Day="25">25</md-button>\
        <md-button class="jmd-fab" ng-click="DayClick($event,26)" Day="26">26</md-button>\
        <md-button class="jmd-fab" ng-click="DayClick($event,27)" Day="27">27</md-button>\
        <md-button class="jmd-fab" ng-click="DayClick($event,28)" Day="28">28</md-button>\
        <md-button class="jmd-fab" ng-click="DayClick($event,29)" ng-show="selLastDateOfMonth >= 29" Day="29">29</md-button>\
        <md-button class="jmd-fab" ng-click="DayClick($event,30)" ng-show="selLastDateOfMonth >= 30" Day="30">30</md-button>\
        <md-button class="jmd-fab" ng-click="DayClick($event,31)" ng-show="selLastDateOfMonth >= 31" Day="31">31</md-button>\
      </div>\
	  <div class="actionpanel">\
		<md-button ng-click="OKClick($event)">OK</md-button>\
		<md-button ng-click="CancelClick($event)">Cancel</md-button>\
		<md-button ng-click="NowClick($event)">Now</md-button>\
	  </div>\
    </div>\
\
  </div>';          // Get a handle to the element's calendar body where this code will go
                    var newbody = angular.element(caltext);

                    $compile(newbody)($scope);

                    $element.empty().append(newbody);
                };

                _BuildCalendar();
            },
            templateURL: 'app/demo/cal.html'
        };
    }]);

//var app = angular.module('app', ['ngMaterial', 'mdThemeColors', 'JDatePicker']);
var app = angular.module('app');

app.controller('AppCtrl', ['$scope', '$interval', '$mdDialog', '$timeout', 'mdThemeColors', function ($scope, $interval, $mdDialog, $timeout, mdThemeColors) {
        $scope.testDate = null;
        $scope.mdThemeColors = mdThemeColors;
        $scope.demoDate = new Date();
    }]);