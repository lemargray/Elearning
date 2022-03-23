using System.ComponentModel.DataAnnotations;

namespace Elearning.Models
{
    public class Staff
    {
        [Key]
        public int StaffId { get; set; }
        [Required]
        public string Name { get; set; }
    }
}