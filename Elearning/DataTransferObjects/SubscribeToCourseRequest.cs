using System;
using System.ComponentModel.DataAnnotations;

namespace Elearning.DataTransferObjects
{
    public class SubscribeToCourseRequest
    {
        [Required]
        public int CourseId { get; set; }
        [Required]
        public int LecturerId { get; set; }
        [Required]
        public DateTime OfferingDate { get; set; }
    }
}