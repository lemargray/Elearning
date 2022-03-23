using System;

namespace Elearning.DataTransferObjects
{
    public class SearchCourseResponse
    {
        public string Name { get; set; }
        public string Lecturer { get; set; }
        public DateTime? OfferingDate { get; set; }
        public int CourseId { get; set; }
        public int LecturerId { get; set; }
    }
}