using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Elearning.Models
{
    public class Student
    {
        [Key]
        public int StudentId { get; set; }
        [Required]
        public String Name { get; set; }
        [Required]
        public int StaffId { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public byte[] PasswordHash { get; set; }
        [Required]
        public byte[] PasswordSalt { get; internal set; }
        [Required]
        public DateTime DateRegistered { get; set; }

        public List<CourseStudent> CourseStudents { get; set; }
    }
}
