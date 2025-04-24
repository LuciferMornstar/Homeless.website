/**
 * Fix scrolling issues
 */

document.addEventListener('DOMContentLoaded', function () {
  // Remove any overflow: hidden from html and body
  document.documentElement.style.overflow = 'auto';
  document.body.style.overflow = 'auto';
  document.documentElement.style.height = 'auto';
  document.body.style.height = 'auto';

  // Check if there are any elements with class 'page'
  const pageElements = document.querySelectorAll('.page');
  if (pageElements.length > 0) {
    pageElements.forEach(element => {
      element.style.overflow = 'auto';
      element.style.height = 'auto';
    });
  }

  // Check if there are any elements with class 'content-wrapper'
  const contentWrappers = document.querySelectorAll('.content-wrapper');
  if (contentWrappers.length > 0) {
    contentWrappers.forEach(element => {
      element.style.overflow = 'visible';
      element.style.height = 'auto';
    });
  }

  console.log('Scroll fix applied');
});
/**
 * Fix scrolling issues
 */

document.addEventListener('DOMContentLoaded', function () {
  // Remove any overflow: hidden from html and body
  document.documentElement.style.overflow = 'auto';
  document.body.style.overflow = 'auto';
  document.documentElement.style.height = 'auto';
  document.body.style.height = 'auto';

  // Check if there are any elements with class 'page'
  const pageElements = document.querySelectorAll('.page');
  if (pageElements.length > 0) {
    pageElements.forEach(element => {
      element.style.overflow = 'auto';
      element.style.height = 'auto';
    });
  }

  // Check if there are any elements with class 'content-wrapper'
  const contentWrappers = document.querySelectorAll('.content-wrapper');
  if (contentWrappers.length > 0) {
    contentWrappers.forEach(element => {
      element.style.overflow = 'visible';
      element.style.height = 'auto';
    });
  }

  console.log('Scroll fix applied');
});