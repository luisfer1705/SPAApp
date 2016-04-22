var app = angular.module("spa", ["ngResource", "ngRoute"]);


app.factory('employeeService', function ($resource) {
    return $resource('/api/Employees/:id',
        { id: '@id' },
        {
            update: { method: 'PUT' }
        });
});



app.factory('departmentService', function ($resource) {
    return $resource('/api/Departments/:id',
        { id: '@id' },
        {
            update: { method: 'PUT' }
        });
});



app.controller("mainController", function ($scope) {

});


app.controller("employeeController", function ($scope, employeeService, departmentService) {

    $scope.employees = employeeService.query();

    $scope.employee = {
        Id: 0,
        Name: '',
        Position: '',
        DepartmentId: 0
    };

    $scope.deleteEmployee = function (employee) {
        employeeService.remove(employee, $scope.refreshData);
    };

    $scope.refreshData = function () {
        $scope.employees = employeeService.query();
    };

    $scope.showAddDialog = function () {
        $('#modal-dialog').modal('show');
    };

    $scope.saveEmployee = function () {
        employeeService.save($scope.employee, $scope.refreshData);
        $('#modal-dialog').modal('hide');
        $scope.clearCurrentEmployee();
    };

    $scope.clearCurrentEmployee = function () {
        $scope.employee = { Id: 0, Name: '', Position: '', DepartamentId: 0 };
    };



    $scope.departments = departmentService.query();
});


app.controller("departmentController", function ($scope, departmentService) {

    $scope.departments = departmentService.query();

    $scope.department = {
        Id: 0,
        Name: ''
    };

    $scope.deleteDepartment = function (department) {
        departmentService.remove(department, $scope.refreshData);
    };

    $scope.refreshData = function () {
        $scope.departments = departmentService.query();
    };

    $scope.showAddDialog = function () {
        $('#modal-dialog').modal('show');
    };

    $scope.saveDepartment = function () {
        departmentService.save($scope.department, $scope.refreshData);
        $('#modal-dialog').modal('hide');
        $scope.clearCurrentDepartment();
    };

    $scope.clearCurrentDepartment = function () {
        $scope.department = { Id: 0, Name: '' };
    };

});


app.config(function ($routeProvider) {
    $routeProvider
    .when('/', {
        controller: 'mainController'
    })
    .when('/employee', {
        templateUrl: '/Content/Views/Employess.html',
        controller: 'employeeController'
    })
    .when('/department', {
        templateUrl: '/Content/Views/Department.html',
        controller: 'departmentController'
    })
});