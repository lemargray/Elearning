using Elearning.DataTransferObjects;
using Elearning.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Elearning.Services
{
    public class StudentService
    {
        protected FacilitiesDbContext FacilitiesDb;

        public StudentService(FacilitiesDbContext facilitiesDb)
        {
            FacilitiesDb = facilitiesDb;
        }

        public void CreateStudent(Student student)
        {
            FacilitiesDb.Students.Add(student);
            FacilitiesDb.SaveChanges();
        }

        public bool StudentAlreadyExists(int staffId)
        {
            return FacilitiesDb.Students.Where(s => s.StaffId == staffId).Count() > 0;
        }

        public Student GetStudent(int studentId)
        {
            return FacilitiesDb.Students.Find(studentId);
        }

        public bool StudentDoesNotExists(int studentId)
        {
            return FacilitiesDb.Students.Where(s => s.StudentId == studentId).Count() == 0;
        }

        public List<StudentSubscriptionResponse> GetSubscribedCourses(int studentId)
        {
            return FacilitiesDb.CourseStudents
                .Include(cs => cs.Course)
                .Include(cs => cs.Lecturer)
                .Where(cs => cs.StudentId == studentId)
                .Select(cs => new StudentSubscriptionResponse()
                {
                    Name = cs.Course.Name,
                    Lecturer = cs.Lecturer.Name,
                    DateSubscribed = cs.DateSubscribed,
                    DateOffered = cs.DateOffered
                }).ToList();
        }
    }
}
