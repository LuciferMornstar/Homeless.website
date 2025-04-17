/**
 * Navigation Module for Homeless Helpers Website
 * Provides consistent navigation across all pages
 */

// Toggle submenu visibility for mobile (optional enhancement)
document.querySelectorAll('.menu-item > a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        // Only activate on small screens
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const submenu = this.nextElementSibling;
            if (submenu) {
                // Close other open submenus
                document.querySelectorAll('.submenu').forEach(sm => {
                    if (sm !== submenu) sm.style.display = 'none';
                });
                // Toggle current submenu
                submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
            }
        }
    });
});

// Close submenus when clicking outside
window.addEventListener('click', function(e) {
    if (!e.target.closest('.menu-item')) {
        document.querySelectorAll('.submenu').forEach(sm => sm.style.display = 'none');
    }
});