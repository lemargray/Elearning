using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Elearning.Models
{
    public class CourseStudent
    {
        [Key]
        public int CourseStudentId { get; set; }
        [Required]
        public DateTime DateOffered { get; set; }
        [Required]
        public DateTime DateSubscribed { get; set; }
        [Required]
        public int StudentId { get; set; }
        [Required]
        public int CourseId { get; set; }
        [Required]
        public int LecturerId { get; set; }

        public Course Course { get; set; }
        public Lecturer Lecturer { get; set; }
        public Student Student { get; set; }
    }
}
