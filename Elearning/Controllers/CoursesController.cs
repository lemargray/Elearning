using Elearning.DataTransferObjects;
using Elearning.Models;
using Elearning.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Elearning.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        protected CourseService CourseService;

        public CoursesController(CourseService courseService)
        {
            CourseService = courseService;
        }

        [HttpGet]
        public IActionResult list([FromQuery] AvailableCoursesRequest request)
        {
            return Ok(CourseService.AvailableCourses(request.StudentId, request.CourseTitle, request.LecturerName, request.OfferingDate));
        }

        [HttpGet]
        [Route("search")]
        public IActionResult search([FromQuery] SearchCoursesRequest request)
        {
            return Ok(CourseService.SearchCourses(request.CourseTitle, request.LecturerName, request.OfferingDate));
        }
    }
}
