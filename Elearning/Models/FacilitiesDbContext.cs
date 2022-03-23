using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Elearning.Models
{
    public class FacilitiesDbContext : DbContext
    {
        public DbSet<Student> Students { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<CourseStudent> CourseStudents { get; set; }
        public DbSet<Lecturer> Lecturers { get; set; }

        public FacilitiesDbContext(DbContextOptions<FacilitiesDbContext> options) : base(options)
        {
        }
    }
}