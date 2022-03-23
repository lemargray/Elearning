using Elearning.DataTransferObjects;
using Elearning.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Elearning.Utilities
{
    public class AuthorizationUtility
    {
        public static bool isAuthorized(int studentId, ClaimsPrincipal user)
        {
            var claimStudentId = user.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;

            return studentId.ToString() == claimStudentId;
        }
    }
}
