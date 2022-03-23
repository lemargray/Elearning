using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Elearning.Models
{
    public class Course
    {
        [Key]
        public int CourseId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public int LecturerId { get; set; }
        
        public DateTime? OfferingDate { get; set; }

        public Lecturer Lecturer { get; set; }
        public List<CourseStudent> CourseStudents { get; set; }
    }
}
