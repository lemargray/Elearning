using System;

namespace Elearning.DataTransferObjects
{
    public class GetStudentSubscriptionsRequest
    {
        public string CourseTitle { get; set; }
        public string LecturerName { get; set; }
        public DateTime? DateSubscribed { get; set; }
        public DateTime? DateOffered { get; set; }
    }
}