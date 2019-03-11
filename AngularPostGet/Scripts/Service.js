app.service("myService", function ($http) {

    this.getEmployees = function () {
        return $http.get("/Home/GetAll");
    }

    this.UpdateEmp = function (employee) {

        var response = $http({
            method: "POST",
            url: "/Home/UpdateEmployee",
            data: JSON.stringify(employee),
            dataType: "json"
        })

        return response;
    }

    this.getByID = function (EmpID) {

        var response = $http({
            method: "POST",
            url: "/Home/getByID",
            params: {
                id: JSON.stringify(EmpID)
            }
        });
        return response
    }

    this.AddEmp = function (employee) {
        var response = $http({
            method: "POST",
            url: "/Home/Ekle",
            data: JSON.stringify(employee),
            dataType: "json"
        })
        return response;

    }

    this.DeleteEmp = function (employee) {
        var response = $http({
            method: "POST",
            url: "/Home/DeleteEmp",
            data: JSON.stringify(employee),
            dataType: "json"
        })
        return response;

    }

})