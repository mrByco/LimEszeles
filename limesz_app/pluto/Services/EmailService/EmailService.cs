using margarita_app.Misc;
using SendGrid.Helpers.Mail;
using SendGrid;

namespace margarita_app.Services.EmailService
{
    public class EmailService
    {
        private readonly IWebHostEnvironment _environment;
        public EmailService (IWebHostEnvironment environment)
        {
            _environment = environment;
        }


        public async Task<Response> SendEmail(EmailAddress from, EmailAddress to, string subject, string plainTextContent, string templateName, Dictionary<string, string> variables)
        {
            string html = PrepareTemplate(variables, templateName);
            return await SendEmail(from, to, subject, plainTextContent, html);
        }

        public async Task<Response> SendEmail(EmailAddress from, EmailAddress to, string subject, string plainTextContent, string htmlContent)
        {
            var apiKey = PlutoConfig.Instance.SendGridAPIkey;
            var client = new SendGridClient(apiKey);
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
            return response;
        }

        public string PrepareTemplate(Dictionary<string, string> variables, string templateSource)
        {
            var template = GetTemplate(templateSource);
            return FillTemplate(variables, template);
        }

        public string FillTemplate(Dictionary<string, string> variables, string template)
        {
            foreach(var key in variables.Keys)
            {
                template = template.Replace($"{{{{{key}}}}}", variables[key]);
            }
            return template;
        }

        private string GetTemplate(string templateSource)
        {
            return File.ReadAllText(Path.Combine(_environment.ContentRootPath, "wwwroot", "email-templates", templateSource));
        }

    }
}
