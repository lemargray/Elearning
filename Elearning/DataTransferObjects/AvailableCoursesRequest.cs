using System;

namespace Elearning.DataTransferObjects
{
    public class AvailableCoursesRequest
    {
        public int StudentId { get; set; }
        public string CourseTitle { get; set; }
        public string LecturerName { get; set; }
        public DateTime? OfferingDate { get; set; }
    }
}