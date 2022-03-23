using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Elearning.DataTransferObjects
{
    public class SearchCoursesRequest
    {
        public string CourseTitle { get; set; }
        public string LecturerName { get; set; }
        public DateTime? OfferingDate { get; set; }
    }
}
