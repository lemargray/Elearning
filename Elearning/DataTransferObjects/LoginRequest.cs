using System.ComponentModel.DataAnnotations;

namespace Elearning.DataTransferObjects
{
    public class LoginRequest
    {
        [Required]
        public int StudentId { get; set; }
        [Required]
        public string Password { get; set; }
    }
}