using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Elearning.DataTransferObjects
{
    public class AvailableCoursesResponse
    {
        public int CourseId { get; set; }
        public int LecturerId { get; set; }
        public string Title { get; set; }
        public string Lecturer { get; set; }
        public DateTime? OfferingDate { get; set; }
    }
}
