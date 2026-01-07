// Check for valid license before showing content
(async function() {
    const LICENSE_KEY = 'adhdkit_license';
    const PRODUCT_ID = 'E80jP2nNTqprQeyJMK4BT~A==';
    const LAST_VERIFIED_KEY = 'adhdkit_last_verified';
    const VERIFICATION_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    const storedLicense = localStorage.getItem(LICENSE_KEY);

    if (!storedLicense) {
        // No license found, redirect to license page
        window.location.href = 'license.html';
        return;
    }

    // Check if we need to re-verify (every 24 hours)
    const lastVerified = localStorage.getItem(LAST_VERIFIED_KEY);
    const now = Date.now();
    const shouldVerify = !lastVerified || (now - parseInt(lastVerified)) > VERIFICATION_INTERVAL;

    if (shouldVerify) {
        // Verify the license with Gumroad
        try {
            const response = await fetch('https://api.gumroad.com/v2/licenses/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    'product_id': PRODUCT_ID,
                    'license_key': storedLicense.trim()
                })
            });

            const data = await response.json();

            if (data.success === true) {
                // License is still valid, update last verified timestamp
                localStorage.setItem(LAST_VERIFIED_KEY, now.toString());
                // Page will load normally
            } else {
                // License is no longer valid (expired, refunded, etc.)
                localStorage.removeItem(LICENSE_KEY);
                localStorage.removeItem(LAST_VERIFIED_KEY);
                window.location.href = 'license.html';
            }
        } catch (error) {
            console.error('License verification error:', error);
            // On network error, allow access if last verified within 7 days
            if (lastVerified && (now - parseInt(lastVerified)) < (7 * 24 * 60 * 60 * 1000)) {
                // Allow temporary access
                console.log('Using cached license due to network error');
            } else {
                // Too long since last verification, require re-verification
                alert('Unable to verify license. Please check your internet connection and try again.');
                window.location.href = 'license.html';
            }
        }
    }
    // If license exists and verification not needed, page will load normally
})();