using System.Net;
using System.Net.Mail;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddOpenApiDocument();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173", "https://maddys-portfolio.netlify.app/")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseOpenApi();
    app.UseSwaggerUi();
}

// CORS must be before the API endpoints
app.UseCors("AllowReactApp");

//app.UseHttpsRedirection();

app.MapPost("/api/contact", async (ContactFormModel model, IConfiguration configuration) =>
{
    try
    {
        if (string.IsNullOrWhiteSpace(model.Name) ||
            string.IsNullOrWhiteSpace(model.Email) ||
            string.IsNullOrWhiteSpace(model.Subject) ||
            string.IsNullOrWhiteSpace(model.Message))
        {
            return Results.BadRequest(new
            {
                message = "Please fill all required fields."
            });
        }
        if (!MailAddress.TryCreate(model.Email, out _))
        {
            return Results.BadRequest(new
            {
                message = "Invalid email address."
            });
        }
        var emailBody = $@"
            <h3>New Contact Request</h3>
            <p><strong>Name:</strong> {model.Name}</p>
            <p><strong>Email:</strong> {model.Email}</p>
            <p><strong>Subject:</strong> {model.Subject}</p>
            <p><strong>Message:</strong><br>{model.Message}</p>";

        var emailTo = configuration["ContactSettings:ToEmail"];
        var smtpHost = configuration["Smtp:Host"];
        var smtpPort = int.Parse(configuration["Smtp:Port"]!);
        var smtpUser = configuration["Smtp:Username"];
        var smtpPass = configuration["Smtp:Password"];

        using var smtp = new SmtpClient(smtpHost, smtpPort)
        {
            Credentials = new NetworkCredential(smtpUser, smtpPass),
            EnableSsl = true
        };

        var mailMessage = new MailMessage
        {
            From = new MailAddress(smtpUser!, "Portfolio Contact"),
            Subject = model.Subject,
            Body = emailBody,
            IsBodyHtml = true
        };

        mailMessage.To.Add(emailTo);

        await smtp.SendMailAsync(mailMessage);

        return Results.Ok(new
        {
            message = "Your message has been sent successfully!"
        });
    }
    catch
    {
        return Results.Problem(
            "Something went wrong. Please try again later.",
            statusCode: 500);
    }
});

app.Run();


public class ContactFormModel
{
    public string? Name { get; set; }
    public string? Email { get; set; }
    public string? Subject { get; set; }
    public string? Message { get; set; }
}
