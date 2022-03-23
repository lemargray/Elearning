using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Elearning.Models
{
    public class StaffRecordDbContext : DbContext
    {
        public DbSet<Staff> Staffs { get; set; }
        public StaffRecordDbContext(DbContextOptions<StaffRecordDbContext> options) : base(options)
        {
        }

    }
}
