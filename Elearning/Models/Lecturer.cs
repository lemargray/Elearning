using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Elearning.Models
{
    public class Lecturer
    {
        [Key]
        public int LecturerId { get; set; }
        [Required]
        public string Name { get; set; }

        public List<Course> Courses { get; set; }
        public List<CourseStudent> CourseStudents { get; set; }
    }
}
