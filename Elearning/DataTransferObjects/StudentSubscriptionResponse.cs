using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Elearning.DataTransferObjects
{
    public class StudentSubscriptionResponse
    {
        public string Name { get; internal set; }
        public string Lecturer { get; internal set; }
        public DateTime DateSubscribed { get; internal set; }
        public DateTime DateOffered { get; internal set; }
    }
}
