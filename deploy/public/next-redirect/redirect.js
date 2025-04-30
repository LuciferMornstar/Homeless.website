// This is a custom redirection script for the Homeless Helpers UK website
// It handles navigation between the static landing page and Next.js app routes

document.addEventListener('DOMContentLoaded', function() {
  // Update all navigation links to ensure proper routing
  const allLinks = document.querySelectorAll('a');
  
  allLinks.forEach(link => {
    const href = link.getAttribute('href');
    
    // Skip external links and links that already have proper handling
    if (!href || href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')) {
      return;
    }
    
    // Add click handler to show loading indicator and ensure proper navigation
    link.addEventListener('click', function(e) {
      // Show loading indicator
      const loader = document.getElementById('loader');
      if (loader) {
        loader.style.display = 'block';
      }
      
      // Let the navigation proceed
    });
  });
  
  // Enhance the auto-redirect to properly handle paths
  const enhanceRedirect = () => {
    // Get current path or default to landing page
    let targetPath = window.location.pathname;
    if (targetPath === '/' || targetPath === '/index.html') {
      targetPath = '/Landingpage';
    }
    
    // Redirect to the appropriate Next.js route
    setTimeout(() => {
      window.location.href = targetPath;
      const loader = document.getElementById('loader');
      const message = document.getElementById('redirectMessage');
      if (loader) loader.style.display = 'block';
      if (message) message.style.display = 'block';
    }, 3000);
  };
  
  // Only auto-redirect on the main domain or localhost
  if (window.location.hostname === 'homeless.website' || 
      window.location.hostname === 'www.homeless.website' || 
      window.location.hostname === 'localhost') {
    enhanceRedirect();
  }
});