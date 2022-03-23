using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Elearning.DataTransferObjects
{
    public class ServiceResponse<T>
    {
        public bool Success { get; set; } = true;
        public string ErrorCode { get; set; } = null;
        public string Message { get; set; } = null;
        public T Data { get; set; }

        public ServiceResponse(bool success, string errorCode, string message, T data)
        {
            Success = success;
            ErrorCode = errorCode;
            Message = message;
            Data = data;
        }
    }
}
