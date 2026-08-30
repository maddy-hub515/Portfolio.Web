using System.Net.Mail;
using Resend;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddOpenApi();
builder.Services.AddOpenApiDocument();

// Add logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole();

// Configure Resend
builder.Services.AddOptions();
builder.Services.AddHttpClient<ResendClient>();

builder.Services.Configure<ResendClientOptions>(options =>
{
    options.ApiToken = builder.Configuration["RESEND_API_KEY"];
});

builder.Services.AddTransient<IResend, ResendClient>();

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
    ILogger<Program> logger,
    IResend resend) =>
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
            logger.LogWarning(
                "Contact request failed validation: missing required fields."
            );

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

        // Read configuration
        var emailTo = configuration["ContactSettings:ToEmail"];
        var resendApiKey = configuration["RESEND_API_KEY"];

        // Validate Resend configuration
        logger.LogInformation(
            "Resend configuration: ApiKeyConfigured={ApiKeyConfigured}, ToEmailConfigured={ToEmailConfigured}",
            !string.IsNullOrWhiteSpace(resendApiKey),
            !string.IsNullOrWhiteSpace(emailTo)
        );

        if (string.IsNullOrWhiteSpace(resendApiKey))
        {
            logger.LogError("RESEND_API_KEY is missing.");

            return Results.Problem(
                "Email service configuration is incomplete.",
                statusCode: 500
            );
        }

        if (string.IsNullOrWhiteSpace(emailTo))
        {
            logger.LogError("ContactSettings:ToEmail is missing.");

            return Results.Problem(
                "Contact email configuration is incomplete.",
                statusCode: 500
            );
        }

        // Create email body
        var emailBody = $@"
            <h3>New Contact Request</h3>

            <p>
                <strong>Name:</strong> {model.Name}
            </p>

            <p>
                <strong>Email:</strong> {model.Email}
            </p>

            <p>
                <strong>Subject:</strong> {model.Subject}
            </p>

            <p>
                <strong>Message:</strong>
            </p>

            <p>
                {model.Message}
            </p>
        ";

        /*
         * IMPORTANT:
         *
         * onboarding@resend.dev is suitable for initial testing.
         *
         * For production, replace this with an email address
         * from a verified domain in your Resend account.
         */
        var emailMessage = new EmailMessage
        {
            From = "Portfolio <onboarding@resend.dev>",
            Subject = model.Subject,
            HtmlBody = emailBody
        };

        emailMessage.To.Add(emailTo);

        // Optional: Reply directly to the person who contacted you
        emailMessage.ReplyTo.Add(model.Email);

        logger.LogInformation(
            "Attempting to send contact email to {ToEmail}",
            emailTo
        );

        var response = await resend.EmailSendAsync(emailMessage);

        logger.LogInformation(
            "Contact email sent successfully. Resend response: {Response}",
            response.Content
        );

        return Results.Ok(new
        {
            message = "Your message has been sent successfully!"
        });
    }
    catch (Exception ex)
    {
        logger.LogError(
            ex,
            "Error occurred while processing contact form."
        );

        return Results.Problem(
            "Something went wrong. Please try again later.",
            statusCode: 500
        );
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