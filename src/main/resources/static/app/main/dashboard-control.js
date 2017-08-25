(function () {
    angular.module('app')
            .controller('DashboardController', [
                '$scope', '$mdMedia', '$rootScope', 'Expense', 'Category', '$log', '$q', '$timeout', '$location',
                DashboardController
            ]);

    function DashboardController($scope, $mdMedia, $rootScope, Expense, Category, $log, $q, $timeout, $location)
    {
        $scope.expenses = [];
        $scope.earning = [];
        $scope.spending = [];
        $scope.data = [];

        var json = {
            "series": ["Earned", "Spent"],
            "labels": ["January", "February", "March", "April", "May", "June", "July", "August", "Septemper",
                "October", "November", "December"],
            "colours": [
                {// sales
                    label: "Earned",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(15,187,25,1)",
                    pointColor: "rgba(15,187,25,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                },
                {// purchase
                    "label": "Spent",
                    "fillColor": "rgba(220,220,220,0.2)",
                    "strokeColor": "rgba(220,20,20,1)",
                    "pointColor": "rgba(220,20,20,1)",
                    "pointStrokeColor": "#fff",
                    "pointHighlightFill": "#fff",
                    "pointHighlightStroke": "rgba(220,220,220,1)"
                }]
        };
        $scope.chartData = json;

        // Pie Chart
        $scope.pieLabels = ["Earned", "Spent"];
        $scope.pieData = [];
        $scope.earningsTotal = 0;
        $scope.spendingsTotal = 0;
        $scope.expenseTotal = 0;
        $scope.categoriesTotal = 0;

        Expense.count({where: {spenderId: $rootScope.currentUser.id}})
                .$promise
                .then(function (result) {
                    $scope.expenseTotal = result.count;
                });

        Expense
                .find({where: {spenderId: $rootScope.currentUser.id}})
                .$promise
                .then(function (results) {
                    $scope.expenses = results;

                    $scope.expenses.forEach(function (expense) {
                        if (expense.type === 'spending') {
                            $scope.spendingsTotal = +$scope.spendingsTotal + +expense.amount;
                           // $scope.spending.push(expense.expensedate);
                            $scope.spending.push(expense.amount);
                        } else if (expense.type === 'earning') {
                            $scope.earningsTotal = +$scope.earningsTotal + +expense.amount;
                            //$scope.earning.push(expense.expensedate);
                            $scope.earning.push(expense.amount);
                        }
                    });

                    $scope.data.push($scope.earning);
                    $scope.data.push($scope.spending);
                    $scope.chartData.data = $scope.data;
                    $scope.earningsTotal =  parseFloat($scope.earningsTotal).toFixed(2);
                    $scope.spendingsTotal =  parseFloat($scope.spendingsTotal).toFixed(2);
                    $scope.pieData.push($scope.earningsTotal);
                    $scope.pieData.push($scope.spendingsTotal);

                });

        Category.count()
                .$promise
                .then(function (result) {
                    $scope.categoriesTotal = result.count;
                });


    }
})();

