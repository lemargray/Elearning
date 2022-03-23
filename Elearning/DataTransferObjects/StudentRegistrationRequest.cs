using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Elearning.DataTransferObjects
{
    public class StudentRegistrationRequest
    {
        [Required]
        public String Name { get; set; }
        [Required]
        public int StaffId { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public String Password { get; set; }
        [Required]
        public String PasswordConfirmation { get; set; }
    }
}
