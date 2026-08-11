/*
  Resume.jsx - Resume Page Component
  ===================================
  WHY: Converted from Resume.cshtml.
  
  This is the simplest conversion - mostly static HTML.
  No interactivity, so no useEffect or useState needed.
  
  Key differences from ASP.NET/Razor:
  1. No @section Scripts needed (no scripts in this page)
  2. class → className in JSX
  3. Self-closing tags need /> (e.g., <br /> not <br>)
  4. Inline styles use objects: style={{ color: 'red' }}
*/
function Resume() {
  return (
    <div className="resume-section p-4">
      <h1 className="section-title mb-4">Resume</h1>
      <p className="lead mb-5">
        Dedicated Software Engineer with a strong passion for building scalable and efficient applications.
        With expertise in .NET, SQL, and modern web technologies, I deliver high-quality solutions that drive business success.
      </p>

      <div className="container">
        <div className="row g-4">
          {/* Left Column - Summary + Education */}
          <div className="col-md-6">
            <div className="resume-item mb-4">
              <h3 className="resume-title">Summary</h3>
              <p><strong>MADESH RAM</strong></p>
              <p>
                <em>
                  Dedicated Software Engineer with 2+ years of experience in the debt collection sector.
                  Skilled in ASP.NET, .NET Core, Web API, MS-SQL Server, and front-end technologies.
                  Experienced in Agile environments and delivering optimized, secure, and scalable solutions.
                </em>
              </p>
              <ul className="resume-list">
                <li>9/13 Bhavani Flats, Nanmangalam, Chennai - 600119</li>
                <li>+91 6374407398</li>
                <li>madeshram66@gmail.com</li>
              </ul>
            </div>

            <div className="resume-item">
              <h3 className="resume-title">Education</h3>
              <p><strong>Bachelor of Commerce</strong></p>
              <p className="text-muted">2019 - 2022</p>
            </div>
          </div>

          {/* Right Column - Experience */}
          <div className="col-md-6">
            <div className="resume-item">
              <h3 className="resume-title">Professional Experience</h3>
              <p><strong>DOTNET DEVELOPER</strong></p>
              <p className="text-muted">Logic Valley | June 2023 – Present</p>
              <ul className="resume-list">
                <li>Designed and developed user-friendly applications using ASP.NET, HTML, and JavaScript.</li>
                <li>Implemented secure and scalable back-end services using .NET Core and Web API.</li>
                <li>Managed and optimized MS-SQL Server databases for high performance and data integrity.</li>
                <li>Automated manual processes through Windows Services, improving operational efficiency.</li>
                <li>Collaborated in Agile teams to gather requirements and deliver business-driven solutions.</li>
                <li>Utilized Azure DevOps for version control, sprint planning, and task management.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Resume
