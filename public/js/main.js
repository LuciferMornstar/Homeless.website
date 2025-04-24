/**
 * Main JavaScript file for Homeless Helpers
 * Imports and initializes all modules
 */

// Import accessibility enhancements
import { initAccessibility } from './accessibilityEnhancements.js';

// Initialize all modules when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Initialize accessibility features
  initAccessibility();
  
  console.log('Homeless Helpers website initialized successfully');
});