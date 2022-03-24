using Elearning.DataTransferObjects;
using Elearning.Services;
using Elearning.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Elearning.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        protected CourseService CourseService { get; }

        public StudentService StudentService { get; }
        public IConfiguration Configuration { get; }
        //public IHttpContextAccessor COntext { get; }

        public StudentsController(CourseService courseService, StudentService studentService, IConfiguration configuration)
        {
            CourseService = courseService;
            StudentService = studentService;
            Configuration = configuration;
        }

        [HttpPost]
        [Route("{studentId}/courses")]
        public IActionResult SubscribeToCourse(SubscribeToCourseRequest request, [FromRoute] int studentId)
        {
            
            if (!AuthorizationUtility.isAuthorized(studentId, User))
            {
                return Forbid();
            }

            if (!CourseService.CourseExist(request.CourseId))
            {
                return NotFound(ResponseUtility.Error(Message.Code.NoRecordFound, Message.NoRecordFound));
            }

            if ( CourseService.AlreadySubscribe(studentId, request.CourseId, request.LecturerId) )
            {
                return BadRequest( ResponseUtility.Error(Message.Code.RecordAlreadyExist, Message.RecordAlreadyExist) );
            }

            CourseService.Subscribe(studentId, request.CourseId, request.LecturerId, request.OfferingDate);

            var student = StudentService.GetStudent(studentId);

            var course = CourseService.GetCourse(request.CourseId);

            EmailUtility.SendApprovalEmail(Configuration, student.Email, student.Name, course.Name);

            return Ok( ResponseUtility.Success(Message.Success) );
        }

        [HttpGet]
        [Route("{studentId}/courses")]
        public IActionResult SubscribedCourses(int studentId)
        {
            if (!AuthorizationUtility.isAuthorized(studentId, User))
            {
                return Forbid();
            }

            return Ok(StudentService.GetSubscribedCourses(studentId));
        }

        [HttpGet]
        [Route("{studentId}")]
        public IActionResult FetchStudentRecord(int studentId)
        {
            if (!AuthorizationUtility.isAuthorized(studentId, User))
            {
                return Forbid();
            }

            if (StudentService.StudentDoesNotExists(studentId))
            {
                return NotFound(ResponseUtility.Error(Message.Code.NoRecordFound, Message.NoRecordFound));
            }

            var student = StudentService.GetStudent(studentId);
            var response = new FetchStudentRecordResponse()
            {
                Name = student.Name,
                Email = student.Email
            };

            return Ok(response);
        }
    }
}
