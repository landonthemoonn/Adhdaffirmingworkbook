// Check for valid license before showing content
(function() {
    const LICENSE_KEY = 'adhdkit_license';
    const storedLicense = localStorage.getItem(LICENSE_KEY);
    
    if (!storedLicense) {
        // No license found, redirect to license page
        window.location.href = 'license.html';
    }
    // If license exists, page will load normally
    // The actual verification happens on the license page
})();