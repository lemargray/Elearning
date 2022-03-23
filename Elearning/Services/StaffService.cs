using Elearning.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Elearning.Services
{
    public class StaffService
    {
        protected StaffRecordDbContext StaffDb;

        public StaffService(StaffRecordDbContext staffDb)
        {
            StaffDb = staffDb;
        }

        public bool StaffExists(int staffId, string staffName)
        {
            return StaffDb.Staffs.Where(s => s.StaffId == staffId && s.Name.Trim() == staffName.Trim()).Count() > 0;
        }

        public bool StaffDoesNotExists(int staffId, string staffName)
        {
            return !StaffExists(staffId, staffName);
        }
    }
}
