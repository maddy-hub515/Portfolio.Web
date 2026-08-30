using System.Net;
using System.Net.Mail;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddOpenApi();
builder.Services.AddOpenApiDocument();

// Add logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy
            .WithOrigins(
                "http://localhost:5173",
                "https://maddys-portfolio.netlify.app"
            )
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

// Request/Response logging
app.Use(async (context, next) =>
{
    Console.WriteLine(
        $"REQUEST: {context.Request.Method} {context.Request.Path}"
    );

    try
    {
        await next();
    }
    catch (Exception ex)
    {
        Console.WriteLine("UNHANDLED REQUEST EXCEPTION:");
        Console.WriteLine(ex);
        throw;
    }

    Console.WriteLine(
        $"RESPONSE: {context.Response.StatusCode}"
    );
});

// Contact API
app.MapPost("/api/contact", async (
    ContactFormModel model,
    IConfiguration configuration,
    ILogger<Program> logger) =>
{
    try
    {
        logger.LogInformation(
            "Contact request received from {Email}",
            model.Email
        );

        // Validate required fields
        if (string.IsNullOrWhiteSpace(model.Name) ||
            string.IsNullOrWhiteSpace(model.Email) ||
            string.IsNullOrWhiteSpace(model.Subject) ||
            string.IsNullOrWhiteSpace(model.Message))
        {
            logger.LogWarning("Contact request failed validation: missing required fields.");

            return Results.BadRequest(new
            {
                message = "Please fill all required fields."
            });
        }

        // Validate email
        if (!MailAddress.TryCreate(model.Email, out _))
        {
            logger.LogWarning(
                "Contact request contains invalid email address: {Email}",
                model.Email
            );

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

        // Read configuration
        var emailTo = configuration["ContactSettings:ToEmail"];
        var smtpHost = configuration["Smtp:Host"];
        var smtpPortString = configuration["Smtp:Port"];
        var smtpUser = configuration["Smtp:Username"];
        var smtpPass = configuration["Smtp:Password"];

        // Log configuration status WITHOUT logging password
        logger.LogInformation(
            "SMTP configuration: Host={Host}, Port={Port}, Username={Username}, PasswordConfigured={PasswordConfigured}, ToEmailConfigured={ToEmailConfigured}",
            smtpHost,
            smtpPortString,
            smtpUser,
            !string.IsNullOrWhiteSpace(smtpPass),
            !string.IsNullOrWhiteSpace(emailTo)
        );

        // Validate SMTP configuration
        if (string.IsNullOrWhiteSpace(smtpHost))
        {
            logger.LogError("SMTP Host is missing.");
            return Results.Problem(
                "SMTP configuration is incomplete.",
                statusCode: 500);
        }

        if (!int.TryParse(smtpPortString, out var smtpPort))
        {
            logger.LogError(
                "SMTP Port is missing or invalid. Value={Port}",
                smtpPortString
            );

            return Results.Problem(
                "SMTP configuration is incomplete.",
                statusCode: 500);
        }

        if (string.IsNullOrWhiteSpace(smtpUser))
        {
            logger.LogError("SMTP Username is missing.");
            return Results.Problem(
                "SMTP configuration is incomplete.",
                statusCode: 500);
        }

        if (string.IsNullOrWhiteSpace(smtpPass))
        {
            logger.LogError("SMTP Password is missing.");
            return Results.Problem(
                "SMTP configuration is incomplete.",
                statusCode: 500);
        }

        if (string.IsNullOrWhiteSpace(emailTo))
        {
            logger.LogError("ContactSettings:ToEmail is missing.");
            return Results.Problem(
                "Contact email configuration is incomplete.",
                statusCode: 500);
        }

        // Configure SMTP
        using var smtp = new SmtpClient(smtpHost, smtpPort)
        {
            Credentials = new NetworkCredential(
                smtpUser,
                smtpPass
            ),
            EnableSsl = true
        };

        var mailMessage = new MailMessage
        {
            From = new MailAddress(
                smtpUser,
                "Portfolio Contact"
            ),
            Subject = model.Subject,
            Body = emailBody,
            IsBodyHtml = true
        };

        mailMessage.To.Add(emailTo);

        logger.LogInformation(
            "Attempting to send contact email to {ToEmail}",
            emailTo
        );

        await smtp.SendMailAsync(mailMessage);

        logger.LogInformation(
            "Contact email sent successfully."
        );

        return Results.Ok(new
        {
            message = "Your message has been sent successfully!"
        });
    }
    catch (Exception ex)
    {
        // IMPORTANT:
        // This logs the actual exception to Render,
        // but does NOT expose it to the frontend.
        logger.LogError(
            ex,
            "Error occurred while processing contact form."
        );

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

