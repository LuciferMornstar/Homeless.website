/**
 * Menu Module for Homeless Helpers Website
 * Provides consistent navigation functionality across all pages
 */

document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle functionality
  const menuToggle = document.querySelector('.menu-toggle') || createMenuToggle();
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      const menu = document.querySelector('.mega-menu .menu');
      if (menu) {
        menu.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', 
          menu.classList.contains('active') ? 'true' : 'false');
        
        // Toggle the menu button appearance
        menuToggle.classList.toggle('active');
      }
    });
  }
  
  // Add keyboard navigation for menu items
  const menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach(item => {
    item.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.querySelector('a').click();
      }
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.mega-menu') && !e.target.closest('.menu-toggle')) {
      const menu = document.querySelector('.mega-menu .menu');
      if (menu && menu.classList.contains('active')) {
        menu.classList.remove('active');
        if (menuToggle) {
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      }
    }
  });
});

// Helper function to create menu toggle button if it doesn't exist
function createMenuToggle() {
  // Check if we're on a small screen where a toggle would be needed
  if (window.innerWidth > 768) return null;
  
  const existingToggle = document.querySelector('.menu-toggle');
  if (existingToggle) return existingToggle;
  
  const toggle = document.createElement('button');
  toggle.className = 'menu-toggle';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Toggle menu');
  toggle.innerHTML = '<span></span><span></span><span></span>';
  
  const nav = document.querySelector('.mega-menu');
  if (nav) {
    nav.insertBefore(toggle, nav.firstChild);
    return toggle;
  }
  
  return null;
}