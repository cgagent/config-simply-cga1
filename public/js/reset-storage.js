/**
 * Reset Storage Script
 * 
 * This script clears relevant localStorage items for the CI repository configuration.
 * It can be run in the browser console to reset stored configurations.
 */

(function() {
  // Clear CI repository data
  localStorage.removeItem('ci_repositories');
  
  // Clear package statistics
  localStorage.removeItem('package_statistics');
  
  // Clear blocked packages
  localStorage.removeItem('blocked_packages');
  
  // Log confirmation
  console.log('✅ Repository configuration data has been reset.');
  console.log('Please refresh the page to load default configuration.');
})(); 