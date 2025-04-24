/**
 * Accessibility enhancements for Homeless Helpers
 */

/**
 * Initialize accessibility features
 */
export function initAccessibility() {
  // Add ARIA attributes to form elements
  addAriaAttributes();
  
  // Setup keyboard navigation enhancements
  setupKeyboardNavigation();
  
  // Add screen reader announcements
  setupScreenReaderAnnouncements();
}

/**
 * Add ARIA attributes to form elements
 */
function addAriaAttributes() {
  // Form fields
  const formFields = document.querySelectorAll('input, select, textarea');
  formFields.forEach(field => {
    // Skip fields that already have labels
    if (field.id && document.querySelector(`label[for="${field.id}"]`)) {
      return;
    }
    
    // Add appropriate aria attributes
    if (!field.hasAttribute('aria-label') && field.placeholder) {
      field.setAttribute('aria-label', field.placeholder);
    }
    
    // Mark required fields
    if (field.required && !field.hasAttribute('aria-required')) {
      field.setAttribute('aria-required', 'true');
    }
  });
  
  // Buttons
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    if (!button.textContent.trim() && !button.hasAttribute('aria-label')) {
      // Try to use title or find an icon and use its alt text
      const label = button.title || button.querySelector('img')?.alt || 'Button';
      button.setAttribute('aria-label', label);
    }
  });
}

/**
 * Enhance keyboard navigation
 */
function setupKeyboardNavigation() {
  // Add focus trap to modals
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    modal.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        // Close the modal on Escape key
        closeModal(modal);
      }
      
      if (e.key === 'Tab') {
        trapFocus(e, modal);
      }
    });
  });
  
  // Add keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Ctrl+S for save
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      document.querySelector('#save-letter')?.click();
    }
    
    // Alt+G for generate
    if (e.altKey && e.key === 'g') {
      e.preventDefault();
      document.querySelector('#generate-letter')?.click();
    }
  });
}

/**
 * Set up screen reader announcements
 */
function setupScreenReaderAnnouncements() {
  // Create screen reader announcement area
  const srAnnounce = document.createElement('div');
  srAnnounce.setAttribute('aria-live', 'polite');
  srAnnounce.classList.add('sr-only');
  document.body.appendChild(srAnnounce);
  
  // Make function available globally
  window.announceToScreenReader = function(message) {
    srAnnounce.textContent = '';
    setTimeout(() => {
      srAnnounce.textContent = message;
    }, 100);
  };
}

/**
 * Add text-to-speech functionality for Mental Health and Pets Support sections
 */
function enableTextToSpeech() {
  const sections = document.querySelectorAll('.mental-health, .pets-support');
  sections.forEach(section => {
    const button = document.createElement('button');
    button.textContent = 'Listen';
    button.addEventListener('click', () => {
      const utterance = new SpeechSynthesisUtterance(section.textContent);
      speechSynthesis.speak(utterance);
    });
    section.prepend(button);
  });
}

document.addEventListener('DOMContentLoaded', enableTextToSpeech);

/**
 * Trap focus within modal
 */
function trapFocus(event, element) {
  const focusableElements = element.querySelectorAll(
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
}

/**
 * Close modal helper
 */
function closeModal(modal) {
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
  document.querySelector('[data-modal-opener]')?.focus();
}
