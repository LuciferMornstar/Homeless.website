/**
 * Enhanced Dynamic Menu Injection
 */
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('/menu.html');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    const parser = new DOMParser();
    const navDoc = parser.parseFromString(html, 'text/html');
    const newNav = navDoc.querySelector('nav');
    if (!newNav) return;
    // Replace any nav inside header
    document.querySelectorAll('header nav, header .modern-nav').forEach(oldNav => {
      oldNav.replaceWith(newNav.cloneNode(true));
    });
    // If no header nav exists, append to header-content
    if (!document.querySelector('header nav')) {
      const headerContent = document.querySelector('header .header-content');
      if (headerContent) headerContent.appendChild(newNav.cloneNode(true));
    }
    // Attach toggle behavior
    document.querySelectorAll('#navToggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const menu = document.querySelector('#navMenu');
        if (menu) menu.classList.toggle('hidden');
      });
    });
  } catch (err) {
    console.error('Menu load error:', err);
  }
});