/*
  Contact.jsx - Contact Page Component
  =====================================
  WHY: Converted from Contact.cshtml + _ValidationScriptsPartial.cshtml.
  
  Key React concepts:
  1. useState for form data - Replaces @model ContactViewModel
     - Stores form field values as a JavaScript object
     - Updates when user types (controlled components)
  
  2. useState for alerts - Replaces TempData["SuccessMessage"]
     - Stores success/error message
     - Shows/hides alert based on state
  
  3. handleChange function - Updates form state as user types
     - Replaces asp-for tag helper automatic binding
     - Each input has name attribute matching state key
  
  4. handleSubmit function - Handles form submission
     - Replaces [HttpPost] AddContact action
     - Uses fetch() to send data to your .NET API
  
  5. Controlled components - React controls form inputs
     - value={formData.name} - React controls the value
     - onChange={handleChange} - Updates state on each keystroke
     - This gives React full control over the form
*/
import { useState } from 'react'

function Contact() {
  /* 
    useState for form data - replaces @model ContactViewModel.
    Initial state matches your ContactViewModel properties.
    
    Object structure:
    {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  */
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  /* 
    useState for alerts - replaces TempData["SuccessMessage"].
    null means no alert shown.
    
    { type: '', message: '' } - Alert state:
    - type: 'success' or 'danger' (Bootstrap alert classes)
    - message: The text to display
  */
  const [alert, setAlert] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  /* 
    handleChange - updates form state when user types.
    In ASP.NET: asp-for="Name" handled this automatically.
    In React: we need a handler function.
    
    event.target.name = field name (e.g., "name", "email")
    event.target.value = field value (e.g., "John")
    
    The spread operator (...prev) copies existing values,
    then [name]: value updates only the changed field.
  */
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,  // Keep existing values
      [name]: value  // Update only the changed field
    }))
  }

  /* 
    handleSubmit - sends form data to your .NET backend.
    In ASP.NET: <form asp-action="AddContact" method="post"> handled this.
    In React: we use fetch() to send data to your API.
    
    async/await - Makes asynchronous code look synchronous.
    Same concept as C# async/await.
  */
  const handleSubmit = async (e) => {
    e.preventDefault() // Prevent page reload (like form submission in HTML)
    setIsSubmitting(true)

    try {
      /* 
        fetch() - sends HTTP requests (like AJAX in jQuery).
        Your .NET backend must have an API endpoint at /api/contact.
        
        method: 'POST' - HTTP method (same as method="post")
        headers: 'Content-Type: 'application/json'' - Sending JSON data
        body: JSON.stringify(formData) - Convert JS object to JSON string
      */
      const response = await fetch('https://localhost:7059/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (response.ok) {
        /* Success - like TempData["SuccessMessage"] */
        setAlert({ type: 'success', message: result.message || 'Message sent successfully!' })
        setFormData({ name: '', email: '', subject: '', message: '' }) // Clear form
      } else {
        /* Error - like TempData["ErrorMessage"] */
        setAlert({ type: 'danger', message: result.message || 'Something went wrong.' })
      }
    } catch (error) {
      /* Network error - like catch block in your HomeController */
      setAlert({ type: 'danger', message: 'Unable to connect to server. Please try again later.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container py-5">
      <h1 className="text-center fw-bold mb-4 position-relative" style={{ paddingBottom: '10px' }}>
        Contact Me
        <span style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60px',
          height: '3px',
          backgroundColor: '#007bff'
        }}></span>
      </h1>

      <p className="text-center text-muted mb-5" style={{ maxWidth: '700px', margin: '0 auto' }}>
        I'd love to hear from you! Whether you have a question, a project in mind, or just want to connect, feel free to reach out.
      </p>

      {/* 
        Alert Messages - replaces TempData alerts.
        In ASP.NET: @if (TempData["SuccessMessage"] != null)
        In React: {alert.message && (...)} - only renders if alert has a message
        
        The && operator means:
        - If alert.message is truthy (not empty), render the div
        - If alert.message is falsy (empty), render nothing
      */}
      {alert.message && (
        <div className={`alert alert-${alert.type} alert-dismissible fade show text-center w-75 mx-auto mb-4`} role="alert">
          {alert.message}
          <button type="button" className="btn-close" onClick={() => setAlert({ type: '', message: '' })}></button>
        </div>
      )}

      <div className="row g-5">
        {/* Left Side - Contact Info (same as ASP.NET) */}
        <div className="col-lg-5">
          <div className="d-flex flex-column gap-4">
            <div className="d-flex align-items-center">
              <i className="bi bi-geo-alt-fill text-primary fs-2 me-3"></i>
              <div>
                <h5 className="fw-bold mb-1">Address</h5>
                <p className="mb-0 text-muted">9/13 Maniyammai Street, Chennai, 600117</p>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <i className="bi bi-telephone-fill text-primary fs-2 me-3"></i>
              <div>
                <h5 className="fw-bold mb-1">Call Me</h5>
                <p className="mb-0 text-muted">+91 63744 07398</p>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <i className="bi bi-envelope-fill text-primary fs-2 me-3"></i>
              <div>
                <h5 className="fw-bold mb-1">Email Me</h5>
                <p className="mb-0 text-muted">madeshram66@gmail.com</p>
              </div>
            </div>

            {/* Google Map */}
            <div className="rounded shadow-sm overflow-hidden mt-4">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.8434782316527!2d-74.01007368459199!3d40.71158227933151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a20b6c0b7df%3A0x1a0e0db2b6e6e8b8!2sDowntown%20Conference%20Center!5e0!3m2!1sen!2sus!4v1616585637997!5m2!1sen!2sus"
                width="100%" 
                height="250" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                title="Google Map"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="col-lg-7">
          <div className="p-4 shadow-lg rounded bg-white">
            <h4 className="fw-bold mb-3">Send Me a Message</h4>
            {/* 
              onSubmit replaces method="post" + asp-action="AddContact".
              handleSubmit will send data to your .NET API.
            */}
            <form onSubmit={handleSubmit} className="row g-3 needs-validation" noValidate>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Your Name</label>
                {/* 
                  Controlled component pattern:
                  - value={formData.name} - React controls the input value
                  - onChange={handleChange} - Updates state when user types
                  - name="name" - Identifies which field to update
                  
                  This is different from ASP.NET's asp-for which did this automatically.
                */}
                <input 
                  type="text" 
                  className="form-control" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name" 
                  required 
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Your Email</label>
                <input 
                  type="email" 
                  className="form-control" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email" 
                  required 
                />
              </div>
              <div className="col-12">
                <label className="form-label fw-semibold">Subject</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Enter subject" 
                  required 
                />
              </div>
              <div className="col-12">
                <label className="form-label fw-semibold">Message</label>
                <textarea 
                  className="form-control" 
                  rows="6" 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message" 
                  required
                ></textarea>
              </div>
              <div className="col-12 text-center">
                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg rounded-pill px-5 shadow-sm"
                  disabled={isSubmitting}
                >
                  <i className="bi bi-send-fill me-2"></i>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
