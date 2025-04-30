/**
 * Guided letter creation wizard
 */

let currentStep = 0;
const steps = [
  {
    title: "Welcome",
    description: "Let's create a support letter together. This wizard will guide you through each step.",
    fields: []
  },
  {
    title: "Letter Type",
    description: "What type of letter do you need to create?",
    fields: ["letter-type"]
  },
  {
    title: "Client Information",
    description: "Tell us about the person you're supporting",
    fields: ["clientName", "clientGender"]
  },
  {
    title: "Client Situation",
    description: "Describe the client's current circumstances",
    fields: ["challenges", "strengths", "goals"]
  },
  {
    title: "Recipient Information",
    description: "Who will receive this letter?",
    fields: ["recipientName", "recipientPosition", "recipientOrganization", "recipientAddress", "recipientCity", "recipientState", "recipientZip"]
  },
  {
    title: "Your Information",
    description: "Your contact information for the letter",
    fields: ["senderName", "senderTitle", "senderOrganization", "senderPhone", "senderEmail"]
  },
  {
    title: "Review & Generate",
    description: "Review your information and generate your letter",
    fields: []
  }
];

/**
 * Initialize the wizard
 */
export function initWizard() {
  const wizardContainer = document.querySelector('#letter-wizard');
  if (!wizardContainer) return;
  
  // Create wizard navigation
  createWizardNav(wizardContainer);
  
  // Create wizard content area
  const contentArea = document.createElement('div');
  contentArea.classList.add('wizard-content');
  wizardContainer.appendChild(contentArea);
  
  // Create wizard controls
  createWizardControls(wizardContainer);
  
  // Show first step
  showStep(0);
  
  // Add event listener for the toggle button
  document.querySelector('#toggle-wizard')?.addEventListener('click', toggleWizardView);
}

/**
 * Create wizard navigation
 */
function createWizardNav(container) {
  const nav = document.createElement('ul');
  nav.classList.add('wizard-nav');
  
  steps.forEach((step, index) => {
    const li = document.createElement('li');
    li.textContent = step.title;
    li.dataset.step = index;
    
    // Add accessibility attributes
    li.setAttribute('role', 'tab');
    li.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
    li.setAttribute('id', `wizard-tab-${index}`);
    
    nav.appendChild(li);
  });
  
  container.appendChild(nav);
}

/**
 * Create wizard controls (next/back buttons)
 */
function createWizardControls(container) {
  const controls = document.createElement('div');
  controls.classList.add('wizard-controls');
  
  const backBtn = document.createElement('button');
  backBtn.textContent = 'Back';
  backBtn.classList.add('btn', 'btn-secondary');
  backBtn.id = 'wizard-back';
  backBtn.setAttribute('aria-label', 'Go back to previous step');
  backBtn.addEventListener('click', () => navigateStep(-1));
  
  const nextBtn = document.createElement('button');
  nextBtn.textContent = 'Next';
  nextBtn.classList.add('btn', 'btn-primary');
  nextBtn.id = 'wizard-next';
  nextBtn.setAttribute('aria-label', 'Proceed to next step');
  nextBtn.addEventListener('click', () => navigateStep(1));
  
  controls.appendChild(backBtn);
  controls.appendChild(nextBtn);
  container.appendChild(controls);
}

/**
 * Show a specific step
 */
function showStep(stepIndex) {
  // Update current step
  currentStep = stepIndex;
  
  // Update nav
  const navItems = document.querySelectorAll('.wizard-nav li');
  navItems.forEach((item, index) => {
    item.classList.toggle('active', index === stepIndex);
    item.setAttribute('aria-selected', index === stepIndex ? 'true' : 'false');
  });
  
  // Update content
  const contentArea = document.querySelector('.wizard-content');
  contentArea.innerHTML = '';
  
  const step = steps[stepIndex];
  
  // Add title and description
  const title = document.createElement('h3');
  title.textContent = step.title;
  contentArea.appendChild(title);
  
  const description = document.createElement('p');
  description.textContent = step.description;
  contentArea.appendChild(description);
  
  // Add fields for this step
  const fieldContainer = document.createElement('div');
  fieldContainer.classList.add('wizard-step-fields');
  
  step.fields.forEach(fieldName => {
    // Find the original field in the main form
    const originalField = document.querySelector(`[name="${fieldName}"], #${fieldName}`);
    if (!originalField) return;
    
    // Clone the field's parent container (form-group)
    const fieldGroup = originalField.closest('.form-group')?.cloneNode(true) || 
                       createFieldGroup(originalField, fieldName);
    
    // Update IDs to avoid duplicates
    const newField = fieldGroup.querySelector(`[name="${fieldName}"], #${fieldName}`);
    if (!newField) return;
    
    const originalId = newField.id;
    newField.id = `wizard-${originalId || fieldName}`;
    
    // Update label's 'for' attribute
    const label = fieldGroup.querySelector('label');
    if (label) {
      label.setAttribute('for', `wizard-${originalId || fieldName}`);
    }
    
    // Sync with original field
    newField.addEventListener('input', () => {
      originalField.value = newField.value;
      // Trigger change event on original
      const event = new Event('input', { bubbles: true });
      originalField.dispatchEvent(event);
    });
    
    // Set current value
    newField.value = originalField.value;
    
    fieldContainer.appendChild(fieldGroup);
  });
  
  contentArea.appendChild(fieldContainer);
  
  // Show the final preview on the last step
  if (stepIndex === steps.length - 1) {
    const previewBtn = document.createElement('button');
    previewBtn.textContent = 'Generate Preview';
    previewBtn.classList.add('btn', 'btn-info');
    previewBtn.addEventListener('click', generatePreview);
    contentArea.appendChild(previewBtn);
    
    const preview = document.createElement('div');
    preview.classList.add('wizard-preview');
    preview.id = 'wizard-letter-preview';
    contentArea.appendChild(preview);
  }
  
  // Update button states
  document.querySelector('#wizard-back').disabled = stepIndex === 0;
  
  const nextBtn = document.querySelector('#wizard-next');
  if (stepIndex === steps.length - 1) {
    nextBtn.textContent = 'Finish';
  } else {
    nextBtn.textContent = 'Next';
  }
}

/**
 * Create a field group if original parent can't be found
 */
function createFieldGroup(field, fieldName) {
  const group = document.createElement('div');
  group.classList.add('form-group');
  
  const label = document.createElement('label');
  label.setAttribute('for', fieldName);
  label.textContent = fieldName.charAt(0).toUpperCase() + fieldName.slice(1).replace(/([A-Z])/g, ' $1');
  
  const newField = field.cloneNode(true);
  
  group.appendChild(label);
  group.appendChild(newField);
  
  return group;
}

/**
 * Navigate between steps
 */
function navigateStep(direction) {
  const newStep = currentStep + direction;
  
  // Check boundaries
  if (newStep < 0 || newStep >= steps.length) return;
  
  // If going forward, validate current step
  if (direction > 0 && !validateCurrentStep()) {
    alert('Please fill in all required fields before proceeding.');
    return;
  }
  
  // If finishing, complete the wizard
  if (direction > 0 && newStep === steps.length) {
    completeWizard();
    return;
  }
  
  // Show the new step
  showStep(newStep);
}

/**
 * Validate current step fields
 */
function validateCurrentStep() {
  const currentStepFields = steps[currentStep].fields;
  let valid = true;
  
  currentStepFields.forEach(fieldName => {
    const originalField = document.querySelector(`[name="${fieldName}"], #${fieldName}`);
    if (!originalField) return;
    
    const field = document.querySelector(`#wizard-${originalField.id || fieldName}`);
    if (field && field.required && !field.value.trim()) {
      valid = false;
      field.classList.add('invalid');
    } else if (field) {
      field.classList.remove('invalid');
    }
  });
  
  return valid;
}

/**
 * Generate preview in wizard
 */
function generatePreview() {
  // Use the main form's preview generation
  document.querySelector('#generate-letter')?.click();
  
  // Copy the preview to the wizard
  setTimeout(() => {
    const mainPreview = document.querySelector('#letter-preview')?.innerHTML || 'Preview not available';
    document.querySelector('#wizard-letter-preview').innerHTML = mainPreview;
  }, 100);
}

/**
 * Complete the wizard process
 */
function completeWizard() {
  // Hide wizard
  document.querySelector('#letter-wizard').classList.remove('active');
  document.querySelector('#letter-form').classList.remove('hidden');
  
  // Show success message
  const successMsg = document.createElement('div');
  successMsg.classList.add('alert', 'alert-success');
  successMsg.textContent = 'Your letter has been created successfully!';
  document.querySelector('#letter-form').prepend(successMsg);
  
  // Remove after 5 seconds
  setTimeout(() => {
    successMsg.remove();
  }, 5000);
  
  // Announce to screen readers
  window.announceToScreenReader?.('Letter created successfully');
}

/**
 * Toggle between wizard and standard form
 */
function toggleWizardView() {
  const wizardContainer = document.querySelector('#letter-wizard');
  const formContainer = document.querySelector('#letter-form');
  
  if (!wizardContainer || !formContainer) return;
  
  const isWizardActive = wizardContainer.classList.toggle('active');
  formContainer.classList.toggle('hidden', isWizardActive);
  
  const toggleBtn = document.querySelector('#toggle-wizard');
  if (toggleBtn) {
    toggleBtn.textContent = isWizardActive ? 'Switch to Standard Form' : 'Use Guided Wizard';
  }
}
