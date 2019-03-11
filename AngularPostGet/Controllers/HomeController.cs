using AngularPostGet.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AngularPostGet.Controllers
{
    public class HomeController : Controller
    {
        NorthwindEntities db = new NorthwindEntities();
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetAll()
        {
            var result = db.Employees.Select(x=> new {
                x.EmployeeID,
                x.FirstName,
                x.LastName,
            }).ToList();

            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult UpdateEmployee(Employees employee)
        {
            var employeee = db.Employees.Where(x=>x.EmployeeID==employee.EmployeeID).FirstOrDefault();

            employeee.FirstName = employee.FirstName;
            employeee.LastName = employee.LastName;
            db.SaveChanges();

            return Json(employee);


        }

        [HttpPost]
        public JsonResult getByID(string EmpID)
        {
            int no = Convert.ToInt32(EmpID);
            var emp = db.Employees.Find(no);

            return Json(emp);

        }

        [HttpPost]
        public JsonResult Ekle(Employees emp)
        {
           var a= db.Employees.Add(emp);
            db.SaveChanges();

            return Json(a);
        }

        public JsonResult DeleteEmp(Employees emp)
        {
            int no = Convert.ToInt32(emp.EmployeeID);
            var emplist = db.Employees.Where(x => x.EmployeeID == no).FirstOrDefault();
            db.Employees.Remove(emplist);
            db.SaveChanges();
            return Json(emplist, JsonRequestBehavior.AllowGet);

        }

    }
}