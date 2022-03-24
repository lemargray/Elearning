using Elearning.DataTransferObjects;
using Elearning.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Elearning.Utilities
{
    public class ResponseUtility
    {
        public static ServiceResponse<string> Success(string message)
        {
            return new ServiceResponse<string>(true, Message.Code.Success, message, null);
        }

        public static ServiceResponse<string> Error(string errorCode, string message)
        {
            return new ServiceResponse<string>(false, errorCode, message, null);
        }

        public static ServiceResponse<string> Success(string message, string data)
        {
            return new ServiceResponse<string>(true, null, message, data);
        }

        public static ServiceResponse<SuccessfulLoginResponse> Success(string message, SuccessfulLoginResponse data)
        {
            return new ServiceResponse<SuccessfulLoginResponse>(true, null, message, data);
        }

        public static ServiceResponse<string> Error(string errorCode, string message, string data)
        {
            return new ServiceResponse<string>(false, errorCode, message, data);
        }

        public static ServiceResponse<Student> Error(string errorCode, string message, Student data)
        {
            return new ServiceResponse<Student>(false, errorCode, message, data);
        }

    }
}
