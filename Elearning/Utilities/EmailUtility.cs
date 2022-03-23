using Elearning.DataTransferObjects;
using Elearning.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Elearning.Utilities
{
    public class EmailUtility
    {
        public static void ApprovalEmail(string email, string name, string courseName)
        {
            var fromAddress = new MailAddress("ncbelearninguniversity@gmail.com", "NCB E-learning University");
            var toAddress = new MailAddress(email, name);
            const string fromPassword = "Pa$$word01234";
            const string subject = "Subscription to course";
            string body = ("This is confirmation that your request to subscribe to course " + courseName + " is approved");

            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(fromAddress.Address, fromPassword),
                Timeout = 20000
            };
            using (var message = new MailMessage(fromAddress, toAddress)
            {
                Subject = subject,
                Body = body
            })
            {
                smtp.Send(message);
            }
        }
    }
}
