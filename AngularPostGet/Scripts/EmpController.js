app.controller("myCtrl", function ($scope, myService) {
    $scope.divEmployee = false;
    GetAllEmp();

    function GetAllEmp() {
        var getData = myService.getEmployees();

        getData.then(function (employe) {
            $scope.employee = employe.data;
        }, function () {
            alert("veriler getirilemedi")
        })
    }

    $scope.AddUpdateEmployee = function () {
        var Employee = {
            EmployeeID:$scope.employeeId,
            FirstName: $scope.employeeName,
            LastName: $scope.employeeLastName
        };

        var getAction = $scope.Action;

        if (getAction == "Update") {
           Employee.EmployeeID = $scope.employeeId;
            var getData = myService.UpdateEmp(Employee);
            GetAllEmp();
            $scope.divEmployee = false;
        }
        else {
           
            var getData = myService.AddEmp(Employee);
            getData.then(function (msg) {
                GetAllEmp();
                alert("Employee Added");
            })
            
        }
    }

    $scope.Divac = function () {
        $scope.Action = "Add";
        $scope.divEmployee = true;
    }

    $scope.editEmployee = function (Employee) {
        console.log(Employee)
        var getData = myService.getByID(Employee);
        getData.then(function (emp) {
            //console.log(Employee.EmployeeID)
            $scope.Employee = emp.data;
            $scope.employeeId = Employee.EmployeeID;
            $scope.employeeName = Employee.FirstName;
            $scope.employeeLastName = Employee.LastName;

            $scope.Action = "Update";
            $scope.divEmployee = true;

            GetAllEmp();
        })

    }

    $scope.DeleteE = function (employee) {
        var getData = myService.DeleteEmp(employee);
        getData.then(function (msg) {
            GetAllEmp();
            alert("Employee Deleted");
        })
    }

})