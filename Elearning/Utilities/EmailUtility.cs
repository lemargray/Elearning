using Elearning.DataTransferObjects;
using Elearning.Models;
using Microsoft.Extensions.Configuration;
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
        public static void SendApprovalEmail(IConfiguration configuration, string email, string name, string courseName)
        {
            const string subject = "Subscription to course";
            string body = ("This is confirmation that your request to subscribe to course " + courseName + " is approved");

            SendEmail(configuration, email, name, subject, body);
        }

        public static void SendLoginCredential(IConfiguration configuration, string email, string name, string studentId)
        {
            const string subject = "Login Credential";
            string body = ("This is confirmation that your request to register as a student to NCB Elearing University was successful. Your student id is: " + studentId + " use this when logging into the system.");

            SendEmail(configuration, email, name, subject, body);
        }

        public static void SendEmail(IConfiguration configuration, string email, string recipientName, string subject, string body)
        {
            var fromAddress = new MailAddress(configuration.GetSection("EmailSettings:From").Value, configuration.GetSection("EmailSettings:Name").Value);
            var toAddress = new MailAddress(email, recipientName);
            string fromPassword = configuration.GetSection("EmailSettings:Password").Value;

            var smtp = new SmtpClient
            {
                Host = configuration.GetSection("EmailSettings:Host").Value,
                Port = int.Parse(configuration.GetSection("EmailSettings:Port").Value),
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
