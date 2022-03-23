using Elearning.DataTransferObjects;
using Elearning.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Elearning.Services
{
    public class CourseService
    {
        protected FacilitiesDbContext FacilitiesDb;

        public CourseService(FacilitiesDbContext facilitiesDb)
        {
            FacilitiesDb = facilitiesDb;
        }

        public List<Course> GetCourses()
        {
            return FacilitiesDb.Courses.ToList();
        }

        public bool CourseExist(int courseId)
        {
            return FacilitiesDb.Courses.Where(c => c.CourseId == courseId).Count() > 0;
        }

        public Course GetCourse(int courseId)
        {
            return FacilitiesDb.Courses.Find(courseId);
        }

        public List<AvailableCoursesResponse> AvailableCourses(int studentId)
        {
            var courses = FacilitiesDb.Courses
                .Where(c => !FacilitiesDb.CourseStudents
                    .Select(cs => cs.CourseId)
                    .Contains(c.CourseId)
                ).Select(c => new AvailableCoursesResponse { LecturerId = c.Lecturer.LecturerId, CourseId = c.CourseId, Title = c.Name, Lecturer = c.Lecturer.Name, OfferingDate = c.OfferingDate });

            return courses.ToList();
        }

        public void Subscribe(int studentId, int courseId, int lectureId, DateTime offeringDate)
        {
            FacilitiesDb.CourseStudents.Add(
                new CourseStudent()
                {
                    StudentId = studentId,
                    CourseId = courseId,
                    LecturerId = lectureId,
                    DateOffered = offeringDate,
                    DateSubscribed = DateTime.Now
                }
            );

            FacilitiesDb.SaveChanges();
        }

        public bool AlreadySubscribe(int studentId, int courseId, int lectureId)
        {
            //var student = FacilitiesDb.Students.Find(studentId);

            return FacilitiesDb.CourseStudents.Where(cs => cs.StudentId == studentId && cs.LecturerId == lectureId && cs.CourseId == courseId).Count() > 0;
        }

        public List<SearchCourseResponse> SearchCourses(string courseTitle, string lectureName, DateTime? offeringDate)
        {
            var courses = FacilitiesDb.Courses.AsQueryable();
            
            if(!string.IsNullOrEmpty(courseTitle))
            {
                courses = courses.Where(c => c.Name.Contains(courseTitle));
            }

            if (!string.IsNullOrEmpty(lectureName))
            {
                courses = courses.Where(c => c.Lecturer.Name.Contains(lectureName));
            }

            if (offeringDate != null)
            {
                courses = courses.Where(c => c.OfferingDate == offeringDate);
            }

            var searchCourseResponses = courses.Select(c => new SearchCourseResponse
            {
                Name = c.Name,
                Lecturer = c.Lecturer.Name,
                OfferingDate = c.OfferingDate,
                CourseId = c.CourseId,
                LecturerId = c.LecturerId
            });

            return searchCourseResponses.ToList();
        }
    }
}