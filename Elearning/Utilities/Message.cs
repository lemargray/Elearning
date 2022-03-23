using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Elearning.Utilities
{
    public class Message
    {
        public class Code
        {
            public const string NoRecordFound = "NoRecordFound";
            public const string Success = "Success";
            public const string InvalidCredentials = "InvalidCredentials";
            public const string PasswordDoesMatch = "PasswordDoesMatch";
            public const string RecordAlreadyExist = "AlreadyExist";

            public static string AccessDenied = "AccessDenied";
        }

        public const string NoRecordFound = "No Record Found";
        public const string Success = "Action Completed Successfully";
        public const string InvalidCredentials = "Invalid Credentials";
        public const string PasswordDoesMatch = "Password Confirmation Failed";
        public const string RecordAlreadyExist = "Record Already Exist";

        public const string AccessDenied = "Access Denied";
    }
}
