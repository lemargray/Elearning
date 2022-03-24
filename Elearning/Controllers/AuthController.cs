using Elearning.DataTransferObjects;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Elearning.Models;
using System.Security.Cryptography;
using System.Text.Unicode;
using Elearning.Services;
using Elearning.Utilities;
using Microsoft.Extensions.Configuration;

namespace Elearning.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly StaffService StaffService;
        private readonly StudentService StudentService;
        private readonly IConfiguration Configuration;

        public AuthController(StaffService staffService, StudentService studentService, IConfiguration configuration)
        {
            StaffService = staffService;
            StudentService = studentService;
            Configuration = configuration;
        }

        [HttpPost]
        [Route("register")]
        public IActionResult Register(StudentRegistrationRequest request)
        {

            if ( StaffService.StaffDoesNotExists(request.StaffId, request.Name) )
            {
                return NotFound(ResponseUtility.Error(Message.Code.NoRecordFound, Message.NoRecordFound));
            }

            if ( StudentService.StudentAlreadyExists(request.StaffId) )
            {
                return BadRequest(ResponseUtility.Error(Message.Code.RecordAlreadyExist, Message.RecordAlreadyExist));
            }

            if ( PasswordUtility.PasswordDoesNotMacth(request.Password, request.PasswordConfirmation) )
            {
                return BadRequest(ResponseUtility.Error(Message.Code.PasswordDoesMatch, Message.PasswordDoesMatch));
            }

            PasswordUtility.CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

            //map fields using automapper or 
            var student = new Student
            {
                StaffId = request.StaffId,
                Name = request.Name,
                Email = request.Email,  
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                DateRegistered = DateTime.Now
            };

            StudentService.CreateStudent(student);

            EmailUtility.SendLoginCredential(Configuration, request.Email, request.Name, student.StudentId.ToString());

            return Ok(ResponseUtility.Success(Message.Success));
        }

        [HttpPost]
        [Route("login")]
        public IActionResult Login(LoginRequest request)
        {
            if( StudentService.StudentDoesNotExists(request.StudentId) )
            {
                return Unauthorized(ResponseUtility.Error(Message.Code.NoRecordFound, Message.NoRecordFound));
            }

            var student = StudentService.GetStudent(request.StudentId);


            if ( !PasswordUtility.VerifyPassword(request.Password, student.PasswordHash, student.PasswordSalt) )
            {
                return Unauthorized(ResponseUtility.Error(Message.Code.InvalidCredentials, Message.InvalidCredentials));
            }

            string token = PasswordUtility.CreateToken(student, Configuration);

            var successfulLoginResponse = new SuccessfulLoginResponse();
            successfulLoginResponse.Token = token;
            successfulLoginResponse.StudentId = student.StudentId;

            return Ok(ResponseUtility.Success(Message.Success, successfulLoginResponse));
        }

        [HttpPost]
        [Route("email")]
        public IActionResult email(string email, string recipientName, string subject, string body)
        {
            EmailUtility.SendEmail(Configuration, email, recipientName, subject, body);

            return Ok("Email Sent Sucessfully");
        }
    }
}
