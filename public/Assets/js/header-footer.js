// This script injects the modern header and footer into pages that use placeholders
document.addEventListener('DOMContentLoaded', function() {
    // Load the header if a placeholder exists
    const headerPlaceholder = document.getElementById('header');
    if (headerPlaceholder) {
        fetch('modern-header.html')
            .then(response => response.text())
            .then(data => {
                headerPlaceholder.innerHTML = data;
                // Re-initialize any header JavaScript after insertion
                initializeHeader();
            })
            .catch(error => console.error('Error loading header:', error));
    }

    // Load the footer if a placeholder exists
    const footerPlaceholder = document.getElementById('footer');
    if (footerPlaceholder) {
        fetch('modern-footer.html')
            .then(response => response.text())
            .then(data => {
                footerPlaceholder.innerHTML = data;
            })
            .catch(error => console.error('Error loading footer:', error));
    }

    // Initialize header functionality
    function initializeHeader() {
        // Handle dropdown menus
        const dropdowns = document.querySelectorAll('.dropdown');
        if (dropdowns) {
            dropdowns.forEach(dropdown => {
                // Add hover functionality
                dropdown.addEventListener('mouseenter', function() {
                    this.querySelector('.dropdown-content').style.display = 'block';
                });
                dropdown.addEventListener('mouseleave', function() {
                    this.querySelector('.dropdown-content').style.display = 'none';
                });
            });
        }

        // Handle mobile menu toggle
        const menuToggle = document.querySelector('.menu-toggle');
        const modernNav = document.querySelector('.modern-nav');
        if (menuToggle && modernNav) {
            menuToggle.addEventListener('click', function() {
                modernNav.classList.toggle('active');
                this.classList.toggle('active');
            });
        }

        // Set active nav item based on current page
        const currentPage = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('.nav-link');
        if (navLinks) {
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href === currentPage) {
                    link.classList.add('active');
                }
            });
        }
    }
});