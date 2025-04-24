/**
 * Letter history management using localStorage
 */

const HISTORY_KEY = 'homelessHelpers_letterHistory';

/**
 * Save letter to history
 * @param {Object} letterData - The letter data to save
 */
export function saveLetterToHistory(letterData) {
  // Get existing history or initialize empty array
  const history = getLetterHistory();
  
  // Add timestamp for sorting
  letterData.timestamp = new Date().toISOString();
  letterData.id = generateId();
  
  // Add to beginning of array (most recent first)
  history.unshift(letterData);
  
  // Keep only the most recent 50 letters
  const trimmedHistory = history.slice(0, 50);
  
  // Save back to localStorage
  localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmedHistory));

  return letterData.id; // Return the ID of the saved letter
}

/**
 * Get letter history
 * @returns {Array} Array of saved letters
 */
export function getLetterHistory() {
  const history = localStorage.getItem(HISTORY_KEY);
  return history ? JSON.parse(history) : [];
}

/**
 * Get a specific letter from history by ID
 * @param {String} id - The ID of the letter to retrieve
 * @returns {Object|null} The letter data or null if not found
 */
export function getLetterById(id) {
  const history = getLetterHistory();
  return history.find(letter => letter.id === id) || null;
}

/**
 * Delete letter from history
 * @param {String} id - The ID of the letter to delete
 * @returns {Boolean} True if deletion was successful
 */
export function deleteLetterFromHistory(id) {
  let history = getLetterHistory();
  const initialLength = history.length;
  
  history = history.filter(letter => letter.id !== id);
  
  if (history.length !== initialLength) {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    return true;
  }
  
  return false;
}

/**
 * Clear all letter history
 */
export function clearLetterHistory() {
  localStorage.removeItem(HISTORY_KEY);
}

/**
 * Update an existing letter in history
 * @param {String} id - The ID of the letter to update
 * @param {Object} updatedData - New data to merge with existing letter
 * @returns {Boolean} True if update was successful
 */
export function updateLetterInHistory(id, updatedData) {
  let history = getLetterHistory();
  const letterIndex = history.findIndex(letter => letter.id === id);
  
  if (letterIndex >= 0) {
    // Merge existing data with updates
    history[letterIndex] = {
      ...history[letterIndex],
      ...updatedData,
      lastModified: new Date().toISOString()
    };
    
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    return true;
  }
  
  return false;
}

/**
 * Export history to a file
 * @returns {Blob} A JSON blob of the history data
 */
export function exportHistory() {
  const history = getLetterHistory();
  const historyBlob = new Blob([JSON.stringify(history, null, 2)], 
    { type: 'application/json' });
  
  return historyBlob;
}

/**
 * Import history from a file
 * @param {String} jsonContent - JSON string to import
 * @param {Boolean} replace - Whether to replace existing history or merge
 * @returns {Boolean} True if import was successful
 */
export function importHistory(jsonContent, replace = false) {
  try {
    const importedHistory = JSON.parse(jsonContent);
    
    if (!Array.isArray(importedHistory)) {
      return false;
    }
    
    if (replace) {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(importedHistory));
    } else {
      // Merge with existing history
      const currentHistory = getLetterHistory();
      
      // Use a Set to track IDs we've already seen
      const existingIds = new Set(currentHistory.map(letter => letter.id));
      
      // Add non-duplicate imported letters
      const newLetters = importedHistory.filter(letter => {
        return letter.id && !existingIds.has(letter.id);
      });
      
      const mergedHistory = [...currentHistory, ...newLetters];
      
      // Sort by timestamp (newest first)
      mergedHistory.sort((a, b) => {
        return new Date(b.timestamp) - new Date(a.timestamp);
      });
      
      localStorage.setItem(HISTORY_KEY, JSON.stringify(mergedHistory));
    }
    
    return true;
  } catch (error) {
    console.error("Error importing history:", error);
    return false;
  }
}

/**
 * Search letter history
 * @param {String} query - Search query
 * @returns {Array} Matching letters
 */
export function searchHistory(query) {
  if (!query) {
    return getLetterHistory();
  }
  
  const history = getLetterHistory();
  const lowerQuery = query.toLowerCase();
  
  return history.filter(letter => {
    // Search in common fields
    return (letter.clientName && letter.clientName.toLowerCase().includes(lowerQuery)) ||
           (letter.recipientName && letter.recipientName.toLowerCase().includes(lowerQuery)) ||
           (letter.challenges && letter.challenges.toLowerCase().includes(lowerQuery)) ||
           (letter.goals && letter.goals.toLowerCase().includes(lowerQuery)) ||
           (letter.letterType && letter.letterType.toLowerCase().includes(lowerQuery));
  });
}

/**
 * Generate unique ID for letters
 */
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}
